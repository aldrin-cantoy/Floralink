import { authManager } from '../managers/AuthManager.js';
import { router } from '../Router.js';

/**
 * SignupPage Component
 */
export class SignupPage {
  render() {
    const page = document.createElement('div');
    page.className = 'page';

    page.innerHTML = `
      <div class="container" style="max-width: 500px;">
        <h1 class="text-center mb-xl">Create Your Account</h1>
        
        <div class="card">
          <div class="card-body">
            <form id="signup-form">
              <div class="form-group">
                <label class="form-label" for="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  class="form-input" 
                  placeholder="John Doe"
                  required
                >
                <span class="form-error" id="name-error"></span>
              </div>
              
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
                    placeholder="At least 8 characters"
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
                Sign Up
              </button>
            </form>
            
            <p class="text-center mt-lg">
              Already have an account? 
              <a href="#/login" style="color: var(--color-primary); font-weight: var(--font-weight-medium);">
                Login here
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
    const form = page.querySelector('#signup-form');
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

      const name = page.querySelector('#name').value.trim();
      const email = page.querySelector('#email').value.trim();
      const password = page.querySelector('#password').value;

      // Clear previous errors
      formError.classList.add('hidden');

      // Validate inputs
      if (!name) {
        formError.textContent = 'Please enter your name';
        formError.classList.remove('hidden');
        return;
      }

      // Attempt signup
      const result = authManager.signup(name, email, password);

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
