/* ==========================================================================
   Payment Page Controller (E-Commerce Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    paymentController.init();
});

const paymentController = {
    init() {
        this.pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));
        if (!this.pendingOrder) {
            window.location.href = 'index.html';
            return;
        }

        this.paymentMethod = this.pendingOrder.paymentMethod;
        this.renderPaymentView();
        this.setupEventListeners();
    },

    renderPaymentView() {
        // Render order total in summary
        const amountEl = document.getElementById('paymentAmount');
        if (amountEl) amountEl.textContent = `₹${this.pendingOrder.summary.total.toFixed(2)}`;

        // Show relevant payment form panel
        const cardPanel = document.getElementById('cardPaymentPanel');
        const upiPanel = document.getElementById('upiPaymentPanel');
        const codPanel = document.getElementById('codPaymentPanel');

        if (cardPanel) cardPanel.style.display = 'none';
        if (upiPanel) upiPanel.style.display = 'none';
        if (codPanel) codPanel.style.display = 'none';

        if (this.paymentMethod === 'card' || this.paymentMethod === 'debit') {
            if (cardPanel) cardPanel.style.display = 'block';
            this.initCardInputSync();
        } else if (this.paymentMethod === 'upi' || this.paymentMethod === 'wallet') {
            if (upiPanel) upiPanel.style.display = 'block';
        } else {
            // Cash on delivery or Net banking defaults
            if (codPanel) codPanel.style.display = 'block';
        }
    },

    /* Card field matching visual card sync */
    initCardInputSync() {
        const numberInput = document.getElementById('cardNumberInput');
        const nameInput = document.getElementById('cardNameInput');
        const expiryInput = document.getElementById('cardExpiryInput');
        const cvvInput = document.getElementById('cardCvvInput');

        const cardNumDisplay = document.getElementById('visualCardNumber');
        const cardNameDisplay = document.getElementById('visualCardName');
        const cardExpiryDisplay = document.getElementById('visualCardExpiry');

        if (numberInput && cardNumDisplay) {
            numberInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\D/g, '');
                val = val.substring(0, 16);
                let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
                e.target.value = formatted;
                cardNumDisplay.textContent = formatted || '•••• •••• •••• ••••';
            });
        }

        if (nameInput && cardNameDisplay) {
            nameInput.addEventListener('input', (e) => {
                cardNameDisplay.textContent = e.target.value.toUpperCase() || 'CARDHOLDER NAME';
            });
        }

        if (expiryInput && cardExpiryDisplay) {
            expiryInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\D/g, '');
                val = val.substring(0, 4);
                if (val.length > 2) {
                    val = val.substring(0, 2) + '/' + val.substring(2);
                }
                e.target.value = val;
                cardExpiryDisplay.textContent = val || 'MM/YY';
            });
        }
    },

    setupEventListeners() {
        const form = document.getElementById('paymentDetailsForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate loading state (Network verification)
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Verifying...';

            setTimeout(() => {
                // Randomly succeed for prototype (95% success rate)
                const isSuccessful = Math.random() < 0.95;

                if (isSuccessful) {
                    this.completeOrderSuccess();
                } else {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    window.showToast('Payment verification failed. Please check details or try another method.', 'error');
                }
            }, 2500); // 2.5s verification delay
        });
    },

    completeOrderSuccess() {
        // Save the successful order to general Orders history
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        // Push order at the beginning of history list
        orders.unshift({
            ...this.pendingOrder,
            status: 'processing',
            deliveryStatus: 'Order Placed',
            trackingSteps: [
                { title: 'Order Placed', desc: 'Your order was successfully verified.', date: new Date().toLocaleDateString(), active: true },
                { title: 'Processing', desc: 'Preparing item components in warehouse.', date: 'Pending', active: false },
                { title: 'Shipped', desc: 'In transit with transport courier.', date: 'Pending', active: false },
                { title: 'Out for Delivery', desc: 'Courier agent delivering to address.', date: 'Pending', active: false }
            ]
        });

        localStorage.setItem('orders', JSON.stringify(orders));

        // Save last placed order globally for success screen references
        localStorage.setItem('latestOrder', JSON.stringify(this.pendingOrder));

        // Clear active shopping cart state
        localStorage.removeItem('cart');
        localStorage.removeItem('pendingOrder');
        localStorage.removeItem('orderSummary');

        // Sync header count updates
        window.syncCounters();

        // Show full success page transition overlay
        const overlay = document.getElementById('paymentSuccessOverlay');
        if (overlay) {
            overlay.classList.add('active');
            
            // Set invoice order ID reference
            const successOrderId = document.getElementById('successOrderId');
            if (successOrderId) successOrderId.textContent = this.pendingOrder.orderId;
        } else {
            // Redirect straight to confirmation page if overlay not present
            window.location.href = `orders.html?id=${this.pendingOrder.orderId}`;
        }
    }
};
