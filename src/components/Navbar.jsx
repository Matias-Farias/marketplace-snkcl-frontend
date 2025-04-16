import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

function Navbar({ 
  cartCount,
  onLoginClick, 
  onRegisterClick,
  onCartClick,
  isLoggedIn,
  onProfileClick,
  onGoHome
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={onGoHome}
              className="text-red-600 text-2xl font-bold hover:text-red-500 transition-colors"
            >
              SneakerCL
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 mx-4">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search for sneakers..."
                className="w-full px-4 py-2 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="hover:text-red-600 relative"
              onClick={onCartClick}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {isLoggedIn ? (
              <button
                onClick={onProfileClick}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                Mi Perfil
              </button>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="px-4 py-2 text-white hover:text-red-600"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={onRegisterClick}
                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search for sneakers..."
                  className="w-full px-4 py-2 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
                  onChange={(e) => onSearchChange(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
              <div className="flex justify-around">
                <button
                  onClick={onCartClick}
                  className="hover:text-red-600 relative"
                >
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                {isLoggedIn ? (
                  <button
                    onClick={onProfileClick}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    Mi Perfil
                  </button>
                ) : (
                  <>
                    <button
                      onClick={onLoginClick}
                      className="w-full px-4 py-2 text-center hover:text-red-600"
                    >
                      Iniciar sesión
                    </button>
                    <button
                      onClick={onRegisterClick}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      Registrarse
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;