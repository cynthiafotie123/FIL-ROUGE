import React from 'react';
import { X, Home, Package, MapPin, ShoppingCart, Star, User, History, CreditCard, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuthen } from '../hooks/AuthenContext';

const menuItems = [
  { to: '/', label: 'Home', icon: <Home size={18} /> },
  { to: '/medicaments', label: 'Médicaments', icon: <Package size={18} /> },
  { to: '/pharmacies', label: 'Pharmacies', icon: <MapPin size={18} /> },
  { to: '/commandes', label: 'Commandes', icon: <ShoppingCart size={18} /> },
  { to: '/avis', label: 'Avis', icon: <Star size={18} /> },
];

const userItems = [
  { to: '/profil', label: 'Profil', icon: <User size={18} /> },
  { to: '/historique', label: 'Historique', icon: <History size={18} /> },
  { to: '/paiements', label: 'Paiements', icon: <CreditCard size={18} /> },
];

export default function SidebarMenu({ isOpen, onClose }) {
  // Utiliser le hook useAuthen au lieu d'appeler directement AuthenContext
  const { logout } = useAuthen();

  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-40 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex justify-end p-4">
        <button onClick={onClose}>
          <X className="w-10 h-10 text-Black font-bold" />
        </button>
      </div>
      <nav className="space-y-2 text-sm text-gray-700">
        {menuItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition hover:bg-gray-100 ${
                isActive ? 'text-[#00CFC1] font-medium' : ''
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
        <div className="mt-4 text-xs text-gray-500 uppercase px-3">Utilisateur</div>
        {userItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition hover:bg-gray-100 ${
                isActive ? 'text-[#00CFC1] font-medium' : ''
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
        <div className="mt-auto p-3 border-t border-gray-200">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="
              w-full
              flex items-center gap-2
              px-3 py-2
              text-sm text-red-600
              rounded-md
              hover:bg-red-50
              transition-colors
            "
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </nav>
    </aside>
  );
}