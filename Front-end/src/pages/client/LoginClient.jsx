import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useClientLogin from '../../hooks/useClientLogin';
import Logo from '../../assets/logo_quickmed-removebg-preview.png';
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from 'lucide-react';


const LoginClient = () => {
  const {
    email,
    password,
    showPassword,
    loginError,
    isLoading,
    isAuthenticated,
    setEmail,
    setPassword,
    setShowPassword,
    handleLogin,
    handleGoogleLogin,
  } = useClientLogin();

  const navigate = useNavigate();

  // Redirige si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboardclient');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#0002341] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-4xl flex justify-center font-bold text-[#0002341] mb-2">
            <img src={Logo} alt="Logo" className="h-15 w-auto" />
            <h1>QuickMed</h1>
          </div>
          <p className="text-gray-700">Portail Client</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-center text-[#0002341] mb-6">Connexion</h2>

          {loginError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{loginError}</div>}

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-white/50 border-2 border-gray-200 focus:ring-[#002341] focus:border-[#002341] rounded-lg text-sm py-3 px-4"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                className="w-full bg-white/50 border-2 border-gray-200 ring-[#00cfc1]  focus:border-[#002341] rounded-lg text-sm py-3 px-4 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-[#002341]"
              >
               {showPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#002341] to-[#00cfc1] text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#00cfc1] focus:ring-offset-2 transition duration-150 disabled:opacity-50"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OU</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex justify-center items-center bg-white border-2 border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00cfc1] transition disabled:opacity-50"
          >
            <FcGoogle className='w-5 h-5 mr-3' />
            Connexion avec Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
