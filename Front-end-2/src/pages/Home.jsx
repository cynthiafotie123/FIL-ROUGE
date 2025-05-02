import { Link } from 'react-router-dom';

function Home() {
  const categories = [
    { id: 1, name: 'Médicaments sans ordonnance', image: '/api/placeholder/300/200', slug: 'medicaments' },
    { id: 2, name: 'Compléments alimentaires', image: '/api/placeholder/300/200', slug: 'complements' },
    { id: 3, name: 'Beauté et soins', image: '/api/placeholder/300/200', slug: 'beaute' },
  ];

  const featuredProducts = [
    { id: 1, name: 'Vitamine C 1000mg', price: 12.99, image: '/api/placeholder/300/200', description: 'Renforce votre système immunitaire' },
    { id: 2, name: 'Crème hydratante', price: 9.99, image: '/api/placeholder/300/200', description: 'Pour une peau douce et hydratée' },
    { id: 3, name: 'Paracétamol 500mg', price: 4.50, image: '/api/placeholder/300/200', description: 'Soulage les douleurs légères à modérées' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-pharma-green text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bienvenue à PharmaTech</h1>
          <p className="text-xl md:w-2/3 mx-auto mb-8">Votre pharmacie en ligne de confiance pour tous vos besoins de santé et bien-être.</p>
          <Link 
            to="/produits" 
            className="bg-white text-pharma-green font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition inline-block"
          >
            Découvrir nos produits
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Catégories populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map(category => (
              <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <Link 
                    to={`/produits?categorie=${category.slug}`}
                    className="text-pharma-blue hover:underline inline-block mt-2"
                  >
                    Explorer →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Produits populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-pharma-green">{product.price} €</span>
                    <Link
                      to={`/produits/${product.id}`}
                      className="bg-pharma-blue text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/produits" 
              className="bg-pharma-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition inline-block"
            >
              Voir tous nos produits
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Nos services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-pharma-green text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Livraison rapide</h3>
              <p className="text-gray-600">Livraison à domicile sous 24-48h</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-pharma-green text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-semibold mb-2">Conseil pharmaceutique</h3>
              <p className="text-gray-600">Par des professionnels de santé</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-pharma-green text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Prix compétitifs</h3>
              <p className="text-gray-600">Des tarifs avantageux toute l'année</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-pharma-green text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Paiement sécurisé</h3>
              <p className="text-gray-600">Transactions 100% sécurisées</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;