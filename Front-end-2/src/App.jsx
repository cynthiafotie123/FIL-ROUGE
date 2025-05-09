import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import LoginAdmin from './pages/LoginAdmin';
import DashboardAdmin from './pages/DashboardAdmin';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="produits" element={<Products />} />
          <Route path="produits/:id" element={<ProductDetail />} />
        </Route>
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/**<Route path="panier" element={<Cart />} />
<Route path="a-propos" element={<About />} /> */


