import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const useClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      // Récupérer le cookie CSRF
      await api.get('/sanctum/csrf-cookie');
      
      // Faire la requête de connexion
      const res = await api.post('/api/login', { 
        email, 
        password 
      });
      
      // Authentification réussie
      if (res.data?.access_token) {
        localStorage.setItem('token', res.data.access_token);
        setIsAuthenticated(true);
        
        // Récupérer les informations de l'utilisateur
        const userRes = await api.get('/api/user', {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`
          }
        });
        
        setUserData(userRes.data);
        localStorage.setItem('userData', JSON.stringify(userRes.data));
        
        // Rediriger vers le dashboard
        navigate('/dashboardclient');
      } else {
        throw new Error('Erreur de connexion');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      if (error.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        setLoginError(Object.values(error.response.data.errors)[0][0]);
      } else {
        setLoginError("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setLoginError('');

    try {
      const res = await api.get('/api/google-login');

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        setIsAuthenticated(true);
        
        // Récupérer les informations de l'utilisateur
        const userRes = await api.get('/api/user', {
          headers: {
            Authorization: `Bearer ${res.data.token}`
          }
        });
        
        setUserData(userRes.data);
        localStorage.setItem('userData', JSON.stringify(userRes.data));
        
        // Rediriger vers le dashboard
        navigate('/dashboardclient');
      } else {
        throw new Error('Erreur de connexion Google');
      }
    } catch (error) {
      console.error(error);
      setLoginError(error.response?.data?.message || "Échec de la connexion Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    showPassword,
    loginError,
    isLoading,
    isAuthenticated,
    userData,
    setEmail,
    setPassword,
    setShowPassword,
    handleLogin,
    handleGoogleLogin
  };
};

export default useClientLogin;
