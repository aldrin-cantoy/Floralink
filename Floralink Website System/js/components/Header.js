import { authManager } from '../managers/AuthManager.js';
import { cartManager } from '../managers/CartManager.js';
import { router } from '../Router.js';

/**
 * Header Component
 */
export class Header {
  constructor() {
    this.element = null;
  }

  /**
   * Render header
   * @returns {HTMLElement}
   */
  render() {
    const header = document.createElement('header');
    header.className = 'header';

    const user = authManager.getCurrentUser();
    const cartCount = cartManager.getItemCount();

    header.innerHTML = `
      <div class="container header-container">
        <a href="#/" class="header-logo">🌸 FloraLink</a>
        
        <button class="mobile-menu-toggle" aria-label="Toggle menu">
          ☰
        </button>
        
        <nav class="header-nav">
          <a href="#/">Home</a>
          <a href="#/category/Romantic">Romantic</a>
          <a href="#/category/Sympathy & Funeral">Sympathy</a>
          <a href="#/category/Wedding & Engagement">Weddings</a>
          <a href="#/category/Celebrations">Celebrations</a>
          <a href="#/category/Seasonal & Special Days">Seasonal</a>
        </nav>
        
        <div class="header-auth">
          <a href="#/cart" class="header-cart">
            🛒 Cart
            ${cartCount > 0 ? `<span class="cart-badge">${cartCount}</span>` : ''}
          </a>
          
          ${user ? `
            <span>Hello, ${user.name}</span>
            ${user.isAdmin ? '<a href="#/admin" class="btn btn-small btn-secondary">Admin</a>' : ''}
            <button class="btn btn-small btn-outline" id="logout-btn">Logout</button>
          ` : `
            <a href="#/login" class="btn btn-small btn-primary">Login</a>
            <a href="#/signup" class="btn btn-small btn-secondary">Sign Up</a>
          `}
        </div>
      </div>
    `;

    this.element = header;
    this.attachEventListeners();
    return header;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    if (!this.element) return;

    // Mobile menu toggle
    const menuToggle = this.element.querySelector('.mobile-menu-toggle');
    const nav = this.element.querySelector('.header-nav');
    
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
      });
    }

    // Logout button
    const logoutBtn = this.element.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        authManager.logout();
        router.navigate('/');
        window.location.reload();
      });
    }
  }

  /**
   * Update cart count
   * @param {number} count - New cart count
   */
  updateCartCount(count) {
    if (!this.element) return;
    
    const cartBadge = this.element.querySelector('.cart-badge');
    const cartLink = this.element.querySelector('.header-cart');
    
    if (count > 0) {
      if (cartBadge) {
        cartBadge.textContent = count;
      } else {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = count;
        cartLink.appendChild(badge);
      }
    } else {
      if (cartBadge) {
        cartBadge.remove();
      }
    }
  }

  /**
   * Update auth state
   */
  updateAuthState() {
    // Re-render header to reflect auth changes
    const parent = this.element.parentNode;
    if (parent) {
      const newHeader = this.render();
      parent.replaceChild(newHeader, this.element);
    }
  }
}

// Export singleton instance
export const header = new Header();
