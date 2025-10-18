import React, { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import DashboardPage from './components/DashboardPage';
import AdminPanel from './components/AdminPanel';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const { user } = useContext(AuthContext);

  const renderPage = () => {
    if (!user && currentPage !== 'login' && currentPage !== 'home') {
      return <LoginPage setCurrentPage={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'home':
        return <ProductList />;
      case 'cart':
        return <CartPage setCurrentPage={setCurrentPage} />;
      case 'wishlist':
        return <WishlistPage />;
      case 'dashboard':
        return <DashboardPage setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;