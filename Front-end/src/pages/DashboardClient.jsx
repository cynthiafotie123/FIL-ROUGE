// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';

const DashboardClient = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border-none rounded-lg bg-white shadow-md text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Rechercher un produit ou une pharmacie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-shopping-cart mr-2"></i>
                Mon panier
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-bell mr-2"></i>
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
                <i className="fas fa-user text-blue-600 text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">John Doe</h3>
                <p className="text-sm text-gray-500">client@example.com</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {[
                { id: 'orders', icon: 'shopping-bag', label: 'Mes commandes' },
                { id: 'favorites', icon: 'heart', label: 'Favoris' },
                { id: 'profile', icon: 'user-circle', label: 'Mon profil' },
                { id: 'addresses', icon: 'map-marker-alt', label: 'Mes adresses' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === item.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className={`fas fa-${item.icon} mr-3`}></i>
                  {item.label}
                </button>
              ))}
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
                          <span className="text-sm text-gray-500">Commande #{String(order).padStart(5, '0')}</span>
                          <h3 className="font-medium">Pharmacie Centrale</h3>
                          <p className="text-sm text-gray-500">Commandé le 26 avril 2025</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                          Livré
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">3 produits • 45,90 €</span>
                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          Voir les détails
                        </button>
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
                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          <i className="fas fa-shopping-cart"></i>
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
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom
                      </label>
                      <input 
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        defaultValue="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <input 
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        defaultValue="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input 
                      type="email"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      defaultValue="client@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input 
                      type="tel"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      defaultValue="+33 6 12 34 56 78"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Enregistrer les modifications
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Mes adresses</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-plus mr-2"></i>
                    Ajouter une adresse
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1,2].map((address) => (
                    <div key={address} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Adresse {address}</h3>
                        <div className="space-x-2">
                          <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="text-red-500 hover:text-red-700 cursor-pointer">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        123 Rue Example<br />
                        75000 Paris<br />
                        France
                      </p>
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

