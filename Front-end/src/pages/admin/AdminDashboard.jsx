import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthen } from '../../hooks/AuthenContext';


import {
  Users,
  Building2,
  Package,
  ShoppingCart,
  LogOut,
  Bell
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, api } = useAuthen();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPharmacies: 0,
    totalProducts: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/admin/dashboard');
        if (response.data) {
          setStats(response.data);
        }
      } catch (err) {
        console.error('Erreur :', err);
        setError('Erreur lors du chargement des données du tableau de bord');
        if (err.response?.status === 401) {
          logout();
          navigate('/login/admin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [api, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-[#002341]">QuickMed Admin</h1>

            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00cfc1] text-sm"
              />
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="text-gray-600" size={18} />
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Users className="text-gray-600" size={18} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    {['Profil', 'Paramètres', 'Déconnexion'].map((option) => (
                      <button
                        key={option}
                        onClick={option === 'Déconnexion' ? handleLogout : () => {}}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CFC1]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard icon={<Users />} label="Utilisateurs" value={stats.totalUsers} color="blue" />
              <StatCard icon={<Building2 />} label="Pharmacies" value={stats.totalPharmacies} color="green" />
              <StatCard icon={<Package />} label="Produits" value={stats.totalProducts} color="purple" />
              <StatCard icon={<ShoppingCart />} label="Commandes" value={stats.totalOrders} color="orange" />
            </div>
            <PharmacyList />
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full bg-${color}-100`}>
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
