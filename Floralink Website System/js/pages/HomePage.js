import { productManager } from '../managers/ProductManager.js';
import { ProductCard } from '../components/ProductCard.js';
import { categoryNav } from '../components/CategoryNav.js';

/**
 * HomePage Component
 */
export class HomePage {
  render() {
    const page = document.createElement('div');
    page.className = 'page';

    // Hero section
    const hero = document.createElement('section');
    hero.className = 'hero';
    hero.innerHTML = `
      <div class="container">
        <h1 class="hero-title">Welcome to FloraLink</h1>
        <p class="hero-subtitle">Beautiful flowers for every occasion</p>
        <a href="#/category/Romantic" class="btn btn-large btn-primary">Shop Now</a>
      </div>
    `;

    // Category navigation
    const categorySection = categoryNav.render();

    // Featured products section
    const featuredSection = document.createElement('section');
    featuredSection.className = 'container';
    featuredSection.innerHTML = `
      <h2 class="text-center mt-xl">Featured Flowers</h2>
      <div class="product-grid" id="featured-products"></div>
    `;

    page.appendChild(hero);
    page.appendChild(categorySection);
    page.appendChild(featuredSection);

    // Load featured products
    this.loadFeaturedProducts(page);

    return page;
  }

  /**
   * Load featured products
   * @param {HTMLElement} page - Page element
   */
  loadFeaturedProducts(page) {
    const grid = page.querySelector('#featured-products');
    const products = productManager.getFeaturedProducts(6);

    if (products.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🌸</div>
          <h3 class="empty-state-title">No featured products yet</h3>
          <p class="empty-state-text">Check back soon for beautiful flower arrangements!</p>
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
