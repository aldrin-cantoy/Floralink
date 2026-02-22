/**
 * CategoryNav Component
 */
export class CategoryNav {
  constructor() {
    this.categories = [
      'Romantic',
      'Sympathy & Funeral',
      'Wedding & Engagement',
      'Celebrations',
      'Seasonal & Special Days'
    ];
  }

  /**
   * Render category navigation
   * @returns {HTMLElement}
   */
  render() {
    const nav = document.createElement('div');
    nav.className = 'category-nav';

    const currentPath = window.location.hash;

    nav.innerHTML = `
      <div class="container">
        <ul class="category-list">
          ${this.categories.map(category => `
            <li class="category-item">
              <a href="#/category/${encodeURIComponent(category)}" 
                 class="${currentPath.includes(category) ? 'active' : ''}">
                ${category}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    return nav;
  }

  /**
   * Get all categories
   * @returns {Array} Array of category names
   */
  getCategories() {
    return this.categories;
  }
}

// Export singleton instance
export const categoryNav = new CategoryNav();
