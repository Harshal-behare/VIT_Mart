/**
 * Order Management System
 * Handles order creation, retrieval, and persistence
 */

/**
 * @type {Array<Object>} All customer orders
 * @property {string} id - Unique order ID
 * @property {number} orderTime - Timestamp when order was placed
 * @property {number} totalCents - Total price in cents
 * @property {Array} products - Array of ordered products
 */
export let orders = [];

// Load orders from storage on initialization
loadOrdersFromStorage();

/**
 * Loads orders from localStorage
 * @returns {void}
 * @private
 */
function loadOrdersFromStorage() {
  try {
    const stored = localStorage.getItem('orders');
    orders = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(orders)) {
      orders = [];
    }
  } catch (error) {
    console.error('Error loading orders from storage:', error);
    orders = [];
  }
}

/**
 * Saves orders to localStorage
 * @returns {void}
 * @private
 */
function saveToStorage() {
  try {
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders to storage:', error);
  }
}

/**
 * Adds a new order
 * @param {Object} order - Order object to add
 * @param {string} order.id - Unique order ID
 * @param {number} order.orderTime - Timestamp
 * @param {number} order.totalCents - Total in cents
 * @param {Array} order.products - Ordered products
 * @returns {void}
 */
export function addOrder(order) {
  if (!order || typeof order !== 'object') {
    console.error('Invalid order object:', order);
    return;
  }

  if (!order.id || !order.orderTime || !order.products) {
    console.error('Order missing required fields:', order);
    return;
  }

  orders.unshift(order);
  saveToStorage();
}

/**
 * Gets all orders
 * @returns {Array<Object>} Array of orders
 */
export function getOrders() {
  return [...orders];
}

/**
 * Gets order by ID
 * @param {string} orderId - Order ID to find
 * @returns {Object|undefined} Order object or undefined
 */
export function getOrderById(orderId) {
  if (!orderId || typeof orderId !== 'string') {
    console.error('Invalid order ID:', orderId);
    return undefined;
  }

  return orders.find((order) => order.id === orderId);
}

/**
 * Removes order by ID
 * @param {string} orderId - Order ID to remove
 * @returns {boolean} True if order was removed
 */
export function removeOrder(orderId) {
  if (!orderId || typeof orderId !== 'string') {
    console.error('Invalid order ID:', orderId);
    return false;
  }

  const originalLength = orders.length;
  orders = orders.filter((order) => order.id !== orderId);

  if (orders.length !== originalLength) {
    saveToStorage();
    return true;
  }

  return false;
}

/**
 * Clears all orders
 * @returns {void}
 */
export function clearOrders() {
  orders = [];
  saveToStorage();
}

/**
 * Gets total number of orders
 * @returns {number} Order count
 */
export function getOrderCount() {
  return orders.length;
}