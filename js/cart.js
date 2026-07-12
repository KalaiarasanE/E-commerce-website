/* ==========================================================================
   Shopping Cart Controller (E-Commerce Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    cartController.init();
});

const cartController = {
    discountRate: 0, // percentage discount
    flatDiscount: 0,  // flat dollar discount
    appliedCoupon: '',

    init() {
        this.cartListElement = document.getElementById('cartItemsList');
        this.summaryContainer = document.getElementById('orderSummaryContainer');
        this.couponForm = document.getElementById('couponForm');

        if (!this.cartListElement) return; // Exit if not on cart page

        this.loadCart();
        this.setupCouponListener();
    },

    loadCart() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.render();
    },

    render() {
        if (this.cart.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.cartListElement.innerHTML = '';
        this.cart.forEach((item, index) => {
            const itemHtml = this.createCartItemRow(item, index);
            this.cartListElement.appendChild(itemHtml);
        });

        this.updateTotals();
    },

    renderEmptyState() {
        this.cartListElement.innerHTML = `
            <div class="empty-cart-state animate-scale-in">
                <i class="fas fa-shopping-cart empty-cart-icon"></i>
                <h3 class="empty-cart-title">Your Cart is Empty</h3>
                <p class="empty-cart-desc">Looks like you haven't added anything to your cart yet. Head back to the shop to find great deals!</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        if (this.summaryContainer) {
            this.summaryContainer.style.opacity = '0.5';
            this.summaryContainer.style.pointerEvents = 'none';
        }
    },

    createCartItemRow(item, index) {
        const row = document.createElement('div');
        row.className = 'cart-item animate-fade-in-up';
        
        let colorHtml = '';
        if (item.color) {
            colorHtml = `
                <div class="meta-color">
                    <span>Color:</span>
                    <span class="color-indicator" style="background-color: ${item.color};"></span>
                </div>
            `;
        }

        let sizeHtml = '';
        if (item.size) {
            sizeHtml = `
                <div class="meta-size">
                    <span>Size:</span>
                    <strong>${item.size}</strong>
                </div>
            `;
        }

        row.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                <div class="cart-item-meta">
                    ${colorHtml}
                    ${sizeHtml}
                </div>
                <div class="cart-item-price-quantity">
                    <span class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
                    
                    <div class="quantity-control">
                        <button class="qty-btn qty-dec-btn" data-index="${index}"><i class="fas fa-minus"></i></button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn qty-inc-btn" data-index="${index}"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="cart-item-remove-btn remove-item-btn" data-index="${index}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

        // Listeners for quantity adjusters
        row.querySelector('.qty-dec-btn').addEventListener('click', () => this.updateQuantity(index, -1));
        row.querySelector('.qty-inc-btn').addEventListener('click', () => this.updateQuantity(index, 1));
        row.querySelector('.remove-item-btn').addEventListener('click', () => this.removeItem(index));

        return row;
    },

    updateQuantity(index, change) {
        const newQty = this.cart[index].quantity + change;
        if (newQty < 1) return;

        this.cart[index].quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.render();
        window.syncCounters();
    },

    removeItem(index) {
        const itemTitle = this.cart[index].title;
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.render();
        window.syncCounters();
        window.showToast(`"${itemTitle}" removed from cart.`, 'info');
    },

    updateTotals() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Free shipping on orders over $200, else flat $10
        const shipping = subtotal >= 200 ? 0 : 10.00;
        
        // 8% tax calculation
        const tax = subtotal * 0.08;

        // Discount calculation
        let discount = 0;
        if (this.discountRate > 0) {
            discount = subtotal * this.discountRate;
        } else if (this.flatDiscount > 0) {
            discount = this.flatDiscount;
        }

        const total = Math.max(0, subtotal + shipping + tax - discount);

        // Update DOM
        const subtotalEl = document.getElementById('summarySubtotal');
        const shippingEl = document.getElementById('summaryShipping');
        const taxEl = document.getElementById('summaryTax');
        const discountRow = document.getElementById('summaryDiscountRow');
        const discountEl = document.getElementById('summaryDiscount');
        const totalEl = document.getElementById('summaryTotal');

        if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `₹${tax.toFixed(2)}`;
        
        if (discountEl && discountRow) {
            if (discount > 0) {
                discountEl.textContent = `-₹${discount.toFixed(2)}`;
                discountRow.style.display = 'flex';
            } else {
                discountRow.style.display = 'none';
            }
        }

        if (totalEl) totalEl.textContent = `₹${total.toFixed(2)}`;

        // Save order calculations to session for checkout page
        const orderSummary = { subtotal, shipping, tax, discount, total };
        localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
    },

    setupCouponListener() {
        if (!this.couponForm) return;

        this.couponForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('couponCodeInput');
            if (!input) return;

            const code = input.value.trim().toUpperCase();

            if (code === '') {
                window.showToast('Please enter a coupon code.', 'warning');
                return;
            }

            if (this.appliedCoupon === code) {
                window.showToast('This coupon is already applied.', 'warning');
                return;
            }

            // Coupon codes definition
            if (code === 'WELCOME10') {
                this.discountRate = 0.10; // 10% off
                this.flatDiscount = 0;
                this.appliedCoupon = code;
                window.showToast('Coupon "WELCOME10" (10% Off) applied successfully!', 'success');
            } else if (code === 'SAVEMORE') {
                this.flatDiscount = 20.00; // $20 flat off
                this.discountRate = 0;
                this.appliedCoupon = code;
                window.showToast('Coupon "SAVEMORE" ($20 Off) applied successfully!', 'success');
            } else {
                window.showToast('Invalid coupon code.', 'error');
                return;
            }

            this.updateTotals();
        });
    }
};
