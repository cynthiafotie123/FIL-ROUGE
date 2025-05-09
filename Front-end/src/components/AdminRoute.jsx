import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthen } from '../hooks/AuthenContext';

/**
 * Composant pour protéger les routes d'administration
 * @returns {JSX.Element} La route protégée ou une redirection
 */
const AdminRoute = () => {
  const { isAuthenticated, loading, isAdmin } = useAuthen();
  const location = useLocation();

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Rediriger si non authentifié ou non admin
  if (!isAuthenticated || !isAdmin()) {
    console.log('Non autorisé: redirection vers /login/admin');
    return <Navigate to="/login/admin" replace state={{ from: location }} />;
  }

  // Rediriger vers le dashboard si l'utilisateur est admin et pas sur le dashboard
  if (isAdmin() && window.location.pathname !== '/admin/dashboard') {
    return <Navigate to="/admin/dashboard" replace state={{ from: location }} />;
  }

  // Afficher les routes enfants si authentifié et admin
  return <Outlet />;
};

export default AdminRoute;
