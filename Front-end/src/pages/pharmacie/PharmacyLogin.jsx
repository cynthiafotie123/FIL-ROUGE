import React, { useState } from 'react';
import { Building2, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import {Link} from 'react-router-dom'
import Logo from '../../assets/logo_quickmed-removebg-preview.png';


const PharmacyLogin = ({ setCurrentPage }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // API call to your Laravel backend
      const response = await fetch('/api/login/pharmacie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      // Save token to localStorage or session
      localStorage.setItem('pharmacie_token', data.token);
      localStorage.setItem('pharmacie_user', JSON.stringify(data.user));

      // Redirect to pharmacy dashboard
      setCurrentPage('PharmacyDashboard');
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#00CFC1]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} className="text-[#00CFC1]" />
          </div>
          <h1 className="text-2xl font-bold text-[#002341]">Connexion Pharmacie</h1>
          <p className="text-gray-600 mt-2">
            Accédez à votre espace pharmacie partenaire
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
            <AlertCircle size={20} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
                  placeholder="votre@email.com"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#00CFC1] focus:ring-[#00CFC1] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-[#00CFC1] hover:underline" onClick={() => setCurrentPage('forgot-password')}>
                  Mot de passe oublié?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00CFC1] hover:bg-[#00b8ab] text-white py-2 px-4 rounded-lg transition duration-150 flex items-center justify-center"
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Vous n'avez pas encore de compte?{' '}
            <Link 
              to="/devenirepartenaire" 
              className="text-[#00CFC1] hover:underline"
              onClick={() => setCurrentPage('PharmacyPartnership')}
            >
              Devenir partenaire
            </Link>
          </p>
        </div>
        <div className="mt-5 text-2xl flex justify-center items-center text-[#002341] font-bold  mb-2 " ><img src={Logo} alt="Logo" className="h-15 w-auto" /><h1>QuickMed</h1></div>
      </div>
    </div>
  );
};

export default PharmacyLogin;