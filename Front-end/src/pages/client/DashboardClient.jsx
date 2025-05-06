import React, { useState, useEffect } from 'react';
import LogoutButton from '../../components/LogoutButton';
import axios from 'axios';
import Logo from '../../assets/logo_quickmed-removebg-preview.png';
import { Search, Bell, ShoppingCart, User, Heart, MapPin, UserCircle } from 'lucide-react';

// Configuration de l'API
const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
});

const DashboardClient = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // Récupérer les informations de l'utilisateur
      const userRes = await api.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUserData(userRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#00cfc1] to-[#002341] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Search */}
        <div className="mb-8 w-full bg-white shadow-lg rounded-xl p-6">
          <div className="text-4xl flex justify-center font-bold text-[#00cfc1] mb-2 " ><img src={Logo} alt="Logo" className="h-15 w-auto" /><h1>QuickMed</h1></div>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-2/3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un produit ou une pharmacie..."
                className="w-full py-2 pl-12 pr-4 text-sm text-gray-700 border border-[#00cfc1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002341]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <button className="flex items-center px-4 py-2 bg-[#002341] text-white rounded-lg hover:bg-[#001a2c] transition">
                <ShoppingCart className="mr-2 w-5 h-5" />
                Mon panier
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                <Bell className="mr-2 w-5 h-5" />
                Notifications
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <UserCircle className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{userData?.nom || 'Utilisateur'}</h3>
                <p className="text-sm text-gray-500">{userData?.email || 'email@example.com'}</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {[
                { id: 'orders', icon: 'Shopping-bag', label: 'Mes commandes' },
                { id: 'favorites', icon: 'Heart', label: 'Favoris' },
                { id: 'profile', icon: 'UserCircle', label: 'Mon profil' },
                { id: 'addresses', icon: 'MapPin', label: 'Mes adresses' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === item.id 
                      ? 'bg-[#00cfc1] text-white' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className={`mr-3 w-5 h-5`} />
                  {item.label}
                </button>
              ))}
              <LogoutButton />
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Mes commandes</h2>
                <div className="space-y-4">
                  {[1,2,3].map((order) => (
                    <div key={order} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">Commande #{order}</h3>
                          <p className="text-sm text-gray-500">Date: 01/01/2024</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          En cours
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                          <div>
                            <h4 className="font-medium">Produit {order}</h4>
                            <p className="text-sm text-gray-500">Quantité: 1</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">€19.99</p>
                          <button className="text-[#00cfc1] text-sm hover:text-[#002341]">
                            Voir les détails
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Mes favoris</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1,2,3,4].map((item) => (
                    <div key={item} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <div className="h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={`https://readdy.ai/api/search-image?query=modern%20minimalist%20pharmaceutical%20product%20on%20clean%20white%20background%20professional%20product%20photography&width=400&height=300&seq=${item}&orientation=landscape`}
                          alt={`Produit ${item}`}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <h3 className="font-medium">Produit {item}</h3>
                      <p className="text-sm text-gray-500 mb-2">Description courte du produit</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">15,90 €</span>
                        <button className="text-[#00cfc1] hover:text-[#002341] cursor-pointer">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Mon profil</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom</label>
                      <p className="mt-1 text-gray-900">{userData?.nom || 'Non renseigné'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-gray-900">{userData?.email || 'Non renseigné'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                      <p className="mt-1 text-gray-900">{userData?.telephone || 'Non renseigné'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Mes adresses</h2>
                <div className="space-y-4">
                  {[1,2].map((address) => (
                    <div key={address} className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
                      <p className="text-sm text-gray-600">Adresse {address}</p>
                      <p className="text-gray-900">Rue Exemple 12, Ville</p>
                      <div className="mt-2">
                        <button className="text-[#00cfc1] text-sm hover:text-[#002341]">
                          Modifier
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
