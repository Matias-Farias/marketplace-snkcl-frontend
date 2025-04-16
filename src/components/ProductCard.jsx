import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite, onViewDetails }) {
  
  const clpPrice = Math.round(product.price * 850); 

  
  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(clpPrice);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={onViewDetails}
        />
        <button
          onClick={onToggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorite ? 'text-red-600' : 'text-gray-500'
          } hover:text-red-600 bg-white shadow-md`}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 
          className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-red-600"
          onClick={onViewDetails}
        >
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-4 flex flex-col space-y-3">
          <span className="text-2xl font-bold text-red-600">{formattedPrice}</span>
          <button
            onClick={onAddToCart}
            className="w-full flex items-center justify-center space-x-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            <ShoppingCart size={18} />
            <span>Agregar al carro</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;