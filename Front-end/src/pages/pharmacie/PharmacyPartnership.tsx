import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, FileText, Upload, Check } from 'lucide-react';

const PharmacyPartnership = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    pharmacyName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    licenseNumber: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Partnership request:', formData);
      setIsLoading(false);
      setSuccess(true);
      
      // Redirect to login after successful submission
      setTimeout(() => {
        setCurrentPage('PharmacyLogin');
      }, 3000);
    }, 2000);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep > index + 1 
                    ? 'bg-[#00CFC1] text-white' 
                    : currentStep === index + 1 
                    ? 'bg-[#00CFC1]/20 border-2 border-[#00CFC1] text-[#00CFC1]' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > index + 1 ? <Check size={18} /> : index + 1}
              </div>
              <span className="text-xs mt-2 text-gray-600">
                {index === 0 ? 'Informations' : index === 1 ? 'Documents' : 'Confirmation'}
              </span>
            </div>
            
            {index < totalSteps - 1 && (
              <div 
                className={`flex-1 h-1 mx-2 ${
                  currentStep > index + 1 ? 'bg-[#00CFC1]' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <>
        <h2 className="text-xl font-semibold text-[#002341] mb-4">Informations de la pharmacie</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="pharmacyName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la pharmacie
            </label>
            <div className="relative">
              <input
                type="text"
                id="pharmacyName"
                name="pharmacyName"
                value={formData.pharmacyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom du propriétaire
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Adresse
          </label>
          <div className="relative">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              Code postal
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de licence
          </label>
          <div className="relative">
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FileText size={16} className="text-gray-400" />
            </div>
          </div>
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
      </>
    );
  };

  const renderStep2 = () => {
    return (
      <>
        <h2 className="text-xl font-semibold text-[#002341] mb-4">Documents requis</h2>
        <p className="text-gray-600 mb-6">
          Veuillez télécharger les documents suivants pour compléter votre demande de partenariat.
        </p>
        
        <div className="space-y-6">
          <div className="border border-dashed border-gray-300 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <Upload size={32} className="text-gray-400 mb-2" />
              <h3 className="font-medium text-[#002341] mb-1">Licence pharmaceutique</h3>
              <p className="text-sm text-gray-500 mb-4 text-center">
                Format PDF, JPG ou PNG. Taille max: 5MB
              </p>
              <button className="bg-white border border-[#00CFC1] text-[#00CFC1] hover:bg-[#00CFC1]/10 px-4 py-2 rounded-lg transition duration-150">
                Parcourir les fichiers
              </button>
            </div>
          </div>
          
          <div className="border border-dashed border-gray-300 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <Upload size={32} className="text-gray-400 mb-2" />
              <h3 className="font-medium text-[#002341] mb-1">Pièce d'identité du propriétaire</h3>
              <p className="text-sm text-gray-500 mb-4 text-center">
                Format PDF, JPG ou PNG. Taille max: 5MB
              </p>
              <button className="bg-white border border-[#00CFC1] text-[#00CFC1] hover:bg-[#00CFC1]/10 px-4 py-2 rounded-lg transition duration-150">
                Parcourir les fichiers
              </button>
            </div>
          </div>
          
          <div className="border border-dashed border-gray-300 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <Upload size={32} className="text-gray-400 mb-2" />
              <h3 className="font-medium text-[#002341] mb-1">Extrait Kbis (moins de 3 mois)</h3>
              <p className="text-sm text-gray-500 mb-4 text-center">
                Format PDF uniquement. Taille max: 5MB
              </p>
              <button className="bg-white border border-[#00CFC1] text-[#00CFC1] hover:bg-[#00CFC1]/10 px-4 py-2 rounded-lg transition duration-150">
                Parcourir les fichiers
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderStep3 = () => {
    return (
      <>
        <h2 className="text-xl font-semibold text-[#002341] mb-4">Confirmation</h2>
        <p className="text-gray-600 mb-6">
          Veuillez vérifier les informations ci-dessous avant de soumettre votre demande de partenariat.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-medium text-[#002341] mb-4">Informations de la pharmacie</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nom de la pharmacie</p>
              <p className="font-medium">{formData.pharmacyName || '-'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Propriétaire</p>
              <p className="font-medium">{formData.ownerName || '-'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{formData.email || '-'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Téléphone</p>
              <p className="font-medium">{formData.phone || '-'}</p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Adresse</p>
              <p className="font-medium">
                {formData.address ? `${formData.address}, ${formData.postalCode} ${formData.city}` : '-'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Numéro de licence</p>
              <p className="font-medium">{formData.licenseNumber || '-'}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-[#00CFC1] focus:ring-[#00CFC1] border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            Je certifie que les informations fournies sont exactes et j'accepte les <a href="#" className="text-[#00CFC1] hover:underline">conditions d'utilisation</a> et la <a href="#" className="text-[#00CFC1] hover:underline">politique de confidentialité</a>
          </label>
        </div>
      </>
    );
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
        
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-[#002341] mb-2">Demande envoyée avec succès !</h2>
            <p className="text-gray-600 mb-6">
              Votre demande de partenariat a été soumise avec succès. Notre équipe va l'examiner et vous contactera dans les plus brefs délais.
            </p>
            <p className="text-gray-600">
              Vous allez être redirigé vers la page de connexion...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {renderStepIndicator()}
            
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150"
                >
                  Précédent
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentPage('home')}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150"
                >
                  Annuler
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-[#00CFC1] hover:bg-[#00b8ab] text-white rounded-lg transition duration-150"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-[#00CFC1] hover:bg-[#00b8ab] text-white rounded-lg transition duration-150"
                >
                  {isLoading ? 'Envoi en cours...' : 'Soumettre la demande'}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PharmacyPartnership;