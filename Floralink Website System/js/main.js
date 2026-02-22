/**
 * FloraLink - Main Application Entry Point
 */

import { router } from './Router.js';
import { header } from './components/Header.js';
import { initializeSeedData } from './data/seedData.js';

// Import page components
import { HomePage } from './pages/HomePage.js';
import { CategoryPage } from './pages/CategoryPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';
import { CartPage } from './pages/CartPage.js';
import { CheckoutPage } from './pages/CheckoutPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { SignupPage } from './pages/SignupPage.js';
import { AdminDashboard } from './pages/AdminDashboard.js';

/**
 * Render page content
 * @param {HTMLElement} content - Page content to render
 */
function renderPage(content) {
  const app = document.getElementById('app');
  
  // Clear existing content
  app.innerHTML = '';
  
  // Render header
  app.appendChild(header.render());
  
  // Render page content
  app.appendChild(content);
}

/**
 * Initialize application
 */
function initApp() {
  console.log('🌸 FloraLink - Initializing...');
  
  // Initialize seed data
  initializeSeedData();
  
  // Define routes
  router.addRoute('/', () => {
    const page = new HomePage();
    renderPage(page.render());
  });
  
  router.addRoute('/category/:category', (params) => {
    const page = new CategoryPage(params.category);
    renderPage(page.render());
  });
  
  router.addRoute('/product/:id', (params) => {
    const page = new ProductDetailPage(params.id);
    renderPage(page.render());
  });
  
  router.addRoute('/cart', () => {
    const page = new CartPage();
    renderPage(page.render());
  });
  
  router.addRoute('/checkout', () => {
    const page = new CheckoutPage();
    renderPage(page.render());
  });
  
  router.addRoute('/login', () => {
    const page = new LoginPage();
    renderPage(page.render());
  });
  
  router.addRoute('/signup', () => {
    const page = new SignupPage();
    renderPage(page.render());
  });
  
  router.addRoute('/admin', () => {
    const page = new AdminDashboard();
    renderPage(page.render());
  });
  
  // 404 route
  router.addRoute('404', () => {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
      <div class="container">
        <div class="empty-state">
          <div class="empty-state-icon">🌸</div>
          <h2 class="empty-state-title">Page Not Found</h2>
          <p class="empty-state-text">The page you're looking for doesn't exist.</p>
          <a href="#/" class="btn btn-primary">Back to Home</a>
        </div>
      </div>
    `;
    renderPage(page);
  });
  
  // Initialize router
  router.init();
  
  console.log('✅ FloraLink - Ready!');
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
