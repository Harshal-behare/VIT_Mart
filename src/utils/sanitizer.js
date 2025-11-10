/**
 * Sanitization Utilities
 * Prevents XSS attacks by escaping/sanitizing user input
 */

/**
 * Escapes HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text safe for HTML
 */
export function escapeHTML(text) {
  if (typeof text !== 'string') return '';

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Sanitizes HTML string by removing dangerous elements
 * @param {string} html - HTML string to sanitize
 * @returns {string} Sanitized HTML
 */
export function sanitizeHTML(html) {
  if (typeof html !== 'string') return '';

  // Create temporary div to parse HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Remove script and style tags
  const scripts = temp.querySelectorAll('script, style');
  scripts.forEach((script) => script.remove());

  // Remove dangerous attributes
  const allElements = temp.querySelectorAll('*');
  const dangerousAttrs = [
    'onload',
    'onerror',
    'onclick',
    'onchange',
    'onmouseover',
    'onmouseout',
  ];

  allElements.forEach((element) => {
    dangerousAttrs.forEach((attr) => {
      element.removeAttribute(attr);
    });
  });

  return temp.innerHTML;
}

/**
 * Sanitizes string by escaping special characters
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return escapeHTML(str).trim();
}

/**
 * Removes potentially dangerous characters
 * @param {string} str - String to sanitize
 * @returns {string} Cleaned string
 */
export function sanitizeForSQL(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/['";\\]/g, '');
}

/**
 * Validates URL is safe
 * @param {string} url - URL to validate
 * @returns {boolean} True if safe URL
 */
export function isSafeURL(url) {
  if (typeof url !== 'string') return false;

  // Allow only http, https, and relative URLs
  const allowedProtocols = ['http:', 'https:'];

  try {
    if (url.startsWith('/') || url.startsWith('#')) {
      return true; // Relative URL is safe
    }

    const parsed = new URL(url);
    return allowedProtocols.includes(parsed.protocol);
  } catch (error) {
    return false;
  }
}

/**
 * Sanitizes object by escaping all string values
 * @param {Object} obj - Object to sanitize
 * @returns {Object} Sanitized object
 */
export function sanitizeObject(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  const sanitized = Array.isArray(obj) ? [] : {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'string') {
      sanitized[key] = escapeHTML(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  });

  return sanitized;
}

/**
 * Creates safe text node for DOM insertion
 * @param {string} text - Text to create node from
 * @returns {Text} Text node safe for DOM
 */
export function createSafeTextNode(text) {
  return document.createTextNode(text);
}

/**
 * Safely creates HTML element with escaped text
 * @param {string} tag - HTML tag
 * @param {string} text - Text content (will be escaped)
 * @returns {Element} Created element
 */
export function createSafeElement(tag, text = '') {
  const element = document.createElement(tag);
  element.textContent = text; // textContent automatically escapes
  return element;
}
