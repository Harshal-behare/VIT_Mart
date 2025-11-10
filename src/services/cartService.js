/**
 * Cart Service
 * Enhanced cart management with validation and error handling
 */

import { store } from './store.js';
import { errorHandler, AppError } from './errorHandler.js';
import {
  validateProductId,
  validateQuantity,
  validateDeliveryOptionId,
} from '../utils/validation.js';
import { PREFIXED_KEYS } from '../constants/storage-keys.js';

class CartService {
  constructor() {
    this.cart = this.loadCart();
  }

  /**
   * Loads cart from storage
   * @returns {Array} Cart items
   */
  loadCart() {
    try {
      const stored = localStorage.getItem(PREFIXED_KEYS.CART);
      if (!stored) {
        return [];
      }
      return JSON.parse(stored);
    } catch (error) {
      errorHandler.handle(error, 'CartService.loadCart');
      return [];
    }
  }

  /**
   * Saves cart to storage
   * @private
   */
  saveCart() {
    try {
      localStorage.setItem(PREFIXED_KEYS.CART, JSON.stringify(this.cart));
      store.saveCart(this.cart);
    } catch (error) {
      throw errorHandler.handle(error, 'CartService.saveCart');
    }
  }

  /**
   * Gets cart contents
   * @returns {Array} Cart items
   */
  getCart() {
    return [...this.cart];
  }

  /**
   * Gets cart item count
   * @returns {number} Total items in cart
   */
  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Adds item to cart
   * @param {string} productId - Product ID
   * @param {number} quantity - Quantity (default: 1)
   * @throws {AppError} If product ID or quantity invalid
   */
  addToCart(productId, quantity = 1) {
    // Validate inputs
    if (!validateProductId(productId)) {
      throw new AppError('Invalid product ID', 'INVALID_PRODUCT_ID');
    }

    if (!validateQuantity(quantity)) {
      throw new AppError('Invalid quantity. Must be between 1 and 100', 'INVALID_QUANTITY');
    }

    try {
      // Find existing item
      const existingItem = this.cart.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.push({
          productId,
          quantity,
          deliveryOptionId: '1',
        });
      }

      this.saveCart();
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw errorHandler.handle(error, 'CartService.addToCart');
    }
  }

  /**
   * Removes item from cart
   * @param {string} productId - Product ID
   * @throws {AppError} If product ID invalid
   */
  removeFromCart(productId) {
    if (!validateProductId(productId)) {
      throw new AppError('Invalid product ID', 'INVALID_PRODUCT_ID');
    }

    try {
      this.cart = this.cart.filter((item) => item.productId !== productId);
      this.saveCart();
    } catch (error) {
      throw errorHandler.handle(error, 'CartService.removeFromCart');
    }
  }

  /**
   * Updates item quantity
   * @param {string} productId - Product ID
   * @param {number} quantity - New quantity
   * @throws {AppError} If inputs invalid
   */
  updateQuantity(productId, quantity) {
    if (!validateProductId(productId)) {
      throw new AppError('Invalid product ID', 'INVALID_PRODUCT_ID');
    }

    if (!validateQuantity(quantity)) {
      throw new AppError('Invalid quantity. Must be between 1 and 100', 'INVALID_QUANTITY');
    }

    try {
      const item = this.cart.find((cartItem) => cartItem.productId === productId);

      if (!item) {
        throw new AppError('Product not in cart', 'PRODUCT_NOT_IN_CART');
      }

      item.quantity = quantity;
      this.saveCart();
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw errorHandler.handle(error, 'CartService.updateQuantity');
    }
  }

  /**
   * Updates delivery option
   * @param {string} productId - Product ID
   * @param {string} deliveryOptionId - Delivery option ID
   * @throws {AppError} If inputs invalid
   */
  updateDeliveryOption(productId, deliveryOptionId) {
    if (!validateProductId(productId)) {
      throw new AppError('Invalid product ID', 'INVALID_PRODUCT_ID');
    }

    if (!validateDeliveryOptionId(deliveryOptionId)) {
      throw new AppError('Invalid delivery option', 'INVALID_DELIVERY_OPTION');
    }

    try {
      const item = this.cart.find((cartItem) => cartItem.productId === productId);

      if (!item) {
        throw new AppError('Product not in cart', 'PRODUCT_NOT_IN_CART');
      }

      item.deliveryOptionId = deliveryOptionId;
      this.saveCart();
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw errorHandler.handle(error, 'CartService.updateDeliveryOption');
    }
  }

  /**
   * Clears entire cart
   */
  clearCart() {
    try {
      this.cart = [];
      this.saveCart();
    } catch (error) {
      throw errorHandler.handle(error, 'CartService.clearCart');
    }
  }

  /**
   * Gets cart item by product ID
   * @param {string} productId - Product ID
   * @returns {Object|null} Cart item or null
   */
  getCartItem(productId) {
    return this.cart.find((item) => item.productId === productId) || null;
  }

  /**
   * Checks if product is in cart
   * @param {string} productId - Product ID
   * @returns {boolean} True if product in cart
   */
  isInCart(productId) {
    return this.cart.some((item) => item.productId === productId);
  }

  /**
   * Gets total cart value in cents
   * @param {Function} getProductPrice - Function to get product price
   * @returns {number} Total price in cents
   */
  getCartTotal(getProductPrice) {
    return this.cart.reduce((total, item) => {
      const price = getProductPrice(item.productId) || 0;
      return total + price * item.quantity;
    }, 0);
  }
}

// Export singleton instance
export const cartService = new CartService();
