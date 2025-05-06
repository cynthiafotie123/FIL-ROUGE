import React from 'react';
import { ShoppingCart, Heart, Info } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-semibold px-3 py-1 rounded-full bg-red-500">
              Rupture de stock
            </span>
          </div>
        )}
        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-gray-600 hover:text-red-500 transition duration-150">
          <Heart size={18} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
          <span className="bg-[#00CFC1]/10 text-[#00CFC1] text-xs font-medium px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-[#002341]">{product.price.toFixed(2)} €</span>
          
          <div className="flex space-x-2">
            <button className="p-1.5 bg-gray-100 rounded text-gray-600 hover:bg-gray-200 transition duration-150">
              <Info size={18} />
            </button>
            <button 
              onClick={() => product.inStock && onAddToCart(product)}
              disabled={!product.inStock}
              className={`p-1.5 rounded flex items-center justify-center ${
                product.inStock 
                  ? 'bg-[#00CFC1] text-white hover:bg-[#00b8ab]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition duration-150`}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};