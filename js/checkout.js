/* ==========================================================================
   Checkout Flow Controller (E-Commerce Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    checkoutController.init();
});

const checkoutController = {
    selectedShippingMethod: 'standard',
    selectedPaymentMethod: 'card',

    init() {
        this.previewContainer = document.getElementById('checkoutItemsPreview');
        this.checkoutForm = document.getElementById('checkoutDetailsForm');

        if (!this.previewContainer && !this.checkoutForm) return; // Exit if not on checkout page

        this.loadCartPreviewAndTotals();
        this.setupDeliveryOptionListeners();
        this.setupPaymentMethodListeners();
        this.setupSubmitButton();
    },

    loadCartPreviewAndTotals() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.summary = JSON.parse(localStorage.getItem('orderSummary')) || { subtotal: 0, shipping: 10, tax: 0, discount: 0, total: 0 };

        if (this.cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        // Render preview items list
        if (this.previewContainer) {
            this.previewContainer.innerHTML = '';
            this.cart.forEach(item => {
                const div = document.createElement('div');
                div.className = 'preview-item';
                div.innerHTML = `
                    <div class="preview-item-image">
                        <img src="${item.image}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div class="preview-item-info">
                        <div class="preview-item-title">${item.title}</div>
                        <div class="preview-item-qty-price">
                            <span>Qty: ${item.quantity}</span>
                            <strong>₹${(item.price * item.quantity).toFixed(2)}</strong>
                        </div>
                    </div>
                `;
                this.previewContainer.appendChild(div);
            });
        }

        // Update pricing fields in page summary
        this.updateSummaryDOM();
    },

    updateSummaryDOM() {
        const subtotalEl = document.getElementById('checkoutSubtotal');
        const shippingEl = document.getElementById('checkoutShipping');
        const taxEl = document.getElementById('checkoutTax');
        const discountRow = document.getElementById('checkoutDiscountRow');
        const discountEl = document.getElementById('checkoutDiscount');
        const totalEl = document.getElementById('checkoutTotal');

        if (subtotalEl) subtotalEl.textContent = `₹${this.summary.subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = this.summary.shipping === 0 ? 'FREE' : `₹${this.summary.shipping.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `₹${this.summary.tax.toFixed(2)}`;
        
        if (discountEl && discountRow) {
            if (this.summary.discount > 0) {
                discountEl.textContent = `-₹${this.summary.discount.toFixed(2)}`;
                discountRow.style.display = 'flex';
            } else {
                discountRow.style.display = 'none';
            }
        }

        if (totalEl) totalEl.textContent = `₹${this.summary.total.toFixed(2)}`;
    },

    setupDeliveryOptionListeners() {
        const cards = document.querySelectorAll('.delivery-option-card');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                
                const radio = card.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;

                const method = card.getAttribute('data-method');
                this.selectedShippingMethod = method;

                // Adjust shipping price dynamically
                let newShipping = 10.00;
                if (method === 'express') {
                    newShipping = 25.00;
                } else if (method === 'free' || this.summary.subtotal >= 200) {
                    newShipping = 0.00;
                }

                // Recalculate grand total
                const diff = newShipping - this.summary.shipping;
                this.summary.shipping = newShipping;
                this.summary.total += diff;

                this.updateSummaryDOM();
            });
        });
    },

    setupPaymentMethodListeners() {
        const buttons = document.querySelectorAll('.payment-method-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedPaymentMethod = btn.getAttribute('data-method');
            });
        });
    },

    setupSubmitButton() {
        if (!this.checkoutForm) return;

        this.checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple form validations
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('checkoutEmail').value.trim();
            const address = document.getElementById('checkoutAddress').value.trim();
            const city = document.getElementById('checkoutCity').value.trim();
            const state = document.getElementById('checkoutState').value.trim();
            const zip = document.getElementById('checkoutZip').value.trim();
            const phone = document.getElementById('checkoutPhone').value.trim();

            if (!firstName || !lastName || !email || !address || !city || !state || !zip || !phone) {
                window.showToast('Please fill in all shipping details.', 'warning');
                return;
            }

            // Save details to LocalStorage pending order object
            const pendingOrder = {
                items: this.cart,
                billing: {
                    name: `${firstName} ${lastName}`,
                    email: email,
                    address: `${address}, ${city}, ${state} ${zip}`,
                    phone: phone
                },
                summary: this.summary,
                shippingMethod: this.selectedShippingMethod,
                paymentMethod: this.selectedPaymentMethod,
                orderDate: new Date().toISOString(),
                orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000)
            };

            localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));

            // Proceed to Payment screen
            window.location.href = 'payment.html';
        });
    }
};
