// src/components/PharmacyList.jsx
import React, { useState, useEffect } from 'react';
import { useAuthen } from '../../hooks/AuthenContext';

const PharmacyList = () => {
  const { getPendingPharmacies, validatePharmacie, rejectPharmacie } = useAuthen();
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPharmacies = async () => {
      try {
        setLoading(true);
        const data = await getPendingPharmacies();
        setPharmacies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPharmacies();
  }, []);

  const handleValidate = async (id) => {
    try {
      await validatePharmacie(id);
      // Recharger la liste après validation
      const data = await getPendingPharmacies();
      setPharmacies(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectPharmacie(id);
      // Recharger la liste après rejet
      const data = await getPendingPharmacies();
      setPharmacies(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Gestion des Pharmacies</h2>
      
      {loading && <div className="text-center">Chargement...</div>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pharmacies.map((pharmacy) => (
              <tr key={pharmacy.id}>
                <td className="px-6 py-4 whitespace-nowrap">{pharmacy.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pharmacy.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pharmacy.telephone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pharmacy.adresse}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pharmacy.is_validated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {pharmacy.is_validated ? 'Validé' : 'En attente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleValidate(pharmacy.id)}
                    className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => handleReject(pharmacy.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Rejeter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacyList;