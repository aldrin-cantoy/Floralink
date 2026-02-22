import { storage } from '../services/StorageService.js';
import { generateId, getCurrentTimestamp } from '../utils/helpers.js';

/**
 * ProductManager - Handles product CRUD operations
 */
export class ProductManager {
  constructor() {
    this.storageKey = 'products';
  }

  /**
   * Get all products
   * @returns {Array} Array of products
   */
  getAllProducts() {
    return storage.get(this.storageKey) || [];
  }

  /**
   * Get product by ID
   * @param {string} id - Product ID
   * @returns {Object|null} Product or null
   */
  getProductById(id) {
    const products = this.getAllProducts();
    return products.find(p => p.id === id) || null;
  }

  /**
   * Get products by category
   * @param {string} category - Category name
   * @returns {Array} Array of products
   */
  getProductsByCategory(category) {
    const products = this.getAllProducts();
    return products.filter(p => p.category === category);
  }

  /**
   * Get featured products
   * @param {number} count - Number of products to return
   * @returns {Array} Array of featured products
   */
  getFeaturedProducts(count = 6) {
    const products = this.getAllProducts();
    const featured = products.filter(p => p.featured);
    return featured.slice(0, count);
  }

  /**
   * Create new product
   * @param {Object} product - Product data
   * @returns {string} Product ID
   */
  createProduct(product) {
    // Validate required fields
    if (!product.name || !product.price || !product.category || !product.imageUrl) {
      throw new Error('Missing required fields: name, price, category, imageUrl');
    }

    const products = this.getAllProducts();
    const newProduct = {
      id: generateId(),
      name: product.name,
      description: product.description || '',
      price: parseFloat(product.price),
      imageUrl: product.imageUrl,
      category: product.category,
      featured: product.featured || false,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    };

    products.push(newProduct);
    storage.set(this.storageKey, products);
    return newProduct.id;
  }

  /**
   * Update product
   * @param {string} id - Product ID
   * @param {Object} updates - Fields to update
   * @returns {boolean} Success status
   */
  updateProduct(id, updates) {
    const products = this.getAllProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return false;
    }

    products[index] = {
      ...products[index],
      ...updates,
      id: products[index].id, // Preserve ID
      createdAt: products[index].createdAt, // Preserve creation date
      updatedAt: getCurrentTimestamp()
    };

    storage.set(this.storageKey, products);
    return true;
  }

  /**
   * Delete product
   * @param {string} id - Product ID
   * @returns {boolean} Success status
   */
  deleteProduct(id) {
    const products = this.getAllProducts();
    const filtered = products.filter(p => p.id !== id);
    
    if (filtered.length === products.length) {
      return false; // Product not found
    }

    storage.set(this.storageKey, filtered);
    return true;
  }
}

// Export singleton instance
export const productManager = new ProductManager();
