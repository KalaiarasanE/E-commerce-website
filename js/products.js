/* ==========================================================================
   Product Database & Listing Controller (E-Commerce Clone)
   ========================================================================== */

// Mock Products Database
window.productsData = [
    {
        id: 'p1',
        title: 'Spectra Pro ANC Wireless Headphones',
        category: 'electronics',
        brand: 'Sony',
        price: 299.99,
        oldPrice: 349.99,
        rating: 4.8,
        reviewsCount: 124,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
        badge: 'sale',
        colors: ['#000000', '#ffffff', '#1e3a8a'],
        sizes: ['Standard'],
        specs: {
            'Bluetooth Version': '5.2',
            'Battery Life': 'Up to 40 Hours',
            'Noise Cancellation': 'Active (ANC)',
            'Warranty': '1 Year Manufacturer Warranty'
        },
        description: 'Immerse yourself in pure sound with the Spectra Pro. Featuring advanced hybrid active noise cancellation, high-fidelity audio drivers, and comfortable memory foam ear cups for all-day listening comfort.'
    },
    {
        id: 'p2',
        title: 'AeroFit Pro Trail Running Shoes',
        category: 'fashion',
        brand: 'Nike',
        price: 120.00,
        oldPrice: 150.00,
        rating: 4.5,
        reviewsCount: 88,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
        badge: 'new',
        colors: ['#ef4444', '#10b981', '#000000'],
        sizes: ['7', '8', '9', '10', '11'],
        specs: {
            'Outer Material': 'Breathable Knit Mesh',
            'Sole Material': 'Rubber Traction Pods',
            'Weight': '280g (Size 9)',
            'Water Resistance': 'Splash-resistant'
        },
        description: 'Conquer any terrain with the AeroFit Pro. Engineered with dynamic cushioning and a rugged gripping outsole, these shoes provide maximum comfort and durability for both casual runs and intense outdoor trails.'
    },
    {
        id: 'p3',
        title: 'Nebula Z Fold Dual-Screen Smartphone',
        category: 'mobiles',
        brand: 'Samsung',
        price: 1499.00,
        oldPrice: 1799.00,
        rating: 4.7,
        reviewsCount: 45,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60',
        badge: 'trending',
        colors: ['#0b0f19', '#6366f1', '#10b981'],
        sizes: ['256GB', '512GB'],
        specs: {
            'Display Size': '7.6 inches (Unfolded)',
            'Camera': '50MP Triple Rear Camera',
            'RAM': '12GB LPDDR5',
            'Processor': 'Octa-core Snapdragon Gen 3'
        },
        description: 'The future of mobile computing is in your hands. The Nebula Z Fold features a gorgeous folding OLED screen, powerful processor, multitasking side-by-side apps support, and professional-grade camera quality.'
    },
    {
        id: 'p4',
        title: 'Zenith Ultra Slim 15.6" Creator Laptop',
        category: 'laptops',
        brand: 'Asus',
        price: 1299.99,
        oldPrice: 1499.99,
        rating: 4.9,
        reviewsCount: 62,
        image: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=500&auto=format&fit=crop&q=60',
        badge: '',
        colors: ['#6b7280', '#111827'],
        sizes: ['16GB RAM / 1TB SSD', '32GB RAM / 2TB SSD'],
        specs: {
            'Screen Resolution': '3.2K OLED 120Hz',
            'Graphics Card': 'RTX 4060 8GB VRAM',
            'CPU': 'Intel Core i9 13th Gen',
            'Battery': '90Wh Li-Po'
        },
        description: 'Designed for digital creators, designers, and software engineers. The Zenith Ultra slim laptop packs top-tier processing power, color-accurate OLED screen, and a thin, sleek aluminum chassis.'
    },
    {
        id: 'p5',
        title: 'HydroCool Intelligent Air Fryer Cooker',
        category: 'home appliances',
        brand: 'Philips',
        price: 89.99,
        oldPrice: 119.99,
        rating: 4.6,
        reviewsCount: 215,
        image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&auto=format&fit=crop&q=60',
        badge: 'sale',
        colors: ['#000000', '#ffffff'],
        sizes: ['5.5L Standard', '8L XL'],
        specs: {
            'Capacity': '5.5 Liters',
            'Power Consumption': '1800 Watts',
            'Temperature Range': '40°C - 200°C',
            'Preset Modes': '8 One-touch Programs'
        },
        description: 'Fry, bake, roast, and grill with 90% less oil. The HydroCool Intelligent Air Fryer uses 360-degree rapid heat circulation and smart presets to deliver crispy, delicious food in minutes.'
    },
    {
        id: 'p6',
        title: 'Organic Uji Matcha Powder (Premium Grade)',
        category: 'grocery',
        brand: 'MatchaLab',
        price: 24.99,
        oldPrice: 29.99,
        rating: 4.4,
        reviewsCount: 310,
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=60',
        badge: '',
        colors: [],
        sizes: ['100g', '250g'],
        specs: {
            'Origin': 'Uji, Kyoto, Japan',
            'Grade': 'Ceremonial Grade A',
            'Certification': 'USDA Organic Certified',
            'Shelf Life': '12 Months'
        },
        description: 'Sourced directly from organic shade-grown tea farms in Kyoto. This ceremonial grade matcha features a vibrant green color, sweet umami flavor, and slow-release energy boosters.'
    },
    {
        id: 'p7',
        title: 'Nordic Ergonomic Swivel Lounge Chair',
        category: 'furniture',
        brand: 'IKEA',
        price: 450.00,
        oldPrice: 550.00,
        rating: 4.7,
        reviewsCount: 38,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&auto=format&fit=crop&q=60',
        badge: 'trending',
        colors: ['#cbd5e1', '#d1fae5', '#334155'],
        sizes: ['Standard'],
        specs: {
            'Frame Material': 'Bentwood Walnut Veneer',
            'Upholstery': 'Genuine Full-Grain Leather',
            'Swivel Range': '360 Degrees Swivel',
            'Assembly Required': 'Partial (Tools Included)'
        },
        description: 'Add mid-century sophistication to your office or living room. Crafted from fine walnut wood veneer and supple leather, this lounge chair is contour-molded to fit the human body perfectly.'
    },
    {
        id: 'p8',
        title: 'Velvet Matte Liquid Lipstick Luxe Set',
        category: 'beauty',
        brand: 'Fenty',
        price: 45.00,
        oldPrice: 60.00,
        rating: 4.5,
        reviewsCount: 172,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=60',
        badge: 'sale',
        colors: [],
        sizes: ['3-Pack Classic', '6-Pack Full Suite'],
        specs: {
            'Finish': 'Velvet Matte',
            'Cruelty-Free': 'Yes',
            'Weight': '3 x 4.5ml',
            'Long-wear': 'Up to 12 Hours'
        },
        description: 'Stunning colors with a weightless, non-drying formula. The Velvet Matte Lipstick collection delivers full-coverage color in a single stroke that stays put all day without smudging or transfers.'
    },
    {
        id: 'p9',
        title: 'Carbon-Grid Tennis Racket V2',
        category: 'sports',
        brand: 'Wilson',
        price: 189.00,
        oldPrice: 220.00,
        rating: 4.3,
        reviewsCount: 29,
        image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4a136?w=500&auto=format&fit=crop&q=60',
        badge: '',
        colors: ['#000000', '#f43f5e'],
        sizes: ['4 1/4 grip', '4 3/8 grip'],
        specs: {
            'Composition': 'High-modulus Carbon Fiber',
            'Head Size': '98 sq. in.',
            'String Pattern': '16 x 19',
            'Weight (Unstrung)': '305g'
        },
        description: 'Engineered for power and precision play. The Carbon-Grid racket is built using premium modulus carbon, allowing for explosive swings and high torsional stability at the net.'
    },
    {
        id: 'p10',
        title: 'Chronicles of Time (Leather Bound Edition)',
        category: 'books',
        brand: 'Penguin Classics',
        price: 19.99,
        oldPrice: 24.99,
        rating: 4.8,
        reviewsCount: 94,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60',
        badge: 'new',
        colors: [],
        sizes: ['Hardcover', 'Paperback', 'Kindle'],
        specs: {
            'Publisher': 'Penguin Classics',
            'Publication Date': 'January 2024',
            'Total Pages': '420 Pages',
            'Language': 'English'
        },
        description: 'Explore the fascinating historical records of civilizations in this stunning edition. Features premium leather binding, gold foil stamping, and detailed original woodcut illustrations.'
    },
    {
        id: 'p11',
        title: 'Stem Interactive Solar System Robot Kit',
        category: 'toys',
        brand: 'Lego',
        price: 54.99,
        oldPrice: 69.99,
        rating: 4.6,
        reviewsCount: 104,
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60',
        badge: 'trending',
        colors: [],
        sizes: ['Standard'],
        specs: {
            'Ages': '8+',
            'Material': 'Non-toxic ABS Plastic',
            'Batteries Required': '3 x AA (Not Included)',
            'Pieces': '450 Build Parts'
        },
        description: 'Inspire the next generation of space explorers. This STEM Solar System Robot kit allows children to build a motorized mechanical planetary track model and learn coding basics through mobile play.'
    },
    {
        id: 'p12',
        title: 'Premium Handcrafted Full Grain Leather Wallet',
        category: 'accessories',
        brand: 'Saddleback',
        price: 39.99,
        oldPrice: 49.99,
        rating: 4.7,
        reviewsCount: 156,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60',
        badge: '',
        colors: ['#4b5563', '#78350f', '#000000'],
        sizes: ['Bi-fold', 'Slim Cardholder'],
        specs: {
            'Material': '100% Full Grain Cow Leather',
            'RFID Blocking': 'Yes',
            'Card Capacity': 'Up to 10 Cards',
            'Warranty': '10-Year Warranty'
        },
        description: 'Built to last a lifetime. Every wallet is hand-stitched with marine-grade polyester thread and features built-in military grade RFID shields to keep your credentials safe from wireless theft.'
    }
];

