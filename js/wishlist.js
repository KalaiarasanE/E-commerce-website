/* ==========================================================================
   Wishlist Page Controller (E-Commerce Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    wishlistController.init();
});

const wishlistController = {
    init() {
        this.wishlistGrid = document.getElementById('wishlistGrid');
        if (!this.wishlistGrid) return; // Exit if not on wishlist page

        this.loadWishlist();
    },

    loadWishlist() {
        this.wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.render();
    },

    render() {
        if (this.wishlistIds.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.wishlistGrid.innerHTML = '';
        
        // Match IDs with actual product object information
        this.wishlistIds.forEach(id => {
            const product = (window.productsData || []).find(p => p.id === id);
            if (product) {
                const card = this.createWishlistCard(product);
                this.wishlistGrid.appendChild(card);
            }
        });
    },

    renderEmptyState() {
        this.wishlistGrid.innerHTML = `
            <div class="empty-cart-state animate-scale-in" style="grid-column: 1 / -1; width: 100%;">
                <i class="far fa-heart empty-cart-icon"></i>
                <h3 class="empty-cart-title">Your Wishlist is Empty</h3>
                <p class="empty-cart-desc">Start adding your favorite products to your wishlist so you can buy them later!</p>
                <a href="products.html" class="btn btn-primary">Discover Products</a>
            </div>
        `;
    },

    createWishlistCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card animate-fade-in';

        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<i class="${i <= Math.floor(product.rating) ? 'fas' : 'far'} fa-star"></i>`;
        }

        let badgeHtml = '';
        if (product.badge) {
            badgeHtml = `<span class="badge badge-${product.badge}">${product.badge}</span>`;
        }

        card.innerHTML = `
            <div class="product-image-container">
                ${badgeHtml}
                <button class="wishlist-btn active" data-id="${product.id}">
                    <i class="fas fa-heart"></i>
                </button>
                <a href="product-details.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
                </a>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">
                    <a href="product-details.html?id=${product.id}">${product.title}</a>
                </h3>
                <div class="product-rating">
                    <div class="stars">${starsHtml}</div>
                    <span class="reviews-count">(${product.reviewsCount} reviews)</span>
                </div>
                <div class="product-price-row">
                    <div class="price-wrapper">
                        <span class="current-price">₹${product.price.toFixed(2)}</span>
                    </div>
                    <button class="btn btn-primary btn-sm move-to-cart-btn" data-id="${product.id}" style="padding: 8px 12px; font-size: 0.8rem;">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;

        // Listeners
        card.querySelector('.wishlist-btn').addEventListener('click', () => {
            this.removeItem(product.id);
        });

        card.querySelector('.move-to-cart-btn').addEventListener('click', () => {
            this.moveToCart(product.id);
        });

        return card;
    },

    removeItem(productId) {
        this.wishlistIds = this.wishlistIds.filter(id => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(this.wishlistIds));
        this.render();
        window.syncCounters();
        window.showToast('Item removed from Wishlist.', 'info');
    },

    moveToCart(productId) {
        const product = (window.productsData || []).find(p => p.id === productId);
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const idx = cart.findIndex(item => item.id === productId);

        if (idx > -1) {
            cart[idx].quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
                color: product.colors[0] || '',
                size: product.sizes[0] || 'Standard'
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Optionally remove from wishlist
        this.removeItem(productId);
        
        window.showToast(`"${product.title}" moved to shopping cart!`, 'success');
        window.syncCounters();
    }
};
