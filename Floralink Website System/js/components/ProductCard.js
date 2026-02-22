import { formatPrice } from '../utils/helpers.js';

/**
 * ProductCard Component
 */
export class ProductCard {
  constructor(product) {
    this.product = product;
  }

  /**
   * Render product card
   * @returns {HTMLElement}
   */
  render() {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cursor = 'pointer';

    card.innerHTML = `
      <img src="${this.product.imageUrl}" alt="${this.product.name}" class="card-image">
      <div class="card-body">
        <h3 class="card-title">${this.product.name}</h3>
        <p class="card-text">${this.product.description.substring(0, 100)}${this.product.description.length > 100 ? '...' : ''}</p>
        <div class="card-price">${formatPrice(this.product.price)}</div>
      </div>
    `;

    // Navigate to product detail on click
    card.addEventListener('click', () => {
      window.location.hash = `/product/${this.product.id}`;
    });

    return card;
  }
}
