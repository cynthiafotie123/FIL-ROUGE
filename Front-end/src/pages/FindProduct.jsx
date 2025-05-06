// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.


import useSearchProduit from '../hooks/useSearchProduit'; // Assurez-vous que le chemin est correct
import { MapPin } from 'lucide-react'; // ou une autre icône localisation

const FindProduct=  ()=> {
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Zone de recherche */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un médicament ou un article..."
            className="w-full px-5 py-4 pr-12 text-base rounded-lg border-2 border-gray-200 focus:border-[#00cfc1] focus:outline-none transition-all duration-300 shadow-sm"
          />
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
          <button 
            onClick={handleSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap"
          >
            <i className="fas fa-search text-xl"></i>
          </button>
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Recherche en cours...</p>
        </div>
      )}

      {/* Résultats de recherche */}
      {!isLoading && searchResults.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">Résultats de recherche</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((produits) => (
              <div 
                key={produits.id_produit} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
              >
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">{produits.nom}</h3>
                  <p className="text-gray-600 mb-2">{produits.description}</p>
                  <div className="flex items-center mb-2">
                    <span className="text-blue-600 font-bold mr-2">{produits.prix} €</span>
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
                <div className="flex justify-between items-center p-4 border-t">
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Commander
                  </button>
                  <MapPin className="w-8 h-8 text-red-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message quand aucun résultat */}
      {!isLoading && searchTerm && searchResults.length === 0 && !error && (
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <i className="fas fa-search text-gray-400 text-5xl mb-4"></i>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-600">Nous n'avons pas trouvé de médicament correspondant à "{searchTerm}"</p>
          </div>
        </div>
      )}

      {/* Écran d'accueil - quand aucune recherche n'a été effectuée */}
      {!isLoading && !searchTerm && searchResults.length === 0 && (
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <i className="fas fa-pills text-blue-500 text-5xl mb-4"></i>
            <h3 className="text-2xl font-medium text-gray-900 mb-3">Recherchez des médicaments</h3>
            <p className="text-gray-600 mb-6">Entrez le nom d'un médicament pour trouver sa disponibilité dans les pharmacies à proximité.</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button 
                onClick={() => setSearchTerm("Doliprane")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
              >
                Rechercher Doliprane
              </button>
              <button 
                onClick={() => setSearchTerm("Aspirine")}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
              >
                Rechercher Aspirine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default FindProduct;

