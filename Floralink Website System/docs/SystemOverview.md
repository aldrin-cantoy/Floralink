# FloraLink System Overview

## Executive Summary

### Overview
FloraLink is a full-stack eCommerce flower shop website that enables customers to browse, select, and purchase flowers for various occasions. Built with vanilla HTML, CSS, and JavaScript, the system provides a complete shopping experience including occasion-based product categorization, shopping cart functionality, user authentication, secure checkout processing, and comprehensive administrative product management capabilities.

### Key Features
- **Occasion-Based Browsing**: Five curated categories (Romantic, Sympathy & Funeral, Wedding & Engagement, Celebrations, Seasonal & Special Days)
- **Shopping Cart Management**: Add, update, and remove items with persistent cart storage
- **User Authentication**: Secure registration and login with session management
- **Checkout Processing**: Complete order workflow with shipping and payment information
- **Admin Dashboard**: Full CRUD operations for product management
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices
- **Client-Side Architecture**: No backend required, uses localStorage for data persistence

### Target Users

**Customers**: Individuals seeking to purchase flower arrangements for various occasions, ranging from romantic gestures to sympathy expressions and celebratory events.

**Administrators**: Store managers and staff responsible for maintaining the product catalog, managing inventory, and overseeing order fulfillment.

**Guest Users**: Visitors exploring the catalog before committing to registration, with the ability to browse products and view details without authentication.

## System Architecture

### High-Level Architecture Overview

FloraLink follows a three-tier client-side architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  (Router, Pages, UI Components, User Interface)             │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                   Business Logic Layer                       │
│  (CartManager, AuthManager, ProductManager, OrderManager)   │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│         (StorageService, localStorage API)                   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend Technologies**:
- HTML5 (semantic markup, accessibility features)
- CSS3 (flexbox, grid, media queries, animations)
- JavaScript ES6+ (modules, classes, async/await, arrow functions)

**Data Persistence**:
- localStorage API (client-side data storage)
- JSON serialization for complex data structures

**Routing**:
- Hash-based routing (window.location.hash)
- Single-page application (SPA) navigation

**Development**:
- No build process required (vanilla JavaScript)
- Property-based testing with fast-check library
- Modern browser APIs (Fetch, Promise, localStorage)

### Design Principles

1. **Component-Based Architecture**: Modular, reusable UI components with clear responsibilities and minimal coupling

2. **State Management**: Centralized state management for cart and user session, ensuring consistency across the application

3. **Responsive-First**: Mobile-first CSS with progressive enhancement for larger screens, ensuring optimal experience on all devices

4. **Data Persistence**: localStorage for products, users, cart, and orders, eliminating backend dependency while maintaining full CRUD functionality

5. **Client-Side Routing**: Hash-based routing for single-page application navigation without server requests

6. **Accessibility**: Semantic HTML and ARIA attributes for screen reader support and keyboard navigation

7. **Defensive Programming**: Input validation, type checking, and boundary condition handling throughout the codebase

### Component Layers

#### Presentation Layer
**Responsibility**: User interface rendering, user input handling, and visual feedback

**Components**:
- **Router**: Manages hash-based navigation and route handling
- **Page Components**: HomePage, CategoryPage, ProductDetailPage, CartPage, CheckoutPage, LoginPage, SignupPage, AdminDashboard
- **UI Components**: Header, ProductCard, CategoryNav, Footer

**Key Characteristics**:
- Renders dynamic content based on application state
- Handles user interactions and delegates to business logic
- Provides visual feedback for all user actions
- Implements responsive design patterns

#### Business Logic Layer
**Responsibility**: Application logic, data validation, and state management

**Components**:
- **CartManager**: Shopping cart operations and calculations
- **AuthManager**: User authentication and session management
- **ProductManager**: Product CRUD operations and filtering
- **OrderManager**: Order creation and management

**Key Characteristics**:
- Enforces business rules and validation
- Manages application state
- Coordinates between presentation and data layers
- Implements security and access control

#### Data Layer
**Responsibility**: Data persistence and retrieval

**Components**:
- **StorageService**: Abstraction over localStorage operations
- **localStorage API**: Browser-native storage mechanism

