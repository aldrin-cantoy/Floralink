import { storage } from '../services/StorageService.js';
import { getCurrentTimestamp } from '../utils/helpers.js';
import { productManager } from './ProductManager.js';

/**
 * CartManager - Handles shopping cart operations
 */
export class CartManager {
  constructor() {
    this.storageKey = 'cart';
  }

  /**
   * Add item to cart
   * @param {string} productId - Product ID
   * @param {number} quantity - Quantity to add
   */
  addItem(productId, quantity = 1) {
    const cart = this.getItems();
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
        addedAt: getCurrentTimestamp()
      });
    }

    storage.set(this.storageKey, cart);
  }

  /**
   * Remove item from cart
   * @param {string} productId - Product ID
   */
  removeItem(productId) {
    const cart = this.getItems();
    const filtered = cart.filter(item => item.productId !== productId);
    storage.set(this.storageKey, filtered);
  }

  /**
   * Update item quantity
   * @param {string} productId - Product ID
   * @param {number} quantity - New quantity
   */
  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const cart = this.getItems();
    const item = cart.find(item => item.productId === productId);

    if (item) {
      item.quantity = quantity;
      storage.set(this.storageKey, cart);
    }
  }

  /**
   * Get all cart items
   * @returns {Array} Array of cart items
   */
  getItems() {
    return storage.get(this.storageKey) || [];
  }

  /**
   * Get cart items with product details
   * @returns {Array} Array of cart items with product info
   */
  getItemsWithDetails() {
    const cart = this.getItems();
    return cart.map(item => {
      const product = productManager.getProductById(item.productId);
      return {
        ...item,
        product
      };
    }).filter(item => item.product !== null);
  }

  /**
   * Get total number of items in cart
   * @returns {number} Total item count
   */
  getItemCount() {
    const cart = this.getItems();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Get cart total price
   * @returns {number} Total price
   */
  getTotal() {
    const items = this.getItemsWithDetails();
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  /**
   * Clear cart
   */
  clear() {
    storage.set(this.storageKey, []);
  }
}

// Export singleton instance
export const cartManager = new CartManager();
