import { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchProducts as fetchProductsApi,
  addProduct as addProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi,
  fetchUserSales as fetchUserSalesApi
} from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [mySales, setMySales] = useState([]);

  const { userData } = useAuth();

  useEffect(() => {
    loadProducts();
  }, [userData]);

  const loadProducts = async () => {
    try {
      const data = await fetchProductsApi();
      setProducts(data);

      if (userData?.id) {
        const mine = data.filter(p => p.user_id === userData.id);
        setMyProducts(mine);
      }
    } catch (error) {
      toast.error('Error al cargar los productos');
    }
  };

  const loadMyProducts = async () => {
    try {
      const data = await fetchProductsApi();
      const mine = data.filter(p => p.user_id === userData?.id);
      setMyProducts(mine);
    } catch (error) {
      toast.error('Error al cargar tus productos');
    }
  };

  const addProduct = async (product) => {
    try {
      const newProduct = await addProductApi(product);
      setMyProducts([...myProducts, newProduct]);
      toast.success('Producto agregado exitosamente');
      await loadProducts();
    } catch (error) {
      toast.error('Error al agregar el producto');
      throw error;
    }
  };

  const updateProduct = async (productId, updatedProduct) => {
    try {
      const updated = await updateProductApi(productId, updatedProduct);
      setMyProducts(myProducts.map(p => p.id === productId ? updated : p));
      toast.success('Producto actualizado exitosamente');
      await loadProducts();
    } catch (error) {
      toast.error('Error al actualizar el producto');
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await deleteProductApi(productId);
      setMyProducts(myProducts.filter(p => p.id !== productId));
      toast.success('Producto eliminado exitosamente');
      await loadProducts();
    } catch (error) {
      toast.error('Error al eliminar el producto');
      throw error;
    }
  };

  const loadSales = async () => {
    try {
      const sales = await fetchUserSalesApi();
      setMySales(sales);
    } catch (error) {
      toast.error('Error al cargar las ventas');
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      myProducts,
      mySales,
      addProduct,
      updateProduct,
      deleteProduct,
      loadSales,
      loadProducts,
      loadMyProducts 
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}