import React from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';

function FavoritesModal({ isOpen, onClose, favorites, onRemoveFromFavorites, onAddToCart }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Favoritos</h2>
          
          <div className="overflow-y-auto max-h-[70vh]">
            {favorites.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay favoritos por ver.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((item) => (
                  <div key={item.id} className="flex space-x-4 border rounded-lg p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => onAddToCart(item)}
                          className="flex items-center space-x-1 bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 text-sm"
                        >
                          <ShoppingCart size={16} />
                          <span>Agregar al carro</span>
                        </button>
                        <button
                          onClick={() => onRemoveFromFavorites(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritesModal;