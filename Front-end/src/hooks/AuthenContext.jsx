import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Création du contexte d'authentification
const AuthenContext = createContext();

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 * @returns {Object} Contexte d'authentification
 */
export const useAuthen = () => {
  return useContext(AuthenContext);
};

/**
 * Fournisseur du contexte d'authentification
 * @param {Object} props - Propriétés du composant
 * @returns {JSX.Element} Composant fournisseur de contexte
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token') || null);

  // Configuration de l'API
  const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
  });

  // Intercepteur pour ajouter le token à chaque requête
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Intercepteur pour gérer les erreurs d'authentification
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Déconnexion automatique en cas d'erreur 401
        logout();
      }
      return Promise.reject(error);
    }
  );

  // Effet pour configurer l'intercepteur d'axios
  useEffect(() => {
    // Configuration de l'entête d'autorisation pour les requêtes
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }

    // Tentative de récupération des informations utilisateur
    if (token) {
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, [token]);

  /**
   * Vérifie le statut d'authentification actuel
   */
  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/api/user');
      if (response.data) {
        const userData = response.data;
        setCurrentUser(userData);
        
        // Déterminer le rôle de l'utilisateur
        const isAdmin =  userData?.user_id === 21; // ID de l'utilisateur admin

        const isPharmacy = userData.data?.user_id === 23; //  id utilisateur pharmacie
        
        if (isAdmin) {
          setUserRole('admin');
        } else if (isPharmacy) {
          setUserRole('pharmacie');
        } else {
          setUserRole('client');
        }
        
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Connexion utilisateur
   * @param {string} authToken - Token d'authentification
   * @param {Object} userData - Données de l'utilisateur
   * @returns {string|null} Le rôle de l'utilisateur ou null en cas d'échec
   */
  const login = async (authToken, userData) => {
    try {
      setLoading(true);
      localStorage.setItem('auth_token', authToken);
      setToken(authToken);
      
      if (userData) {
        setCurrentUser(userData);
        
        // Déterminer le rôle de l'utilisateur
        const isAdmin = userData?.user_id === 21;


        const isPharmacy = userData?.user_id === 23;
          
        
        if (isAdmin) {
          setUserRole('admin');
          return 'admin';
        } else if (isPharmacy) {
          setUserRole('pharmacie');
          return 'pharmacie';
        } else {
          setUserRole('client');
          return 'client';
        }
        
        setIsAuthenticated(true);
      } else {
        await checkAuthStatus();
        return userRole;
      }
    } catch (error) {
      console.error('Login error:', error);
      logout();
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Déconnexion utilisateur
   */
  const logout = async () => {
    try {
      if (token) {
        await api.post('/api/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setToken(null);
      setCurrentUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

  /**
   * Vérification si l'utilisateur est administrateur
   * @returns {boolean} Vrai si l'utilisateur est administrateur
   */
  const isAdmin = () => {
    return userRole === 'admin';
  };

  /**
   * Vérification si l'utilisateur est une pharmacie
   * @returns {boolean} Vrai si l'utilisateur est une pharmacie
   */
  const isPharmacy = () => {
    return userRole === 'pharmacie';
  };
  // Ajouter dans AuthenContext.jsx
  const getPendingPharmacies = async () => {
    try {
      const response = await api.get('/admin/pending-pharmacies');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  const validatePharmacie = async (id) => {
    try {
      const response = await api.post(`/admin/validate-pharmacie/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const registerPharmacie = async (formData) => {
    try {
      const response = await api.post('/register/pharmacie', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  const rejectPharmacie = async (id) => {
    try {
      const response = await api.post(`/admin/reject-pharmacie/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Valeur du contexte à fournir
  const value = {
    currentUser,
    isAuthenticated,
    userRole,
    loading,
    login,
    logout,
    isAdmin,
    isPharmacy,
    api,
    getPendingPharmacies,
    registerPharmacie,
    validatePharmacie,
    rejectPharmacie
  };

  return (
    <AuthenContext.Provider value={value}>
      {!loading ? children : <div>Chargement...</div>}
    </AuthenContext.Provider>
  );
};

export default AuthenContext;