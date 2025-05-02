import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import './index.css';
//import Cart from './pages/Cart';
//import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="produits" element={<Products />} />
          <Route path="produits/:id" element={<ProductDetail />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/**<Route path="panier" element={<Cart />} />
<Route path="a-propos" element={<About />} /> */