**Key Characteristics**:
- Provides consistent data access interface
- Handles serialization/deserialization
- Manages data consistency
- Implements error handling for storage operations

## Core Components

### Router
**Purpose**: Manages client-side navigation using hash-based routing

**Responsibilities**:
- Register route handlers for different URL patterns
- Parse URL hash and extract route parameters
- Navigate between pages without full page reload
- Initialize routing on application startup

**Key Methods**:
- `addRoute(path, handler)`: Register a route with its handler function
- `navigate(path)`: Programmatically navigate to a route
- `getCurrentRoute()`: Get the current active route
- `init()`: Initialize the router and set up event listeners

**Interactions**: Coordinates with all page components to render appropriate content based on URL

### Page Components

#### HomePage
**Purpose**: Landing page displaying featured products and category navigation

**Responsibilities**:
- Display featured flower products with images and prices
- Render category navigation menu
- Show shopping cart icon with item count
- Display authentication status (login/signup or user name/logout)

**Key Features**: Responsive grid layout, dynamic product loading, category quick access

#### CategoryPage
**Purpose**: Display products filtered by occasion-based category

**Responsibilities**:
- Filter products by selected category
- Display product grid with images, names, and prices
- Handle product selection for detail view

**Supported Categories**: Romantic, Sympathy & Funeral, Wedding & Engagement, Celebrations, Seasonal & Special Days

#### ProductDetailPage
**Purpose**: Show comprehensive information about a specific product

**Responsibilities**:
- Display product image, name, price, and description
- Show available quantities and category
- Provide "Add to Cart" functionality
- Handle quantity selection

**Key Features**: High-quality product images, detailed descriptions, quantity selector, add to cart button

#### CartPage
**Purpose**: Display and manage shopping cart contents

**Responsibilities**:
- Show all cart items with images, names, prices, and quantities
- Allow quantity updates (increase/decrease)
- Enable item removal
- Calculate and display total price
- Provide checkout button

**Key Features**: Real-time total calculation, quantity controls, remove item functionality, empty cart handling

#### CheckoutPage
**Purpose**: Process order completion with shipping and payment information

**Responsibilities**:
- Display order summary with all cart items
- Collect shipping address information
- Collect contact information (phone, email)
- Collect payment details (simulated)
- Validate all form inputs
- Create order and clear cart on successful submission

**Security**: Requires authentication, validates all inputs, displays confirmation

#### LoginPage
**Purpose**: Authenticate existing users

**Responsibilities**:
- Display login form (email and password)
- Validate credentials
- Create user session on successful login
- Display error messages for invalid credentials
- Redirect to homepage after successful login

**Key Features**: Email/password validation, error feedback, session creation

#### SignupPage
**Purpose**: Register new user accounts

**Responsibilities**:
- Display registration form (name, email, password)
- Validate input (email format, password length ≥ 8 characters)
- Check for duplicate email addresses
- Create new user account
- Automatically authenticate user after registration
- Redirect to homepage

**Validation Rules**: Unique email, password minimum 8 characters, all fields required

#### AdminDashboard
**Purpose**: Administrative interface for product management

**Responsibilities**:
- Display all products in catalog
- Provide product creation form
- Enable product editing
- Handle product deletion with confirmation
- Manage product categories and featured status
- View all orders

**Access Control**: Restricted to users with admin role, redirects non-admin users

### Business Logic Components

#### CartManager
**Purpose**: Manages shopping cart operations and state

**Key Methods**:
- `addItem(productId, quantity)`: Add product to cart or update quantity
- `removeItem(productId)`: Remove product from cart
- `updateQuantity(productId, quantity)`: Update item quantity
- `getItems()`: Retrieve all cart items
- `getItemCount()`: Get total number of items
- `getTotal()`: Calculate total price
- `clear()`: Empty the cart

**State Management**: Maintains cart state in memory and persists to localStorage

**Calculations**: Real-time total calculation based on product prices and quantities

#### AuthManager
**Purpose**: Handles user authentication and session management

