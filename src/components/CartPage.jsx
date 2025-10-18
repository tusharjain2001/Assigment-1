import React, { useContext, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const CartPage = ({ setCurrentPage }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { createOrder } = useContext(ProductContext);
  const [addresses] = useState([
    { id: 1, name: "Home", address: "123 Main Street, New York, NY 10001" },
    {
      id: 2,
      name: "Office",
      address: "456 Business Ave, Suite 100, New York, NY 10002",
    },
    { id: 3, name: "Other", address: "789 Park Lane, Brooklyn, NY 11201" },
  ]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    const order = {
      userId: user.uid,
      items: cart,
      address: selectedAddress,
      total: total,
    };

    try {
      await createOrder(order);
      clearCart();
      alert("Order placed successfully!");
      setCurrentPage("dashboard");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow flex items-center space-x-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Select Delivery Address</h4>
            {addresses.map((addr) => (
              <label
                key={addr.id}
                className="flex items-start space-x-2 mb-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="address"
                  value={addr.address}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="font-semibold">{addr.name}</p>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                </div>
              </label>
            ))}
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
