import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts as getProducts, fetchOrders as getOrders } from '../services/api';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productsData = await getProducts();
      const ordersData = await getOrders();
      setProducts(productsData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const createOrder = async (orderData) => {
    const newOrder = {
      ...orderData,
      status: 'On Process',
      date: new Date().toISOString()
    };
    
    try {
      const { createOrder: createOrderAPI } = await import('../services/api');
      const createdOrder = await createOrderAPI(newOrder);
      setOrders([...orders, createdOrder]);
      return createdOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const { updateOrderStatus: updateAPI } = await import('../services/api');
      await updateAPI(orderId, status);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      orders, 
      createOrder, 
      updateOrderStatus,
      loading,
      refreshData: loadData
    }}>
      {children}
    </ProductContext.Provider>
  );
};