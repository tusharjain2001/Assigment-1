import React, { useContext } from 'react';
import { ShoppingCart, Heart, Package } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';

const DashboardPage = ({ setCurrentPage }) => {
  const { user } = useContext(AuthContext);
  const { orders } = useContext(ProductContext);
  const { cart, wishlist } = useContext(CartContext);

  const userOrders = orders.filter(order => order.userId === user.uid);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      {/* Profile Card */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-6 flex items-center space-x-6 mb-10">
        <img 
          src={user.photoURL || 'https://via.placeholder.com/64'} 
          alt={user.displayName}
          className="w-20 h-20 rounded-full border-4 border-indigo-500 shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user.displayName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div 
          onClick={() => setCurrentPage('cart')}
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl transition transform duration-200"
        >
          <ShoppingCart size={38} className="mb-3 opacity-90" />
          <h3 className="text-lg font-medium">Cart Items</h3>
          <p className="text-4xl font-bold">{cart.length}</p>
        </div>

        <div 
          onClick={() => setCurrentPage('wishlist')}
          className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl transition transform duration-200"
        >
          <Heart size={38} className="mb-3 opacity-90" />
          <h3 className="text-lg font-medium">Wishlist</h3>
          <p className="text-4xl font-bold">{wishlist.length}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <Package size={38} className="mb-3 opacity-90" />
          <h3 className="text-lg font-medium">Total Orders</h3>
          <p className="text-4xl font-bold">{userOrders.length}</p>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl border">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Order History</h3>

        {userOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-lg">No orders yet 🚀</p>
        ) : (
          <div className="space-y-5">
            {userOrders.map(order => (
              <div 
                key={order.id} 
                className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition bg-white/70 backdrop-blur-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-xl">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-gray-700">
                      <span>{item.name} <span className="text-gray-500">x</span> {item.quantity}</span>
                      <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Delivery Address:</strong> {order.address}
                  </p>
                  <p className="text-right font-bold text-xl text-gray-800">
                    Total: ₹{order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
