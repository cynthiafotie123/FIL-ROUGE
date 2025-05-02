import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Products() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('categorie');
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categoryFilter || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Exemple de données produits (dans un cas réel, vous récupéreriez ces données depuis une API)
  useEffect(() => {
    // Simuler une requête API
    const fetchData = () => {
      const productsData = [
        { id: 1, name: 'Vitamine C 1000mg', price: 12.99, category: 'complements', image: '/api/placeholder/300/200', description: 'Renforce votre système immunitaire' },
        { id: 2, name: 'Crème hydratante', price: 9.99, category: 'beaute', image: '/api/placeholder/300/200', description: 'Pour une peau douce et hydratée' },
        { id: 3, name: 'Paracétamol 500mg', price: 4.50, category: 'medicaments', image: '/api/placeholder/300/200', description: 'Soulage les douleurs légères à modérées' },
        { id: 4, name: 'Magnésium B6', price: 8.75, category: 'complements', image: '/api/placeholder/300/200', description: 'Combat la fatigue et les crampes musculaires' },
        { id: 5, name: 'Gel antibactérien', price: 3.99, category: 'hygiene', image: '/api/placeholder/300/200', description: 'Désinfecte vos mains efficacement' },
        { id: 6, name: 'Crème solaire SPF50', price: 14.95, category: 'beaute', image: '/api/placeholder/300/200', description: 'Protection maximale contre les UV' },
        { id: 7, name: 'Ibuprofène 400mg', price: 5.25, category: 'medicaments', image: '/api/placeholder/300/200', description: 'Anti-inflammatoire et analgésique' },
        { id: 8, name: 'Sérum anti-âge', price: 24.99, category: 'beaute', image: '/api/placeholder/300/200', description: 'Réduit l\'apparence des rides' },
        { id: 9, name: 'Probiotiques', price: 19.50, category: 'complements', image: '/api/placeholder/300/200', description: 'Pour une flore intestinale équilibrée' }
      ];
      
      const categoriesData = [
        { id: 'all', name: 'Tous les produits' },
        { id: 'medicaments', name: 'Médicaments sans ordonnance' },
        { id: 'complements', name: 'Compléments alimentaires' },
        { id: 'beaute', name: 'Beauté et soins' },
        { id: 'hygiene', name: 'Hygiène' },
      ];
      
      setProducts(productsData);
      setFilteredProducts(productsData);
      setCategories(categoriesData);
      
      if (categoryFilter) {
        setActiveCategory(categoryFilter);
        setFilteredProducts(productsData.filter(p => p.category === categoryFilter));
      }
    };
    
    fetchData();
  }, [categoryFilter]);

  // Filtrer les produits par catégorie et recherche
  useEffect(() => {
    let result = [...products];
    
    // Filtre par catégorie
    if (activeCategory !== 'all') {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    // Tri
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredProducts(result);
  }, [activeCategory, searchTerm, sortBy, products]);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Nos produits</h1>
        
        {/* Filtres et recherche */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Catégories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégories</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            {/* Recherche */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
              <input 
                type="text" 
                placeholder="Rechercher un produit..."
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Tri */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Par défaut</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Nom</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Liste des produits */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">Aucun produit ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;