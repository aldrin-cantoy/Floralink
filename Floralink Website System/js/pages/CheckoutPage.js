import { authManager } from '../managers/AuthManager.js';
import { cartManager } from '../managers/CartManager.js';
import { orderManager } from '../managers/OrderManager.js';
import { formatPrice } from '../utils/helpers.js';
import { router } from '../Router.js';

/**
 * CheckoutPage Component
 */
export class CheckoutPage {
  render() {
    // Check authentication
    if (!authManager.isAuthenticated()) {
      router.navigate('/login');
      return document.createElement('div');
    }

    const page = document.createElement('div');
    page.className = 'page checkout-page';

    const items = cartManager.getItemsWithDetails();
    const total = cartManager.getTotal();
    const user = authManager.getCurrentUser();

    if (items.length === 0) {
      router.navigate('/cart');
      return document.createElement('div');
    }

    page.innerHTML = `
      <div class="container">
        <div class="checkout-header">
          <div class="floral-corner floral-corner-left">🌸</div>
          <h1 class="checkout-title"><span class="floralink-text">Floralink</span> Checkout 🌸</h1>
          <div class="floral-corner floral-corner-right">🌸</div>
        </div>
        
        <div class="checkout-container">
          <form id="checkout-form" class="checkout-form">
            <!-- Customer Information -->
            <div class="checkout-section">
              <h3 class="section-title">Customer Information</h3>
              
              <div class="form-group">
                <label class="form-label" for="full-name">Full Name</label>
                <input type="text" id="full-name" class="form-input" placeholder="Enter your full name" required>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="phone">Contact Number</label>
                <input type="tel" id="phone" class="form-input" placeholder="Enter your phone number" required>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="delivery-address">Delivery Address</label>
                <textarea id="delivery-address" class="form-textarea" placeholder="Enter complete delivery address" rows="3" required></textarea>
              </div>
            </div>
            
            <!-- Order Summary -->
            <div class="checkout-section">
              <h3 class="section-title">Order Summary</h3>
              
              <div class="order-items">
                ${items.map(item => `
                  <div class="order-item">
                    <span class="item-name">${item.product.name} x${item.quantity}</span>
                    <span class="item-price">${formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                `).join('')}
              </div>
              
              <div class="order-total">
                <span class="total-label">Total:</span>
                <span class="total-amount">${formatPrice(total)}</span>
              </div>
            </div>
            
            <!-- Payment Method -->
            <div class="checkout-section">
              <h3 class="section-title">Payment Method</h3>
              
              <div class="payment-methods">
                <button type="button" class="payment-method-btn" data-method="card">
                  💳 Credit/Debit Card
                </button>
                <button type="button" class="payment-method-btn gcash-btn active" data-method="gcash">
                  📱 Pay via GCash
                </button>
              </div>
              
              <!-- Card Payment Section -->
              <div id="card-payment" class="payment-section hidden">
                <div class="form-group">
                  <label class="form-label" for="card-number">Card Number</label>
                  <input type="text" id="card-number" class="form-input" placeholder="1234 5678 9012 3456">
                </div>
                
                <div class="grid grid-cols-2">
                  <div class="form-group">
                    <label class="form-label" for="expiry">Expiry Date</label>
                    <input type="text" id="expiry" class="form-input" placeholder="MM/YY">
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label" for="cvv">CVV</label>
                    <input type="text" id="cvv" class="form-input" placeholder="123">
                  </div>
                </div>
              </div>
              
              <!-- GCash Payment Section -->
              <div id="gcash-payment" class="payment-section">
                <div class="qr-code-container">
                  <div class="qr-code-placeholder">
                    <div class="qr-code-box">
                      <p class="qr-code-text">📱</p>
                      <p class="qr-code-label">Scan QR Code to Pay</p>
                      <p class="qr-code-amount">${formatPrice(total)}</p>
                    </div>
                  </div>
                </div>
                
                <div class="upload-section">
                  <label class="form-label" for="payment-screenshot">Upload Payment Screenshot</label>
                  <div class="file-upload-wrapper">
                    <input type="file" id="payment-screenshot" class="file-input" accept="image/*">
                    <label for="payment-screenshot" class="file-upload-label">
                      📷 Choose File
                    </label>
                    <span class="file-name" id="file-name">No file chosen</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="form-error" class="alert alert-error hidden"></div>
            
            <button type="submit" class="place-order-btn">
              Place Order 🌸
            </button>
          </form>
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
    const form = page.querySelector('#checkout-form');
    const formError = page.querySelector('#form-error');
    const paymentMethodBtns = page.querySelectorAll('.payment-method-btn');
    const cardPaymentSection = page.querySelector('#card-payment');
    const gcashPaymentSection = page.querySelector('#gcash-payment');
    const fileInput = page.querySelector('#payment-screenshot');
    const fileName = page.querySelector('#file-name');
    
    let selectedPaymentMethod = 'gcash'; // Default to GCash

    // Payment method selection
    paymentMethodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        paymentMethodBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get selected method
        selectedPaymentMethod = btn.dataset.method;
        
        // Show/hide payment sections
        if (selectedPaymentMethod === 'card') {
          cardPaymentSection.classList.remove('hidden');
          gcashPaymentSection.classList.add('hidden');
        } else {
          cardPaymentSection.classList.add('hidden');
          gcashPaymentSection.classList.remove('hidden');
        }
      });
    });

    // File input change handler
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        fileName.textContent = file.name;
      } else {
        fileName.textContent = 'No file chosen';
      }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const fullName = page.querySelector('#full-name').value;
      const phone = page.querySelector('#phone').value;
      const deliveryAddress = page.querySelector('#delivery-address').value;
      
      // Build payment info based on selected method
      let paymentInfo = {
        method: selectedPaymentMethod
      };
      
      if (selectedPaymentMethod === 'card') {
        const cardNumber = page.querySelector('#card-number').value;
        if (!cardNumber) {
          formError.textContent = 'Please enter card details.';
          formError.classList.remove('hidden');
          return;
        }
        paymentInfo.cardLast4 = cardNumber.slice(-4);
      } else {
        // GCash payment
        const screenshot = fileInput.files[0];
        if (!screenshot) {
          formError.textContent = 'Please upload payment screenshot.';
          formError.classList.remove('hidden');
          return;
        }
        paymentInfo.screenshotName = screenshot.name;
      }

      const orderData = {
        userId: authManager.getCurrentUser().id,
        items: cartManager.getItems(),
        total: cartManager.getTotal(),
        customerInfo: {
          fullName: fullName,
          phone: phone,
          deliveryAddress: deliveryAddress
        },
        paymentInfo: paymentInfo
      };

      try {
        // Create order
        const orderId = orderManager.createOrder(orderData);
        
        // Clear cart
        cartManager.clear();
        
        // Show success and redirect
        alert('Order placed successfully! Order ID: ' + orderId);
        router.navigate('/');
        window.location.reload();
      } catch (error) {
        formError.textContent = 'Error placing order. Please try again.';
        formError.classList.remove('hidden');
      }
    });
  }
}
