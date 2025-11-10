/**
 * DOM Utility Functions
 * Common operations for manipulating the DOM
 */

/**
 * Safely gets a DOM element
 * @param {string} selector - CSS selector
 * @returns {Element|null} DOM element or null if not found
 */
export function getElement(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
  }
  return element;
}

/**
 * Gets all DOM elements matching selector
 * @param {string} selector - CSS selector
 * @returns {NodeList} Collection of DOM elements
 */
export function getElements(selector) {
  return document.querySelectorAll(selector);
}

/**
 * Safely sets element innerHTML
 * @param {Element} element - Target element
 * @param {string} html - HTML content
 */
export function setHTML(element, html) {
  if (!element) {
    console.error('Cannot set HTML on null element');
    return;
  }
  element.innerHTML = html;
}

/**
 * Safely sets element text content
 * @param {Element} element - Target element
 * @param {string} text - Text content
 */
export function setText(element, text) {
  if (!element) {
    console.error('Cannot set text on null element');
    return;
  }
  element.textContent = text;
}

/**
 * Adds event listener with error handling
 * @param {Element} element - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler function
 */
export function addEventListener(element, event, handler) {
  if (!element) {
    console.error('Cannot add event listener to null element');
    return;
  }
  try {
    element.addEventListener(event, handler);
  } catch (error) {
    console.error(`Failed to add event listener: ${error.message}`);
  }
}

/**
 * Adds class to element
 * @param {Element} element - Target element
 * @param {string} className - Class name
 */
export function addClass(element, className) {
  if (!element) return;
  element.classList.add(className);
}

/**
 * Removes class from element
 * @param {Element} element - Target element
 * @param {string} className - Class name
 */
export function removeClass(element, className) {
  if (!element) return;
  element.classList.remove(className);
}

/**
 * Toggles class on element
 * @param {Element} element - Target element
 * @param {string} className - Class name
 */
export function toggleClass(element, className) {
  if (!element) return;
  element.classList.toggle(className);
}

/**
 * Checks if element has class
 * @param {Element} element - Target element
 * @param {string} className - Class name
 * @returns {boolean} True if element has class
 */
export function hasClass(element, className) {
  if (!element) return false;
  return element.classList.contains(className);
}

/**
 * Creates element with optional classes and attributes
 * @param {string} tag - HTML tag name
 * @param {Object} options - Configuration object
 * @param {Array<string>} options.classes - CSS classes
 * @param {Object} options.attributes - Element attributes
 * @param {string} options.text - Text content
 * @param {string} options.html - HTML content
 * @returns {Element} Created element
 */
export function createElement(tag, options = {}) {
  const element = document.createElement(tag);

  if (options.classes) {
    options.classes.forEach((cls) => element.classList.add(cls));
  }

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (options.text) {
    element.textContent = options.text;
  }

  if (options.html) {
    element.innerHTML = options.html;
  }

  return element;
}

/**
 * Shows element
 * @param {Element} element - Target element
 */
export function show(element) {
  if (!element) return;
  element.style.display = '';
}

/**
 * Hides element
 * @param {Element} element - Target element
 */
export function hide(element) {
  if (!element) return;
  element.style.display = 'none';
}

/**
 * Gets data attribute value
 * @param {Element} element - Target element
 * @param {string} name - Attribute name (without 'data-' prefix)
 * @returns {string|null} Attribute value
 */
export function getDataAttribute(element, name) {
  if (!element) return null;
  return element.getAttribute(`data-${name}`);
}

/**
 * Sets data attribute value
 * @param {Element} element - Target element
 * @param {string} name - Attribute name (without 'data-' prefix)
 * @param {string} value - Attribute value
 */
export function setDataAttribute(element, name, value) {
  if (!element) return;
  element.setAttribute(`data-${name}`, value);
}
