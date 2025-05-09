import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthen } from './AuthenContext';

/**
 * Custom hook pour gérer la logique de connexion de l'administrateur
 * @returns {Object} États et fonctions pour la connexion
 */
const useAdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthen();
  // États
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        localStorage.removeItem('auth_token');
        navigate('/auth/admin');
      }
      return Promise.reject(error);
    }
  );

  /**
   * Gère le changement dans le champ email
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setLoginError('');
  };

  /**
   * Gère le changement dans le champ mot de passe
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setLoginError('');
  };

  /**
   * Gère la soumission du formulaire de connexion
   * @param {React.FormEvent} e - Événement de soumission
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLoginError('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Appel API pour la connexion admin spécifique
      const response = await api.post('/api/login', {
        email,
        password,
              });

      console.log('Response:', response.data);
      
      if (response.data && response.data.access_token) {
        const userData = response.data.user;
        console.log('User data:', userData);
        
        // Vérifier si l'utilisateur a le rôle admin
        const isAdmin = userData?.role === 'admin' || 
                       userData?.roles?.includes('admin') || 
                       (userData?.utilisateur?.roles && 
                        userData?.utilisateur?.roles.some(role => role.role_name === 'admin'));
        
        console.log('Is admin:', isAdmin);
        console.log('Token:', response.data.access_token);
        
        if (isAdmin) {
          // Mettre à jour le contexte d'authentification
          await login(response.data.access_token, userData);
          // Stocker le token et les détails utilisateur
          localStorage.setItem('auth_token', response.data.access_token);
          localStorage.setItem('user_role', 'admin');
          
          // Rediriger vers le dashboard admin
          console.log('Redirection vers le dashboard admin');
          navigate('/admin/dashboard');
        } else {
          setLoginError('Vous n\'avez pas les droits d\'administrateur');
          localStorage.removeItem('auth_token');
        }
      } else {
        setLoginError('Échec de la connexion');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 422) {
        setLoginError('Email ou mot de passe incorrect');
      } else if (error.response?.status === 401) {
        setLoginError('Accès non autorisé. Vérifiez vos identifiants.');
      } else {
        setLoginError(
          error.response?.data?.message || 
          'Une erreur est survenue lors de la connexion. Veuillez réessayer.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gère la connexion via Google
   */
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      // Rediriger vers l'URL de connexion Google
      window.location.href = 'http://localhost:8000/api/admin/auth/google';
    } catch (error) {
      console.error('Google login error:', error);
      setLoginError('Échec de la connexion avec Google');
      setIsLoading(false);
    }
  };

  /**
   * Gère la demande de réinitialisation du mot de passe
   */
  const handleForgotPassword = async () => {
    if (!email) {
      setLoginError('Veuillez entrer votre email pour réinitialiser le mot de passe');
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await api.post('/api/admin/reset-password', { email });
      alert(response.data?.message || 'Email de réinitialisation envoyé');
    } catch (error) {
      console.error('Password reset error:', error);
      setLoginError('Échec de l\'envoi de l\'email de réinitialisation');
    } finally {
      setIsLoading(false);
    }
  };

  // Retourne tous les états et fonctions à utiliser dans le composant
  return {
    // États
    email,
    password,
    rememberMe,
    showPassword,
    loginError,
    isLoading,
    
    // Fonctions d'état
    setRememberMe,
    setShowPassword,
    
    // Gestionnaires d'événements
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleForgotPassword,
    handleGoogleLogin
  };
};

export default useAdminLogin;