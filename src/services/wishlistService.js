/**
 * Wishlist Service
 * Manages product wishlist functionality
 */

import { PREFIXED_KEYS } from '../constants/storage-keys.js';

/**
 * Wishlist Management
 */
class WishlistService {
  constructor() {
    this.wishlist = this.loadWishlist();
  }

  /**
   * Loads wishlist from storage
   * @returns {Array<string>} Product IDs in wishlist
   * @private
   */
  loadWishlist() {
    try {
      const stored = localStorage.getItem(PREFIXED_KEYS.WISHLIST);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading wishlist:', error);
      return [];
    }
  }

  /**
   * Saves wishlist to storage
   * @private
   */
  saveWishlist() {
    try {
      localStorage.setItem(PREFIXED_KEYS.WISHLIST, JSON.stringify(this.wishlist));
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  }

  /**
   * Adds item to wishlist
   * @param {string} productId - Product ID
   * @returns {boolean} True if added
   */
  add(productId) {
    if (!productId || typeof productId !== 'string') {
      console.error('Invalid product ID:', productId);
      return false;
    }

    if (!this.wishlist.includes(productId)) {
      this.wishlist.push(productId);
      this.saveWishlist();
      return true;
    }
    return false;
  }

  /**
   * Removes item from wishlist
   * @param {string} productId - Product ID
   * @returns {boolean} True if removed
   */
  remove(productId) {
    if (!productId || typeof productId !== 'string') {
      console.error('Invalid product ID:', productId);
      return false;
    }

    const index = this.wishlist.indexOf(productId);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
      this.saveWishlist();
      return true;
    }
    return false;
  }

  /**
   * Checks if product in wishlist
   * @param {string} productId - Product ID
   * @returns {boolean} True if in wishlist
   */
  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  /**
   * Gets all wishlist items
   * @returns {Array<string>} Product IDs
   */
  getAll() {
    return [...this.wishlist];
  }

  /**
   * Clears wishlist
   */
  clear() {
    this.wishlist = [];
    this.saveWishlist();
  }

  /**
   * Gets wishlist count
   * @returns {number} Number of items
   */
  getCount() {
    return this.wishlist.length;
  }
}

export const wishlistService = new WishlistService();
