import { authManager } from '../managers/AuthManager.js';
import { router } from '../Router.js';

/**
 * LoginPage Component
 */
export class LoginPage {
  render() {
    const page = document.createElement('div');
    page.className = 'page';

    page.innerHTML = `
      <div class="container" style="max-width: 500px;">
        <h1 class="text-center mb-xl">Login to FloraLink</h1>
        
        <div class="card">
          <div class="card-body">
            <form id="login-form">
              <div class="form-group">
                <label class="form-label" for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  class="form-input" 
                  placeholder="your@email.com"
                  required
                >
                <span class="form-error" id="email-error"></span>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <div class="password-input-wrapper">
                  <input 
                    type="password" 
                    id="password" 
                    class="form-input" 
                    placeholder="Enter your password"
                    required
                  >
                  <button 
                    type="button" 
                    class="password-toggle-btn" 
                    aria-label="Toggle password visibility"
                    data-password-toggle
                  >
                    👁️
                  </button>
                </div>
                <span class="form-error" id="password-error"></span>
              </div>
              
              <div id="form-error" class="alert alert-error hidden"></div>
              
              <button type="submit" class="btn btn-primary btn-large">
                Login
              </button>
            </form>
            
            <p class="text-center mt-lg">
              Don't have an account? 
              <a href="#/signup" style="color: var(--color-primary); font-weight: var(--font-weight-medium);">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners(page);

    return page;
  }

  /**
   * Attach event listeners
   * @param {HTMLElement} page - Page element
   */
  attachEventListeners(page) {
    const form = page.querySelector('#login-form');
    const formError = page.querySelector('#form-error');
    const passwordToggle = page.querySelector('[data-password-toggle]');
    const passwordInput = page.querySelector('#password');

    // Password toggle functionality
    if (passwordToggle && passwordInput) {
      passwordToggle.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordToggle.textContent = isPassword ? '🙈' : '👁️';
        passwordToggle.setAttribute('aria-label', 
          isPassword ? 'Hide password' : 'Show password'
        );
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = page.querySelector('#email').value.trim();
      const password = page.querySelector('#password').value;

      // Clear previous errors
      formError.classList.add('hidden');

      // Attempt login
      const result = authManager.login(email, password);

      if (result.success) {
        // Redirect to home and reload to update header
        router.navigate('/');
        window.location.reload();
      } else {
        formError.textContent = result.message;
        formError.classList.remove('hidden');
      }
    });
  }
}
