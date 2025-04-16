import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductDetail from './ProductDetail';

const ProductDetailWrapper = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, toggleFavorite, favorites } = useCart();
  const { isLoggedIn } = useAuth();

  const product = products.find(p => p.id === Number(id));

  if (!product) return <div className="p-8 text-center">Producto no encontrado</div>;

  return (
    <ProductDetail
      product={product}
      onClose={() => navigate('/')}
      onAddToCart={() => addToCart(product)}
      onToggleFavorite={() => toggleFavorite(product.id)}
      isFavorite={favorites.includes(product.id)}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default ProductDetailWrapper;