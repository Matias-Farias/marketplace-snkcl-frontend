import React, { useState, useEffect } from 'react';
import { User, Package, Heart, LogOut, Edit2, Save, ShoppingBag, Home, Search, Plus, Trash2, X } from 'lucide-react';

function ProfilePage({ 
  onLogout, 
  userData, 
  myProducts, 
  mySales, 
  onUpdateUserData, 
  onGoHome, 
  favoritesCount, 
  favorites,
  onRemoveFromFavorites,
  onAddToCart,
  onAddProduct,
  onDeleteProduct,
  onUpdateProduct
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    address: userData?.address || ''
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
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

  useEffect(() => {
    setEditedData({
      name: userData?.name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      address: userData?.address || ''
    });
  }, [userData]);

  const handleSave = () => {
    onUpdateUserData({
      ...userData,
      ...editedData
    });
    setIsEditing(false);
  };

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
    if (newProduct.sizes.length === 0 || newProduct.images.length === 0) {
      return;
    }

    const product = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price)
    };

    onAddProduct(product);
    setNewProduct({ name: '', price: '', description: '', images: [], sizes: [] });
    setShowAddProductModal(false);
  };

  const handleStartEditing = (product) => {
    setEditingProduct(product);
    setNewProduct({
      ...product,
      price: product.price.toString()
    });
    setShowAddProductModal(true);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (newProduct.sizes.length === 0 || newProduct.images.length === 0) {
      return;
    }

    const updatedProduct = {
      ...newProduct,
      id: editingProduct.id,
      price: parseFloat(newProduct.price)
    };

    onUpdateProduct(updatedProduct);
    setNewProduct({ name: '', price: '', description: '', images: [], sizes: [] });
    setEditingProduct(null);
    setShowAddProductModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onGoHome}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
          >
            <Home size={24} />
            <span>Volver al inicio</span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <User size={48} className="text-gray-600" />
                </div>
                <h2 className="text-xl font-bold">{userData?.name || 'Usuario'}</h2>
                <p className="text-gray-600">{userData?.email || 'usuario@ejemplo.com'}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                    activeTab === 'profile'
                      ? 'bg-red-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <User size={20} />
                  <span>Perfil</span>
                </button>
                <button
                  onClick={() => setActiveTab('purchases')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                    activeTab === 'purchases'
                      ? 'bg-red-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag size={20} />
                  <span>Mis Compras</span>
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                    activeTab === 'favorites'
                      ? 'bg-red-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Heart size={20} />
                  <span>Favoritos</span>
                  {favoritesCount > 0 && (
                    <span className="ml-auto bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm">
                      {favoritesCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                    activeTab === 'listings'
                      ? 'bg-red-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Package size={20} />
                  <span>Mis Publicaciones</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('sales')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                    activeTab === 'sales'
                      ? 'bg-red-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag size={20} />
                  <span>Mis Ventas</span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={20} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={editedData.name}
                          onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring focus:ring-red-200 p-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          value={editedData.email}
                          onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring focus:ring-red-200 p-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          value={editedData.phone}
                          onChange={(e) => setEditedData({...editedData, phone: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring focus:ring-red-200 p-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                          value={editedData.address}
                          onChange={(e) => setEditedData({...editedData, address: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring focus:ring-red-200 p-2 border"
                          rows={3}
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-lg"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSave}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center text-lg"
                        >
                          <Save size={24} className="mr-2" />
                          Guardar Cambios
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">Información Personal</h3>
                            <button
                              onClick={() => setIsEditing(true)}
                              className="text-red-600 hover:text-red-800 flex items-center space-x-2"
                            >
                              <Edit2 size={20} />
                              <span>Editar Perfil</span>
                            </button>
                          </div>
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Nombre</h4>
                                <p className="mt-1 text-lg text-gray-900">{userData?.name || 'Not set'}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                                <p className="mt-1 text-lg text-gray-900">{userData?.email || 'Not set'}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Número Telefonico</h4>
                                <p className="mt-1 text-lg text-gray-900">{userData?.phone || 'Not set'}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Dirección</h4>
                                <p className="mt-1 text-lg text-gray-900">{userData?.address || 'Not set'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'purchases' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Historial de Compras</h3>
                  {userData?.purchases?.length > 0 ? (
                    <div className="grid gap-6">
                      {userData.purchases.map(purchase => (
                        <div key={purchase.id} className="bg-white border rounded-lg p-6 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{purchase.product}</h4>
                              <p className="text-gray-500 mt-1">Fecha de Compra: {purchase.date}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              purchase.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {purchase.status}
                            </span>
                          </div>
                          {purchase.items && (
                            <div className="mt-4 space-y-2">
                              {purchase.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center text-gray-600">
                                  <span>{item.name} (x{item.quantity || 1})</span>
                                  <span className="font-medium">
                                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-xl text-gray-500">No hay compras aún</p>
                      <p className="text-gray-400 mt-2">Tus compras las podras ver acá</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Mis Favoritos</h3>
                  {favorites?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favorites.map(product => (
                        <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                            <p className="text-gray-500 mt-1">{product.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                              <p className="text-xl font-bold text-red-600">${product.price}</p>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => onAddToCart(product)}
                                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
                                >
                                  Agregar al carro
                                </button>
                                <button
                                  onClick={() => onRemoveFromFavorites(product.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Heart size={64} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-xl text-gray-500">Aún no hay favoritos</p>
                      <p className="text-gray-400 mt-2">Tus productos favoritos estaran acá</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'listings' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Mis Publicaciones</h3>
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setNewProduct({ name: '', price: '', description: '', images: [], sizes: [] });
                        setShowAddProductModal(true);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 flex items-center space-x-2"
                    >
                      <Plus size={20} />
                      <span>Agregar Nuevo Producto</span>
                    </button>
                  </div>
                  {myProducts?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {myProducts.map(product => (
                        <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-6">
                            <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                            <p className="text-gray-500 mt-1">{product.description}</p>
                            <div className="mt-2">
                              <span className="text-sm font-medium text-gray-600">Sizes:</span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {product.sizes.map((size) => (
                                  <span key={size} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                                    {size}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <p className="text-xl font-bold text-red-600">${product.price}</p>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleStartEditing(product)}
                                  className="text-gray-600 hover:text-gray-800 p-2"
                                >
                                  <Edit2 size={20} />
                                </button>
                                <button
                                  onClick={() => onDeleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-800 p-2"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Package size={64} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-xl text-gray-500">No publicas nada aún</p>
                      <p className="text-gray-400 mt-2">Tus Publicaciones las veras aca</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'sales' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Historial de Ventas</h3>
                  {mySales?.length > 0 ? (
                    <div className="grid gap-6">
                      {mySales.map(sale => (
                        <div key={sale.id} className="bg-white border rounded-lg p-6 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{sale.product}</h4>
                              <p className="text-gray-500 mt-1">Sold on: {sale.date}</p>
                              <p className="text-gray-500">Buyer: {sale.buyer}</p>
                              <p className="text-gray-500">Quantity: {sale.quantity}</p>
                            </div>
                            <p className="text-xl font-bold text-red-600">
                              ${(sale.price * (sale.quantity || 1)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-xl text-gray-500">Aún no vendes nada</p>
                      <p className="text-gray-400 mt-2">Tus ventas las veras acá</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowAddProductModal(false);
                setEditingProduct(null);
                setNewProduct({ name: '', price: '', description: '', images: [], sizes: [] });
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              
              <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
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
                        <Plus size={20} className="mr-2" />
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
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;