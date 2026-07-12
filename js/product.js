/* ==========================================================================
   Product Details Page Controller (E-Commerce Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    productDetailsController.init();
});

const productDetailsController = {
    selectedColor: '',
    selectedSize: '',
    quantity: 1,

    init() {
        this.parseProductId();
        if (!this.productId) {
            // If no product ID, redirect to products.html
            // window.location.href = 'products.html';
            return;
        }

        this.product = (window.productsData || []).find(p => p.id === this.productId);
        if (!this.product) {
            document.body.innerHTML = '<div class="container section-padding text-center"><h1>Product Not Found</h1><p><a href="products.html" class="btn btn-primary" style="margin-top:20px;">Back to Shop</a></p></div>';
            return;
        }

        this.selectedColor = this.product.colors[0] || '';
        this.selectedSize = this.product.sizes[0] || '';

        this.renderProductDetails();
        this.setupQuantityControl();
        this.setupActionButtons();
        this.setupReviewsForm();
        this.loadRelatedProducts();
    },

    parseProductId() {
        const urlParams = new URLSearchParams(window.location.search);
        this.productId = urlParams.get('id');
    },

    renderProductDetails() {
        // Core details fields
        const titleEl = document.getElementById('productTitle');
        const priceEl = document.getElementById('productPrice');
        const oldPriceEl = document.getElementById('productOldPrice');
        const descEl = document.getElementById('productDescription');
        const brandEl = document.getElementById('productBrand');
        const catEl = document.getElementById('productCategory');
        const mainImage = document.getElementById('mainProductImage');

        if (titleEl) titleEl.textContent = this.product.title;
        if (priceEl) priceEl.textContent = `₹${this.product.price.toFixed(2)}`;
        if (oldPriceEl) {
            if (this.product.oldPrice) {
                oldPriceEl.textContent = `₹${this.product.oldPrice.toFixed(2)}`;
                oldPriceEl.style.display = 'inline';
            } else {
                oldPriceEl.style.display = 'none';
            }
        }
        if (descEl) descEl.textContent = this.product.description;
        if (brandEl) brandEl.textContent = this.product.brand;
        if (catEl) catEl.textContent = this.product.category;
        if (mainImage) mainImage.src = this.product.image;

        // Render Stars
        const ratingStars = document.getElementById('ratingStars');
        const reviewCount = document.getElementById('reviewCount');
        if (ratingStars) {
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(this.product.rating)) {
                    starsHtml += '<i class="fas fa-star"></i>';
                } else if (i - 0.5 <= this.product.rating) {
                    starsHtml += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    starsHtml += '<i class="far fa-star"></i>';
                }
            }
            ratingStars.innerHTML = starsHtml;
        }
        if (reviewCount) reviewCount.textContent = `(${this.product.reviewsCount} Customer Reviews)`;

        // Render Color Options
        const colorsContainer = document.getElementById('colorOptions');
        if (colorsContainer) {
            colorsContainer.innerHTML = '';
            this.product.colors.forEach((color, idx) => {
                const colorLabel = document.createElement('label');
                colorLabel.className = `color-option-btn ${idx === 0 ? 'active' : ''}`;
                colorLabel.style.backgroundColor = color;
                colorLabel.style.width = '30px';
                colorLabel.style.height = '30px';
                colorLabel.style.borderRadius = '50%';
                colorLabel.style.display = 'inline-block';
                colorLabel.style.marginRight = '10px';
                colorLabel.style.cursor = 'pointer';
                colorLabel.style.border = '2px solid transparent';
                colorLabel.style.boxShadow = '0 0 0 1px var(--border-color)';
                
                if (idx === 0) {
                    colorLabel.style.borderColor = 'var(--primary)';
                    colorLabel.style.transform = 'scale(1.1)';
                }

                colorLabel.addEventListener('click', () => {
                    colorsContainer.querySelectorAll('.color-option-btn').forEach(b => {
                        b.style.borderColor = 'transparent';
                        b.style.transform = 'scale(1)';
                    });
                    colorLabel.style.borderColor = 'var(--primary)';
                    colorLabel.style.transform = 'scale(1.1)';
                    this.selectedColor = color;
                });

                colorsContainer.appendChild(colorLabel);
            });
        }

        // Render Size Options
        const sizesContainer = document.getElementById('sizeOptions');
        if (sizesContainer) {
            sizesContainer.innerHTML = '';
            this.product.sizes.forEach((size, idx) => {
                const sizeBtn = document.createElement('button');
                sizeBtn.className = `btn btn-outline btn-sm size-option-btn ${idx === 0 ? 'active' : ''}`;
                sizeBtn.textContent = size;
                sizeBtn.style.marginRight = '8px';
                sizeBtn.style.marginBottom = '8px';

                if (idx === 0) {
                    sizeBtn.style.borderColor = 'var(--primary)';
                    sizeBtn.style.color = 'var(--primary)';
                    sizeBtn.style.backgroundColor = 'var(--primary-glow)';
                }

                sizeBtn.addEventListener('click', () => {
                    sizesContainer.querySelectorAll('.size-option-btn').forEach(b => {
                        b.style.borderColor = 'var(--border-color)';
                        b.style.color = 'var(--text-secondary)';
                        b.style.backgroundColor = 'transparent';
                    });
                    sizeBtn.style.borderColor = 'var(--primary)';
                    sizeBtn.style.color = 'var(--primary)';
                    sizeBtn.style.backgroundColor = 'var(--primary-glow)';
                    this.selectedSize = size;
                });

                sizesContainer.appendChild(sizeBtn);
            });
        }

        // Render Specs Table
        const specsBody = document.getElementById('specsTableBody');
        if (specsBody) {
            specsBody.innerHTML = '';
            for (const [key, value] of Object.entries(this.product.specs)) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding: 12px; font-weight:600; width: 40%; border-bottom:1px solid var(--border-color); color:var(--text-primary);">${key}</td>
                    <td style="padding: 12px; border-bottom:1px solid var(--border-color); color:var(--text-secondary);">${value}</td>
                `;
                specsBody.appendChild(row);
            }
        }
    },

    setupQuantityControl() {
        const qtyValue = document.getElementById('detailsQtyValue');
        const decBtn = document.getElementById('detailsQtyDec');
        const incBtn = document.getElementById('detailsQtyInc');

        if (!qtyValue || !decBtn || !incBtn) return;

        decBtn.addEventListener('click', () => {
            if (this.quantity > 1) {
                this.quantity--;
                qtyValue.textContent = this.quantity;
            }
        });

        incBtn.addEventListener('click', () => {
            this.quantity++;
            qtyValue.textContent = this.quantity;
        });
    },

    setupActionButtons() {
        const addToCartBtn = document.getElementById('addToCartBtn');
        const buyNowBtn = document.getElementById('buyNowBtn');
        const addWishlistBtn = document.getElementById('addWishlistBtn');
        const shareBtn = document.getElementById('shareProductBtn');

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.addToCart();
            });
        }

        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => {
                this.addToCart();
                window.location.href = 'cart.html';
            });
        }

        if (addWishlistBtn) {
            // Check state
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            if (wishlist.includes(this.product.id)) {
                addWishlistBtn.innerHTML = '<i class="fas fa-heart" style="color:var(--accent);"></i> Wishlisted';
            }

            addWishlistBtn.addEventListener('click', () => {
                let localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                const idx = localWishlist.indexOf(this.product.id);

                if (idx === -1) {
                    localWishlist.push(this.product.id);
                    addWishlistBtn.innerHTML = '<i class="fas fa-heart" style="color:var(--accent);"></i> Wishlisted';
                    window.showToast('Item added to Wishlist!', 'success');
                } else {
                    localWishlist.splice(idx, 1);
                    addWishlistBtn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
                    window.showToast('Item removed from Wishlist!', 'info');
                }
                localStorage.setItem('wishlist', JSON.stringify(localWishlist));
                window.syncCounters();
            });
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        window.showToast('Link copied to clipboard!', 'success');
                    })
                    .catch(() => {
                        window.showToast('Failed to copy link.', 'error');
                    });
            });
        }
    },

    addToCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Find if this product with exact color & size is already in cart
        const cartItemIndex = cart.findIndex(item => 
            item.id === this.product.id && 
            item.color === this.selectedColor && 
            item.size === this.selectedSize
        );

        if (cartItemIndex > -1) {
            cart[cartItemIndex].quantity += this.quantity;
        } else {
            cart.push({
                id: this.product.id,
                title: this.product.title,
                price: this.product.price,
                image: this.product.image,
                quantity: this.quantity,
                color: this.selectedColor,
                size: this.selectedSize
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.showToast(`"${this.product.title}" added to shopping cart!`, 'success');
        window.syncCounters();
    },

    setupReviewsForm() {
        const form = document.getElementById('reviewForm');
        const list = document.getElementById('reviewsList');

        if (!form || !list) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const author = document.getElementById('reviewAuthor').value.trim();
            const rating = parseInt(document.getElementById('reviewRating').value);
            const text = document.getElementById('reviewText').value.trim();

            if (!author || !rating || !text) {
                window.showToast('Please fill out all fields.', 'warning');
                return;
            }

            // Create stars
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                starsHtml += `<i class="${i <= rating ? 'fas' : 'far'} fa-star"></i>`;
            }

            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item animate-fade-in-up';
            reviewItem.style.cssText = `
                border-bottom: 1px solid var(--border-color);
                padding: 20px 0;
            `;

            const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            reviewItem.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="font-weight:700;">${author}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted);">${today}</div>
                </div>
                <div style="color:var(--warning); font-size:0.85rem; margin-bottom:10px;">${starsHtml}</div>
                <p style="color:var(--text-secondary); font-size:0.95rem;">${text}</p>
            `;

            list.insertBefore(reviewItem, list.firstChild);
            window.showToast('Review submitted successfully!', 'success');

            // Reset form
            form.reset();
        });
    },

    loadRelatedProducts() {
        const container = document.getElementById('relatedProductsGrid');
        if (!container) return;

        container.innerHTML = '';
        
        // Find other products in same category
        const related = (window.productsData || []).filter(p => 
            p.category === this.product.category && p.id !== this.product.id
        ).slice(0, 4);

        if (related.length === 0) {
            // Grab any 4 other products if no category matches
            const alternatives = (window.productsData || []).filter(p => p.id !== this.product.id).slice(0, 4);
            alternatives.forEach(p => container.appendChild(this.createRelatedCard(p)));
        } else {
            related.forEach(p => container.appendChild(this.createRelatedCard(p)));
        }
    },

    createRelatedCard(product) {
        // Small helper cards
        const card = document.createElement('div');
        card.className = 'product-card';

        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<i class="${i <= Math.floor(product.rating) ? 'fas' : 'far'} fa-star"></i>`;
        }

        card.innerHTML = `
            <div class="product-image-container">
                <a href="product-details.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
                </a>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title" style="font-size:0.9rem; height:2.8em;">
                    <a href="product-details.html?id=${product.id}">${product.title}</a>
                </h3>
                <div class="product-price-row" style="margin-top:10px;">
                    <span class="current-price" style="font-size:1rem;">₹${product.price.toFixed(2)}</span>
                    <button class="add-cart-icon-btn add-to-cart-btn" data-id="${product.id}" style="width:32px; height:32px; font-size:0.8rem;">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        `;

        card.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Standard add to cart
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const idx = cart.findIndex(item => item.id === product.id);
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
            window.showToast(`"${product.title}" added to shopping cart!`, 'success');
            window.syncCounters();
        });

        return card;
    }
};
