// useAdminLogin.js
import { useState } from 'react';
import axios from 'axios';

/**
 * Custom hook pour gérer la logique de connexion de l'administrateur
 * @returns {Object} États et fonctions pour la connexion
 */
const useAdminLogin = () => {
  // États
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Gère le changement dans le champ email
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setLoginError('');
  };

  /**
   * Gère le changement dans le champ mot de passe et calcule sa force
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   */
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setLoginError('');
    
    // Calcul de la force du mot de passe
    let strength = 0;
    if (newPassword.length > 6) strength += 1;
    if (newPassword.match(/[A-Z]/)) strength += 1;
    if (newPassword.match(/[0-9]/)) strength += 1;
    if (newPassword.match(/[^A-Za-z0-9]/)) strength += 1;
    setPasswordStrength(strength);
  };

  /**
   * Gère la soumission du formulaire de connexion
   * @param {React.FormEvent} e - Événement de soumission
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!email || !password) {
      setLoginError('Please fill in all fields');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Appel API pour la connexion
      const response = await axios.post('/api/admin/login', {
        email,
        password,
        rememberMe
      });
      
      // Traitement de la réponse
      if (response.data && response.data.success) {
        // Stocker le token si nécessaire
        if (response.data.token) {
          localStorage.setItem('adminToken', response.data.token);
        }
        
        // Redirection ou autre action après connexion réussie
        console.log('Login successful', response.data);
        
        // Ici vous pourriez ajouter une redirection vers le tableau de bord admin
        // window.location.href = '/admin/dashboard';
      } else {
        setLoginError(response.data?.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(
        error.response?.data?.message || 
        'An error occurred during login. Please try again.'
      );
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
      
      // Simuler un appel API pour l'authentification Google
      const response = await axios.get('/api/admin/auth/google');
      
      // Traitement de la réponse
      console.log('Google login', response.data);
      
      // Ici vous pourriez ajouter le code de redirection vers l'auth Google
      // window.location.href = response.data.authUrl;
    } catch (error) {
      console.error('Google login error:', error);
      setLoginError('Failed to connect with Google');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gère la demande de réinitialisation du mot de passe
   */
  const handleForgotPassword = async () => {
    if (!email) {
      setLoginError('Please enter your email to reset password');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Appel API pour réinitialiser le mot de passe
      const response = await axios.post('/api/admin/reset-password', { email });
      
      // Afficher un message de confirmation
      alert(response.data?.message || 'Password reset email sent');
    } catch (error) {
      console.error('Password reset error:', error);
      setLoginError('Failed to send password reset email');
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
    passwordStrength,
    isLoading,
    
    // Fonctions d'état
    setRememberMe,
    setShowPassword,
    
    // Gestionnaires d'événements
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleGoogleLogin,
    handleForgotPassword
  };
};

export default useAdminLogin;