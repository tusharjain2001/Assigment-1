import React, { useContext } from "react";
import {
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Home as HomeIcon,
  Shield,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart, wishlist } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 text-white shadow-lg backdrop-blur-lg bg-opacity-90 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand & Navigation */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-wide cursor-pointer hover:scale-105 transition-transform"
            >
              Shop<span className="text-yellow-300">Hub</span>
            </Link>

            <Link
              to="/"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition hover:bg-white/20"
            >
              <HomeIcon size={18} />
              <span className="font-medium">Products</span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5">
            {user ? (
              <>
                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative p-2 hover:scale-110 transition-transform"
                >
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                      {cart.length}
                    </span>
                  )}
                </Link>

                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  className="relative p-2 hover:scale-110 transition-transform"
                >
                  <Heart size={22} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                {/* Account & Logout */}
                <div className="flex items-center gap-4 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md shadow-sm">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt={user.displayName || "User"}
                    className="w-8 h-8 rounded-full border-2 border-white/50 shadow"
                  />
                  <Link to="/dashboard" className="hover:underline">
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 hover:text-yellow-300 transition"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>

                {/* Admin */}
                <Link
                  to="/admin"
                  className="flex items-center space-x-1 bg-yellow-400 text-black px-3 py-1.5 rounded-lg hover:bg-yellow-300 transition shadow-md"
                >
                  <Shield size={18} />
                  <span className="font-medium">Admin</span>
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition shadow-md"
              >
                <User size={18} />
                <span className="font-semibold">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
