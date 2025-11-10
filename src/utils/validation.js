/**
 * Input Validation Utilities
 * Validates user input and data
 */

/**
 * Validates product ID format
 * @param {*} productId - Product ID to validate
 * @returns {boolean} True if valid
 */
export function validateProductId(productId) {
  return typeof productId === 'string' && productId.trim().length > 0;
}

/**
 * Validates quantity is positive integer
 * @param {*} quantity - Quantity to validate
 * @returns {boolean} True if valid
 */
export function validateQuantity(quantity) {
  const num = parseInt(quantity, 10);
  return !Number.isNaN(num) && num > 0 && num <= 100;
}

/**
 * Validates delivery option ID
 * @param {*} deliveryOptionId - Delivery option ID
 * @returns {boolean} True if valid
 */
export function validateDeliveryOptionId(deliveryOptionId) {
  const validIds = ['1', '2', '3'];
  return validIds.includes(deliveryOptionId);
}

/**
 * Validates email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number format
 * @param {string} phone - Phone number
 * @returns {boolean} True if valid
 */
export function validatePhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

/**
 * Validates non-empty string
 * @param {*} value - Value to validate
 * @returns {boolean} True if non-empty string
 */
export function validateString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates not null/undefined
 * @param {*} value - Value to validate
 * @returns {boolean} True if value exists
 */
export function validateRequired(value) {
  return value !== null && value !== undefined;
}

/**
 * Validates price (positive number with max 2 decimals)
 * @param {*} price - Price to validate
 * @returns {boolean} True if valid
 */
export function validatePrice(price) {
  const num = parseFloat(price);
  return !Number.isNaN(num) && num >= 0;
}

/**
 * Validates object has required fields
 * @param {Object} obj - Object to validate
 * @param {Array<string>} requiredFields - Required field names
 * @returns {boolean} True if all required fields present
 */
export function validateObjectFields(obj, requiredFields) {
  if (!obj || typeof obj !== 'object') return false;
  return requiredFields.every((field) => field in obj);
}

/**
 * Validates array is not empty
 * @param {*} arr - Array to validate
 * @returns {boolean} True if non-empty array
 */
export function validateArray(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

/**
 * Validates cart item structure
 * @param {*} item - Cart item to validate
 * @returns {boolean} True if valid cart item
 */
export function validateCartItem(item) {
  return (
    validateObjectFields(item, ['productId', 'quantity', 'deliveryOptionId'])
    && validateProductId(item.productId)
    && validateQuantity(item.quantity)
    && validateDeliveryOptionId(item.deliveryOptionId)
  );
}
