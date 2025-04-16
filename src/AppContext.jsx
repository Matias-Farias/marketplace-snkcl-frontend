import { createContext, useContext, useState } from 'react';

// Crear el contexto
const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    const existingItem = cart.find(
      (item) => item.id === product.id && item.selectedSize === product.selectedSize
    );
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Función para agregar o quitar un producto de favoritos
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Valores que estarán disponibles en el contexto
  const value = {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleFavorite,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAppContext = () => useContext(AppContext);