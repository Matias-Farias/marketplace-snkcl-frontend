import React, { useState } from 'react';
import { createPurchase } from '../services/api';
import { ShoppingCart, Heart, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

function ProductDetail({ product, onClose, onAddToCart, onToggleFavorite, isFavorite, isLoggedIn }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  
  const clpPrice = Math.round(product.price * 850); 
  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(clpPrice);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert('Inicie sesión para añadir artículos al carro');
      return;
    }
    if (!selectedSize) {
      alert('Por favor selecciona la talla');
      return;
    }
    onAddToCart({ ...product, selectedSize });
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      alert('Inicie sesión para realizar una compra');
      return;
    }
    if (!selectedSize) {
      alert('Por favor selecciona la talla');
      return;
    }
  
    try {
      const item = {
        productId: product.id,
        quantity: 1,
        size: selectedSize
      };
      await createPurchase([item]);
      alert('Compra realizada exitosamente');
    } catch (error) {
      alert('Error al realizar la compra');
      console.error('❌ Error al comprar:', error);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
    );
  };

  const images = product.images || [product.image];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={24} className="mr-2" />
          Volver al inicio
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div className="relative aspect-square">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className={`w-full aspect-square object-cover rounded-lg cursor-pointer transition-all ${
                    currentImageIndex === index ? 'ring-2 ring-red-600' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-3xl font-bold text-red-600 mt-2">{formattedPrice}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-md border ${
                      selectedSize === size
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700"
              >
                Buy Now
              </button>
              <button
                onClick={onToggleFavorite}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-full border ${
                  isFavorite ? 'text-red-600 border-red-600' : 'text-gray-600 border-gray-300'
                }`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;