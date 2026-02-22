import { authManager } from '../managers/AuthManager.js';
import { productManager } from '../managers/ProductManager.js';
import { formatPrice } from '../utils/helpers.js';
import { router } from '../Router.js';
import { categoryNav } from '../components/CategoryNav.js';

/**
 * AdminDashboard Component
 */
export class AdminDashboard {
  constructor() {
    this.editingProductId = null;
  }

  render() {
    // Check authentication and authorization
    if (!authManager.isAuthenticated()) {
      router.navigate('/login');
      return document.createElement('div');
    }

    if (!authManager.isAdmin()) {
      const page = document.createElement('div');
      page.className = 'page';
      page.innerHTML = `
        <div class="container">
          <div class="empty-state">
            <div class="empty-state-icon">🚫</div>
            <h2 class="empty-state-title">Access Denied</h2>
            <p class="empty-state-text">You don't have permission to access the admin dashboard.</p>
            <a href="#/" class="btn btn-primary">Back to Home</a>
          </div>
        </div>
      `;
      return page;
    }

    const page = document.createElement('div');
    page.className = 'page';

    const products = productManager.getAllProducts();

    page.innerHTML = `
      <div class="container">
        <h1 class="mb-xl">Admin Dashboard</h1>
        
        <div class="grid grid-cols-3">
          <div style="grid-column: span 2;">
            <h2 class="mb-lg">All Products</h2>
            <div id="products-list">
              ${products.length === 0 ? `
                <div class="empty-state">
                  <p>No products yet. Create your first product!</p>
                </div>
              ` : ''}
            </div>
          </div>
          
          <div>
            <div class="card">
              <div class="card-body">
                <h3 class="mb-lg" id="form-title">Create New Product</h3>
                
                <form id="product-form">
                  <div class="form-group">
                    <label class="form-label" for="product-name">Name</label>
                    <input type="text" id="product-name" class="form-input" required>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label" for="product-description">Description</label>
                    <textarea id="product-description" class="form-textarea" required></textarea>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label" for="product-price">Price ($)</label>
                    <input type="number" id="product-price" class="form-input" step="0.01" min="0" required>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label" for="product-image">Image URL</label>
                    <input type="url" id="product-image" class="form-input" required>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label" for="product-category">Category</label>
                    <select id="product-category" class="form-select" required>
                      <option value="">Select category</option>
                      ${categoryNav.getCategories().map(cat => `
                        <option value="${cat}">${cat}</option>
                      `).join('')}
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label style="display: flex; align-items: center; gap: var(--spacing-sm);">
                      <input type="checkbox" id="product-featured">
                      <span>Featured Product</span>
                    </label>
                  </div>
                  
                  <div id="form-error" class="alert alert-error hidden"></div>
                  <div id="form-success" class="alert alert-success hidden"></div>
                  
                  <button type="submit" class="btn btn-primary btn-large" id="submit-btn">
                    Create Product
                  </button>
                  
                  <button type="button" class="btn btn-outline" id="cancel-btn" style="display: none;">
                    Cancel Edit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.loadProducts(page);
    this.attachEventListeners(page);

    return page;
  }

  /**
   * Load products list
   * @param {HTMLElement} page - Page element
   */
  loadProducts(page) {
    const container = page.querySelector('#products-list');
    const products = productManager.getAllProducts();

    if (products.length === 0) return;

    container.innerHTML = '';

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'card mb-md';
      productCard.innerHTML = `
        <div class="card-body">
          <div style="display: flex; gap: var(--spacing-lg); align-items: start;">
            <img src="${product.imageUrl}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: var(--border-radius);">
            <div style="flex: 1;">
              <h4>${product.name}</h4>
              <p style="color: var(--color-text-light); font-size: var(--font-size-sm);">${product.description.substring(0, 100)}...</p>
              <p><strong>${formatPrice(product.price)}</strong> | ${product.category}</p>
              ${product.featured ? '<span style="background: var(--color-accent); color: white; padding: 2px 8px; border-radius: 4px; font-size: var(--font-size-xs);">Featured</span>' : ''}
            </div>
            <div style="display: flex; gap: var(--spacing-sm);">
              <button class="btn btn-small btn-secondary edit-btn" data-product-id="${product.id}">
                Edit
              </button>
              <button class="btn btn-small btn-danger delete-btn" data-product-id="${product.id}">
                Delete
              </button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(productCard);
    });
  }

  /**
   * Attach event listeners
   * @param {HTMLElement} page - Page element
   */
  attachEventListeners(page) {
    const form = page.querySelector('#product-form');
    const formError = page.querySelector('#form-error');
    const formSuccess = page.querySelector('#form-success');
    const submitBtn = page.querySelector('#submit-btn');
    const cancelBtn = page.querySelector('#cancel-btn');
    const formTitle = page.querySelector('#form-title');

    // Product form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      formError.classList.add('hidden');
      formSuccess.classList.add('hidden');

      const productData = {
        name: page.querySelector('#product-name').value.trim(),
        description: page.querySelector('#product-description').value.trim(),
        price: parseFloat(page.querySelector('#product-price').value),
        imageUrl: page.querySelector('#product-image').value.trim(),
        category: page.querySelector('#product-category').value,
        featured: page.querySelector('#product-featured').checked
      };

      try {
        if (this.editingProductId) {
          // Update existing product
          productManager.updateProduct(this.editingProductId, productData);
          formSuccess.textContent = 'Product updated successfully!';
          this.editingProductId = null;
          submitBtn.textContent = 'Create Product';
          formTitle.textContent = 'Create New Product';
          cancelBtn.style.display = 'none';
        } else {
          // Create new product
          productManager.createProduct(productData);
          formSuccess.textContent = 'Product created successfully!';
        }

        formSuccess.classList.remove('hidden');
        form.reset();
        this.loadProducts(page);

        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 3000);
      } catch (error) {
        formError.textContent = error.message;
        formError.classList.remove('hidden');
      }
    });

    // Cancel edit button
    cancelBtn.addEventListener('click', () => {
      this.editingProductId = null;
      form.reset();
      submitBtn.textContent = 'Create Product';
      formTitle.textContent = 'Create New Product';
      cancelBtn.style.display = 'none';
      formError.classList.add('hidden');
      formSuccess.classList.add('hidden');
    });

    // Edit buttons
    page.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        const product = productManager.getProductById(productId);

        if (product) {
          this.editingProductId = productId;
          page.querySelector('#product-name').value = product.name;
          page.querySelector('#product-description').value = product.description;
          page.querySelector('#product-price').value = product.price;
          page.querySelector('#product-image').value = product.imageUrl;
          page.querySelector('#product-category').value = product.category;
          page.querySelector('#product-featured').checked = product.featured;

          submitBtn.textContent = 'Update Product';
          formTitle.textContent = 'Edit Product';
          cancelBtn.style.display = 'block';

          // Scroll to form
          form.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Delete buttons
    page.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        const product = productManager.getProductById(productId);

        if (product && confirm(`Are you sure you want to delete "${product.name}"?`)) {
          productManager.deleteProduct(productId);
          this.loadProducts(page);
          formSuccess.textContent = 'Product deleted successfully!';
          formSuccess.classList.remove('hidden');

          setTimeout(() => {
            formSuccess.classList.add('hidden');
          }, 3000);
        }
      });
    });
  }
}
