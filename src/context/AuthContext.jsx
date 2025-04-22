import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, logout as logoutApi, fetchUserPurchases, fetchUserSales } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && localStorage.getItem('token')) {
          const [purchases, sales] = await Promise.all([
            fetchUserPurchases(),
            fetchUserSales()
          ]);
          setUserData({ ...storedUser, purchases, sales });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
        localStorage.removeItem('user');
      }
    };

    loadUserData();
  }, []);

  const login = async (loginData) => {
    try {
      const response = await loginApi(loginData);
      const [purchases, sales] = await Promise.all([
        fetchUserPurchases(),
        fetchUserSales()
      ]);

      const fullUserData = { ...response.user, purchases, sales };
      setIsLoggedIn(true);
      setUserData(fullUserData);
      localStorage.setItem('user', JSON.stringify(fullUserData));
      toast.success('¡Bienvenido!');
    } catch (error) {
      toast.error('Error al iniciar sesión');
      throw error;
    }
  };

  const logout = () => {
    logoutApi();
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('user');
    toast.success('Sesión cerrada');
  };

  const updateUserData = (newData) => {
    setUserData(newData);
    localStorage.setItem('user', JSON.stringify(newData));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