**Key Methods**:
- `login(email, password)`: Authenticate user credentials
- `signup(name, email, password)`: Register new user
- `logout()`: End user session
- `getCurrentUser()`: Get currently authenticated user
- `isAuthenticated()`: Check if user is logged in
- `isAdmin()`: Check if user has admin privileges

**Security Features**: Password hashing, session expiration, role-based access control

**Session Management**: Creates and validates sessions, extends expiry on activity

#### ProductManager
**Purpose**: Manages product catalog and CRUD operations

**Key Methods**:
- `getAllProducts()`: Retrieve all products
- `getProductById(id)`: Get specific product
- `getProductsByCategory(category)`: Filter by category
- `createProduct(product)`: Add new product
- `updateProduct(id, updates)`: Modify existing product
- `deleteProduct(id)`: Remove product
- `getFeaturedProducts(count)`: Get featured products for homepage

**Data Management**: Generates unique IDs, manages timestamps, validates product data

#### OrderManager
**Purpose**: Handles order creation and management

**Key Methods**:
- `createOrder(order)`: Create new order from cart
- `getOrderById(id)`: Retrieve specific order
- `getOrdersByUser(userId)`: Get user's order history

**Order Processing**: Captures cart snapshot, calculates totals, stores shipping and payment info

## Data Model

### Entity Descriptions

#### Product
Represents a flower product in the catalog

**Attributes**:
- `id` (string): Unique identifier (UUID)
- `name` (string): Product name
- `description` (string): Detailed product description
- `price` (number): Price in dollars
- `imageUrl` (string): URL to product image
- `category` (string): Occasion category
- `featured` (boolean): Display on homepage flag
- `createdAt` (string): Creation timestamp (ISO 8601)
- `updatedAt` (string): Last update timestamp (ISO 8601)

**Categories**: Romantic, Sympathy & Funeral, Wedding & Engagement, Celebrations, Seasonal & Special Days

#### User
Represents a customer or administrator account

**Attributes**:
- `id` (string): Unique identifier (UUID)
- `name` (string): Full name
- `email` (string): Email address (unique)
- `passwordHash` (string): Hashed password
- `isAdmin` (boolean): Admin privileges flag
- `createdAt` (string): Registration timestamp (ISO 8601)

**Constraints**: Email must be unique, password minimum 8 characters

#### CartItem
Represents a product in the shopping cart

**Attributes**:
- `productId` (string): Reference to Product.id
- `quantity` (number): Quantity in cart (positive integer)
- `addedAt` (string): Timestamp when added (ISO 8601)

**Relationships**: Many cart items reference one product

#### Order
Represents a completed purchase transaction

**Attributes**:
- `id` (string): Unique identifier (UUID)
- `userId` (string): Reference to User.id
- `items` (CartItem[]): Array of ordered items
- `total` (number): Total price
- `shippingAddress` (object): Street, city, state, zipCode
- `contactInfo` (object): Phone, email
- `paymentInfo` (object): cardLast4, cardType
- `status` (string): Order status
- `createdAt` (string): Order timestamp (ISO 8601)

**Status Values**: pending, confirmed, shipped, delivered

### Relationships

```
User (1) ──── (M) Order
User (1) ──── (M) CartItem
Product (1) ──── (M) CartItem
Product (1) ──── (M) OrderItem
Order (1) ──── (M) OrderItem
```

- One user can place many orders
- One user can have many cart items
- One product can be in many cart items
- One product can be in many order items
- One order contains many order items

### Storage Schema

**localStorage Keys**:
- `floralink_products`: Array of Product objects
- `floralink_users`: Array of User objects
- `floralink_cart`: Array of CartItem objects
- `floralink_orders`: Array of Order objects
- `floralink_session`: Session object with userId and expiresAt

**Data Format**: JSON serialization for all complex data structures

### Entity Relationship Diagram

For a visual representation of the data model and relationships, see [ERD.md](./ERD.md).

## User Roles and Permissions

### Guest User

**Capabilities**:
- Browse product catalog
- View products by category
- View product details
- View featured products on homepage
- Access registration page
- Access login page

**Limitations**:
- Cannot add items to cart
- Cannot access checkout
- Cannot view order history
- Cannot access admin dashboard

