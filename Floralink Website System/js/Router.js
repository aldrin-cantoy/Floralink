/**
 * Router - Hash-based client-side routing
 */
export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
  }

  /**
   * Add route
   * @param {string} path - Route path
   * @param {Function} handler - Route handler function
   */
  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  /**
   * Navigate to path
   * @param {string} path - Path to navigate to
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * Get current route
   * @returns {string} Current route path
   */
  getCurrentRoute() {
    return window.location.hash.slice(1) || '/';
  }

  /**
   * Parse route parameters
   * @param {string} pattern - Route pattern
   * @param {string} path - Actual path
   * @returns {Object|null} Parameters or null
   */
  parseParams(pattern, path) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) {
      return null;
    }

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        const paramName = patternParts[i].slice(1);
        params[paramName] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }

    return params;
  }

  /**
   * Handle route change
   */
  handleRoute() {
    const path = this.getCurrentRoute();
    this.currentRoute = path;

    // Try exact match first
    if (this.routes[path]) {
      this.routes[path]();
      return;
    }

    // Try pattern matching
    for (const pattern in this.routes) {
      if (pattern.includes(':')) {
        const params = this.parseParams(pattern, path);
        if (params) {
          this.routes[pattern](params);
          return;
        }
      }
    }

    // 404 - Route not found
    if (this.routes['404']) {
      this.routes['404']();
    } else {
      console.error('Route not found:', path);
      this.navigate('/');
    }
  }

  /**
   * Initialize router
   */
  init() {
    // Handle initial route
    this.handleRoute();

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });
  }
}

// Export singleton instance
export const router = new Router();
