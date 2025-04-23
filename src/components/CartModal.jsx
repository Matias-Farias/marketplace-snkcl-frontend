import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { createPurchase } from '../services/api'; // ✅ Nuevo import

function CartModal({ isOpen, onClose, cartItems, onRemoveFromCart, onUpdateQuantity }) {
  if (!isOpen) return null;

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const clpTotal = Math.round(total * 942);
  const formattedTotal = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(clpTotal);

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const itemsToSend = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity || 1,
        size: item.selectedSize || ''
      }));

      await createPurchase(itemsToSend);
      alert('¡Compra realizada exitosamente!');

      cartItems.forEach(item => onRemoveFromCart(item.id));
      setIsCheckingOut(false);
      onClose();
    } catch (error) {
      alert('❌ Error al realizar la compra');
      console.error('Error en createPurchase:', error);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
      cartItems.forEach(item => onRemoveFromCart(item.id));
    }
  };

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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Carro de Compras</h2>
            {cartItems.length > 0 && !isCheckingOut && (
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Limpiar Carro
              </button>
            )}
          </div>

          {isCheckingOut ? (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Pago</h3>
              <form onSubmit={handlePurchase} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número de tarjeta
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    />
                    <CreditCard className="absolute right-3 top-2.5 text-gray-400" size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de expiración
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre del titular
                  </label>
                  <input
                    type="text"
                    placeholder="Alexis Sanchez"
                    className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-semibold mb-4">
                    <span>Total a pagar:</span>
                    <span className="text-red-600">{formattedTotal}</span>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      Completar Pago
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="overflow-y-auto max-h-[60vh]">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Tu carro está vacío</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const itemClpPrice = Math.round(item.price * 850);
                      const formattedItemPrice = new Intl.NumberFormat('es-CL', {
                        style: 'currency',
                        currency: 'CLP'
                      }).format(itemClpPrice);

                      return (
                        <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                          <img
                            src={item.images ? item.images[0] : item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-gray-600">{formattedItemPrice}</p>
                            {item.selectedSize && (
                              <p className="text-sm text-gray-500">Talla: {item.selectedSize}</p>
                            )}
                            <div className="flex items-center space-x-2 mt-2">
                              <button
                                onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                                className="p-1 rounded-full hover:bg-gray-100"
                                disabled={(item.quantity || 1) <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center">{item.quantity || 1}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <span className="font-semibold text-gray-800">
                              {new Intl.NumberFormat('es-CL', {
                                style: 'currency',
                                currency: 'CLP'
                              }).format(itemClpPrice * (item.quantity || 1))}
                            </span>
                            <button
                              onClick={() => onRemoveFromCart(item.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-red-600">{formattedTotal}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-red-600 text-white rounded-full py-2 px-4 hover:bg-red-700 flex items-center justify-center space-x-2"
                  >
                    <CreditCard size={20} />
                    <span>Proceder al pago</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartModal;