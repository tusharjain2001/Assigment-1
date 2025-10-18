import React, { useContext } from 'react';
import { Shield } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';

const AdminPanel = () => {
  const { orders, updateOrderStatus } = useContext(ProductContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <Shield className="text-yellow-700 mr-2" />
          <p className="text-yellow-700 font-semibold">Admin Panel - Manage All Orders</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Management</h2>
        
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No orders to manage</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-lg">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">User ID: {order.userId}</p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-start justify-end">
                    <div className="flex items-center space-x-2">
                      <label className="font-semibold text-sm">Status:</label>
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="On Process">On Process</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-3 mb-3">
                  <p className="font-semibold mb-2">Order Items:</p>
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Delivery Address:</strong> {order.address}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="font-bold text-lg">Total: ${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;