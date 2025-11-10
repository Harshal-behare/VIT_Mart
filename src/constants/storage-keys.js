/**
 * LocalStorage Keys
 * Centralized storage key constants
 */

export const STORAGE_KEYS = {
  CART: 'cart',
  ORDERS: 'orders',
  USER_PREFERENCES: 'userPreferences',
  WISHLIST: 'wishlist',
  SEARCH_HISTORY: 'searchHistory',
  USER_PROFILE: 'userProfile',
};

/**
 * Gets full storage key with prefix
 * @param {string} key - Storage key
 * @returns {string} Prefixed key
 */
export function getStorageKey(key) {
  return `vit-mart-${key}`;
}

/**
 * All prefixed storage keys
 */
export const PREFIXED_KEYS = {
  CART: getStorageKey(STORAGE_KEYS.CART),
  ORDERS: getStorageKey(STORAGE_KEYS.ORDERS),
  USER_PREFERENCES: getStorageKey(STORAGE_KEYS.USER_PREFERENCES),
  WISHLIST: getStorageKey(STORAGE_KEYS.WISHLIST),
  SEARCH_HISTORY: getStorageKey(STORAGE_KEYS.SEARCH_HISTORY),
  USER_PROFILE: getStorageKey(STORAGE_KEYS.USER_PROFILE),
};
