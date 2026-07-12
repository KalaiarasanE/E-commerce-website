/* ==========================================================================
   Order Management & Tracking Controller (E-Commerce Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    ordersController.init();
});

const ordersController = {
    init() {
        this.ordersContainer = document.getElementById('ordersListContainer');
        this.confirmationContainer = document.getElementById('orderConfirmationDetails');
        this.trackingContainer = document.getElementById('orderTrackingStatus');

        // Populate order history with a default seed order if none exists
        this.seedMockOrders();

        this.loadOrders();
    },

    seedMockOrders() {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        if (orders.length === 0 && window.productsData) {
            // Seed a past order for realistic dashboard overview
            const pastOrder = {
                orderId: 'ORD-849204',
                orderDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
                status: 'delivered',
                deliveryStatus: 'Delivered',
                paymentMethod: 'card',
                shippingMethod: 'standard',
                billing: {
                    name: 'Kalaiarasan E',
                    email: 'kalai@example.com',
                    address: '123 Tech Lane, Chennai, Tamil Nadu 600001',
                    phone: '9876543210'
                },
                items: [
                    {
                        id: 'p1',
                        title: 'Spectra Pro ANC Wireless Headphones',
                        price: 299.99,
                        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
                        quantity: 1,
                        color: '#000000',
                        size: 'Standard'
                    },
                    {
                        id: 'p12',
                        title: 'Premium Handcrafted Full Grain Leather Wallet',
                        price: 39.99,
                        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60',
                        quantity: 1,
                        color: '#78350f',
                        size: 'Bi-fold'
                    }
                ],
                summary: {
                    subtotal: 339.98,
                    shipping: 0, // free above 200
                    tax: 27.20,
                    discount: 0,
                    total: 367.18
                },
                trackingSteps: [
                    { title: 'Order Placed', desc: 'Your order was successfully verified.', date: '07/01/2026', active: true },
                    { title: 'Processing', desc: 'Preparing item components in warehouse.', date: '07/02/2026', active: true },
                    { title: 'Shipped', desc: 'In transit with transport courier.', date: '07/03/2026', active: true },
                    { title: 'Delivered', desc: 'Courier agent delivering to address.', date: '07/05/2026', active: true }
                ]
            };
            orders.push(pastOrder);
            localStorage.setItem('orders', JSON.stringify(orders));
        }
    },

    loadOrders() {
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];

        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('id');

        if (this.confirmationContainer && orderId) {
            // Render specific order confirmation details
            this.renderConfirmation(orderId);
        } else if (this.ordersContainer) {
            // Render general order list on profile/dashboard/orders page
            this.renderOrdersList();
        }

        if (this.trackingContainer && orderId) {
            this.renderTracking(orderId);
        }
    },

    renderOrdersList() {
        if (this.orders.length === 0) {
            this.ordersContainer.innerHTML = `
                <div class="empty-cart-state">
                    <i class="fas fa-box-open empty-cart-icon"></i>
                    <h3 class="empty-cart-title">No Orders Placed</h3>
                    <p class="empty-cart-desc">You haven't ordered anything yet. When you complete checkout, your order will appear here.</p>
                    <a href="products.html" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
            return;
        }

        this.ordersContainer.innerHTML = '';
        this.orders.forEach((order, index) => {
            const card = document.createElement('div');
            card.className = 'order-card animate-fade-in-up';
            card.style.marginBottom = '30px';

            let itemsHtml = '';
            order.items.forEach(item => {
                itemsHtml += `
                    <div class="order-item-row">
                        <img src="${item.image}" alt="${item.title}" class="order-item-img">
                        <div class="order-item-details">
                            <h4 class="order-item-title">${item.title}</h4>
                            <p class="order-item-qty">Qty: ${item.quantity} | Color: <span style="background-color:${item.color}; width:10px; height:10px; border-radius:50%; display:inline-block;"></span> | Size: ${item.size}</p>
                        </div>
                    </div>
                `;
            });

            let statusClass = 'status-processing';
            if (order.status === 'delivered') statusClass = 'status-delivered';
            if (order.status === 'shipped') statusClass = 'status-shipped';
            if (order.status === 'cancelled') statusClass = 'status-delivered'; // Re-use delivered styling or outline

            const orderDateStr = new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            card.innerHTML = `
                <div class="order-card-header">
                    <div class="order-meta-info">
                        <div class="order-meta-item">
                            <span>ORDER ID</span>
                            <p>${order.orderId}</p>
                        </div>
                        <div class="order-meta-item">
                            <span>DATE PLACED</span>
                            <p>${orderDateStr}</p>
                        </div>
                        <div class="order-meta-item">
                            <span>TOTAL AMOUNT</span>
                            <p>₹${order.summary.total.toFixed(2)}</p>
                        </div>
                    </div>
                    <div>
                        <span class="order-status-badge ${statusClass}">${order.status}</span>
                    </div>
                </div>
                <div class="order-card-body">
                    <div style="display:grid; grid-template-columns: 2fr 1.2fr; gap:30px; align-items:center;">
                        <div>${itemsHtml}</div>
                        <div style="display:flex; flex-direction:column; gap:10px;">
                            <a href="order-tracking.html?id=${order.orderId}" class="btn btn-outline btn-sm text-center">Track Delivery</a>
                            <button class="btn btn-outline btn-sm download-invoice-btn" data-id="${order.orderId}">Download Invoice</button>
                            ${order.status === 'processing' ? `<button class="btn btn-outline btn-sm cancel-order-btn" data-index="${index}" style="color:var(--accent); border-color:var(--accent);">Cancel Order</button>` : ''}
                        </div>
                    </div>
                </div>
            `;

            // Invoice download listener
            card.querySelector('.download-invoice-btn').addEventListener('click', () => {
                this.downloadInvoice(order);
            });

            // Cancel order button
            const cancelBtn = card.querySelector('.cancel-order-btn');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    this.cancelOrder(index);
                });
            }

            this.ordersContainer.appendChild(card);
        });
    },

    renderConfirmation(orderId) {
        const order = this.orders.find(o => o.orderId === orderId);
        if (!order) return;

        let itemsHtml = '';
        order.items.forEach(item => {
            itemsHtml += `
                <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                    <span>${item.title} (x${item.quantity})</span>
                    <strong>₹${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
            `;
        });

        this.confirmationContainer.innerHTML = `
            <div class="section-padding text-center">
                <i class="far fa-check-circle animate-pulse-glow" style="font-size: 5rem; color: var(--secondary); margin-bottom: 24px; border-radius:50%;"></i>
                <h1 style="font-size: 2.5rem; font-weight:800; margin-bottom:10px;">Thank You for Your Order!</h1>
                <p style="color:var(--text-secondary); margin-bottom:40px;">Your payment was verified, and your order has been placed. Order ID is <strong>${order.orderId}</strong>.</p>
                
                <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:40px; text-align:left; background-color:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:40px;">
                    <div>
                        <h3 style="margin-bottom:20px; font-weight:700; border-bottom:1px solid var(--border-color); padding-bottom:10px;">Order Details</h3>
                        ${itemsHtml}
                        <div style="border-top:1px solid var(--border-color); margin-top:20px; padding-top:15px; display:flex; justify-content:space-between; font-weight:700; font-size:1.15rem;">
                            <span>Grand Total</span>
                            <span>₹${order.summary.total.toFixed(2)}</span>
                        </div>
                    </div>
                    <div>
                        <h3 style="margin-bottom:20px; font-weight:700; border-bottom:1px solid var(--border-color); padding-bottom:10px;">Delivery Address</h3>
                        <p><strong>${order.billing.name}</strong></p>
                        <p style="color:var(--text-secondary); margin-top:6px;">${order.billing.address}</p>
                        <p style="color:var(--text-secondary); margin-top:6px;">Phone: ${order.billing.phone}</p>
                        <p style="color:var(--text-secondary); margin-top:6px;">Email: ${order.billing.email}</p>
                        <div style="margin-top:30px; display:flex; gap:16px;">
                            <a href="order-tracking.html?id=${order.orderId}" class="btn btn-primary btn-sm">Track Order</a>
                            <button class="btn btn-outline btn-sm download-invoice-btn">Download Invoice</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.confirmationContainer.querySelector('.download-invoice-btn').addEventListener('click', () => {
            this.downloadInvoice(order);
        });
    },

    renderTracking(orderId) {
        const order = this.orders.find(o => o.orderId === orderId);
        if (!order) return;

        let stepsHtml = '';
        order.trackingSteps.forEach((step, idx) => {
            const stepClass = step.active ? 'active' : '';
            stepsHtml += `
                <div class="tracking-step ${stepClass}" style="display:flex; gap:20px; margin-bottom:30px; position:relative;">
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div class="step-bullet" style="width:24px; height:24px; border-radius:50%; background-color:${step.active ? 'var(--primary)' : 'var(--border-color)'}; display:flex; align-items:center; justify-content:center; color:white; font-size:0.75rem; z-index:2;">
                            ${step.active ? '<i class="fas fa-check"></i>' : idx + 1}
                        </div>
                        ${idx < order.trackingSteps.length - 1 ? `<div class="step-line" style="width:2px; height:100%; background-color:${order.trackingSteps[idx + 1].active ? 'var(--primary)' : 'var(--border-color)'}; position:absolute; top:24px; z-index:1;"></div>` : ''}
                    </div>
                    <div>
                        <h4 style="font-weight:700; font-size:1.05rem; color:${step.active ? 'var(--text-primary)' : 'var(--text-muted)'};">${step.title}</h4>
                        <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:4px;">${step.desc}</p>
                        <span style="font-size:0.75rem; color:var(--text-muted); display:block; margin-top:4px;">Date: ${step.date}</span>
                    </div>
                </div>
            `;
        });

        this.trackingContainer.innerHTML = `
            <div style="background-color:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:40px; margin-top:40px;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:20px; margin-bottom:30px;">
                    <div>
                        <h2 style="font-weight:800;">Track Order Status</h2>
                        <p style="color:var(--text-secondary); margin-top:4px;">Order ID: <strong>${order.orderId}</strong> | Est. Delivery: 2-3 Days</p>
                    </div>
                    <span class="order-status-badge status-shipped" style="padding:8px 16px;">${order.status}</span>
                </div>
                <div style="max-width:600px; margin:0 auto; padding:20px 0;">
                    ${stepsHtml}
                </div>
            </div>
        `;
    },

    cancelOrder(index) {
        if (confirm('Are you sure you want to cancel this order?')) {
            this.orders[index].status = 'cancelled';
            this.orders[index].deliveryStatus = 'Cancelled';
            localStorage.setItem('orders', JSON.stringify(this.orders));
            this.renderOrdersList();
            window.showToast('Order has been cancelled successfully.', 'success');
        }
    },

    downloadInvoice(order) {
        // Create dynamic print view for invoice
        const printWindow = window.open('', '_blank');
        
        let itemsRows = '';
        order.items.forEach(item => {
            itemsRows += `
                <tr>
                    <td style="padding:10px; border-bottom:1px solid #ddd;">${item.title}</td>
                    <td style="padding:10px; border-bottom:1px solid #ddd; text-align:center;">${item.quantity}</td>
                    <td style="padding:10px; border-bottom:1px solid #ddd; text-align:right;">₹${item.price.toFixed(2)}</td>
                    <td style="padding:10px; border-bottom:1px solid #ddd; text-align:right;">₹${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `;
        });

        const invoiceHtml = `
            <html>
            <head>
                <title>Invoice - ${order.orderId}</title>
                <style>
                    body { font-family: Arial, sans-serif; color: #333; padding: 40px; }
                    .invoice-header { display: flex; justify-content: space-between; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                    .invoice-body { margin-bottom: 40px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th { background-color: #f5f5f5; padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
                </style>
            </head>
            <body>
                <div class="invoice-header">
                    <div>
                        <h2>E-COMMERCE CLONE</h2>
                        <p>123 Marketplace Avenue, Suite 100</p>
                        <p>customercare@ecomclone.com</p>
                    </div>
                    <div style="text-align: right;">
                        <h1>INVOICE</h1>
                        <p><strong>Order ID:</strong> ${order.orderId}</p>
                        <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <div class="invoice-body">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                        <div>
                            <h4>Billed To:</h4>
                            <p><strong>${order.billing.name}</strong></p>
                            <p>${order.billing.address}</p>
                            <p>Phone: ${order.billing.phone}</p>
                        </div>
                        <div style="text-align: right;">
                            <h4>Payment details:</h4>
                            <p>Method: ${order.paymentMethod.toUpperCase()}</p>
                            <p>Shipping: ${order.shippingMethod.toUpperCase()}</p>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th style="text-align:center;">Qty</th>
                                <th style="text-align:right;">Unit Price</th>
                                <th style="text-align:right;">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsRows}
                        </tbody>
                    </table>
                    <div style="width: 300px; margin-left: auto; margin-top: 30px; text-align: right;">
                        <p>Subtotal: ₹${order.summary.subtotal.toFixed(2)}</p>
                        <p>Tax (8%): ₹${order.summary.tax.toFixed(2)}</p>
                        <p>Shipping: ₹${order.summary.shipping === 0 ? 'FREE' : `₹${order.summary.shipping.toFixed(2)}`}</p>
                        ${order.summary.discount > 0 ? `<p>Discount: -₹${order.summary.discount.toFixed(2)}</p>` : ''}
                        <h3 style="border-top: 1px solid #333; padding-top: 10px; margin-top: 10px;">Total: ₹${order.summary.total.toFixed(2)}</h3>
                    </div>
                </div>
                <script>window.print();</script>
            </body>
            </html>
        `;

        printWindow.document.write(invoiceHtml);
        printWindow.document.close();
    }
};
