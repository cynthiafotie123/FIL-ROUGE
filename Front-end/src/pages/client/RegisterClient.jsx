import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useClientRegister from '../../hooks/useClientRegister';
import Logo from '../../assets/logo_quickmed-removebg-preview.png';

const RegisterClient = () => {
  const {
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
    handleRegister,
  } = useClientRegister();

  const navigate = useNavigate();

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
          <p className="text-gray-700">Création de compte client</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-center text-[#0002341] mb-6">Inscription</h2>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nom complet"
              className="w-full bg-white/50 border-2 border-gray-200 focus:ring-[#002341] focus:border-[#00cfc1] focus:outline-none shadow-sm rounded-lg text-sm py-3 px-4"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}

            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-white/50 border-2 border-gray-200 focus:ring-[#002341] focus:border-[#00cfc1] focus:outline-none rounded-lg text-sm py-3 px-4"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Téléphone"
              className="w-full bg-white/50 border-2 border-gray-200 focus:ring-[#002341] focus:border-[#00cfc1] focus:outline-none rounded-lg text-sm py-3 px-4"
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}

            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full bg-white/50 border-2 border-gray-200 focus:ring-[#002341] focus:border-[#00cfc1] focus:outline-none  rounded-lg text-sm py-3 px-4"
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}

            <input
              type="password"
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
              placeholder="Confirmer le mot de passe"
              className="w-full bg-white/50 border-2 border-gray-200 focus:ring-[#002341] focus:border-[#00cfc1] focus:outline-none  rounded-lg text-sm py-3 px-4"
            />
            {errors.passwordConfirmation && <p className="text-sm text-red-600">{errors.passwordConfirmation}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#002341] to-[#00cfc1] text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition duration-150 disabled:opacity-50"
            >
              {isLoading ? 'Inscription en cours...' : 'Créer un compte'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;
