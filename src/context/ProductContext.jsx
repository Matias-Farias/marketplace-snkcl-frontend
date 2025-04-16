import { createContext, useContext, useState, useEffect } from 'react';
import { 
  fetchProducts as fetchProductsApi,
  addProduct as addProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi,
  fetchUserSales as fetchUserSalesApi
} from '../services/api';
import toast from 'react-hot-toast';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [mySales, setMySales] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProductsApi();
      console.log("🔍 Productos desde API:", data);
      setProducts(data);
    } catch (error) {
      toast.error('Error al cargar los productos');
    }
  };

  const addProduct = async (product) => {
    try {
      const newProduct = await addProductApi(product);
      setMyProducts([...myProducts, newProduct]);
      toast.success('Producto agregado exitosamente');
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
      loadSales
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