/* ==========================================================================
   Home Page Controller (E-Commerce Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    homeController.init();
});

const homeController = {
    init() {
        this.initHeroSlider();
        this.initCountdownTimer();
        this.loadHomeProducts();
    },

    /* Hero Banner Slider */
    initHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.arrow-prev');
        const nextBtn = document.querySelector('.arrow-next');

        if (slides.length === 0) return;

        let currentSlide = 0;
        let slideInterval;

        // Generate dot indicators dynamically
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            if (dotsContainer) dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        const goToSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => {
            goToSlide(currentSlide + 1);
        };

        const prevSlide = () => {
            goToSlide(currentSlide - 1);
        };

        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000); // 5 seconds autoplay
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }

        startInterval();
    },

    /* Flash Sale 24h Countdown Timer */
    initCountdownTimer() {
        const hoursBox = document.getElementById('hours');
        const minutesBox = document.getElementById('minutes');
        const secondsBox = document.getElementById('seconds');

        if (!hoursBox || !minutesBox || !secondsBox) return;

        // Set countdown to midnight tonight
        const getSecondsUntilMidnight = () => {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0);
            return Math.floor((midnight.getTime() - now.getTime()) / 1000);
        };

        let timeLeft = getSecondsUntilMidnight();

        const updateTimer = () => {
            if (timeLeft <= 0) {
                timeLeft = 86400; // Reset to 24h if it hits 0
            }

            const h = Math.floor(timeLeft / 3600);
            const m = Math.floor((timeLeft % 3600) / 60);
            const s = timeLeft % 60;

            hoursBox.textContent = h.toString().padStart(2, '0');
            minutesBox.textContent = m.toString().padStart(2, '0');
            secondsBox.textContent = s.toString().padStart(2, '0');

            timeLeft--;
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    },

    /* Load Featured, Best Sellers and Flash Sale Products */
    loadHomeProducts() {
        const featuredContainer = document.getElementById('featuredProductsGrid');
        const flashSaleContainer = document.getElementById('flashSaleProductsGrid');
        const trendingContainer = document.getElementById('trendingProductsGrid');

        // Check if we have products database loaded
        if (!window.productsData) return;

        const products = window.productsData;

        // 1. Featured Products (first 4 products)
        if (featuredContainer) {
            featuredContainer.innerHTML = '';
            products.slice(0, 4).forEach(product => {
                featuredContainer.appendChild(this.createProductCard(product));
            });
        }

        // 2. Flash Sale Products (sale badged products or slice 4-8)
        if (flashSaleContainer) {
            flashSaleContainer.innerHTML = '';
            const saleProducts = products.filter(p => p.badge === 'sale').concat(products).slice(0, 4);
            // Ensure unique list
            const uniqueSale = [...new Map(saleProducts.map(p => [p.id, p])).values()].slice(0, 4);
            uniqueSale.forEach(product => {
                flashSaleContainer.appendChild(this.createProductCard(product));
            });
        }

        // 3. Trending/Recommended Products (last 4 products)
        if (trendingContainer) {
            trendingContainer.innerHTML = '';
            products.slice(6, 10).forEach(product => {
                trendingContainer.appendChild(this.createProductCard(product));
            });
        }
    },

    createProductCard(product) {
        // Re-use logic from products.js to keep cards standardized
        const card = document.createElement('div');
        card.className = 'product-card animate-fade-in';
        
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(product.rating)) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= product.rating) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }

        let badgeHtml = '';
        if (product.badge) {
            badgeHtml = `<span class="badge badge-${product.badge}">${product.badge}</span>`;
        }

        let oldPriceHtml = '';
        if (product.oldPrice) {
            oldPriceHtml = `<span class="old-price">₹${product.oldPrice.toFixed(2)}</span>`;
        }

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isWishlisted = wishlist.includes(product.id);
        const wishlistClass = isWishlisted ? 'wishlist-btn active' : 'wishlist-btn';

        card.innerHTML = `
            <div class="product-image-container">
                ${badgeHtml}
                <button class="${wishlistClass}" data-id="${product.id}">
                    <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <a href="product-details.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
                </a>
            </div>
            <div class="product-info">
                <div class="product-title-rating">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">
                        <a href="product-details.html?id=${product.id}">${product.title}</a>
                    </h3>
                    <div class="product-rating">
                        <div class="stars">${starsHtml}</div>
                        <span class="reviews-count">(${product.reviewsCount} reviews)</span>
                    </div>
                </div>
                <div class="product-price-row">
                    <div class="price-wrapper">
                        <span class="current-price">₹${product.price.toFixed(2)}</span>
                        ${oldPriceHtml}
                    </div>
                    <button class="add-cart-icon-btn add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        `;

        // Card action listeners
        card.querySelector('.wishlist-btn').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleWishlist(product.id, e.currentTarget);
        });

        card.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.addToCart(product.id);
        });

        return card;
    },

    toggleWishlist(productId, btnElement) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const index = wishlist.indexOf(productId);

        if (index === -1) {
            wishlist.push(productId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            btnElement.classList.add('active');
            btnElement.querySelector('i').className = 'fas fa-heart';
            window.showToast('Item added to Wishlist!', 'success');
        } else {
            wishlist.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            btnElement.classList.remove('active');
            btnElement.querySelector('i').className = 'far fa-heart';
            window.showToast('Item removed from Wishlist!', 'info');
        }
        window.syncCounters();
    },

    addToCart(productId) {
        const product = window.productsData.find(p => p.id === productId);
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemIndex = cart.findIndex(item => item.id === productId);

        if (cartItemIndex > -1) {
            cart[cartItemIndex].quantity += 1;
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
    }
};
