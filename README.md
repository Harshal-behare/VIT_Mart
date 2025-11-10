# VIT_Mart - E-Commerce Platform

A modern, fully-featured e-commerce application built with vanilla JavaScript, HTML, and CSS. Features a responsive design, shopping cart system, order management, and secure checkout process.

## 🚀 Features

### Core Features
- 🛍️ **Product Catalog** - Browse and search products with filters and sorting
- 🛒 **Shopping Cart** - Add, update, and remove items with persistent storage
- 💳 **Checkout System** - Multi-step checkout with delivery options
- 📦 **Order Management** - Track orders and view order history
- 📱 **Responsive Design** - Mobile-friendly interface
- ⭐ **Product Ratings** - View ratings and reviews
- 🔍 **Search & Filter** - Find products by name, category, and price
- 📋 **Delivery Options** - Choose from multiple delivery methods
- 💾 **Local Storage** - Persistent cart and order data

### Enhanced Features (New!)
- 🔐 **Input Validation** - Secure handling of user data
- 🎯 **Loading States** - User-friendly loading indicators
- ❌ **Error Handling** - Comprehensive error messages
- 🔒 **XSS Prevention** - Input sanitization
- 📄 **JSDoc Documentation** - Well-documented code
- ✅ **Test Coverage** - Unit and integration tests

## 📋 Project Structure

```
VIT_Mart/
├── src/                          # Source code
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Page-specific logic
│   ├── services/                 # API and backend services
│   ├── utils/                    # Utility functions
│   │   ├── dom.js               # DOM manipulation helpers
│   │   ├── validation.js        # Input validation
│   │   ├── sanitizer.js         # XSS prevention
│   │   └── formatters.js        # Data formatting
│   └── constants/                # App constants
│       ├── api.js               # API endpoints
│       ├── storage-keys.js      # LocalStorage keys
│       └── ui.js                # UI configuration
├── data/                         # Data models and management
│   ├── cart.js                  # Cart operations
│   ├── orders.js                # Order operations
│   ├── products.js              # Product data and classes
│   └── deliveryOptions.js       # Delivery configuration
├── scripts/                      # Main application scripts
│   ├── amazon.js                # Home page logic
│   ├── checkout.js              # Checkout logic
│   └── checkout/
│       ├── orderSummary.js      # Order summary rendering
│       └── paymentSummary.js    # Payment summary rendering
├── styles/                       # CSS stylesheets
│   ├── pages/                   # Page-specific styles
│   └── shared/                  # Shared styles
├── backend/                      # Backend data files
│   └── products.json            # Product database
├── images/                       # Static images
├── tests/                        # Test files
│   ├── data/                    # Data tests
│   └── checkout/                # Checkout tests
├── config/                       # Configuration files
│   └── env.js                   # Environment configuration
├── .env.example                  # Environment variables template
├── .eslintrc.json               # ESLint configuration
├── .prettierrc.json             # Prettier formatting
├── package.json                  # Dependencies and scripts
├── README.md                     # This file
└── API_DOCUMENTATION.md          # API reference
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 14+ (for development tools)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VIT_Mart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

   Or start a simple HTTP server:
   ```bash
   npm start
   ```

   Then open `http://localhost:8080` in your browser.

## 📚 Usage

### User Guide

#### Browsing Products
1. Visit the home page to see all products
2. Use the search bar to find specific products
3. Filter by category or price range
4. Sort by price, rating, or relevance

#### Shopping
1. Click "Add to Cart" on any product
2. Select quantity from the dropdown
3. View cart by clicking the cart icon
4. Proceed to checkout

#### Checkout
1. Review your order summary
2. Choose a delivery option
3. Enter shipping information
4. Complete payment
5. View order confirmation

#### Order Tracking
1. Click "Returns & Orders" in the header
2. View all your past orders
3. Track order status

### Developer Guide

#### Running Tests
```bash
npm test
```

#### Linting Code
```bash
npm run lint
```

#### Formatting Code
```bash
npm run format
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# API Configuration
VITE_API_BASE_URL=https://supersimplebackend.dev
VITE_BACKEND_CART_ENDPOINT=/cart
VITE_BACKEND_PRODUCTS_ENDPOINT=/products

# Feature Flags
VITE_ENABLE_SEARCH=true
VITE_ENABLE_WISHLIST=true
VITE_ENABLE_REVIEWS=true

# UI Configuration
VITE_ITEMS_PER_PAGE=12
VITE_SHOW_LOADING_SPINNER=true
```

### Configuration Files

- **`.eslintrc.json`** - Code quality rules
- **`.prettierrc.json`** - Code formatting rules
- **`package.json`** - Project metadata and dependencies

## 📖 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API reference including:
- Cart Management API
- Product API
- Order Management API
- Delivery Options API

## 🗂️ Key Files Explained

### Data Management (`data/`)

**`cart.js`**
- Manages shopping cart state
- Persists cart to localStorage
- Functions: `addToCart()`, `removeFromCart()`, `updateDeliveryOption()`

**`products.js`**
- Product data models and classes
- Product class hierarchy (Product → Clothing, Electronics, etc.)
- Functions: `getProduct()`, `loadProducts()`, `loadProductsFetch()`

**`orders.js`**
- Order management and history
- Functions: `addOrder()`, `getOrders()`

**`deliveryOptions.js`**
- Delivery method configurations
- Pricing and timing for each option

### UI Rendering (`scripts/`)

**`amazon.js`**
- Home page product grid rendering
- Search and filter implementation
- Event handlers for cart operations

**`checkout.js`**
- Checkout page orchestration
- Loads products and cart data
- Error handling for page load

**`checkout/orderSummary.js`**
- Renders order items
- Delivery option selection
- Item removal interface

**`checkout/paymentSummary.js`**
- Calculates totals and taxes
- Displays order summary
- Checkout button

## 🧪 Testing

The project includes test suites for:
- Money formatting (`tests/utils/moneyTest.js`)
- Cart operations (`tests/data/cartTest.js`)
- Order summary rendering (`tests/checkout/orderSummaryTest.js`)

Run tests with:
```bash
npm test
```

## 🔒 Security Features

- **Input Sanitization** - XSS prevention for user inputs
- **Input Validation** - Verify data before processing
- **Secure LocalStorage** - Properly serialize/deserialize data
- **Error Messages** - Don't expose sensitive information

## 🎨 Styling

The application uses a clean, modern design with:
- Responsive grid layout
- Mobile-first approach
- Consistent color scheme
- Professional typography (Roboto font)

## 🐛 Troubleshooting

### Cart data not persisting
- Check browser's localStorage is enabled
- Clear browser cache and try again
- Check browser console for errors

### Products not loading
- Verify API endpoint in `.env`
- Check network tab for failed requests
- Ensure backend server is running

### Styles not loading
- Clear cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
- Check CSS file paths are correct
- Verify styles/ folder exists

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for error messages
4. Review test files for usage examples

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Contributing

1. Create a feature branch: `git checkout -b feature/new-feature`
2. Make changes and test thoroughly
3. Run linter and formatter: `npm run lint && npm run format`
4. Commit with clear messages
5. Push to branch and create pull request

## 🎯 Roadmap

### Planned Features
- [ ] User authentication system
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Admin dashboard for product management
- [ ] Real payment gateway integration
- [ ] Email notifications
- [ ] Advanced search with filters
- [ ] Product recommendations

---

**Last Updated:** November 2024
**Version:** 1.0.0
