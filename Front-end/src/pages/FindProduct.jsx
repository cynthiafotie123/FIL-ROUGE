import useSearchProduit from '../hooks/useSearchProduit';
import { MapPin, Search } from 'lucide-react';

const FindProduct = () => {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    error,
    handleSearch,
    clearSearch
  } = useSearchProduit();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#0002341] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#0002341] mb-2">Recherche de Produits</h1>
          <p className="text-gray-700">Trouvez vos médicaments et produits de santé</p>
        </div>

        {/* Search Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 mb-10">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un médicament ou un article..."
              className="w-full bg-white/50 border-2 border-gray-200 focus:ring-[#002341] focus:border-[#002341] rounded-lg text-sm py-3 px-4 pr-20"
            />
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
            <button 
              onClick={handleSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#002341] to-[#00cfc1] text-white p-2 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#00cfc1] focus:ring-offset-2 transition duration-150"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            <p>{error}</p>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00cfc1]"></div>
            <p className="mt-4 text-gray-600">Recherche en cours...</p>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && searchResults.length > 0 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
            <h2 className="text-xl font-semibold text-[#0002341] mb-6">Résultats de recherche</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((produits) => (
                <div 
                  key={produits.id_produit} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-gray-200"
                >
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-[#002341]">{produits.nom}</h3>
                    <p className="text-gray-600 mb-2">{produits.description}</p>
                    <div className="flex items-center mb-2">
                      <span className="text-[#00cfc1] font-bold mr-2">{produits.prix} Fcfa</span>
                      <span className="text-gray-500">Stock: {produits.quantite}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-500">Catégorie: {produits.categorie}</span>
                    </div>
                    <img 
                      src={`/assets/${produits.image}`} 
                      alt={produits.nom} 
                      className="w-full h-40 object-contain mb-2"
                    />
                  </div>
                  <div className="flex justify-between items-center p-4 border-t border-gray-200">
                    <button className="bg-gradient-to-r bg-[#8faec9] hover:bg-[#002341]  text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
                      Commander
                    </button>
                    <MapPin className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!isLoading && searchTerm && searchResults.length === 0 && !error && (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-[#002341] mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-600">Nous n'avons pas trouvé de médicament correspondant à "{searchTerm}"</p>
          </div>
        )}

        {/* Home Screen - No Search */}
        {!isLoading && !searchTerm && searchResults.length === 0 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 text-center">
            <div className="text-[#00cfc1] mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-2xl font-medium text-[#0002341] mb-3">Recherchez des médicaments</h3>
            <p className="text-gray-600 mb-6">Entrez le nom d'un médicament pour trouver sa disponibilité dans les pharmacies à proximité.</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button 
                onClick={() => setSearchTerm("Doliprane")}
                className="px-6 py-3 bg-gradient-to-r from-[#002341] to-[#00cfc1] text-white rounded-lg hover:opacity-90 transition"
              >
                Rechercher Doliprane
              </button>
              <button 
                onClick={() => setSearchTerm("Aspirine")}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Rechercher Aspirine
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindProduct;