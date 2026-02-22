import { storage } from '../services/StorageService.js';
import { generateId, getCurrentTimestamp } from '../utils/helpers.js';

/**
 * OrderManager - Handles order creation and management
 */
export class OrderManager {
  constructor() {
    this.storageKey = 'orders';
  }

  /**
   * Create new order
   * @param {Object} orderData - Order data
   * @returns {string} Order ID
   */
  createOrder(orderData) {
    const orders = storage.get(this.storageKey) || [];
    
    const newOrder = {
      id: generateId(),
      userId: orderData.userId,
      items: orderData.items,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
      contactInfo: orderData.contactInfo,
      paymentInfo: orderData.paymentInfo,
      status: 'pending',
      createdAt: getCurrentTimestamp()
    };

    orders.push(newOrder);
    storage.set(this.storageKey, orders);
    
    return newOrder.id;
  }

  /**
   * Get order by ID
   * @param {string} id - Order ID
   * @returns {Object|null} Order or null
   */
  getOrderById(id) {
    const orders = storage.get(this.storageKey) || [];
    return orders.find(o => o.id === id) || null;
  }

  /**
   * Get orders by user ID
   * @param {string} userId - User ID
   * @returns {Array} Array of orders
   */
  getOrdersByUser(userId) {
    const orders = storage.get(this.storageKey) || [];
    return orders.filter(o => o.userId === userId);
  }

  /**
   * Update order status
   * @param {string} id - Order ID
   * @param {string} status - New status
   * @returns {boolean} Success status
   */
  updateOrderStatus(id, status) {
    const orders = storage.get(this.storageKey) || [];
    const order = orders.find(o => o.id === id);
    
    if (!order) {
      return false;
    }

    order.status = status;
    storage.set(this.storageKey, orders);
    return true;
  }
}

// Export singleton instance
export const orderManager = new OrderManager();