// Product Listing controller
const productsController = {
    filters: {
        categories: [],
        brands: [],
        minPrice: 0,
        maxPrice: 2000,
        rating: 0,
        searchQuery: ''
    },
    sortOption: 'default',
    viewMode: 'grid',
    currentPage: 1,
    itemsPerPage: 6,

    init() {
        this.gridElement = document.getElementById('productsGrid');
        if (!this.gridElement) return; // Exit if not on products listing page

        this.setupEventListeners();
        this.parseUrlParameters();
        this.render();
    },

    parseUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Parse search query
        const search = urlParams.get('search');
        if (search) {
            this.filters.searchQuery = search;
            const searchInput = document.querySelector('.search-bar');
            if (searchInput) searchInput.value = search;
        }

        // Parse category
        const category = urlParams.get('category');
        if (category) {
            this.filters.categories = [category.toLowerCase()];
            const checkbox = document.querySelector(`input[type="checkbox"][data-category="${category.toLowerCase()}"]`);
            if (checkbox) checkbox.checked = true;
        }
    },

    setupEventListeners() {
        // Category filters
        const categoryCheckboxes = document.querySelectorAll('.category-filter-checkbox');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const category = checkbox.getAttribute('data-category');
                if (checkbox.checked) {
                    this.filters.categories.push(category);
                } else {
                    this.filters.categories = this.filters.categories.filter(c => c !== category);
                }
                this.currentPage = 1;
                this.render();
            });
        });

        // Brand filters
        const brandCheckboxes = document.querySelectorAll('.brand-filter-checkbox');
        brandCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const brand = checkbox.getAttribute('data-brand');
                if (checkbox.checked) {
                    this.filters.brands.push(brand);
                } else {
                    this.filters.brands = this.filters.brands.filter(b => b !== brand);
                }
                this.currentPage = 1;
                this.render();
            });
        });

        // Price range inputs
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');
        const priceFilterBtn = document.getElementById('applyPriceFilter');

        if (priceFilterBtn && minPriceInput && maxPriceInput) {
            priceFilterBtn.addEventListener('click', () => {
                this.filters.minPrice = parseFloat(minPriceInput.value) || 0;
                this.filters.maxPrice = parseFloat(maxPriceInput.value) || 2000;
                this.currentPage = 1;
                this.render();
            });
        }

        // Rating filter
        const ratingItems = document.querySelectorAll('.rating-filter-item');
        ratingItems.forEach(item => {
            item.addEventListener('click', () => {
                const rating = parseFloat(item.getAttribute('data-rating'));
                this.filters.rating = rating;
                this.currentPage = 1;
                
                // Toggle active style
                ratingItems.forEach(r => r.style.fontWeight = 'normal');
                item.style.fontWeight = 'bold';
                this.render();
            });
        });

        // Sorting
        const sortSelect = document.querySelector('.sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortOption = e.target.value;
                this.render();
            });
        }

        // View toggle (Grid / List)
        const gridViewBtn = document.getElementById('gridViewBtn');
        const listViewBtn = document.getElementById('listViewBtn');

        if (gridViewBtn && listViewBtn) {
            gridViewBtn.addEventListener('click', () => {
                this.viewMode = 'grid';
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
                this.gridElement.classList.remove('list-view');
                this.render();
            });

            listViewBtn.addEventListener('click', () => {
                this.viewMode = 'list';
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
                this.gridElement.classList.add('list-view');
                this.render();
            });
        }

        // Clear all filters
        const clearBtn = document.getElementById('clearFiltersBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.filters = {
                    categories: [],
                    brands: [],
                    minPrice: 0,
                    maxPrice: 2000,
                    rating: 0,
                    searchQuery: ''
                };
                
                // Reset UI checkboxes
                document.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
                if (minPriceInput) minPriceInput.value = '';
                if (maxPriceInput) maxPriceInput.value = '';
                ratingItems.forEach(r => r.style.fontWeight = 'normal');
                
                this.currentPage = 1;
                this.render();
            });
        }

        // Connect global search bar input
        const searchInput = document.querySelector('.search-bar');
        const searchForm = document.querySelector('.search-container');
        if (searchForm && searchInput) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.filters.searchQuery = searchInput.value.trim().toLowerCase();
                this.currentPage = 1;
                this.render();
            });
        }
    },

    getFilteredProducts() {
        let products = [...window.productsData];

        // Search query
        if (this.filters.searchQuery) {
            const query = this.filters.searchQuery.toLowerCase();
            products = products.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (this.filters.categories.length > 0) {
            products = products.filter(p => this.filters.categories.includes(p.category.toLowerCase()));
        }

        // Brand filter
        if (this.filters.brands.length > 0) {
            products = products.filter(p => this.filters.brands.includes(p.brand.toLowerCase()));
        }

        // Price filter
        products = products.filter(p => p.price >= this.filters.minPrice && p.price <= this.filters.maxPrice);

        // Rating filter
        if (this.filters.rating > 0) {
            products = products.filter(p => p.rating >= this.filters.rating);
        }

        // Sorting
        if (this.sortOption === 'price-low') {
            products.sort((a, b) => a.price - b.price);
        } else if (this.sortOption === 'price-high') {
            products.sort((a, b) => b.price - a.price);
        } else if (this.sortOption === 'rating') {
            products.sort((a, b) => b.rating - a.rating);
        } else {
            // Default sorting (id sorting)
            products.sort((a, b) => a.id.localeCompare(b.id));
        }

        return products;
    },

    render() {
        // Show Skeleton loaders first
        this.renderSkeletons();

        setTimeout(() => {
            const filteredProducts = this.getFilteredProducts();
            
            // Update counts
            const totalCountText = document.querySelector('.products-count-text');
            if (totalCountText) {
                totalCountText.textContent = `Showing ${Math.min(filteredProducts.length, this.itemsPerPage)} of ${filteredProducts.length} Products`;
            }

            if (filteredProducts.length === 0) {
                this.gridElement.innerHTML = `
                    <div class="empty-cart-state" style="grid-column: 1 / -1; width: 100%;">
                        <i class="fas fa-search empty-cart-icon"></i>
                        <h3 class="empty-cart-title">No Products Found</h3>
                        <p class="empty-cart-desc">We couldn't find any products matching your filters. Try adjusting your selections or clearing all filters.</p>
                    </div>
                `;
                this.renderPagination(0);
                return;
            }

            // Paginated items
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const paginatedProducts = filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);

            this.gridElement.innerHTML = '';
            paginatedProducts.forEach(product => {
                const productHtml = this.createProductCard(product);
                this.gridElement.appendChild(productHtml);
            });

            this.renderPagination(filteredProducts.length);
        }, 300); // 300ms simulated network latency for that professional feel
    },

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card animate-fade-in';
        card.id = `card-${product.id}`;

        // Build stars HTML
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

        // Badges
        let badgeHtml = '';
        if (product.badge) {
            badgeHtml = `<span class="badge badge-${product.badge}">${product.badge}</span>`;
        }

        // Old price display
        let oldPriceHtml = '';
        if (product.oldPrice) {
            oldPriceHtml = `<span class="old-price">₹${product.oldPrice.toFixed(2)}</span>`;
        }

        // Check if item is in wishlist
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

        // Attach Quick Event Listeners to cards
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

    renderSkeletons() {
        this.gridElement.innerHTML = '';
        for (let i = 0; i < this.itemsPerPage; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'product-card';
            skeleton.innerHTML = `
                <div class="skeleton skeleton-image"></div>
                <div class="product-info">
                    <div class="skeleton skeleton-text" style="width: 30%"></div>
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-text" style="width: 50%"></div>
                    <div class="product-price-row" style="margin-top: 15px;">
                        <div class="skeleton skeleton-text" style="width: 40%; height: 24px;"></div>
                        <div class="skeleton skeleton-btn"></div>
                    </div>
                </div>
            `;
            this.gridElement.appendChild(skeleton);
        }
    },

    renderPagination(totalItems) {
        const container = document.getElementById('pagination');
        if (!container) return;

        container.innerHTML = '';
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        
        if (totalPages <= 1) return;

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn';
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        container.appendChild(prevBtn);

        // Page buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-btn ${this.currentPage === i ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                this.currentPage = i;
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            container.appendChild(pageBtn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn';
        nextBtn.disabled = this.currentPage === totalPages;
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        container.appendChild(nextBtn);
    },

    /* Wishlist Operations */
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

        // Sync header counts
        window.syncCounters();
    },

    /* Dynamic Shopping Cart Operations */
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
        
        // Sync header counts
        window.syncCounters();
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    productsController.init();
});
