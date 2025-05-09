import { useState } from 'react';
import { MapPin, Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const PharmacyLocator = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const [pharmacies, setPharmacies] = useState([]);
  
  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/pharmacies-search/search`, {
        params: { query: location },
      });
      setPharmacies(response.data);
      console.log('Pharmacies trouvées :', response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche des pharmacies :', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#002341] to-[#00cfc1] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Localisation des Pharmacies</h1>
          <p className="text-gray-200">Trouvez les pharmacies les plus proches de vous</p>
        </div>

        {/* Search Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#00cfc1]" />
            </div>
            <input
              type="text"
              className="pl-10 bg-white/50 border-2 border-gray-200 focus:ring-[#00cfc1] focus:border-[#00cfc1] block w-full rounded-lg text-sm py-3"
              placeholder="Entrez votre localisation"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-0 px-4 flex items-center bg-[#002341] text-white rounded-r-lg hover:bg-[#001a33] transition duration-150">
              <MapPin className="h-5 w-5 mr-2" />
              Rechercher
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pharmacies List */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-semibold text-[#002341] mb-6">Pharmacies à proximité</h2>
            
            <div className="space-y-4">
              {pharmacies.map((pharmacy, index) => (
                <div key={index} className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#00cfc1] transition duration-150">
                  <div className="flex items-start">
                    <div className="bg-[#00cfc1]/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-[#00cfc1]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-[#002341]">{pharmacy.nom}</h3>
                      <p className="text-gray-600">{pharmacy.adresse}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm text-[#00cfc1]">{pharmacy.telephone}</span>
                        <button className="text-[#00cfc1] hover:text-[#002341] flex items-center transition duration-150">
                          <span className="mr-1">Voir sur la carte</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
            <iframe
              title="Map"
              className="w-full h-full min-h-[500px]"
              src="https://www.openstreetmap.org/export/embed.html"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-[#002341] mb-4">Horaires d'ouverture</h2>
          <p className="text-gray-600 mb-6">
            La plupart de nos pharmacies partenaires sont ouvertes de 8h à 20h du lundi au samedi.
            Certaines proposent également un service d'urgence 24h/24.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-[#002341] mb-2">Besoin d'aide ?</h3>
              <p className="text-gray-600">Contactez notre service client au 123-456-789</p>
            </div>
            
            <button className="mt-4 sm:mt-0 bg-gradient-to-r from-[#002341] to-[#00cfc1] text-white font-medium py-2 px-6 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#00cfc1] focus:ring-offset-2 transition duration-150">
              Contacter un pharmacien
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyLocator;