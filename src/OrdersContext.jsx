import { createContext, useContext, useEffect, useRef, useState } from 'react';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState('pending');
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('moshood-notifications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const previousOrderCountRef = useRef(0);
  const preparingTimerRef = useRef(null);
  const deliveredTimerRef = useRef(null);

  const clearStatusTimers = () => {
    if (preparingTimerRef.current) {
      clearTimeout(preparingTimerRef.current);
      preparingTimerRef.current = null;
    }
    if (deliveredTimerRef.current) {
      clearTimeout(deliveredTimerRef.current);
      deliveredTimerRef.current = null;
    }
  };

  const addNotification = (message, type = 'info') => {
    const notification = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      message,
      type,
      createdAt: new Date().toISOString(),
      read: false,
    };

    setNotifications((prev) => [notification, ...prev].slice(0, 50));
  };

  const addToOrder = (item) => {
    setOrderItems(prevItems => {
      // Check if item already exists
      const existingItem = prevItems.find(orderItem => orderItem.name === item.name);
      
      if (existingItem) {
        // If exists, increase quantity
        return prevItems.map(orderItem =>
          orderItem.name === item.name
            ? { ...orderItem, quantity: (orderItem.quantity || 1) + 1 }
            : orderItem
        );
      } else {
        // If new, add with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromOrder = (itemName) => {
    setOrderItems(prevItems => prevItems.filter(item => item.name !== itemName));
  };

  const updateOrderQuantity = (itemName, quantity) => {
    if (quantity <= 0) {
      removeFromOrder(itemName);
    } else {
      setOrderItems(prevItems =>
        prevItems.map(item =>
          item.name === itemName ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearOrders = () => {
    setOrderItems([]);
    setOrderStatus('pending');
    clearStatusTimers();
  };

  const getOrderCount = () => {
    return orderItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getUnreadNotificationCount = () => {
    return notifications.reduce((count, item) => count + (item.read ? 0 : 1), 0);
  };

  useEffect(() => {
    try {
      localStorage.setItem('moshood-notifications', JSON.stringify(notifications));
    } catch {
      // Ignore storage write errors.
    }
  }, [notifications]);

  useEffect(() => {
    const currentCount = orderItems.reduce((total, item) => total + (item.quantity || 1), 0);
    const previousCount = previousOrderCountRef.current;

    if (currentCount > previousCount) {
      setOrderStatus('pending');
      addNotification('Order placed. Status is pending.', 'pending');
      clearStatusTimers();

      preparingTimerRef.current = setTimeout(() => {
        setOrderStatus('preparing');
        addNotification('Your food is now preparing.', 'preparing');
      }, 30000);

      deliveredTimerRef.current = setTimeout(() => {
        setOrderStatus('delivered');
        addNotification('Your food has been delivered.', 'delivered');
      }, 60000);
    }

    if (currentCount === 0 && previousCount > 0) {
      setOrderStatus('pending');
      clearStatusTimers();
    }

    previousOrderCountRef.current = currentCount;
  }, [orderItems]);

  useEffect(() => {
    return () => {
      clearStatusTimers();
    };
  }, []);

  const value = {
    orderItems,
    orderStatus,
    notifications,
    addToOrder,
    removeFromOrder,
    updateOrderQuantity,
    clearOrders,
    getOrderCount,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    getUnreadNotificationCount,
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within OrdersProvider');
  }
  return context;
};
