import React, { useContext } from "react";
import { User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, loading, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();
    // ✅ Redirect after successful login
    navigate("/"); // or navigate("/dashboard") if you prefer
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome to ShopHub
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Sign in to start shopping
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <User size={20} />
          <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Secure authentication powered by Firebase
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
