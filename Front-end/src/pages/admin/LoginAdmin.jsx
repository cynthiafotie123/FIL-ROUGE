import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import useAdminLogin from '../../hooks/useAdminLogin';
import Logo from '../../assets/logo_quickmed-removebg-preview.png';
import { FcGoogle } from "react-icons/fc";

/**
 * Composant de page de connexion pour l'admin de QuickMed
 * @returns {JSX.Element} Composant de connexion
 */
const LoginAdmin = () => {
  const {
    email,
    password,
    rememberMe,
    showPassword,
    loginError,
    isLoading,
    setRememberMe,
    setShowPassword,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleForgotPassword,
    handleGoogleLogin
  } = useAdminLogin();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#002341] to-[#00cfc1] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-4xl flex justify-center font-bold text-white mb-2">
            <img src={Logo} alt="Logo" className="h-15 w-auto" />
            <h1>QuickMed</h1>
          </div>
          <p className="text-gray-200">Portail Administrateur</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-center text-[#002341] mb-6">
            Connexion Admin
          </h2>

          {loginError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#00cfc1]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="pl-10 bg-white/50 border-2 border-gray-200 focus:ring-[#00cfc1] focus:border-[#00cfc1] block w-full rounded-lg text-sm py-3"
                  placeholder="Entrez votre email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#00cfc1]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="pl-10 bg-white/50 border-2 border-gray-200 focus:ring-[#00cfc1] focus:border-[#00cfc1] block w-full rounded-lg text-sm py-3"
                  placeholder="Entrez votre mot de passe"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#00cfc1] hover:text-[#002341]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#00cfc1] focus:ring-[#00cfc1] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#00cfc1] hover:text-[#002341]"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#002341] to-[#00cfc1] text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#00cfc1] focus:ring-offset-2 transition duration-150 ease-in-out !rounded-button whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </div>
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
            className="w-full flex justify-center items-center bg-white border-2 border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00cfc1] !rounded-button whitespace-nowrap cursor-pointer disabled:opacity-50"
          >
            <FcGoogle className='w-5 h-5 mr-4' />
            connexion avec google
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="mt-2">
              By signing in, you agree to our{' '}
              <a href="#" className="font-medium text-[#00cfc1] hover:text-[#002341]">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-[#00cfc1] hover:text-[#002341]">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;