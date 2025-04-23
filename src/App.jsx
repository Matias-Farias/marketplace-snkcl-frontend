import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import CartModal from './components/CartModal';
import FavoritesModal from './components/FavoritesModal';
import ProductDetailWrapper from './views/ProductDetailWrapper';
import ProfilePage from './views/ProfilePage';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { useProducts } from './context/ProductContext';
import { createPurchase } from './services/api'; // ✅ Asegurarse de importar

function App() {
  const navigate = useNavigate();
  const { isLoggedIn, login, logout, userData, updateUserData } = useAuth();
  const {
    cart, favorites, addToCart, removeFromCart,
    updateCartQuantity, toggleFavorite, loadFavorites
  } = useCart();
  const {
    products, myProducts, mySales,
    addProduct, updateProduct, deleteProduct,
    loadSales, loadMyProducts
  } = useProducts();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      loadFavorites();
      loadSales();
      loadMyProducts();
    }
  }, [isLoggedIn]);

  const handleLogin = async (loginData) => {
    await login(loginData);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePurchase = async (items) => {
    try {
      await createPurchase(items); // ✅ Llama a la API real
      loadSales(); // Actualiza ventas
      updateUserData(prev => ({
        ...prev,
        purchases: [...(prev.purchases || []), ...items]
      }));
    } catch (error) {
      console.error('Error al registrar compra:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoritedProducts = products.filter(product =>
    favorites.includes(product.id)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        cartCount={cart.length}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        onCartClick={() => setShowCartModal(true)}
        isLoggedIn={isLoggedIn}
        onProfileClick={() => navigate('/profile')}
        onGoHome={() => navigate('/')}
        onSearchChange={setSearchQuery}
      />
      
      <Routes>
        <Route path="/" element={
          <>
            <main className="container mx-auto px-4 py-8">
              <h2 className="text-4xl font-bold text-red-600 mb-8">Destacados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={{...product, image: product.image || product.images?.[0]}}
                    onAddToCart={() => addToCart(product)}
                    onToggleFavorite={() => toggleFavorite(product.id)}
                    isFavorite={favorites.includes(product.id)}
                    onViewDetails={() => navigate(`/product/${product.id}`)}
                  />
                ))}
              </div>
            </main>
          </>
        }/>

        <Route path="/profile" element={
          <ProfilePage 
            onLogout={handleLogout}
            userData={userData}
            myProducts={myProducts}
            mySales={mySales}
            onUpdateUserData={updateUserData}
            onGoHome={() => navigate('/')}
            onFavoritesClick={() => setShowFavoritesModal(true)}
            favoritesCount={favorites.length}
            favorites={favoritedProducts}
            onRemoveFromFavorites={toggleFavorite}
            onAddToCart={addToCart}
            onAddProduct={addProduct}
            onDeleteProduct={deleteProduct}
            onUpdateProduct={updateProduct}
          />
        }/>

        <Route path="/product/:id" element={<ProductDetailWrapper />} />
      </Routes>

      <Footer />

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin}
        />
      )}

      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}

      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        cartItems={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        isLoggedIn={isLoggedIn}
        onPurchase={handlePurchase}
      />

      <FavoritesModal
        isOpen={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        favorites={favoritedProducts}
        onRemoveFromFavorites={toggleFavorite}
        onAddToCart={addToCart}
      />
    </div>
  );
}

export default App;