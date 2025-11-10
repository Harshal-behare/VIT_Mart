# Getting Started with VIT_Mart

Quick start guide to get VIT_Mart up and running.

## Prerequisites

- Node.js 14 or higher
- npm (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
cd VIT_Mart
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:8080`

### 3. Start Shopping!

Browse products, add items to cart, and checkout.

---

## Installation Steps (Detailed)

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd VIT_Mart
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- **ESLint** - Code quality checking
- **Prettier** - Code formatting
- **Jasmine** - Testing framework
- **http-server** - Local development server

### Step 3: Setup Environment (Optional)

```bash
cp .env.example .env
```

Edit `.env` to customize:
- API endpoints
- Feature flags
- UI configuration

### Step 4: Start Development

**Option A: Using Live Server** (recommended)
```bash
npm run dev
```

**Option B: Using HTTP Server**
```bash
npm start
```

Then open `http://localhost:8080` in your browser.

---

## Project Structure

```
VIT_Mart/
├── src/                    # New utilities and services
│   ├── components/         # UI components (Modal, Spinner, etc.)
│   ├── services/           # Business logic services
│   ├── utils/              # Utility functions
│   └── constants/          # App constants
├── data/                   # Data models and management
├── scripts/                # Main application scripts
├── styles/                 # CSS stylesheets
├── backend/                # Backend data files
├── tests/                  # Test files
├── config/                 # Configuration files
├── README.md               # Full documentation
├── FEATURES_GUIDE.md       # Feature usage guide
├── API_DOCUMENTATION.md    # API reference
├── CHANGELOG.md            # Version history
├── package.json            # Dependencies
└── .eslintrc.json         # Linting rules
```

---

## First Steps

### 1. Explore the Home Page

The home page displays all available products:
- View product images
- Check ratings and reviews
- See pricing
- Select quantities
- Add items to cart

### 2. Browse Products

**Search:**
- Use the search bar to find products
- Search by product name or keywords

**Filter:**
- Filter by category
- Filter by price range
- Filter by minimum rating

**Sort:**
- By relevance
- By price (low to high, high to low)
- By rating
- By newest

### 3. Add Items to Cart

1. Click "Add to Cart" on any product
2. Select quantity from dropdown
3. Item is immediately added to cart
4. Click cart icon to view cart

### 4. Checkout

1. Click "Cart" in header
2. Review order summary
3. Select delivery option for each item
4. Review payment summary
5. Click "Place Order"

### 5. View Orders

1. Click "Returns & Orders" in header
2. View all past orders
3. Check order status and tracking

---

## Common Tasks

### Running Linter

Check code quality:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint
```

### Formatting Code

Format all code files:
```bash
npm run format
```

### Running Tests

Run all tests:
```bash
npm test
```

Tests include:
- Cart operations
- Product loading
- Order management
- Money formatting
- Order summary rendering

### Adding New Features

1. Create file in appropriate directory (`src/` for new code)
2. Add comprehensive JSDoc comments
3. Add input validation
4. Add error handling
5. Write tests
6. Run linter and formatter
7. Commit changes

---

## Troubleshooting

### Issue: Products not loading

**Check:**
1. Is the backend API running? (https://supersimplebackend.dev)
2. Is your internet connection working?
3. Check browser console (F12) for errors
4. Check Network tab for failed requests

**Solution:**
1. Refresh the page
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try in a different browser

### Issue: Cart data not persisting

**Check:**
1. Is localStorage enabled in your browser?
2. Is your browser in private/incognito mode?

**Solution:**
1. Enable localStorage in browser settings
2. Use normal browsing mode (not private)
3. Check browser console for errors

### Issue: Styles not loading

**Check:**
1. Are CSS files in the correct location?
2. Check browser console for 404 errors

**Solution:**
1. Clear browser cache
2. Hard refresh (Ctrl+F5 or Cmd+Shift+R)
3. Check file paths in HTML

### Issue: JavaScript errors

**Check:**
1. Browser console (F12 → Console tab)
2. Check for typos in file names
3. Check for missing imports

**Solution:**
1. Read error message carefully
2. Check if file exists
3. Verify import paths
4. Check for syntax errors

---

## Next Steps

### Learn the Codebase

1. Read `README.md` for overview
2. Read `FEATURES_GUIDE.md` for feature details
3. Read `API_DOCUMENTATION.md` for API reference
4. Explore `src/services/` for business logic
5. Explore `src/utils/` for utilities

### Make Changes

1. Familiarize with code structure
2. Make small changes first
3. Test thoroughly
4. Run linter and formatter
5. Commit with clear messages

### Add New Features

1. Plan the feature
2. Identify required files
3. Add JSDoc comments
4. Implement with error handling
5. Add tests
6. Update documentation

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (live reload)
npm run dev

# Start simple HTTP server
npm start

# Check code quality
npm run lint

# Format all code
npm run format

# Run tests
npm test

# Run tests in watch mode (if configured)
npm test -- --watch
```

---

## Code Style Guidelines

### Naming Conventions
- **Variables:** camelCase (`cartCount`, `productId`)
- **Functions:** camelCase (`addToCart`, `formatPrice`)
- **Classes:** PascalCase (`CartService`, `SearchService`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_ITEMS`, `API_ENDPOINT`)
- **Private methods:** prefixed with `_` (`_saveToStorage`)

### File Structure
```javascript
/**
 * File description and purpose
 */

// Imports
import { something } from './file.js';

// Constants
const CONSTANT = 'value';

// Class/Function definitions
export class MyClass {
  // Implementation
}

export function myFunction() {
  // Implementation
}
```

### JSDoc Format
```javascript
/**
 * Brief description of what the function does
 * @param {type} paramName - Description of parameter
 * @returns {type} Description of return value
 * @throws {Error} Description of error conditions
 */
export function myFunction(paramName) {
  // Implementation
}
```

---

## Resources

- **MDN Web Docs:** https://developer.mozilla.org/
- **JavaScript Guide:** https://javascript.info/
- **Git Documentation:** https://git-scm.com/doc
- **npm Guide:** https://docs.npmjs.com/

---

## Getting Help

1. **Check Documentation:**
   - README.md
   - FEATURES_GUIDE.md
   - API_DOCUMENTATION.md
   - CHANGELOG.md

2. **Review Test Files:**
   - Tests show usage examples
   - See expected behavior

3. **Check Browser Console:**
   - F12 → Console tab
   - Look for error messages
   - Check Network tab

4. **Search Online:**
   - GitHub issues
   - Stack Overflow
   - MDN documentation

---

## What's Next?

After getting familiar with the codebase:

1. **Explore Services** - See how state management works
2. **Try Writing Tests** - Practice with test files
3. **Make a Small Change** - Add a feature or fix
4. **Read About Security** - Learn input validation and sanitization
5. **Study Components** - Understand UI components

---

**Happy coding! 🚀**

Last Updated: November 2024
