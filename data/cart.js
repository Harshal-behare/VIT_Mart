/**
 * Shopping Cart Management
 * Manages cart state with localStorage persistence
 */

/**
 * @type {Array<Object>} Current cart items
 * @property {string} productId - Product ID
 * @property {number} quantity - Item quantity
 * @property {string} deliveryOptionId - Selected delivery option
 */
export let cart;

loadFromStorage();

/**
 * Loads cart from localStorage or initializes with default items
 * @returns {void}
 */
export function loadFromStorage() {
  try {
    const stored = localStorage.getItem('cart');
    cart = stored ? JSON.parse(stored) : null;

    if (!cart || !Array.isArray(cart)) {
      cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      }];
    }
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    cart = [];
  }
}

/**
 * Saves cart to localStorage
 * @returns {void}
 * @private
 */
function saveToStorage() {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
}

/**
 * Adds item to cart or increments quantity if already present
 * @param {string} productId - Product ID to add
 * @param {number} quantity - Quantity to add (default: 1)
 * @returns {void}
 */
export function addToCart(productId, quantity = 1) {
  if (!productId || typeof productId !== 'string') {
    console.error('Invalid product ID:', productId);
    return;
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    console.error('Invalid quantity:', quantity);
    return;
  }

  const matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1',
    });
  }

  saveToStorage();
}

/**
 * Removes item from cart
 * @param {string} productId - Product ID to remove
 * @returns {void}
 */
export function removeFromCart(productId) {
  if (!productId || typeof productId !== 'string') {
    console.error('Invalid product ID:', productId);
    return;
  }

  const originalLength = cart.length;
  cart = cart.filter((item) => item.productId !== productId);

  if (cart.length !== originalLength) {
    saveToStorage();
  }
}

/**
 * Updates quantity for a cart item
 * @param {string} productId - Product ID
 * @param {number} quantity - New quantity
 * @returns {void}
 */
export function updateQuantity(productId, quantity) {
  if (!productId || typeof productId !== 'string') {
    console.error('Invalid product ID:', productId);
    return;
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
    console.error('Invalid quantity:', quantity);
    return;
  }

  const item = cart.find((cartItem) => cartItem.productId === productId);
  if (item) {
    item.quantity = quantity;
    saveToStorage();
  }
}

/**
 * Updates delivery option for a cart item
 * @param {string} productId - Product ID
 * @param {string} deliveryOptionId - Delivery option ID
 * @returns {void}
 */
export function updateDeliveryOption(productId, deliveryOptionId) {
  if (!productId || typeof productId !== 'string') {
    console.error('Invalid product ID:', productId);
    return;
  }

  if (!deliveryOptionId || typeof deliveryOptionId !== 'string') {
    console.error('Invalid delivery option ID:', deliveryOptionId);
    return;
  }

  const item = cart.find((cartItem) => cartItem.productId === productId);
  if (item) {
    item.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}

/**
 * Clears entire cart
 * @returns {void}
 */
export function clearCart() {
  cart = [];
  saveToStorage();
}

/**
 * Gets total number of items in cart
 * @returns {number} Total items
 */
export function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Loads cart from backend API using XMLHttpRequest
 * @param {Function} callback - Function to call when cart is loaded
 * @returns {void}
 * @deprecated Use loadCartFetch instead
 */
export function loadCart(callback) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    try {
      console.log(xhr.response);
      if (callback) callback();
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  });

  xhr.addEventListener('error', () => {
    console.error('Failed to load cart from backend');
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

/**
 * Loads cart from backend API using Fetch API
 * @returns {Promise<void>}
 */
export async function loadCartFetch() {
  try {
    const response = await fetch('https://supersimplebackend.dev/cart');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Cart loaded from backend:', data);
  } catch (error) {
    console.error('Error loading cart from backend:', error);
  }
}