import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthenContext';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import DashboardClient from './pages/client/DashboardClient';
import FindProduct from './pages/FindProduct';
import LoginAdmin from './pages/admin/LoginAdmin';
import PharmacyPartnership from './pages/pharmacie/PharmacyPartnership.jsx';
import PharmacyDashboard from './pages/pharmacie/PharmacyDashboard';
import PharmacyLogin from './pages/pharmacie/PharmacyLogin';
import RegisterClient from './pages/client/RegisterClient';
import LoginClient from './pages/client/LoginClient';
import AdminDashboard from './pages/admin/AdminDashboard';
import PharmacyValidation from './pages/admin/PharmacyValidation';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PharmacyLocator from './pages/pharmacie/PharmacieLocator.jsx';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes avec layout principal */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='pharmacies' element={<PharmacyLocator />} />
            <Route path="produit" element={<FindProduct />} />
          </Route>

          {/* Routes publiques */}
          <Route path="/login" element={<LoginClient />} />
          <Route path="/register" element={<RegisterClient />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/devenirepartenaire" element={<PharmacyPartnership />} />
          <Route path="/pharmacie/login" element={<PharmacyLogin />} />
          
          {/* Routes protégées pour les clients */}
          <Route path="/client" element={<PrivateRoute />}>
            <Route path="dashboard" element={<DashboardClient />} />
          </Route>
          
          {/* Routes protégées pour les pharmacies */}
          {/*<Route path="/pharmacy" element={<PrivateRoute />}>
            <Route path="dashboard" element={<PharmacyDashboard />} />
          </Route>*/}
          <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />
          
          {/* Routes protégées pour les administrateurs */}
          <Route path="/pharmacy" element={<PrivateRoute />}>
              <Route path="dashboard" element={<PharmacyDashboard />} />
          </Route>
        

          
          {/* Redirections */}
          <Route path="/dashboardclient" element={<DashboardClient/>} />
          <Route path="/auth/admin" element={<Navigate to="/login/admin" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;