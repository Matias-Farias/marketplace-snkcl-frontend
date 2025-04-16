import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Save } from 'lucide-react';

function MyProducts() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    images: [],
    sizes: []
  });
  const [selectedSize, setSelectedSize] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const availableSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

  const handleAddImage = () => {
    if (newImageUrl && !newProduct.images.includes(newImageUrl)) {
      setNewProduct({
        ...newProduct,
        images: [...newProduct.images, newImageUrl]
      });
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (urlToRemove) => {
    setNewProduct({
      ...newProduct,
      images: newProduct.images.filter(url => url !== urlToRemove)
    });
  };

  const handleAddSize = () => {
    if (selectedSize && !newProduct.sizes.includes(selectedSize)) {
      setNewProduct({
        ...newProduct,
        sizes: [...newProduct.sizes, selectedSize]
      });
      setSelectedSize('');
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setNewProduct({
      ...newProduct,
      sizes: newProduct.sizes.filter(size => size !== sizeToRemove)
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.sizes.length === 0) {
      alert('Please add at least one size');
      return;
    }
    if (newProduct.images.length === 0) {
      alert('Please add at least one image');
      return;
    }
    const product = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price)
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', description: '', images: [], sizes: [] });
    setShowAddModal(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEditPrice = (id, newPrice) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, price: parseFloat(newPrice) }
        : product
    ));
    setEditingProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis Publicaciones</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
        >
          <Plus size={20} />
          <span>Publicar nuevo producto</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                {product.images.length} photos
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-1">{product.description}</p>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-600">Available Sizes:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.sizes.map((size) => (
                    <span key={size} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                {editingProduct === product.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      defaultValue={product.price}
                      className="w-24 px-2 py-1 border rounded"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleEditPrice(product.id, e.target.value);
                        }
                      }}
                    />
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <X size={20} />
                    </button>
                    <button
                      onClick={(e) => handleEditPrice(product.id, e.target.previous.value)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Save size={20} />
                    </button>
                  </div>
                ) : (
                  <span className="text-xl font-bold text-red-600">${product.price}</span>
                )}
                <div className="flex space-x-2">
                  <button
                    className="p-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setEditingProduct(product.id)}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className="p-2 text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Publica tu par</h2>
              
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Titulo
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring focus:ring-red-200 p-2 border"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Precio
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring focus:ring-red-200 p-2 border"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring focus:ring-red-200 p-2 border"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Imagenes
                  </label>
                  <div className="mt-2 space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring focus:ring-red-200 p-2 border"
                      />
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center"
                      >
                        <ImageIcon size={20} className="mr-2" />
                        Agregar
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {newProduct.images.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(url)}
                            className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tallas
                  </label>
                  <div className="flex space-x-2 mt-1">
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring focus:ring-red-200 p-2 border"
                    >
                      <option value="">Seleccionar Talla</option>
                      {availableSizes.map(size => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAddSize}
                      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                    >
                      Agregar
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProduct.sizes.map(size => (
                      <span
                        key={size}
                        className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center"
                      >
                        {size}
                        <button
                          type="button"
                          onClick={() => handleRemoveSize(size)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white rounded-full py-2 px-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Publicar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProducts;