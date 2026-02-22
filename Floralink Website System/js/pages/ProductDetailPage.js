import { productManager } from '../managers/ProductManager.js';
import { cartManager } from '../managers/CartManager.js';
import { formatPrice } from '../utils/helpers.js';
import { header } from '../components/Header.js';

/**
 * ProductDetailPage Component
 */
export class ProductDetailPage {
  constructor(productId) {
    this.productId = productId;
    this.quantity = 1;
  }

  render() {
    const page = document.createElement('div');
    page.className = 'page';

    const product = productManager.getProductById(this.productId);

    if (!product) {
      page.innerHTML = `
        <div class="container">
          <div class="empty-state">
            <div class="empty-state-icon">❌</div>
            <h2 class="empty-state-title">Product not found</h2>
            <p class="empty-state-text">This product may have been removed or doesn't exist.</p>
            <a href="#/" class="btn btn-primary">Back to Home</a>
          </div>
        </div>
      `;
      return page;
    }

    page.innerHTML = `
      <div class="container">
        <div class="breadcrumb mb-lg">
          <a href="#/">Home</a> / 
          <a href="#/category/${encodeURIComponent(product.category)}">${product.category}</a> / 
          ${product.name}
        </div>
        
        <div class="grid grid-cols-2">
          <div>
            <img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; border-radius: var(--border-radius-lg);">
          </div>
          
          <div>
            <h1>${product.name}</h1>
            <p class="card-price mb-lg">${formatPrice(product.price)}</p>
            <p class="mb-lg">${product.description}</p>
            
            <div class="mb-lg">
              <strong>Category:</strong> ${product.category}
            </div>
            
            <div class="form-group">
              <label class="form-label">Quantity:</label>
              <div class="cart-item-quantity">
                <button class="quantity-btn" id="decrease-qty">-</button>
                <span class="quantity-value" id="quantity-display">${this.quantity}</span>
                <button class="quantity-btn" id="increase-qty">+</button>
              </div>
            </div>
            
            <button class="btn btn-primary btn-large" id="add-to-cart-btn">
              Add to Cart
            </button>
            
            <div id="success-message" class="alert alert-success mt-md hidden">
              Added to cart successfully!
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners(page);

    return page;
  }

  /**
   * Attach event listeners
   * @param {HTMLElement} page - Page element
   */
  attachEventListeners(page) {
    const decreaseBtn = page.querySelector('#decrease-qty');
    const increaseBtn = page.querySelector('#increase-qty');
    const quantityDisplay = page.querySelector('#quantity-display');
    const addToCartBtn = page.querySelector('#add-to-cart-btn');
    const successMessage = page.querySelector('#success-message');

    decreaseBtn.addEventListener('click', () => {
      if (this.quantity > 1) {
        this.quantity--;
        quantityDisplay.textContent = this.quantity;
      }
    });

    increaseBtn.addEventListener('click', () => {
      this.quantity++;
      quantityDisplay.textContent = this.quantity;
    });

    addToCartBtn.addEventListener('click', () => {
      cartManager.addItem(this.productId, this.quantity);
      
      // Update header cart count
      header.updateCartCount(cartManager.getItemCount());
      
      // Show success message
      successMessage.classList.remove('hidden');
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 3000);
      
      // Reset quantity
      this.quantity = 1;
      quantityDisplay.textContent = this.quantity;
    });
  }
}
