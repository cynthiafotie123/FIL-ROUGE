// components/DashboardAdmin.tsx
import React from 'react';
import useDashboardAdmin from '../hooks/useDashboardAdmin';

const DashboardAdmin = () => {
  const {
    searchTerm,
    setSearchTerm,
    isProfileDropdownOpen,
    setIsProfileDropdownOpen,
    dropdownRef,
    stats,
    recentOrders,
    notifications,
    handleProfileOptionClick,
    formatCurrency
  } = useDashboardAdmin();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-[#002341]">QuickMed</h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00cfc1] text-sm"
                />
                <span className="fas fa-search absolute right-3 top-3 text-gray-400"></span>
              </div>
              <div className="ml-4 flex items-center">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <span className="fas fa-bell text-gray-600"></span>
                </button>
                <div className="relative" ref={dropdownRef}>
                  <button 
                    id="userProfileButton"
                    className="ml-2 p-2 rounded-full hover:bg-gray-100"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  >
                    <span className="fas fa-user text-gray-600"></span>
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                      {['My Profile', 'Account Settings', 'Preferences', 'Logout'].map((option) => (
                        <button
                          key={option}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleProfileOptionClick(option)}
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
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <span className="fas fa-box text-blue-600"></span>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <span className="fas fa-shopping-cart text-green-600"></span>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <span className="fas fa-clinic-medical text-purple-600"></span>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Partner Pharmacies</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalPharmacies}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <span className="fas fa-dollar-sign text-yellow-600"></span>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.revenue)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <button className="text-[#00cfc1] hover:text-[#002341] text-sm font-medium cursor-pointer">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm font-medium text-gray-500">
                      <th className="pb-4">Order ID</th>
                      <th className="pb-4">Product</th>
                      <th className="pb-4">Customer</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order, index) => (
                        <tr key={index} className="border-t border-gray-100">
                          <td className="py-4">{order.id}</td>
                          <td className="py-4">{order.product}</td>
                          <td className="py-4">{order.customer}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4">{formatCurrency(order.amount)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-gray-500">
                          No recent orders
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <button className="text-[#00cfc1] hover:text-[#002341] text-sm font-medium cursor-pointer">
                Mark All as Read
              </button>
            </div>
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                    <div className={`p-2 rounded-full ${
                      notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                      notification.type === 'user' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <span className={`fas ${
                        notification.type === 'order' ? 'fa-shopping-cart' :
                        notification.type === 'user' ? 'fa-user' :
                        'fa-bell'
                      }`}></span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-500">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No notifications</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;