import { cartManager } from '../managers/CartManager.js';
import { authManager } from '../managers/AuthManager.js';
import { formatPrice } from '../utils/helpers.js';
import { header } from '../components/Header.js';
import { router } from '../Router.js';

/**
 * CartPage Component
 */
export class CartPage {
  render() {
    const page = document.createElement('div');
    page.className = 'page';

    const items = cartManager.getItemsWithDetails();
    const total = cartManager.getTotal();

    if (items.length === 0) {
      page.innerHTML = `
        <div class="container">
          <div class="empty-state">
            <div class="empty-state-icon">🛒</div>
            <h2 class="empty-state-title">Your cart is empty</h2>
            <p class="empty-state-text">Add some beautiful flowers to your cart!</p>
            <a href="#/" class="btn btn-primary">Continue Shopping</a>
          </div>
        </div>
      `;
      return page;
    }

    page.innerHTML = `
      <div class="container">
        <h1 class="mb-xl">Shopping Cart</h1>
        
        <div class="grid grid-cols-3">
          <div style="grid-column: span 2;">
            <div id="cart-items"></div>
          </div>
          
          <div>
            <div class="card">
              <div class="card-body">
                <h3 class="mb-lg">Order Summary</h3>
                <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-md);">
                  <span>Subtotal:</span>
                  <strong>${formatPrice(total)}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-lg); padding-top: var(--spacing-md); border-top: 2px solid var(--color-gray);">
                  <span><strong>Total:</strong></span>
                  <strong class="card-price">${formatPrice(total)}</strong>
                </div>
                <button class="btn btn-primary btn-large" id="checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.loadCartItems(page, items);
    this.attachEventListeners(page);

    return page;
  }

  /**
   * Load cart items
   * @param {HTMLElement} page - Page element
   * @param {Array} items - Cart items with details
   */
  loadCartItems(page, items) {
    const container = page.querySelector('#cart-items');

    items.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.product.imageUrl}" alt="${item.product.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3 class="cart-item-name">${item.product.name}</h3>
          <p class="cart-item-price">${formatPrice(item.product.price)} each</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease-btn" data-product-id="${item.productId}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn increase-btn" data-product-id="${item.productId}">+</button>
          </div>
        </div>
        <div>
          <p style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); margin-bottom: var(--spacing-md);">
            ${formatPrice(item.product.price * item.quantity)}
          </p>
          <button class="btn btn-small btn-danger remove-btn" data-product-id="${item.productId}">
            Remove
          </button>
        </div>
      `;
      container.appendChild(cartItem);
    });
  }

  /**
   * Attach event listeners
   * @param {HTMLElement} page - Page element
   */
  attachEventListeners(page) {
    // Quantity buttons
    page.querySelectorAll('.decrease-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        const item = cartManager.getItems().find(i => i.productId === productId);
        if (item) {
          cartManager.updateQuantity(productId, item.quantity - 1);
          this.refreshPage();
        }
      });
    });

    page.querySelectorAll('.increase-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        const item = cartManager.getItems().find(i => i.productId === productId);
        if (item) {
          cartManager.updateQuantity(productId, item.quantity + 1);
          this.refreshPage();
        }
      });
    });

    // Remove buttons
    page.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        if (confirm('Remove this item from cart?')) {
          cartManager.removeItem(productId);
          this.refreshPage();
        }
      });
    });

    // Checkout button
    const checkoutBtn = page.querySelector('#checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (!authManager.isAuthenticated()) {
          alert('Please log in to proceed to checkout');
          router.navigate('/login');
        } else {
          router.navigate('/checkout');
        }
      });
    }
  }

  /**
   * Refresh page after cart changes
   */
  refreshPage() {
    header.updateCartCount(cartManager.getItemCount());
    const app = document.getElementById('app');
    const currentContent = app.querySelector('.page');
    if (currentContent) {
      const newContent = this.render();
      app.replaceChild(newContent, currentContent);
    }
  }
}