**Access Level**: Public, no authentication required

### Registered User

**Capabilities**:
- All Guest User capabilities
- Add products to shopping cart
- Update cart item quantities
- Remove items from cart
- View shopping cart
- Complete checkout process
- Enter shipping and payment information
- Place orders
- View personal order history
- Logout from account

**Limitations**:
- Cannot access admin dashboard
- Cannot manage products
- Cannot view other users' orders

**Access Level**: Authenticated, requires valid session

### Administrator

**Capabilities**:
- All Registered User capabilities
- Access admin dashboard
- Create new products
- Update existing products
- Delete products
- Manage product categories
- Set featured products
- View all customer orders
- Update order status
- View order analytics
- Manage user accounts (future enhancement)

**Limitations**:
- None within the system scope

**Access Level**: Authenticated with admin role flag

### Access Control Mechanisms

**Authentication Check**: Validates session cookie on each request
- No session → Guest access
- Valid session → Load user context
- Expired session → Clear cookie, revert to guest

**Authorization Check**: Verifies user role for protected resources
- Checkout page → Requires authentication
- Admin dashboard → Requires authentication + admin role
- Cart operations → Requires authentication

**Session Management**:
- Session created on login/signup
- Session validated on each request
- Session extended on activity
- Session expires after inactivity period
- Session cleared on logout

**Redirect Behavior**:
- Unauthenticated checkout attempt → Redirect to login
- Non-admin dashboard attempt → Show access denied
- Expired session → Redirect to login

## Key Workflows

### User Registration and Authentication

**Registration Flow**:
1. User visits registration page
2. Enters name, email, and password
3. System validates input format
4. System checks email uniqueness
5. System validates password length (≥ 8 characters)
6. System hashes password
7. System creates user record
8. System creates session
9. System redirects to homepage (authenticated)

**Login Flow**:
1. User visits login page
2. Enters email and password
3. System validates input
4. System finds user by email
5. System verifies password hash
6. System creates new session
7. System loads user's cart
8. System redirects to homepage (authenticated)

**Session Validation** (on every request):
1. Extract session cookie
2. Find session in storage
3. Check session expiration
4. Load user data if valid
5. Extend session expiry
6. Set user context

