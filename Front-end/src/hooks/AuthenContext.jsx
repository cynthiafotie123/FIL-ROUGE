import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/axios'; // Assurez-vous que le chemin est correct

// Création du contexte d'authentification
const AuthenContext = createContext({});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  // États du contexte
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));
  const [isConnected, setIsConnected] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pharmacie, setPharmacie] = useState(null);

  // Effets pour configurer le token et vérifier l'authentification
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('auth_token', token);
      fetchUserData();
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('auth_token');
      setLoading(false);
    }
  }, [token]);

  // Récupérer les données de l'utilisateur connecté
  const fetchUserData = async () => {
    try {
      const response = await api.get('/api/user');
      setUser(response.data);
      setIsConnected(true);
      
      // Récupérer les rôles de l'utilisateur
      if (response.data.roles && response.data.roles.length > 0) {
        setRole(response.data.roles[0]); // On prend le premier rôle par défaut
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des données utilisateur:', err);
      logout();
      setLoading(false);
    }
  };

  // Inscription d'un utilisateur standard
  const register = async (userData) => {
    setError(null);
    try {
      const response = await api.post('/api/register', userData);
      setToken(response.data.auth_token);
      setUser(response.data.user);
      setIsConnected(response.data.is_connect);
      setRole(response.data.role);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Une erreur est survenue lors de l\'inscription');
      throw err;
    }
  };

  // Inscription d'une pharmacie
  const registerPharmacie = async (pharmacieData) => {
    setError(null);
    try {
      const response = await api.post('/api/register-pharmacie', pharmacieData);
      setToken(response.data.auth_token);
      setUser(response.data.user);
      setPharmacie(response.data.pharmacie);
      setIsConnected(response.data.is_connect);
      setRole(response.data.role);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Une erreur est survenue lors de l\'inscription de la pharmacie');
      throw err;
    }
  };

  // Création du premier administrateur
  const createFirstAdmin = async (adminData) => {
    setError(null);
    try {
      const response = await api.post('/api/create-first-admin', adminData);
      setToken(response.data.auth_token);
      setUser(response.data.user);
      setIsConnected(response.data.is_connect);
      setRole(response.data.role);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Une erreur est survenue lors de la création du premier administrateur');
      throw err;
    }
  };

  // Inscription d'un administrateur (nécessite d'être déjà admin)
  const registerAdmin = async (adminData) => {
    setError(null);
    try {
      const response = await api.post('/api/register-admin', adminData);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Une erreur est survenue lors de l\'inscription de l\'administrateur');
      throw err;
    }
  };

  // Connexion standard
  const login = async (credentials) => {
    setError(null);
    try {
      const response = await api.post('/api/login', credentials);
      setToken(response.data.access_token);
      setUser(response.data.user);
      setIsConnected(true);
      
      // Définir le rôle si disponible
      if (response.data.user.roles && response.data.user.roles.length > 0) {
        setRole(response.data.user.roles[0]);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants invalides');
      throw err;
    }
  };

  // Connexion spécifique pour les pharmacies
  const loginPharmacie = async (credentials) => {
    setError(null);
    try {
      const response = await api.post('/api/login-pharmacie', credentials);
      setToken(response.data.token);
      setUser(response.data.user);
      setPharmacie(response.data.pharmacie);
      setIsConnected(response.data.is_connect);
      setRole(response.data.role);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants invalides pour la pharmacie');
      throw err;
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      if (token) {
        await api.post('/api/logout');
      }
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    } finally {
      setToken(null);
      setUser(null);
      setPharmacie(null);
      setIsConnected(false);
      setRole(null);
      localStorage.removeItem('auth_token');
    }
  };

  // Récupérer les rôles de l'utilisateur
  const getUserRoles = async () => {
    try {
      const response = await api.get('/api/user-roles');
      return response.data.roles;
    } catch (err) {
      console.error('Erreur lors de la récupération des rôles:', err);
      return [];
    }
  };

  // Valeurs exposées dans le contexte
  const contextValue = {
    user,
    token,
    isConnected,
    role,
    loading,
    error,
    pharmacie,
    register,
    registerPharmacie,
    createFirstAdmin,
    registerAdmin,
    login,
    loginPharmacie,
    logout,
    getUserRoles,
    api, // Exposer l'instance axios pour d'autres requêtes API
  };

  return (
    <AuthenContext.Provider value={contextValue}>
      {children}
    </AuthenContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuthen = () => {
  return useContext(AuthenContext);
};

export default AuthenContext;