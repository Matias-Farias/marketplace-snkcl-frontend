import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, logout as logoutApi } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        setUserData(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error al parsear user en localStorage:', error);
      localStorage.removeItem('user');
    }
  }, []);

  const login = async (loginData) => {
    try {
      const response = await loginApi(loginData);
      setIsLoggedIn(true);
      setUserData(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
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