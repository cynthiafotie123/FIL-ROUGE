import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-pharma-green text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">PharmaTech</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-200 transition">Accueil</Link>
            <Link to="/produits" className="hover:text-green-200 transition">Produits</Link>
            <Link to="/panier" className="hover:text-green-200 transition">Panier</Link>
            <Link to="/a-propos" className="hover:text-green-200 transition">À propos</Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path> :
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              }
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-green-700 py-2">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <Link to="/" className="text-white block py-2 hover:bg-green-600 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
              <Link to="/produits" className="text-white block py-2 hover:bg-green-600 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>Produits</Link>
              <Link to="/panier" className="text-white block py-2 hover:bg-green-600 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>Panier</Link>
              <Link to="/a-propos" className="text-white block py-2 hover:bg-green-600 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>À propos</Link>
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">PharmaTech</h3>
              <p className="text-gray-300">Votre pharmacie en ligne de confiance.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Liens rapides</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Accueil</Link></li>
                <li><Link to="/produits" className="text-gray-300 hover:text-white">Nos produits</Link></li>
                <li><Link to="/a-propos" className="text-gray-300 hover:text-white">À propos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <p className="text-gray-300">Email: contact@pharmatech.com</p>
              <p className="text-gray-300">Téléphone: +33 1 23 45 67 89</p>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PharmaTech. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;