import React, { useState } from 'react';
import { Package, ShoppingCart, CreditCard, BarChart2, Settings, Bell, Plus, Search } from 'lucide-react';

 const PharmacyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <PharmacyOverview />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'payments':
        return <PaymentManagement />;
      default:
        return <PharmacyOverview />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-[#002341] text-white">
          <div className="p-6 border-b border-[#003a6b]">
            <h2 className="text-xl font-bold">Pharmacie Dashboard</h2>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center p-3 rounded-lg transition duration-150 ${
                    activeTab === 'dashboard' 
                      ? 'bg-[#00CFC1] text-white' 
                      : 'text-gray-300 hover:bg-[#003a6b]'
                  }`}
                >
                  <BarChart2 size={18} className="mr-3" />
                  Tableau de bord
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center p-3 rounded-lg transition duration-150 ${
                    activeTab === 'products' 
                      ? 'bg-[#00CFC1] text-white' 
                      : 'text-gray-300 hover:bg-[#003a6b]'
                  }`}
                >
                  <Package size={18} className="mr-3" />
                  Mes Produits
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center p-3 rounded-lg transition duration-150 ${
                    activeTab === 'orders' 
                      ? 'bg-[#00CFC1] text-white' 
                      : 'text-gray-300 hover:bg-[#003a6b]'
                  }`}
                >
                  <ShoppingCart size={18} className="mr-3" />
                  Commandes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center p-3 rounded-lg transition duration-150 ${
                    activeTab === 'payments' 
                      ? 'bg-[#00CFC1] text-white' 
                      : 'text-gray-300 hover:bg-[#003a6b]'
                  }`}
                >
                  <CreditCard size={18} className="mr-3" />
                  Paiements
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-[#003a6b] transition duration-150"
                >
                  <Settings size={18} className="mr-3" />
                  Paramètres
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-[#002341]">
              {activeTab === 'dashboard' && 'Tableau de bord'}
              {activeTab === 'products' && 'Gestion des produits'}
              {activeTab === 'orders' && 'Gestion des commandes'}
              {activeTab === 'payments' && 'Gestion des paiements'}
            </h1>
            
            <div className="flex items-center">
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="ml-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#00CFC1] flex items-center justify-center text-white font-medium">
                  P
                </div>
                <span className="ml-2 text-gray-700 font-medium">Pharmacie</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const PharmacyOverview: React.FC = () => {
  // Mock data
  const stats = [
    { title: 'Produits', value: 48, change: '+5%', icon: <Package size={24} className="text-green-500" /> },
    { title: 'Commandes', value: 24, change: '+12%', icon: <ShoppingCart size={24} className="text-orange-500" /> },
    { title: 'Ventes', value: '1,254 €', change: '+18%', icon: <CreditCard size={24} className="text-blue-500" /> },
    { title: 'Stock faible', value: 5, change: '-2', icon: <Package size={24} className="text-red-500" /> }
  ];

  const recentOrders = [
    { id: 1001, client: 'Client 1', date: '2023-05-15', total: 45.99, status: 'completed' },
    { id: 1002, client: 'Client 2', date: '2023-05-14', total: 32.50, status: 'processing' },
    { id: 1003, client: 'Client 3', date: '2023-05-12', total: 78.25, status: 'pending' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[#002341] mt-1">{stat.value}</h3>
                <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold text-[#002341] mb-4">Commandes récentes</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-gray-900">#{order.id}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {order.client}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                      {order.total.toFixed(2)} €
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'processing' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status === 'completed' 
                          ? 'Terminée' 
                          : order.status === 'processing' 
                          ? 'En cours' 
                          : 'En attente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold text-[#002341] mb-4">Produits à faible stock</h3>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((product) => (
              <div key={product} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                    <Package size={20} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Produit {product}</p>
                    <p className="text-sm text-gray-500">Stock: {product} unités</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-[#00CFC1] text-white rounded-md text-sm hover:bg-[#00b8ab] transition duration-150">
                  Réapprovisionner
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductManagement: React.FC = () => {
  // Mock data
  const products = [
    { id: 1, name: 'Paracétamol 500mg', category: 'Analgésique', price: 3.99, stock: 150 },
    { id: 2, name: 'Ibuprofène 400mg', category: 'Anti-inflammatoire', price: 4.50, stock: 120 },
    { id: 3, name: 'Thermomètre Digital', category: 'Équipement', price: 12.99, stock: 45 },
    { id: 4, name: 'Masques Chirurgicaux', category: 'Protection', price: 9.99, stock: 0 },
    { id: 5, name: 'Vitamine C 1000mg', category: 'Complément', price: 7.50, stock: 80 }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[#002341]">Mes produits</h2>
          <p className="text-gray-500">Gérez votre inventaire de produits</p>
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un produit"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          
          <button className="bg-[#00CFC1] hover:bg-[#00b8ab] text-white px-4 py-2 rounded-lg flex items-center transition duration-150">
            <Plus size={16} className="mr-1" />
            Ajouter un produit
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">ID: {product.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#00CFC1]/10 text-[#00CFC1]">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {product.price.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Voir
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Modifier
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Précédent
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Affichage de <span className="font-medium">1</span> à <span className="font-medium">5</span> sur <span className="font-medium">12</span> résultats
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Précédent
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Suivant
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderManagement: React.FC = () => {
  // Mock data
  const orders = [
    { id: 1001, client: 'Client 1', date: '2023-05-15', total: 45.99, status: 'completed' },
    { id: 1002, client: 'Client 2', date: '2023-05-14', total: 32.50, status: 'processing' },
    { id: 1003, client: 'Client 3', date: '2023-05-12', total: 78.25, status: 'pending' },
    { id: 1004, client: 'Client 4', date: '2023-05-10', total: 15.99, status: 'completed' },
    { id: 1005, client: 'Client 5', date: '2023-05-08', total: 54.75, status: 'cancelled' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[#002341]">Mes commandes</h2>
          <p className="text-gray-500">Gérez les commandes de vos clients</p>
        </div>
        
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent">
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="processing">En cours</option>
            <option value="completed">Terminée</option>
            <option value="cancelled">Annulée</option>
          </select>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une commande"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">#{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {order.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {order.total.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'processing' 
                        ? 'bg-blue-100 text-blue-800' 
                        : order.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status === 'completed' 
                        ? 'Terminée' 
                        : order.status === 'processing' 
                        ? 'En cours' 
                        : order.status === 'pending' 
                        ? 'En attente' 
                        : 'Annulée'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Voir
                      </button>
                      {order.status === 'pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900">
                            Accepter
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Refuser
                          </button>
                        </>
                      )}
                      {order.status === 'processing' && (
                        <button className="text-green-600 hover:text-green-900">
                          Terminer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Précédent
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Affichage de <span className="font-medium">1</span> à <span className="font-medium">5</span> sur <span className="font-medium">12</span> résultats
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Précédent
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Suivant
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentManagement: React.FC = () => {
  // Mock data
  const payments = [
    { id: 'PAY-1001', orderId: 1001, client: 'Client 1', amount: 45.99, date: '2023-05-15', method: 'card', status: 'completed' },
    { id: 'PAY-1002', orderId: 1002, client: 'Client 2', amount: 32.50, date: '2023-05-14', method: 'card', status: 'pending' },
    { id: 'PAY-1003', orderId: 1003, client: 'Client 3', amount: 78.25, date: '2023-05-12', method: 'paypal', status: 'completed' },
    { id: 'PAY-1004', orderId: 1004, client: 'Client 4', amount: 15.99, date: '2023-05-10', method: 'card', status: 'completed' },
    { id: 'PAY-1005', orderId: 1005, client: 'Client 5', amount: 54.75, date: '2023-05-08', method: 'bank', status: 'failed' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[#002341]">Mes paiements</h2>
          <p className="text-gray-500">Suivez les paiements de vos commandes</p>
        </div>
        
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent">
            <option value="">Tous les statuts</option>
            <option value="completed">Complété</option>
            <option value="pending">En attente</option>
            <option value="failed">Échoué</option>
          </select>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un paiement"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Paiement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Méthode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{payment.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    #{payment.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {payment.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {payment.amount.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {payment.method === 'card' 
                        ? 'Carte bancaire' 
                        : payment.method === 'paypal' 
                        ? 'PayPal' 
                        : 'Virement bancaire'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payment.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : payment.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status === 'completed' 
                        ? 'Complété' 
                        : payment.status === 'pending' 
                        ? 'En attente' 
                        : 'Échoué'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Détails
                      </button>
                      {payment.status === 'pending' && (
                        <button className="text-green-600 hover:text-green-900">
                          Valider
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Précédent
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Affichage de <span className="font-medium">1</span> à <span className="font-medium">5</span> sur <span className="font-medium">12</span> résultats
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Précédent
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Suivant
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default PharmacyDashboard;