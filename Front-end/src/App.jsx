import Layout from './layouts/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import DashboardClient from './pages/client/DashboardClient';
import FindProduct from './pages/FindProduct';
import LoginAdmin from './pages/admin/LoginAdmin';
import PharmacyPartnership from './pages/pharmacie/PharmacyPartnership';
import PharmacyDashboard from './pages/pharmacie/PharmacyDashboard';
import PharmacyLogin from './pages/pharmacie/PharmacyLogin';
import RegisterClient from './pages/client/RegisterClient';  
import LoginClient from './pages/client/LoginClient'; 


function App() {
  return ( // ← C'est ça qu'il manquait !
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<DashboardClient />} />
          <Route path="/produit" element={<FindProduct />} />
         
          {/* Tu pourras décommenter ou ajouter les autres routes ici plus tard */}
        </Route>
        <Route path="/login" element={<LoginClient />} />
        <Route path="/register" element={<RegisterClient />} />
        <Route path="/auth/admin" element={<LoginAdmin />} />
        <Route path="/PharmacyDashboard" element={<PharmacyDashboard />} />
        <Route path="/devenirepartenaire" element={<PharmacyPartnership />} />
        <Route path="/pharmacie/login" element={<PharmacyLogin />} />
        <Route path='/dashboardclient' element={<DashboardClient/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
