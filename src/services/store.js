/**
 * Centralized State Management
 * Manages application state and provides consistent state access
 */

import { PREFIXED_KEYS } from '../constants/storage-keys.js';

/**
 * State Store - Manages app-wide state
 */
class StateStore {
  constructor() {
    this.listeners = [];
    this.state = {
      cart: [],
      orders: [],
      products: [],
      userPreferences: this.loadUserPreferences(),
      ui: {
        isLoading: false,
        currentPage: 'home',
        selectedFilter: null,
      },
    };
  }

  /**
   * Subscribes to state changes
   * @param {Function} listener - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Notifies all listeners of state change
   * @param {string} action - Action that triggered change
   */
  notifyListeners(action) {
    this.listeners.forEach((listener) => {
      try {
        listener(this.state, action);
      } catch (error) {
        console.error('Error in state listener:', error);
      }
    });
  }

  /**
   * Gets current state
   * @returns {Object} Current state
   */
  getState() {
    return this.state;
  }

  /**
   * Updates part of state
   * @param {Object} updates - State updates
   * @param {string} action - Action description
   */
  setState(updates, action = 'update') {
    this.state = { ...this.state, ...updates };
    this.notifyListeners(action);
  }

  /**
   * Loads cart from storage
   * @returns {Array} Cart items
   */
  loadCart() {
    try {
      const stored = localStorage.getItem(PREFIXED_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  /**
   * Saves cart to storage
   * @param {Array} cart - Cart items
   */
  saveCart(cart) {
    try {
      localStorage.setItem(PREFIXED_KEYS.CART, JSON.stringify(cart));
      this.state.cart = cart;
      this.notifyListeners('cart_updated');
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  /**
   * Loads orders from storage
   * @returns {Array} Orders
   */
  loadOrders() {
    try {
      const stored = localStorage.getItem(PREFIXED_KEYS.ORDERS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading orders:', error);
      return [];
    }
  }

  /**
   * Saves orders to storage
   * @param {Array} orders - Orders array
   */
  saveOrders(orders) {
    try {
      localStorage.setItem(PREFIXED_KEYS.ORDERS, JSON.stringify(orders));
      this.state.orders = orders;
      this.notifyListeners('orders_updated');
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  }

  /**
   * Loads user preferences from storage
   * @returns {Object} User preferences
   */
  loadUserPreferences() {
    try {
      const stored = localStorage.getItem(PREFIXED_KEYS.USER_PREFERENCES);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading preferences:', error);
      return {};
    }
  }

  /**
   * Saves user preferences
   * @param {Object} preferences - User preferences
   */
  saveUserPreferences(preferences) {
    try {
      localStorage.setItem(PREFIXED_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
      this.state.userPreferences = preferences;
      this.notifyListeners('preferences_updated');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }

  /**
   * Sets loading state
   * @param {boolean} isLoading - Loading status
   */
  setLoading(isLoading) {
    this.state.ui.isLoading = isLoading;
    this.notifyListeners('loading_state_changed');
  }

  /**
   * Clears all state
   */
  clearAll() {
    try {
      localStorage.removeItem(PREFIXED_KEYS.CART);
      localStorage.removeItem(PREFIXED_KEYS.ORDERS);
      localStorage.removeItem(PREFIXED_KEYS.USER_PREFERENCES);
      this.state = {
        cart: [],
        orders: [],
        products: [],
        userPreferences: {},
        ui: { isLoading: false, currentPage: 'home', selectedFilter: null },
      };
      this.notifyListeners('state_cleared');
    } catch (error) {
      console.error('Error clearing state:', error);
    }
  }
}

// Export singleton instance
export const store = new StateStore();
