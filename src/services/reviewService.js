/**
 * Reviews and Ratings Service
 * Manages product reviews and user ratings
 */

import { PREFIXED_KEYS } from '../constants/storage-keys.js';

/**
 * Reviews and Ratings System
 */
class ReviewService {
  constructor() {
    this.reviews = this.loadReviews();
  }

  /**
   * Loads reviews from storage
   * @returns {Object} Reviews by product ID
   * @private
   */
  loadReviews() {
    try {
      const stored = localStorage.getItem(`${PREFIXED_KEYS.USER_PROFILE}-reviews`);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading reviews:', error);
      return {};
    }
  }

  /**
   * Saves reviews to storage
   * @private
   */
  saveReviews() {
    try {
      localStorage.setItem(`${PREFIXED_KEYS.USER_PROFILE}-reviews`, JSON.stringify(this.reviews));
    } catch (error) {
      console.error('Error saving reviews:', error);
    }
  }

  /**
   * Adds or updates review for product
   * @param {string} productId - Product ID
   * @param {Object} review - Review object
   * @param {number} review.rating - Rating (1-5)
   * @param {string} review.title - Review title
   * @param {string} review.comment - Review comment
   * @returns {boolean} True if added/updated
   */
  addReview(productId, review) {
    if (!productId || typeof productId !== 'string') {
      console.error('Invalid product ID:', productId);
      return false;
    }

    if (!review || typeof review !== 'object') {
      console.error('Invalid review object:', review);
      return false;
    }

    if (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) {
      console.error('Invalid rating:', review.rating);
      return false;
    }

    if (!this.reviews[productId]) {
      this.reviews[productId] = [];
    }

    this.reviews[productId].push({
      ...review,
      timestamp: Date.now(),
    });

    this.saveReviews();
    return true;
  }

  /**
   * Gets reviews for product
   * @param {string} productId - Product ID
   * @returns {Array} Product reviews
   */
  getReviews(productId) {
    return this.reviews[productId] || [];
  }

  /**
   * Gets average rating for product
   * @param {string} productId - Product ID
   * @returns {number} Average rating
   */
  getAverageRating(productId) {
    const reviews = this.getReviews(productId);
    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }

  /**
   * Gets review count for product
   * @param {string} productId - Product ID
   * @returns {number} Number of reviews
   */
  getReviewCount(productId) {
    return this.getReviews(productId).length;
  }

  /**
   * Deletes review by ID
   * @param {string} productId - Product ID
   * @param {number} index - Review index
   * @returns {boolean} True if deleted
   */
  deleteReview(productId, index) {
    if (!this.reviews[productId] || !this.reviews[productId][index]) {
      return false;
    }

    this.reviews[productId].splice(index, 1);
    if (this.reviews[productId].length === 0) {
      delete this.reviews[productId];
    }

    this.saveReviews();
    return true;
  }
}

export const reviewService = new ReviewService();
