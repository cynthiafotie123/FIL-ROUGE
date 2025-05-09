import React, { useState, useEffect } from 'react';
import { Check, X, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useAuthen } from '../../hooks/AuthenContext';

const PharmacyValidation = () => {
  const { api } = useAuthen();
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchPendingPharmacies = async () => {
    try {
      const response = await api.get('/api/admin/pending-pharmacies');
      setPharmacies(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des demandes de partenariat');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPharmacies();
  }, []);

  const handleValidate = async (id, email) => {
    try {
      await api.post(`/api/admin/validate-pharmacie/${id}`, { email });
      setSuccess('Pharmacie validée avec succès');
      fetchPendingPharmacies();
    } catch (err) {
      setError('Erreur lors de la validation de la pharmacie');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.post(`/api/admin/reject-pharmacie/${id}`);
      setSuccess('Demande de pharmacie rejetée');
      fetchPendingPharmacies();
    } catch (err) {
      setError('Erreur lors du rejet de la demande');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00CFC1]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#002341]">Validation des demandes de partenariat</h1>
        <p className="text-gray-600 mt-2">
          Gérez les demandes de partenariat des pharmacies
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6">
          {success}
        </div>
      )}

      {pharmacies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune demande de partenariat en attente</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id_Pharmacie} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-[#002341]">{pharmacy.nom}</h2>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Mail size={16} className="mr-2" />
                      <span>{pharmacy.utilisateurs[0]?.authentification.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone size={16} className="mr-2" />
                      <span>{pharmacy.telephone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      <span>{pharmacy.adresse}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2" />
                      <span>
                        {pharmacy.horaire_d_ouverture} - {pharmacy.horaire_fermeture}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleValidate(pharmacy.id_Pharmacie, pharmacy.utilisateurs[0]?.authentification.email)}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150"
                  >
                    <Check size={16} className="mr-2" />
                    Valider
                  </button>
                  <button
                    onClick={() => handleReject(pharmacy.id_Pharmacie)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150"
                  >
                    <X size={16} className="mr-2" />
                    Rejeter
                  </button>
                </div>
              </div>
              {pharmacy.description && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-600">{pharmacy.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PharmacyValidation; 