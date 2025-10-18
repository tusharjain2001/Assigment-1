import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    if (product.stock > 0) {
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        setCart(cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product) => {
    if (product.stock > 0 && !wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{
      cart, 
      wishlist, 
      addToCart, 
      removeFromCart, 
      addToWishlist, 
      removeFromWishlist, 
      updateQuantity, 
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};