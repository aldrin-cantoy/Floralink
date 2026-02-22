import { storage } from '../services/StorageService.js';
import { generateId, getCurrentTimestamp, simpleHash, isValidEmail } from '../utils/helpers.js';

/**
 * AuthManager - Handles user authentication and session management
 */
export class AuthManager {
  constructor() {
    this.usersKey = 'users';
    this.sessionKey = 'session';
    this.sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
  }

  /**
   * Sign up new user
   * @param {string} name - User name
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object} Result with success status and message
   */
  signup(name, email, password) {
    // Validate email format
    if (!isValidEmail(email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    // Validate password length
    if (password.length < 8) {
      return { success: false, message: 'Please enter a password with at least 8 characters' };
    }

    // Check if email already exists
    const users = storage.get(this.usersKey) || [];
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'This email is already registered. Please log in instead.' };
    }

    // Create new user
    const newUser = {
      id: generateId(),
      name,
      email,
      passwordHash: simpleHash(password),
      isAdmin: false,
      createdAt: getCurrentTimestamp()
    };

    users.push(newUser);
    storage.set(this.usersKey, users);

    // Auto-login after signup
    this.createSession(newUser.id);

    return { success: true, message: 'Account created successfully', user: newUser };
  }

  /**
   * Log in user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object} Result with success status and message
   */
  login(email, password) {
    const users = storage.get(this.usersKey) || [];
    const user = users.find(u => u.email === email && u.passwordHash === simpleHash(password));

    if (!user) {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }

    this.createSession(user.id);
    return { success: true, message: 'Login successful', user };
  }

  /**
   * Log out current user
   */
  logout() {
    storage.remove(this.sessionKey);
  }

  /**
   * Get current logged-in user
   * @returns {Object|null} User object or null
   */
  getCurrentUser() {
    const session = storage.get(this.sessionKey);
    
    if (!session) {
      return null;
    }

    // Check if session expired
    if (new Date(session.expiresAt) < new Date()) {
      this.logout();
      return null;
    }

    const users = storage.get(this.usersKey) || [];
    return users.find(u => u.id === session.userId) || null;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  /**
   * Check if current user is admin
   * @returns {boolean}
   */
  isAdmin() {
    const user = this.getCurrentUser();
    return user ? user.isAdmin : false;
  }

  /**
   * Create session for user
   * @param {string} userId - User ID
   */
  createSession(userId) {
    const expiresAt = new Date(Date.now() + this.sessionDuration).toISOString();
    storage.set(this.sessionKey, { userId, expiresAt });
  }

  /**
   * Get all users (for admin purposes)
   * @returns {Array} Array of users
   */
  getAllUsers() {
    return storage.get(this.usersKey) || [];
  }
}

// Export singleton instance
export const authManager = new AuthManager();
