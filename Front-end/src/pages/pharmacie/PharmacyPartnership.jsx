// PharmacyPartnership.jsx
import React, { useState, useEffect } from 'react';
import { Building2, Mail, Phone, MapPin, Check } from 'lucide-react';
import { useAuthen } from '../../hooks/AuthenContext';
import { useNavigate } from 'react-router-dom';

const PharmacyPartnership = () => {
  const navigate = useNavigate();
  const { registerPharmacie } = useAuthen();
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    password: '',
    adresse: '',
    horaire_d_ouverture: '',
    horaire_fermeture: '',
    latitude: '',
    longitude: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await registerPharmacie(formData);
      setSuccess(true);
      
      // Redirect to login after successful submission
      setTimeout(() => {
        navigate('/pharmacie/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#00CFC1]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} className="text-[#00CFC1]" />
          </div>
          <h1 className="text-2xl font-bold text-[#002341]">Devenir Pharmacie Partenaire</h1>
          <p className="text-gray-600 mt-2">
            Rejoignez notre réseau de pharmacies et développez votre activité
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-[#002341] mb-2">Demande envoyée avec succès !</h2>
            <p className="text-gray-600 mb-6">
              Votre demande de partenariat a été soumise avec succès. Notre équipe va l'examiner et vous contactera dans les plus brefs délais.
            </p>
            <p className="text-gray-600">Vous allez être redirigé vers la page de connexion...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-[#002341] mb-4">Informations de la pharmacie</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField label="Nom de la pharmacie" icon={<Building2 size={16} />} name="nom" value={formData.nom} onChange={handleChange} required />
              <InputField label="Téléphone" icon={<Phone size={16} />} name="telephone" value={formData.telephone} onChange={handleChange} type="tel" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField label="Email" icon={<Mail size={16} />} name="email" value={formData.email} onChange={handleChange} type="email" required />
              <InputField label="Mot de passe" name="password" value={formData.password} onChange={handleChange} type="password" required />
            </div>

            <div className="mb-4">
              <InputField label="Adresse" icon={<MapPin size={16} />} name="adresse" value={formData.adresse} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField label="Heure d'ouverture" name="horaire_d_ouverture" value={formData.horaire_d_ouverture} onChange={handleChange} type="time" required />
              <InputField label="Heure de fermeture" name="horaire_fermeture" value={formData.horaire_fermeture} onChange={handleChange} type="time" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} type="number" step="any" />
              <InputField label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} type="number" step="any" />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description de votre pharmacie
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
                placeholder="Décrivez votre pharmacie, vos spécialités, horaires d'ouverture, etc."
              ></textarea>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setCurrentPage('home')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#00CFC1] hover:bg-[#00b8ab] text-white rounded-lg transition duration-150"
              >
                {isLoading ? 'Envoi en cours...' : 'Soumettre la demande'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, icon, name, value, onChange, type = "text", required = false, step }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        step={step}
        className={`w-full px-4 py-2 ${icon ? 'pl-10' : ''} rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent`}
      />
      {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
    </div>
  </div>
);

export default PharmacyPartnership;
