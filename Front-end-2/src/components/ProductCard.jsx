import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
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
  );
}

export default ProductCard;