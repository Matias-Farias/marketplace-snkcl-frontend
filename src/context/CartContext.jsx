import { createContext, useContext, useState } from 'react';
import { toggleFavorite as toggleFavoriteApi, fetchFavorites as fetchFavoritesApi } from '../services/api';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const data = await fetchFavoritesApi();
      setFavorites(data);
    } catch (error) {
      toast.error('Error al cargar favoritos');
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => 
      item.id === product.id && item.selectedSize === product.selectedSize
    );
    if (existingItem) {
      setCart(cart.map(item =>
        (item.id === product.id && item.selectedSize === product.selectedSize)
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success('Producto agregado al carrito');
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.success('Producto eliminado del carrito');
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const toggleFavorite = async (productId) => {
    try {
      await toggleFavoriteApi(productId);
      if (favorites.includes(productId)) {
        setFavorites(favorites.filter(id => id !== productId));
        toast.success('Eliminado de favoritos');
      } else {
        setFavorites([...favorites, productId]);
        toast.success('Agregado a favoritos');
      }
    } catch (error) {
      toast.error('Error al actualizar favoritos');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      favorites,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleFavorite,
      clearCart,
      loadFavorites
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}