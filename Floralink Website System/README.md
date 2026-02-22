# FloraLink - Online Flower Shop 🌸

A complete eCommerce flower shop website built with vanilla HTML, CSS, and JavaScript. Features occasion-based categorization, shopping cart functionality, user authentication, checkout processing, and administrative product management.

## Features

### Customer Features
- **Browse Products**: View flowers organized by occasion-based categories
- **Product Details**: See detailed information about each flower arrangement
- **Shopping Cart**: Add items, adjust quantities, and manage your cart
- **User Authentication**: Register and login to your account
- **Secure Checkout**: Complete purchases with shipping and payment information
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices

### Admin Features
- **Product Management**: Create, edit, and delete flower products
- **Category Management**: Organize products across 5 occasion-based categories
- **Featured Products**: Mark products to display on the homepage

## Categories

1. **Romantic Occasions** - Perfect for expressing love and affection
2. **Sympathy & Funeral** - Elegant arrangements for memorial services
3. **Wedding & Engagement** - Beautiful bouquets for special celebrations
4. **Celebrations** - Bright blooms for birthdays and achievements
5. **Seasonal & Special Days** - Festive arrangements for holidays

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (optional, but recommended for development)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser, or
3. Use a local development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

4. Navigate to `http://localhost:8000` in your browser

### Default Credentials

**Admin Account:**
- Email: `admin@floralink.com`
- Password: `admin123`

**Test User Account:**
- Email: `test@floralink.com`
- Password: `test1234`

## Project Structure

```
floralink/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Complete CSS design system
├── js/
│   ├── main.js            # Application entry point
│   ├── Router.js          # Hash-based routing
│   ├── components/        # Reusable UI components
│   │   ├── Header.js
│   │   ├── ProductCard.js
│   │   └── CategoryNav.js
│   ├── pages/             # Page components
│   │   ├── HomePage.js
│   │   ├── CategoryPage.js
│   │   ├── ProductDetailPage.js
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── LoginPage.js
│   │   ├── SignupPage.js
│   │   └── AdminDashboard.js
│   ├── managers/          # Business logic
│   │   ├── ProductManager.js
│   │   ├── AuthManager.js
│   │   ├── CartManager.js
│   │   └── OrderManager.js
│   ├── services/          # Core services
│   │   └── StorageService.js
│   ├── utils/             # Helper functions
│   │   └── helpers.js
│   └── data/              # Seed data
│       └── seedData.js
└── assets/
    └── images/            # Product images
```

## Architecture

### Design Principles
- **Component-Based**: Modular, reusable components
- **State Management**: Centralized cart and session management
- **Responsive-First**: Mobile-first CSS with progressive enhancement
- **Data Persistence**: localStorage for client-side data storage
- **Client-Side Routing**: Hash-based SPA navigation

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: localStorage API
- **Routing**: Hash-based routing
- **Build**: No build process (vanilla JavaScript)

## Color Palette

The design uses a beautiful floral color scheme:
- **Primary**: Soft Pink (#E8B4D4)
- **Secondary**: Soft Green (#A8D5BA)
- **Accent**: Soft Purple (#C8B4E8)
- **Background**: Cream (#FFF9F5)
- **Text**: Dark Gray (#333333)

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Data Storage

All data is stored in the browser's localStorage:
- `floralink_products`: Product catalog
- `floralink_users`: User accounts
- `floralink_cart`: Shopping cart items
- `floralink_orders`: Order history
- `floralink_session`: User session data

## Features in Detail

### Shopping Cart
- Add products with custom quantities
- Update quantities or remove items
- Persistent cart across browsing sessions
- Real-time total calculation

### User Authentication
- Email and password validation
- Password minimum length requirement (8 characters)
- Session management with expiration
- Automatic login after signup

### Admin Dashboard
- Full CRUD operations for products
- Form validation for product data
- Confirmation dialogs for deletions
- Real-time product list updates

### Checkout Process
- Authentication required
- Shipping address form
- Contact information
- Payment details (simulated)
- Order confirmation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Notes

⚠️ **Important**: This is a client-side demo application. In a production environment:
- Use proper backend authentication with secure password hashing
- Implement server-side validation
- Use HTTPS for all communications
- Store sensitive data securely on the server
- Implement proper payment processing with PCI compliance

## Future Enhancements

Potential features for future development:
- Backend API integration
- Real payment processing
- Order tracking
- Product search and filtering
- User profile management
- Product reviews and ratings
- Wishlist functionality
- Email notifications

## License

This project is created for educational purposes.

## Credits

- Product images from Unsplash
- Design inspired by modern eCommerce best practices
- Built following the FloraLink specification

---

**FloraLink** - Beautiful flowers for every occasion 🌸
