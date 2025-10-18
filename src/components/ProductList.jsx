import React, { useContext, useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ProductList = () => {
  const { products, loading } = useContext(ProductContext);
  const { addToCart, addToWishlist } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [category, setCategory] = useState('all');

  // Loading State
  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  // Categories List
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  // Filter + Sort Logic
  const filteredProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === 'all' || p.category === category)
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Products</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">OUT OF STOCK</span>
                </div>
              )}
            </div>

            {/* Product Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>

              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                <span
                  className={`text-sm ${
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
                </span>
              </div>

              {/* Actions */}
              {user ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart size={16} className="inline mr-1" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => addToWishlist(product)}
                    disabled={product.stock === 0}
                    className="bg-pink-100 text-pink-600 p-2 rounded-lg hover:bg-pink-200 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    <Heart size={20} />
                  </button>
                </div>
              ) : (
                <p className="text-center text-gray-500 text-sm">Login to purchase</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
