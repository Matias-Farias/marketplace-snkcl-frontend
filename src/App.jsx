import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
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

function App() {
  const navigate = useNavigate();
  const { isLoggedIn, login, logout, userData, updateUserData } = useAuth();
  const { cart, favorites, addToCart, removeFromCart, updateCartQuantity, toggleFavorite, loadFavorites } = useCart();
  const { products, myProducts, mySales, addProduct, updateProduct, deleteProduct, loadSales } = useProducts();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      loadFavorites();
      loadSales();
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

  const handlePurchase = (items) => {
    const purchase = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      items: items,
      status: 'In Transit'
    };

    updateUserData(prev => ({
      ...prev,
      purchases: [...(prev.purchases || []), purchase]
    }));

    const newSales = items.map(item => ({
      id: Date.now() + Math.random(),
      date: new Date().toISOString().split('T')[0],
      product: item.name,
      price: item.price,
      buyer: userData.name,
      quantity: item.quantity
    }));

    newSales.forEach(sale => addProduct(sale)); // ⚠️ si usas addSale, usa el correcto
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoritedProducts = products.filter(product => favorites.includes(product.id));

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
            <div className="relative h-[600px] bg-black">
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1400&auto=format" 
                alt="Hero background" 
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    Eleva tu <span className="text-red-600">Estilo</span>
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Explora la mejor selección de zapatillas exclusivas.
                  </p>
                  <div className="flex space-x-4">
                    <button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors duration-300">
                      Comprar
                    </button>
                    <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
                      Productos
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
        } />

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
        } />

        <Route path="/product/:id" element={
          <ProductDetailWrapper />
        } />
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