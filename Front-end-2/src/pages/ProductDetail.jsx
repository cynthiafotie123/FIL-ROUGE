// src/pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = () => {
      setTimeout(() => {
        const productData = {
          id: parseInt(id),
          name: 'Vitamine C 1000mg',
          price: 12.99,
          description:
            'La Vitamine C 1000mg contribue au fonctionnement normal du système immunitaire et aide à réduire la fatigue. Elle participe également à la formation normale de collagène pour assurer le fonctionnement normal des vaisseaux sanguins, des os, du cartilage, des gencives, de la peau et des dents.',
          image: '/api/placeholder/600/400',
          category: 'complements',
          details: {
            composition:
              'Vitamine C (acide ascorbique), agent de charge (cellulose microcristalline), anti-agglomérant (stéarate de magnésium).',
            dosage:
              "1 comprimé par jour, à prendre avec un grand verre d'eau pendant un repas.",
            precautions:
              "Ne pas dépasser la dose journalière recommandée. Tenir hors de portée des jeunes enfants. Ce complément alimentaire ne doit pas se substituer à une alimentation variée et équilibrée et à un mode de vie sain.",
          },
          stock: 25,
          rating: 4.7,
          reviews: 124,
        };

        const relatedProductsData = [
          {
            id: 4,
            name: 'Magnésium B6',
            price: 8.75,
            image: '/api/placeholder/300/200',
            description: 'Combat la fatigue et les crampes',
          },
          {
            id: 9,
            name: 'Probiotiques',
            price: 19.5,
            image: '/api/placeholder/300/200',
            description: 'Pour une flore intestinale équilibrée',
          },
          {
            id: 12,
            name: 'Zinc + Vitamine C',
            price: 14.25,
            image: '/api/placeholder/300/200',
            description: "Double action pour l'immunité",
          },
        ];

        setProduct(productData);
        setRelatedProducts(relatedProductsData);
        setLoading(false);
      }, 500);
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    alert(`${quantity} ${product.name} ajouté(s) au panier`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pharma-green border-r-transparent align-[-0.125em]"
          role="status"
        >
          <span className="sr-only">Chargement...</span>
        </div>
        <p className="mt-4 text-gray-600">Chargement du produit...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
        <p className="text-gray-600 mb-6">
          Le produit que vous recherchez n'existe pas ou a été retiré.
        </p>
        <Link
          to="/produits"
          className="bg-pharma-green text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Retour aux produits
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-pharma-green">
                Accueil
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link
                to="/produits"
                className="text-gray-500 hover:text-pharma-green"
              >
                Produits
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="text-pharma-green">{product.name}</li>
          </ol>
        </nav>

        {/* Produit */}
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 rounded-lg shadow"
          />
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-pharma-green font-semibold mb-4">
              {product.price.toFixed(2)} €
            </p>
            <div className="mb-4">
              <label className="block mb-1">Quantité :</label>
              <input
                type="number"
                value={quantity}
                min="1"
                max={product.stock}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 px-2 py-1 border rounded"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-pharma-green text-white px-6 py-2 rounded hover:bg-green-600 transition"
            >
              Ajouter au panier
            </button>

            {/* Tabs */}
            <div className="mt-6">
              <div className="flex gap-4 border-b">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-2 ${
                    activeTab === 'description'
                      ? 'border-b-2 border-pharma-green font-semibold'
                      : ''
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 ${
                    activeTab === 'details'
                      ? 'border-b-2 border-pharma-green font-semibold'
                      : ''
                  }`}
                >
                  Détails
                </button>
              </div>
              <div className="mt-4 text-gray-700">
                {activeTab === 'description' ? (
                  <p>{product.description}</p>
                ) : (
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      <strong>Composition :</strong>{' '}
                      {product.details.composition}
                    </li>
                    <li>
                      <strong>Dosage :</strong> {product.details.dosage}
                    </li>
                    <li>
                      <strong>Précautions :</strong>{' '}
                      {product.details.precautions}
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Produits associés */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Produits associés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link
                to={`/produits/${item.id}`}
                key={item.id}
                className="border p-4 rounded hover:shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-pharma-green font-semibold">
                  {item.price.toFixed(2)} €
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
