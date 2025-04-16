import React, { useState } from 'react';
import { X, User, Package, Heart, LogOut, Edit2, Save, ShoppingBag } from 'lucide-react';

function ProfileModal({ isOpen, onClose, onLogout, userData, myProducts, mySales }) {
  if (!isOpen) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    address: userData?.address || ''
  });

  const [activeTab, setActiveTab] = useState('profile'); 
  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={32} className="text-gray-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{userData?.name || 'Usuario'}</h2>
              <p className="text-gray-600">{userData?.email || 'usuario@ejemplo.com'}</p>
            </div>
          </div>

          <div className="flex space-x-2 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-4 rounded-lg whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Perfil
            </button>
            <button
              onClick={() => setActiveTab('purchases')}
              className={`py-2 px-4 rounded-lg whitespace-nowrap ${
                activeTab === 'purchases'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Mis Compras
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-2 px-4 rounded-lg whitespace-nowrap ${
                activeTab === 'listings'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Mis Publicaciones
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`py-2 px-4 rounded-lg whitespace-nowrap ${
                activeTab === 'sales'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Mis Ventas
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="space-y-4">
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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
                    >
                      <Save size={20} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Información Personal</h3>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="float-right text-red-600 hover:text-red-800"
                      >
                        <Edit2 size={20} />
                      </button>
                      <div className="mt-2 space-y-2">
                        <p className="text-gray-900">Name: {userData?.name || 'Not set'}</p>
                        <p className="text-gray-900">Email: {userData?.email || 'Not set'}</p>
                        <p className="text-gray-900">Phone: {userData?.phone || 'Not set'}</p>
                        <p className="text-gray-900">Address: {userData?.address || 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t mt-4">
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut size={20} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'purchases' && (
            <div className="space-y-4">
              {userData?.purchases?.length > 0 ? (
                userData.purchases.map(purchase => (
                  <div key={purchase.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{purchase.product}</h3>
                        <p className="text-sm text-gray-500">Date: {purchase.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        purchase.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {purchase.status}
                      </span>
                    </div>
                    <p className="mt-2 text-red-600 font-semibold">
                      ${purchase.price.toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Aún no hay compras</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myProducts?.length > 0 ? (
                myProducts.map(product => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex space-x-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.description}</p>
                        <p className="text-red-600 font-semibold mt-2">${product.price}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  <Package size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Aún no hay publicaciones</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="space-y-4">
              {mySales?.length > 0 ? (
                mySales.map(sale => (
                  <div key={sale.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{sale.product}</h3>
                        <p className="text-sm text-gray-500">Sold on: {sale.date}</p>
                        <p className="text-sm text-gray-500">Buyer: {sale.buyer}</p>
                      </div>
                      <p className="text-red-600 font-semibold">${sale.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Aún no hay ventas</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;