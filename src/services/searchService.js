/**
 * Product Search Service
 * Handles product search and filtering
 */

import { sanitizeString } from '../utils/sanitizer.js';
import { truncateString } from '../utils/formatters.js';

class SearchService {
  /**
   * Searches products by query
   * @param {Array} products - Products to search
   * @param {string} query - Search query
   * @returns {Array} Matching products
   */
  static searchProducts(products, query) {
    if (!query || typeof query !== 'string') return products;

    const searchTerm = sanitizeString(query).toLowerCase();

    return products.filter((product) => {
      const name = (product.name || '').toLowerCase();
      const keywords = (product.keywords || []).map((k) => k.toLowerCase());

      return (
        name.includes(searchTerm)
        || keywords.some((k) => k.includes(searchTerm))
      );
    });
  }

  /**
   * Filters products by category
   * @param {Array} products - Products to filter
   * @param {string} category - Category filter
   * @returns {Array} Filtered products
   */
  static filterByCategory(products, category) {
    if (!category) return products;

    return products.filter((product) => {
      if (!product.type) return true;
      return product.type === category;
    });
  }

  /**
   * Filters products by price range
   * @param {Array} products - Products to filter
   * @param {number} minPrice - Minimum price (in cents)
   * @param {number} maxPrice - Maximum price (in cents)
   * @returns {Array} Filtered products
   */
  static filterByPrice(products, minPrice = 0, maxPrice = Infinity) {
    return products.filter((product) => {
      const price = product.priceCents || 0;
      return price >= minPrice && price <= maxPrice;
    });
  }

  /**
   * Filters products by rating
   * @param {Array} products - Products to filter
   * @param {number} minRating - Minimum rating
   * @returns {Array} Filtered products
   */
  static filterByRating(products, minRating = 0) {
    return products.filter((product) => {
      const rating = (product.rating && product.rating.stars) || 0;
      return rating >= minRating;
    });
  }

  /**
   * Sorts products
   * @param {Array} products - Products to sort
   * @param {string} sortBy - Sort method
   * @returns {Array} Sorted products
   */
  static sortProducts(products, sortBy = 'relevance') {
    const sorted = [...products];

    switch (sortBy) {
      case 'price_low_high':
        return sorted.sort((a, b) => (a.priceCents || 0) - (b.priceCents || 0));

      case 'price_high_low':
        return sorted.sort((a, b) => (b.priceCents || 0) - (a.priceCents || 0));

      case 'rating':
        return sorted.sort(
          (a, b) => ((b.rating && b.rating.stars) || 0) - ((a.rating && a.rating.stars) || 0),
        );

      case 'newest':
        return sorted.reverse();

      default:
        return sorted;
    }
  }

  /**
   * Applies all filters and sorting
   * @param {Array} products - Products to filter
   * @param {Object} options - Filter options
   * @returns {Array} Filtered products
   */
  static applyFilters(products, options = {}) {
    const {
      query = '',
      category = null,
      minPrice = 0,
      maxPrice = Infinity,
      minRating = 0,
      sortBy = 'relevance',
    } = options;

    let filtered = [...products];

    // Apply search
    if (query) {
      filtered = this.searchProducts(filtered, query);
    }

    // Apply category filter
    if (category) {
      filtered = this.filterByCategory(filtered, category);
    }

    // Apply price filter
    filtered = this.filterByPrice(filtered, minPrice, maxPrice);

    // Apply rating filter
    if (minRating > 0) {
      filtered = this.filterByRating(filtered, minRating);
    }

    // Apply sorting
    filtered = this.sortProducts(filtered, sortBy);

    return filtered;
  }

  /**
   * Gets suggestions based on query
   * @param {Array} products - Products to search
   * @param {string} query - Search query
   * @param {number} limit - Max suggestions
   * @returns {Array} Search suggestions
   */
  static getSuggestions(products, query, limit = 5) {
    if (!query || query.length < 2) return [];

    const searchTerm = query.toLowerCase();
    const suggestions = new Set();

    products.forEach((product) => {
      if (suggestions.size >= limit) return;

      const name = (product.name || '').toLowerCase();
      if (name.includes(searchTerm)) {
        suggestions.add(truncateString(product.name, 50));
      }

      if (suggestions.size >= limit) return;

      const keywords = (product.keywords || []).map((k) => k.toLowerCase());
      keywords.forEach((keyword) => {
        if (keyword.includes(searchTerm) && suggestions.size < limit) {
          suggestions.add(keyword);
        }
      });
    });

    return Array.from(suggestions);
  }
}

export { SearchService };
