import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useClientRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    if (password !== passwordConfirmation) {
      setErrors({ passwordConfirmation: "Les mots de passe ne correspondent pas." });
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post('/api/register', {
        nom: name,
        email: email,
        telephone: phone,
        password: password,
        password_confirmation: passwordConfirmation,
      });
      
      if (res.data?.auth_token) {
        localStorage.setItem('token', res.data.auth_token);
        setIsAuthenticated(true);
        navigate('/dashboardclient');
      }
       else {
        throw new Error("Erreur d'inscription.");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: error.response?.data?.message || "Erreur inconnue." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    email,
    phone,
    password,
    passwordConfirmation,
    isLoading,
    isAuthenticated,
    errors,
    setName,
    setEmail,
    setPhone,
    setPassword,
    setPasswordConfirmation,
    handleRegister
  };
};

export default useClientRegister;
