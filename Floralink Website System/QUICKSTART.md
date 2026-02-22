# FloraLink Quick Start Guide 🚀

## Instant Setup (3 Steps)

### Step 1: Open the Website
Simply open `index.html` in your web browser by:
- Double-clicking the file, or
- Right-click → Open with → Your browser

### Step 2: Browse Products
The website will automatically:
- Load 15 sample flower products
- Create admin and test user accounts
- Initialize the shopping cart

### Step 3: Start Shopping!
You're ready to:
- Browse flowers by category
- Add items to cart
- Create an account or login
- Complete a purchase

## Quick Actions

### As a Customer
1. **Browse Products**: Click on any category in the navigation
2. **View Details**: Click on any product card
3. **Add to Cart**: Click "Add to Cart" on product detail page
4. **Checkout**: Click cart icon → "Proceed to Checkout"
5. **Create Account**: Click "Sign Up" and fill in the form

### As an Admin
1. **Login**: Use `admin@floralink.com` / `admin123`
2. **Access Dashboard**: Click "Admin" button in header
3. **Create Product**: Fill in the form on the right
4. **Edit Product**: Click "Edit" on any product
5. **Delete Product**: Click "Delete" and confirm

## Test Accounts

### Admin Account
```
Email: admin@floralink.com
Password: admin123
```
Access to admin dashboard for product management.

### Regular User
```
Email: test@floralink.com
Password: test1234
```
Standard customer account for testing checkout.

## Using a Local Server (Recommended)

For the best experience, use a local development server:

### Option 1: Python
```bash
python -m http.server 8000
```
Then open: http://localhost:8000

### Option 2: Node.js
```bash
npx http-server
```
Then open: http://localhost:8080

### Option 3: PHP
```bash
php -S localhost:8000
```
Then open: http://localhost:8000

### Option 4: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## Features to Try

### Shopping Flow
1. Browse "Romantic" category
2. Click "Red Rose Bouquet"
3. Change quantity to 2
4. Click "Add to Cart"
5. View cart (click cart icon)
6. Proceed to checkout
7. Login or create account
8. Fill in shipping/payment info
9. Place order

### Admin Flow
1. Login as admin
2. Go to Admin Dashboard
3. Create a new product:
   - Name: "Custom Bouquet"
   - Description: "Your description"
   - Price: 39.99
   - Image URL: Any image URL
   - Category: Select one
   - Check "Featured" if desired
4. Click "Create Product"
5. See it appear in the list
6. Edit or delete as needed

## Responsive Design Testing

### Mobile View
- Resize browser to < 768px width
- Hamburger menu appears
- Single column layout
- Touch-friendly buttons

### Tablet View
- Resize to 768px - 1024px width
- Two column product grid
- Optimized navigation

### Desktop View
- Full width > 1024px
- Multi-column layouts
- Hover effects active

## Data Persistence

All data is saved in your browser's localStorage:
- Cart items persist between sessions
- User accounts remain after closing browser
- Products and orders are stored locally

### Clear All Data
Open browser console (F12) and run:
```javascript
localStorage.clear();
location.reload();
```

## Troubleshooting

### Products Not Showing?
- Refresh the page (F5)
- Check browser console for errors (F12)
- Clear localStorage and reload

### Can't Login?
- Verify credentials are correct
- Check Caps Lock is off
- Try creating a new account

### Cart Not Updating?
- Refresh the page
- Check browser console
- Clear cart and try again

### Admin Dashboard Not Accessible?
- Make sure you're logged in as admin
- Use: admin@floralink.com / admin123
- Refresh after login

## Browser Console

Open developer tools (F12) to see:
- Initialization messages
- Seed data confirmation
- Any errors or warnings

## Next Steps

1. ✅ Open the website
2. ✅ Browse products
3. ✅ Test shopping cart
4. ✅ Create an account
5. ✅ Complete a purchase
6. ✅ Try admin features
7. ✅ Test on mobile device

## Need Help?

Check the main README.md for:
- Complete feature list
- Architecture details
- Project structure
- Development guide

---

**Enjoy FloraLink!** 🌸
