import React, { useState, useEffect } from 'react';
import { Package, Users, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuthen } from '../../hooks/AuthenContext';

interface DashboardStats {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  pendingOrders: number;
}

const PharmacyDashboard = () => {
  const { api } = useAuthen();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);


  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/api/pharmacie/dashboard');
      setStats(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des données du tableau de bord');
      setLoading(false);
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
        <h1 className="text-2xl font-bold text-[#002341]">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">
          Bienvenue sur votre espace pharmacie
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Package size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Commandes totales</p>
              <p className="text-2xl font-semibold text-[#002341]">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clients</p>
              <p className="text-2xl font-semibold text-[#002341]">{stats.totalCustomers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <DollarSign size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenus</p>
              <p className="text-2xl font-semibold text-[#002341]">{stats.totalRevenue} €</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <AlertCircle size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Commandes en attente</p>
              <p className="text-2xl font-semibold text-[#002341]">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-[#002341] mb-4">Commandes récentes</h2>
          <div className="space-y-4">
            {/* Placeholder pour les commandes récentes */}
            <p className="text-gray-500 text-center py-4">Aucune commande récente</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-[#002341] mb-4">Statistiques</h2>
          <div className="space-y-4">
            {/* Placeholder pour les statistiques */}
            <p className="text-gray-500 text-center py-4">Aucune statistique disponible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard; 