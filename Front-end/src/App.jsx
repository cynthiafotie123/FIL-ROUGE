import Layout from './layouts/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import AuthSwitcher from './pages/AuthSwitcher'; // ✅ adapte le chemin selon ton dossier
import DashboardClient from './pages/DashboardClient';
import FindProduct from './pages/FindProduct';


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
        <Route path="/auth" element={<AuthSwitcher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
