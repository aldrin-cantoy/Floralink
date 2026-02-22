import { productManager } from '../managers/ProductManager.js';
import { ProductCard } from '../components/ProductCard.js';

/**
 * CategoryPage Component
 */
export class CategoryPage {
  constructor(category) {
    this.category = decodeURIComponent(category);
  }

  render() {
    const page = document.createElement('div');
    page.className = 'page';

    page.innerHTML = `
      <div class="container">
        <h1 class="text-center">${this.category}</h1>
        <p class="text-center text-light mb-xl">Browse our beautiful selection of ${this.category.toLowerCase()} flowers</p>
        <div class="product-grid" id="category-products"></div>
      </div>
    `;

    this.loadProducts(page);

    return page;
  }

  /**
   * Load products for category
   * @param {HTMLElement} page - Page element
   */
  loadProducts(page) {
    const grid = page.querySelector('#category-products');
    const products = productManager.getProductsByCategory(this.category);

    if (products.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🌸</div>
          <h3 class="empty-state-title">No products in this category</h3>
          <p class="empty-state-text">Check back soon for new arrivals!</p>
          <a href="#/" class="btn btn-primary">Back to Home</a>
        </div>
      `;
      return;
    }

    products.forEach(product => {
      const card = new ProductCard(product);
      grid.appendChild(card.render());
    });
  }
}
