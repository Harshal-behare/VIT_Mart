# VIT_Mart Features Guide

Complete guide to all features and how to use them.

## Table of Contents
1. [Core E-Commerce Features](#core-e-commerce-features)
2. [UI/UX Features](#uiux-features)
3. [Data Management](#data-management)
4. [Developer Features](#developer-features)
5. [Security Features](#security-features)

---

## Core E-Commerce Features

### Shopping Cart
The shopping cart is the heart of the e-commerce experience.

**Features:**
- Add items to cart (with quantity)
- Remove items from cart
- Update item quantities
- Change delivery options
- Cart persistence (localStorage)
- Auto-load default items

**Usage:**
```javascript
import { addToCart, removeFromCart, updateQuantity } from '../data/cart.js';

// Add item to cart
addToCart('product-id');

// Add multiple items at once
addToCart('product-id', 5);

// Update quantity
updateQuantity('product-id', 3);

// Remove item
removeFromCart('product-id');
```

### Product Catalog
Browse and manage products in the catalog.

**Features:**
- Load products from backend
- Product classes with inheritance
- Support for product types (Clothing, Appliance, etc.)
- Product ratings and reviews
- Product pricing
- Product images

**Usage:**
```javascript
import { loadProductsFetch, getProduct, products } from '../data/products.js';

// Load all products
await loadProductsFetch();

// Get specific product
const product = getProduct('product-id');
console.log(product.getName());
console.log(product.getPrice()); // "$19.99"
```

### Order Management
Create and track customer orders.

**Features:**
- Create new orders
- Store order history
- Retrieve orders by ID
- Track order status
- Order persistence

**Usage:**
```javascript
import { addOrder, getOrders, getOrderById } from '../data/orders.js';

// Create new order
const order = {
  id: 'order-12345',
  orderTime: Date.now(),
  totalCents: 5990,
  products: [...]
};

addOrder(order);

// Get all orders
const allOrders = getOrders();

// Get specific order
const order = getOrderById('order-12345');
```

### Delivery Options
Multiple delivery methods with different speeds and prices.

**Features:**
- Multiple delivery options
- Pricing for each option
- Estimated delivery dates
- Option selection per item

**Usage:**
```javascript
import { getDeliveryOption } from '../data/deliveryOptions.js';

const option = getDeliveryOption('1'); // Standard delivery
console.log(option.deliveryDays); // 7
console.log(option.priceCents); // 799 (7.99)
```

---

## UI/UX Features

### Loading Spinner
Shows loading state to users during async operations.

**Features:**
- Overlay spinner with backdrop
- Custom loading messages
- Smooth animations
- Auto-hide capability

**Usage:**
```javascript
import { Spinner } from '../src/components/Spinner.js';

const spinner = Spinner.getInstance();

// Show spinner
spinner.show('Loading products...');

// Hide spinner
spinner.hide();

// Use with async operation
await spinner.withSpinner(async () => {
  await fetchData();
}, 'Fetching data...');
```

### Modal Dialogs
Show confirmation and alert dialogs to users.

**Features:**
- Confirmation dialogs
- Alert dialogs
- Custom button text
- Animation support
- Keyboard support

**Usage:**
```javascript
import { Modal } from '../src/components/Modal.js';

// Show confirmation
const confirmed = await Modal.confirm(
  'Remove Item?',
  'Are you sure you want to remove this item from cart?',
  {
    confirmText: 'Remove',
    cancelText: 'Keep it',
    confirmClass: 'btn-danger'
  }
);

if (confirmed) {
  // Handle deletion
}

// Show alert
await Modal.alert(
  'Success!',
  'Your order has been placed successfully.',
  { okText: 'Continue' }
);
```

### Toast Notifications
Display temporary notifications to users.

**Features:**
- Success, error, warning, info types
- Auto-dismiss
- Manual dismiss
- Customizable duration
- Animated appearance/disappearance

**Usage:**
```javascript
import { notifications } from '../src/services/notifications.js';

// Show notifications
notifications.success('Item added to cart!');
notifications.error('Failed to load products');
notifications.warning('Low inventory');
notifications.info('Shipping method changed');

// Custom duration
notifications.success('Saved!', 5000); // 5 seconds

// Manual dismiss
const id = notifications.info('Processing...');
setTimeout(() => {
  notifications.remove(id);
}, 3000);
```

### Search Functionality
Search and filter products.

**Features:**
- Text search in product names
- Search by keywords
- Filter by category
- Filter by price range
- Filter by rating
- Sort results
- Search suggestions

**Usage:**
```javascript
import { SearchService } from '../src/services/searchService.js';

// Search products
const results = SearchService.searchProducts(products, 'socks');

// Apply all filters
const filtered = SearchService.applyFilters(products, {
  query: 'shirt',
  category: 'clothing',
  minPrice: 0,
  maxPrice: 5000,
  minRating: 4,
  sortBy: 'price_low_high'
});

// Get suggestions
const suggestions = SearchService.getSuggestions(products, 'sock');
// Returns: ['socks', 'wool socks', ...]
```

### Pagination
Handle large product lists with pagination.

**Features:**
- Configurable items per page
- Next/previous page navigation
- Go to specific page
- Pagination info
- First/last page detection

**Usage:**
```javascript
import { Paginator } from '../src/components/Paginator.js';

const paginator = new Paginator(100, 12); // 100 items, 12 per page

// Get current page items
const pageItems = paginator.getPageItems(allProducts);

// Navigation
paginator.nextPage();
paginator.previousPage();
paginator.goToPage(5);

// Info
console.log(paginator.getInfo());
// { currentPage: 1, totalPages: 9, itemsPerPage: 12, ... }
```

---

## Data Management

### State Management
Centralized application state.

**Features:**
- Global state store
- Subscriber pattern
- Automatic persistence
- State validation

**Usage:**
```javascript
import { store } from '../src/services/store.js';

// Get state
const state = store.getState();

// Update state
store.setState({ cart: [...], orders: [...] }, 'cart_updated');

// Subscribe to changes
const unsubscribe = store.subscribe((state, action) => {
  console.log('State changed:', action);
});

// Unsubscribe
unsubscribe();
```

### Error Handling
Centralized error management.

**Features:**
- Custom error types
- Error logging
- User-friendly messages
- Error recovery

**Usage:**
```javascript
import { errorHandler, AppError } from '../src/services/errorHandler.js';

// Subscribe to errors
errorHandler.subscribe(({ message, type, error }) => {
  console.log(`Error (${type}): ${message}`);
});

// Handle errors
try {
  throw new AppError('Custom error message', 'CUSTOM_ERROR');
} catch (error) {
  errorHandler.handle(error, 'OperationName');
}

// Safe operation execution
const result = await errorHandler.tryCatch(
  async () => {
    return await fetchData();
  },
  'DataFetch'
);
```

---

## Developer Features

### DOM Utilities
Common DOM manipulation functions.

**Features:**
- Safe element selection
- Safe HTML/text setting
- Event listener helpers
- Class management
- Element creation

**Usage:**
```javascript
import {
  getElement,
  setHTML,
  setText,
  addEventListener,
  addClass,
  removeClass,
  createElement
} from '../src/utils/dom.js';

// Select elements
const container = getElement('.js-products-grid');

// Safely set content
setHTML(container, '<div>Products</div>');
setText(container, 'Loading...');

// Event handling
addEventListener(button, 'click', () => {
  console.log('Clicked!');
});

// Class management
addClass(element, 'active');
removeClass(element, 'disabled');

// Create elements
const div = createElement('div', {
  classes: ['card', 'primary'],
  attributes: { 'data-id': '123' },
  text: 'Hello'
});
```

### Validation Utilities
Validate user input and data.

**Features:**
- Product ID validation
- Quantity validation
- Delivery option validation
- Email validation
- Phone validation
- String validation
- Object field validation

**Usage:**
```javascript
import {
  validateProductId,
  validateQuantity,
  validateEmail,
  validatePhone
} from '../src/utils/validation.js';

if (!validateProductId(productId)) {
  console.error('Invalid product ID');
}

if (!validateQuantity(qty)) {
  console.error('Quantity must be 1-100');
}

if (!validateEmail(email)) {
  console.error('Invalid email');
}
```

### Sanitization Utilities
Prevent XSS attacks and sanitize input.

**Features:**
- HTML escaping
- Dangerous element removal
- Attribute sanitization
- Safe URL validation
- Object sanitization

**Usage:**
```javascript
import {
  escapeHTML,
  sanitizeHTML,
  sanitizeString,
  isSafeURL
} from '../src/utils/sanitizer.js';

// Escape HTML
const safe = escapeHTML(userInput);

// Sanitize HTML (remove scripts/dangerous attrs)
const cleaned = sanitizeHTML(htmlContent);

// Sanitize strings
const text = sanitizeString(userText);

// Validate URL
if (isSafeURL(url)) {
  window.location.href = url;
}
```

### Formatting Utilities
Format data for display.

**Features:**
- Date formatting
- Number formatting
- File size formatting
- String case conversion
- Text truncation
- Phone number formatting

**Usage:**
```javascript
import {
  formatDate,
  formatDateTime,
  formatNumber,
  toTitleCase,
  formatFileSize,
  truncateString,
  formatPhoneNumber
} from '../src/utils/formatters.js';

console.log(formatDate(Date.now()));
// "November 10, 2024"

console.log(formatNumber(1234.567, 2));
// "1,234.57"

console.log(toTitleCase('hello world'));
// "Hello World"

console.log(truncateString(longText, 50));
// "Lorem ipsum dolor sit amet, consectetur..."
```

---

## Security Features

### Input Validation
All user inputs are validated before processing.

**Implemented in:**
- Cart operations
- Product searches
- Order processing
- Payment information
- User preferences

### Input Sanitization
All user inputs are sanitized to prevent XSS attacks.

**Sanitized inputs:**
- Product names and descriptions
- User comments and reviews
- Search queries
- Cart item data
- Order information

### Error Messages
Error messages are user-friendly and don't expose internal details.

**Examples:**
- ❌ "Database connection failed at port 5432"
- ✓ "Failed to load products. Please try again."

### Storage Security
LocalStorage data is properly structured and validated on load.

**Implemented:**
- Data type validation
- Array/object structure validation
- Error recovery with defaults
- Data versioning ready

---

## Configuration

### Constants
All hardcoded values are centralized in constants.

**Location:** `src/constants/`

**Files:**
- `api.js` - API endpoints
- `storage-keys.js` - LocalStorage keys
- `ui.js` - UI configuration

**Usage:**
```javascript
import { STORAGE_KEYS } from '../src/constants/storage-keys.js';
import { ERROR_MESSAGES } from '../src/constants/ui.js';

const cart = localStorage.getItem(STORAGE_KEYS.CART);
console.log(ERROR_MESSAGES.NETWORK_ERROR);
```

---

## Best Practices

### Do's ✓
- Use centralized state management
- Handle all errors gracefully
- Validate all inputs
- Sanitize user input
- Use proper TypeScript/JSDoc types
- Log meaningful error messages
- Test edge cases

### Don'ts ✗
- Direct localStorage access (use services)
- Global variables for state
- Unhandled promise rejections
- Trusting user input
- Logging sensitive information
- Direct DOM manipulation (use utilities)
- Mixing concerns in files

---

**Last Updated:** November 2024
