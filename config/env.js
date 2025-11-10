/**
 * Environment configuration loader
 * Handles environment variables with fallback defaults
 */

const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://supersimplebackend.dev',
  BACKEND_CART_ENDPOINT: import.meta.env.VITE_BACKEND_CART_ENDPOINT || '/cart',
  BACKEND_PRODUCTS_ENDPOINT: import.meta.env.VITE_BACKEND_PRODUCTS_ENDPOINT || '/products',
  ENABLE_SEARCH: import.meta.env.VITE_ENABLE_SEARCH !== 'false',
  ENABLE_WISHLIST: import.meta.env.VITE_ENABLE_WISHLIST !== 'false',
  ENABLE_REVIEWS: import.meta.env.VITE_ENABLE_REVIEWS !== 'false',
  ITEMS_PER_PAGE: parseInt(import.meta.env.VITE_ITEMS_PER_PAGE || '12', 10),
  SHOW_LOADING_SPINNER: import.meta.env.VITE_SHOW_LOADING_SPINNER !== 'false',
};

export default CONFIG;
