# VIT_Mart API Documentation

Complete reference for all API endpoints, data structures, and functions used in VIT_Mart.

## Table of Contents
1. [Cart API](#cart-api)
2. [Product API](#product-api)
3. [Order API](#order-api)
4. [Delivery API](#delivery-api)
5. [Utility Functions](#utility-functions)

---

## Cart API

### Data Structure

```javascript
// Cart Item Object
{
  productId: string,          // UUID of the product
  quantity: number,           // Number of items
  deliveryOptionId: string    // Selected delivery option ID
}

// Cart Array
[
  { productId: "abc-123", quantity: 2, deliveryOptionId: "1" },
  { productId: "def-456", quantity: 1, deliveryOptionId: "2" }
]
```

### Functions

#### `loadFromStorage()`
Loads cart from browser's localStorage or initializes with default items.

```javascript
import { loadFromStorage } from '../data/cart.js';

loadFromStorage();
// Cart is now loaded into memory
```

#### `addToCart(productId)`
Adds a product to the cart or increases quantity if already present.

**Parameters:**
- `productId` (string): The ID of the product to add

**Returns:** void

```javascript
import { addToCart } from '../data/cart.js';

addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
```

#### `removeFromCart(productId)`
Removes a product from the cart.

**Parameters:**
- `productId` (string): The ID of the product to remove

**Returns:** void

```javascript
import { removeFromCart } from '../data/cart.js';

removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
```

#### `updateDeliveryOption(productId, deliveryOptionId)`
Updates the delivery option for a cart item.

**Parameters:**
- `productId` (string): The ID of the product
- `deliveryOptionId` (string): The ID of the delivery option

**Returns:** void

```javascript
import { updateDeliveryOption } from '../data/cart.js';

updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '2');
```

#### `loadCart(callback)`
Loads cart from backend API using XMLHttpRequest.

**Parameters:**
- `callback` (function): Function to call when cart is loaded

**Returns:** void

```javascript
import { loadCart } from '../data/cart.js';

loadCart(() => {
  console.log('Cart loaded from backend');
});
```

---

## Product API

### Data Structures

#### Product Class

```javascript
class Product {
  id: string;                 // Unique identifier
  image: string;              // Image URL
  name: string;               // Product name
  rating: {
    stars: number,            // Rating (0-5)
    count: number             // Number of ratings
  };
  priceCents: number;         // Price in cents
}
```

#### Clothing Class (extends Product)

```javascript
class Clothing extends Product {
  sizeChartLink: string;      // URL to size chart image
}
```

#### Appliance Class (extends Product)

```javascript
class Appliance extends Product {
  instructionsLink: string;   // URL to instructions PDF
  warrantyLink: string;       // URL to warranty document
}
```

### Functions

#### `getProduct(productId)`
Retrieves a product by ID.

**Parameters:**
- `productId` (string): The ID of the product

**Returns:** Product object or undefined

```javascript
import { getProduct } from '../data/products.js';

const product = getProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
console.log(product.name);
```

#### `loadProducts(callback)`
Loads products from backend using XMLHttpRequest.

**Parameters:**
- `callback` (function): Function to call when products are loaded

**Returns:** void

```javascript
import { loadProducts } from '../data/products.js';

loadProducts(() => {
  console.log('Products loaded');
});
```

#### `loadProductsFetch()`
Loads products from backend using Fetch API (modern approach).

**Returns:** Promise<void>

```javascript
import { loadProductsFetch } from '../data/products.js';

await loadProductsFetch();
console.log('Products loaded');
```

### Product Methods

#### `getStarsUrl()`
Gets the URL to the star rating image.

**Returns:** string (image URL)

```javascript
const product = getProduct('abc-123');
const starsUrl = product.getStarsUrl();
// Returns: 'images/ratings/rating-45.png' (for 4.5 stars)
```

#### `getPrice()`
Formats the price for display.

**Returns:** string (formatted price)

```javascript
const product = getProduct('abc-123');
console.log(product.getPrice()); // "$10.90"
```

#### `extraInfoHTML()`
Returns HTML for extra product information (varies by product type).

**Returns:** string (HTML markup)

```javascript
const product = getProduct('abc-123');
const extraInfo = product.extraInfoHTML();
```

---

## Order API

### Data Structure

```javascript
// Order Object
{
  id: string,                           // Order ID
  orderTime: number,                    // Timestamp
  totalCents: number,                   // Total in cents
  products: [
    {
      productId: string,
      quantity: number,
      estimatedDeliveryTime: string,
      priceCents: number
    }
  ]
}

// Orders Array
[
  { id: "abc-123", orderTime: 1699612800000, totalCents: 5990, products: [...] }
]
```

### Functions

#### `addOrder(order)`
Adds a new order to the orders list and saves to localStorage.

**Parameters:**
- `order` (object): Order object to add

**Returns:** void

```javascript
import { addOrder } from '../data/orders.js';

const newOrder = {
  id: generateOrderId(),
  orderTime: Date.now(),
  totalCents: 5990,
  products: [...]
};

addOrder(newOrder);
```

#### `getOrders()`
Retrieves all orders.

**Returns:** Array of order objects

```javascript
import { orders } from '../data/orders.js';

console.log(orders); // Array of all orders
```

---

## Delivery API

### Data Structure

```javascript
// Delivery Option Object
{
  id: string,                 // Option ID ('1', '2', '3')
  deliveryDays: number,       // Days for delivery
  priceCents: number,         // Shipping price in cents
  getDeliveryDate: function   // Function returning delivery date
}
```

### Functions

#### `getDeliveryOption(deliveryOptionId)`
Retrieves a delivery option by ID.

**Parameters:**
- `deliveryOptionId` (string): The ID of the delivery option

**Returns:** Delivery option object

```javascript
import { getDeliveryOption } from '../data/deliveryOptions.js';

const option = getDeliveryOption('1');
console.log(option.deliveryDays); // Number of days
console.log(option.priceCents);   // Shipping cost
```

#### `calculateDeliveryDate(deliveryOptionId, quantity)`
Calculates estimated delivery date for an order.

**Parameters:**
- `deliveryOptionId` (string): The ID of the delivery option
- `quantity` (number): Quantity of items

**Returns:** Date object

```javascript
import { calculateDeliveryDate } from '../data/deliveryOptions.js';

const deliveryDate = calculateDeliveryDate('1', 2);
console.log(deliveryDate); // Future date object
```

---

## Utility Functions

### Money Utilities (`scripts/utils/money.js`)

#### `formatCurrency(priceCents)`
Formats price in cents to a currency string.

**Parameters:**
- `priceCents` (number): Price in cents

**Returns:** string (formatted currency)

```javascript
import { formatCurrency } from '../scripts/utils/money.js';

console.log(formatCurrency(1090));  // "10.90"
console.log(formatCurrency(5990));  // "59.90"
```

### DOM Utilities (`src/utils/dom.js`) [NEW]

#### `getElement(selector)`
Safely gets a DOM element.

```javascript
const element = getElement('.js-products-grid');
```

#### `setHTML(element, html)`
Safely sets element innerHTML.

```javascript
setHTML(element, '<div>Content</div>');
```

### Validation Utilities (`src/utils/validation.js`) [NEW]

#### `validateProductId(productId)`
Validates product ID format.

```javascript
if (validateProductId(productId)) {
  addToCart(productId);
}
```

#### `validateQuantity(quantity)`
Validates quantity is a positive integer.

```javascript
if (validateQuantity(qty)) {
  updateQuantity(qty);
}
```

### Sanitization Utilities (`src/utils/sanitizer.js`) [NEW]

#### `sanitizeHTML(html)`
Removes potentially dangerous HTML/scripts.

```javascript
const safe = sanitizeHTML(userInput);
```

#### `sanitizeString(str)`
Escapes special characters.

```javascript
const safe = sanitizeString(userInput);
```

---

## Error Handling

### Error Types

#### `ValidationError`
Thrown when input validation fails.

```javascript
try {
  addToCart(invalidProductId);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Invalid product');
  }
}
```

#### `StorageError`
Thrown when localStorage operations fail.

```javascript
try {
  loadFromStorage();
} catch (error) {
  if (error instanceof StorageError) {
    console.error('Failed to load cart');
  }
}
```

---

## Storage Keys

All data is stored in localStorage with these keys:

- `cart` - Shopping cart items
- `orders` - Order history
- `userPreferences` - User settings
- `wishlist` - Saved products (if wishlist enabled)

## Rate Limiting

No rate limiting is implemented. However, the backend API may have its own limits.

---

**Last Updated:** November 2024
**API Version:** 1.0.0
