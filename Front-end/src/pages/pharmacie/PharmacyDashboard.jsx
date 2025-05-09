import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, ShoppingCart, CreditCard, BarChart2, Settings, Bell, Plus, Search } from 'lucide-react';

const PharmacyDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('pharmacie_token');
      const response = await axios.get('/api/pharmacie/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStats(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des stats:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Commandes totales</h3>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Clients</h3>
                <p className="text-2xl font-bold">{stats.totalCustomers}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Revenus</h3>
                <p className="text-2xl font-bold">{stats.totalRevenue} €</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Commandes en attente</h3>
                <p className="text-2xl font-bold">{stats.pendingOrders}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Commandes récentes</h2>
                <div className="text-gray-500 text-center py-8">
                  Aucune commande récente
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
                <div className="text-gray-500 text-center py-8">
                  Aucune statistique disponible
                </div>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return <div>Gestion des commandes</div>;
      case 'products':
        return <div>Gestion des produits</div>;
      case 'settings':
        return <div>Paramètres</div>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CFC1]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Bell size={20} />
            </button>
            <button className="flex items-center px-4 py-2 bg-[#00CFC1] text-white rounded-lg hover:bg-[#00b8ab]">
              <Plus size={20} className="mr-2" />
              Nouvelle commande
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['dashboard', 'orders', 'products', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-[#00CFC1] text-[#00CFC1]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'dashboard' && <BarChart2 size={20} className="inline-block mr-2" />}
                  {tab === 'orders' && <ShoppingCart size={20} className="inline-block mr-2" />}
                  {tab === 'products' && <Package size={20} className="inline-block mr-2" />}
                  {tab === 'settings' && <Settings size={20} className="inline-block mr-2" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
