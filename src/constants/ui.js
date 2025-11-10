/**
 * UI Configuration Constants
 * Centralized UI settings and configuration
 */

export const PAGINATION = {
  DEFAULT_ITEMS_PER_PAGE: 12,
  ITEMS_PER_PAGE_OPTIONS: [6, 12, 24, 48],
};

export const PRODUCT_SORT_OPTIONS = {
  RELEVANCE: { value: 'relevance', label: 'Relevance' },
  PRICE_LOW_HIGH: { value: 'price_low_high', label: 'Price: Low to High' },
  PRICE_HIGH_LOW: { value: 'price_high_low', label: 'Price: High to Low' },
  RATING: { value: 'rating', label: 'Rating' },
  NEWEST: { value: 'newest', label: 'Newest' },
};

export const PRODUCT_FILTERS = {
  MIN_PRICE: 0,
  MAX_PRICE: 10000, // in cents
  CATEGORIES: ['electronics', 'clothing', 'kitchen', 'books', 'sports'],
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const TOAST_DURATION = 3000; // milliseconds

export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const CART_ACTIONS = {
  ADD_ITEM: 'add_item',
  REMOVE_ITEM: 'remove_item',
  UPDATE_QUANTITY: 'update_quantity',
  UPDATE_DELIVERY: 'update_delivery',
  CLEAR_CART: 'clear_cart',
};

export const MAX_CART_ITEMS = 100;
export const MAX_QUANTITY_PER_ITEM = 10;

export const ANIMATION_DURATION = {
  SHORT: 200, // ms
  MEDIUM: 400, // ms
  LONG: 600, // ms
};

export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_INPUT: 'Invalid input. Please check and try again.',
  NOT_FOUND: 'The requested item was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  STORAGE_ERROR: 'Failed to save data. Please try again.',
  FETCH_ERROR: 'Failed to load data. Please try again.',
};

export const SUCCESS_MESSAGES = {
  ITEM_ADDED: 'Item added to cart!',
  ITEM_REMOVED: 'Item removed from cart.',
  ORDER_PLACED: 'Order placed successfully!',
  DATA_SAVED: 'Data saved successfully.',
};