For detailed authentication diagrams, see [SwimlaneDiagram.md](./SwimlaneDiagram.md#3-user-authentication-flow-detailed).

### Product Browsing and Shopping

**Browse Flow**:
1. User visits website
2. Views featured products on homepage
3. Selects category from navigation
4. Views filtered products by category
5. Clicks product for details
6. Views comprehensive product information

**Add to Cart Flow**:
1. User views product details
2. Selects quantity
3. Clicks "Add to Cart"
4. System checks authentication
5. If not authenticated, prompts login
6. System adds/updates cart item
7. System persists cart to localStorage
8. System shows confirmation message
9. System updates cart count in header

### Cart Management

**View Cart**:
1. User clicks cart icon
2. System loads cart items
3. System fetches product details
4. System calculates total
5. System displays cart summary

**Update Quantity**:
1. User adjusts quantity controls
2. System updates cart item
3. System recalculates total
4. System persists changes
5. System updates display

**Remove Item**:
1. User clicks remove button
2. System removes cart item
3. System recalculates total
4. System persists changes
5. System updates display

### Checkout Process

**Checkout Flow**:
1. User clicks "Proceed to Checkout"
2. System verifies authentication
3. System displays order summary
4. User enters shipping address
5. User enters contact information
6. User enters payment details
7. System validates all inputs
8. User submits order
9. System creates order record
10. System clears shopping cart
11. System displays order confirmation

**Validation Steps**:
- All required fields present
- Email format valid
- Phone format valid
- Address fields complete
- Payment information complete

For detailed checkout sequence, see [SwimlaneDiagram.md](./SwimlaneDiagram.md#1-complete-purchase-process).

### Admin Product Management

**Create Product**:
1. Admin accesses dashboard
2. Clicks "Add New Product"
3. Enters product details
4. Uploads product image
5. Selects category
6. Sets featured status
7. Submits form
8. System validates input
9. System generates product ID
10. System saves product
11. System displays success message
12. System refreshes product list

**Update Product**:
1. Admin selects product to edit
2. System loads product details
3. Admin modifies information
4. Admin submits changes
5. System validates input
6. System updates product
7. System updates timestamp
8. System displays success message
9. Changes immediately visible in all views

**Delete Product**:
1. Admin clicks delete button
2. System displays confirmation dialog
3. Admin confirms deletion
4. System removes product
5. System displays success message
6. Product removed from all views

For detailed admin workflows, see [ActivityDiagram.md](./ActivityDiagram.md#4-admin-product-management-flow) and [SwimlaneDiagram.md](./SwimlaneDiagram.md#2-admin-product-management-process).

## Features Overview

### Customer-Facing Features

**Product Browsing**:
- Featured products on homepage
- Five occasion-based categories
- Product grid with images and prices
- Detailed product pages
- Category filtering

**Shopping Experience**:
- Add to cart functionality
- Quantity selection
- Cart persistence across sessions
- Real-time total calculation
- Cart item management (update/remove)

**User Account**:
- Registration with validation
- Secure login
- Session management
- Order history (future enhancement)
- Profile management (future enhancement)

**Checkout**:
- Order summary display
- Shipping address collection
- Contact information collection
- Payment information (simulated)
- Order confirmation

**Visual Design**:
- Floral color palette (soft pinks, greens, purples)
- Clean, modern interface
- Consistent typography
- Clear visual feedback
- Smooth animations and transitions

### Admin Features

**Product Management**:
- Create new products
- Edit existing products
- Delete products with confirmation
- Manage product categories
- Set featured products
- Upload product images

**Order Management**:
- View all orders
- View order details
- Update order status (future enhancement)
- Order analytics (future enhancement)

**Dashboard**:
- Product list view
- Quick actions (edit, delete)
- Form validation
- Success/error feedback
- Real-time updates

### Technical Features

**Responsive Design**:
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Flexible grid layouts
- Adaptive navigation
- Touch-friendly controls

**Session Management**:
- Automatic session creation
- Session validation on requests
- Session expiration handling
- Session renewal on activity
- Secure logout

**Data Persistence**:
- localStorage integration
- Automatic data synchronization
- Cart persistence
- User preferences
- Order history

**Client-Side Routing**:
- Hash-based navigation
- No page reloads
- Browser back/forward support
- Deep linking support
- Route parameter handling

**Performance**:
- No build process required
- Fast initial load
- Efficient DOM updates
- Lazy loading (future enhancement)
- Optimized images

## Security Considerations

### Authentication and Authorization

**Password Security**:
- Minimum 8 character requirement
- Password hashing (client-side simulation)
- No plain text storage
- Secure credential validation

**Session Security**:
- Session expiration after inactivity
- Session validation on each request
- Automatic session cleanup
- Secure session storage

**Access Control**:
- Role-based authorization (admin vs. user)
- Protected routes (checkout, admin dashboard)
- Automatic redirection for unauthorized access
- Admin-only functionality restrictions

### Data Validation

**Input Validation**:
- Email format validation
- Password length validation
- Required field validation
- Numeric value validation (price, quantity)
- String length limits

**Business Logic Validation**:
- Unique email enforcement
- Positive quantity enforcement
- Valid product ID verification
- Cart item existence checks
- Order total calculation verification

### Session Management

**Session Lifecycle**:
- Created on login/signup
- Validated on each request
- Extended on user activity
- Expired after inactivity period
- Cleared on logout

**Session Storage**:
- Stored in localStorage
- Contains user ID and expiry timestamp
- Automatically cleaned up on expiration
- Cleared on logout

### Current Limitations

⚠️ **Important Security Notes**:

This is a client-side demo application. The following limitations exist:

1. **Password Hashing**: Simulated client-side, not cryptographically secure
2. **No Backend**: All data stored in browser localStorage
3. **Payment Processing**: Simulated, not real payment integration
4. **Session Security**: Basic implementation, not production-grade
5. **Data Exposure**: All data accessible via browser developer tools
6. **No HTTPS**: Requires secure hosting for production use
7. **No Rate Limiting**: Vulnerable to brute force attacks
8. **No CSRF Protection**: No token-based request validation

### Production Recommendations

For a production deployment, implement:

1. **Backend API**: Server-side authentication and data storage
2. **Secure Password Hashing**: bcrypt or Argon2 on server
3. **HTTPS**: SSL/TLS encryption for all communications
4. **JWT or Session Tokens**: Secure, server-validated sessions
5. **Payment Gateway**: PCI-compliant payment processing (Stripe, PayPal)
6. **Input Sanitization**: Server-side validation and sanitization
7. **Rate Limiting**: Prevent brute force and DDoS attacks
8. **CSRF Tokens**: Protect against cross-site request forgery
9. **Content Security Policy**: Prevent XSS attacks
10. **Database**: Secure, scalable data storage (PostgreSQL, MongoDB)

## Technical Specifications

### Browser Requirements

**Supported Browsers**:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Required Features**:
- ES6+ JavaScript support
- localStorage API
- CSS Grid and Flexbox
- CSS Custom Properties (variables)
- Fetch API (for future enhancements)

**Minimum Versions**:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### Performance Characteristics

**Load Time**:
- Initial page load: < 2 seconds
- Route navigation: < 100ms
- Cart updates: < 50ms

**Storage Limits**:
- localStorage: ~5-10MB (browser dependent)
- Recommended max products: 1000
- Recommended max orders: 500 per user

**Optimization Techniques**:
- Minimal DOM manipulation
- Event delegation
- Efficient data structures
- Lazy rendering (future enhancement)

### Responsive Breakpoints

**Mobile** (< 768px):
- Single column layout
- Stacked navigation
- Full-width cards
- Touch-optimized controls
- Larger tap targets

**Tablet** (768px - 1024px):
- Two-column layout
- Horizontal navigation
- Grid product display
- Optimized spacing

**Desktop** (> 1024px):
- Multi-column layout
- Full navigation menu
- Grid product display (3-4 columns)
- Hover effects
- Larger images

### Color Palette and Design System

**Primary Colors**:
- Soft Pink: `#E8B4D4` (primary brand color)
- Soft Green: `#A8D5BA` (secondary accent)
- Soft Purple: `#C8B4E8` (tertiary accent)

**Neutral Colors**:
- Cream: `#FFF9F5` (background)
- White: `#FFFFFF` (cards, containers)
- Dark Gray: `#333333` (text)
- Light Gray: `#F5F5F5` (borders, dividers)

**Semantic Colors**:
- Success: `#4CAF50` (confirmations)
- Error: `#F44336` (validation errors)
- Warning: `#FF9800` (alerts)
- Info: `#2196F3` (informational messages)

**Typography**:
- Font Family: System fonts (Arial, Helvetica, sans-serif)
- Headings: Bold, larger sizes
- Body: Regular weight, readable size
- Buttons: Medium weight, uppercase

**Spacing System**:
- Base unit: 8px
- Small: 8px
- Medium: 16px
- Large: 24px
- Extra Large: 32px

## Deployment and Setup

### Installation Instructions

**Prerequisites**:
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Local web server (optional but recommended)

**Steps**:

1. **Clone or Download Repository**:
   ```bash
   git clone <repository-url>
   cd floralink
   ```

2. **Option A: Direct Browser Access**:
   - Open `index.html` in your web browser
   - Note: Some features may not work due to CORS restrictions

3. **Option B: Local Development Server** (Recommended):
   
   Using Python 3:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js (http-server):
   ```bash
   npx http-server
   ```
   
   Using PHP:
   ```bash
   php -S localhost:8000
   ```

4. **Access Application**:
   - Navigate to `http://localhost:8000` in your browser

### Configuration Options

**Seed Data**:
- Default products loaded from `js/data/seedData.js`
- Modify seed data to customize initial product catalog
- Clear localStorage to reset to seed data

**Session Expiration**:
- Default: 24 hours
- Modify in `AuthManager` class
- Configurable per environment

**Storage Keys**:
- Prefix: `floralink_`
- Modify in `StorageService` to avoid conflicts

### Default Credentials

**Admin Account**:
- Email: `admin@floralink.com`
- Password: `admin123`
- Role: Administrator

**Test User Account**:
- Email: `test@floralink.com`
- Password: `test1234`
- Role: Regular User

### Testing the System

**Manual Testing Checklist**:

1. **Guest User**:
   - [ ] Browse homepage
   - [ ] View categories
   - [ ] View product details
   - [ ] Attempt cart access (should redirect to login)

2. **Registration**:
   - [ ] Register new account
   - [ ] Test duplicate email validation
   - [ ] Test password length validation
   - [ ] Verify automatic login after registration

3. **Login**:
   - [ ] Login with valid credentials
   - [ ] Test invalid credentials
   - [ ] Verify session persistence

4. **Shopping**:
   - [ ] Add products to cart
   - [ ] Update quantities
   - [ ] Remove items
   - [ ] Verify cart persistence

5. **Checkout**:
   - [ ] Complete checkout form
   - [ ] Test form validation
   - [ ] Verify order creation
   - [ ] Verify cart clearing

6. **Admin**:
   - [ ] Access admin dashboard
   - [ ] Create product
   - [ ] Update product
   - [ ] Delete product
   - [ ] Verify changes in catalog

## System Limitations

### Current Constraints

**Data Storage**:
- Limited to browser localStorage (~5-10MB)
- Data not shared across devices
- Data cleared if browser cache cleared
- No backup or recovery mechanism

**Scalability**:
- Client-side only, not suitable for high traffic
- No server-side processing
- Limited concurrent user support
- No real-time synchronization

**Security**:
- Client-side authentication (not production-secure)
- No encryption for stored data
- Vulnerable to browser developer tools access
- No protection against XSS or CSRF

**Payment Processing**:
- Simulated payment (no real transactions)
- No PCI compliance
- No payment gateway integration
- No transaction history

**Features**:
- No product search functionality
- No product filtering (except by category)
- No user reviews or ratings
- No wishlist functionality
- No email notifications
- No order tracking
- No inventory management

### Known Issues

1. **localStorage Quota**: May exceed storage limit with many products/orders
2. **Session Persistence**: Sessions lost if localStorage cleared
3. **Image Loading**: Requires internet connection for external images
4. **Browser Compatibility**: May not work in older browsers
5. **Mobile Performance**: Large product catalogs may impact performance

### Future Enhancements

**Phase 1 - Core Improvements**:
- Product search functionality
- Advanced filtering (price range, availability)
- Product reviews and ratings
- Wishlist functionality
- User profile management

**Phase 2 - Backend Integration**:
- REST API backend
- Database integration (PostgreSQL/MongoDB)
- Server-side authentication
- Real payment processing
- Email notifications

**Phase 3 - Advanced Features**:
- Order tracking
- Inventory management
- Analytics dashboard
- Multi-language support
- Promotional codes and discounts

**Phase 4 - Enterprise Features**:
- Multi-vendor support
- Advanced reporting
- CRM integration
- Mobile app (React Native)
- Progressive Web App (PWA)

## Related Documentation

### Design and Architecture
- **[Design Document](.kiro/specs/floralink/design.md)**: Detailed technical design, architecture diagrams, and correctness properties
- **[Requirements Document](.kiro/specs/floralink/requirements.md)**: Complete functional requirements and acceptance criteria

### Data and Workflows
- **[Entity Relationship Diagram](./ERD.md)**: Database schema and entity relationships
- **[Use Case Diagram](./UseCase.md)**: Actor interactions and system capabilities
- **[Activity Diagrams](./ActivityDiagram.md)**: Detailed workflow processes
- **[Swimlane Diagrams](./SwimlaneDiagram.md)**: Component interactions and sequence flows

### Getting Started
- **[README](../README.md)**: Quick start guide, installation instructions, and project overview

### Testing
- **Property-Based Testing**: See Design Document for 31 correctness properties
- **Test Strategy**: Dual approach with unit tests and property-based tests using fast-check

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Maintained By**: FloraLink Development Team

For questions or contributions, please refer to the project repository.
