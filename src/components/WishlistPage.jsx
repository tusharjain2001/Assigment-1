import React, { useContext } from 'react';
import { Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useContext(CartContext);

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <Heart size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your wishlist is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Wishlist</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-3">${product.price}</p>
              
              <div className="space-y-2">
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;