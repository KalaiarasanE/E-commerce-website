// ==========================================================================
// PRODUCT CATALOG DATA
// ==========================================================================
const PRODUCTS = [
    {
        id: 1,
        name: "Lumina Soundscape ANC",
        category: "headphones",
        price: 299.00,
        rating: 4.8,
        reviews: 142,
        image: "assets/headphones.jpg",
        description: "Immerse yourself in pure studio-grade audio with our signature active noise-cancelling headphones. Engineered with custom 40mm drivers and ultra-soft memory foam earcups for ultimate comfort.",
        specs: {
            "Driver Size": "40mm Dynamic",
            "Frequency Response": "4Hz - 40,000Hz",
            "Battery Life": "Up to 40 Hours (ANC On)",
            "Connectivity": "Bluetooth 5.3 / 3.5mm Aux",
            "Noise Cancellation": "Hybrid Active Noise Cancellation"
        }
    },
    {
        id: 2,
        name: "Lumina Echo Buds",
        category: "earbuds",
        price: 149.00,
        rating: 4.6,
        reviews: 98,
        image: "assets/earbuds.jpg",
        description: "Compact spatial audio earbuds that deliver rich bass and crystal clear trebles. Features water resistance, customizable touch controls, and a sleek pocket-sized charging case.",
        specs: {
            "Driver Size": "11mm Dual Driver",
            "Water Resistance": "IPX5 Sweat & Water Proof",
            "Battery Life": "8 Hours (32 Hours with Case)",
            "Charging": "USB-C & Qi Wireless Charging",
            "Microphones": "6 Beamforming Mics with AI Noise Reduction"
        }
    },
    {
        id: 3,
        name: "Lumina Aura Speaker",
        category: "speakers",
        price: 199.00,
        rating: 4.7,
        reviews: 84,
        image: "assets/speaker.jpg",
        description: "Elevate your ambient environment with 360-degree omnidirectional sound and dynamic RGB smart-lighting that syncs to your music. Features seamless smart-home and voice-assistant integration.",
        specs: {
            "Audio Output": "40W Omnidirectional",
            "Lighting": "Customizable Dynamic RGB Ring",
            "Voice Assistants": "Google Assistant / Alexa Built-in",
            "Connectivity": "Wi-Fi 6 / Bluetooth 5.2 / AirPlay 2",
            "Weight": "1.2 kg"
        }
    },
    {
        id: 4,
        name: "Lumina KeyFlow Keyboard",
        category: "accessories",
        price: 129.00,
        rating: 4.5,
        reviews: 67,
        image: "assets/keyboard.jpg",
        description: "An ultra-premium low-profile mechanical keyboard designed for maximum typing speed and ergonomics. Crafted with a sandblasted aluminum chassis and custom hot-swappable switches.",
        specs: {
            "Layout": "75% Minimalist TKL Layout",
            "Switches": "Hot-swappable Low-profile Linear Switches",
            "Backlight": "Per-key Customizable RGB Backlit",
            "Connectivity": "2.4GHz Wireless / Bluetooth 5.1 / USB-C",
            "Material": "CNC Anodized Aluminum Top Plate"
        }
    },
    {
        id: 5,
        name: "Lumina Soundscape Lite",
        category: "headphones",
        price: 189.00,
        rating: 4.4,
        reviews: 52,
        image: "assets/headphones.jpg", // Reusing image asset
        description: "The lightweight daily version of our premium Soundscape series. Offers balanced acoustic signature, comfortable fit, and 30-hour battery life, making it perfect for your daily commute.",
        specs: {
            "Driver Size": "35mm Dynamic",
            "Frequency Response": "10Hz - 24,000Hz",
            "Battery Life": "Up to 30 Hours",
            "Connectivity": "Bluetooth 5.1 / 3.5mm Aux",
            "Weight": "195 grams"
        }
    },
    {
        id: 6,
        name: "Lumina Aura Mini Speaker",
        category: "speakers",
        price: 99.00,
        rating: 4.3,
        reviews: 41,
        image: "assets/speaker.jpg", // Reusing image asset
        description: "A compact version of our Aura smart speaker, built for travel and outdoor use. Delivers powerful mono audio, comes with an integrated utility strap, and offers full water resistance.",
        specs: {
            "Audio Output": "15W Mono Sound",
            "Water Resistance": "IP67 Dust & Water Proof",
            "Battery Life": "Up to 12 Hours",
            "Connectivity": "Bluetooth 5.0",
            "Dimensions": "90mm x 90mm x 110mm"
        }
    }
];

// ==========================================================================
// STATE VARIABLES
// ==========================================================================
let cart = JSON.parse(localStorage.getItem('lumina_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('lumina_wishlist')) || [];
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'default';

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================
const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const cartTotalQty = document.getElementById('cart-total-qty');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const cartItemsList = document.getElementById('cart-items-list');
const cartEmptyState = document.getElementById('cart-empty-state');
const cartFooter = document.getElementById('cart-footer');

const wishlistCount = document.getElementById('wishlist-count');
const wishlistItemsList = document.getElementById('wishlist-items-list');
const wishlistEmptyState = document.getElementById('wishlist-empty-state');

// Drawers & Modals
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-drawer-overlay');
const wishlistDrawer = document.getElementById('wishlist-drawer');
const wishlistOverlay = document.getElementById('wishlist-drawer-overlay');
const quickviewModal = document.getElementById('quickview-modal');
const quickviewOverlay = document.getElementById('quickview-modal-overlay');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutOverlay = document.getElementById('checkout-modal-overlay');
const mobileMenu = document.getElementById('mobile-menu');

// Controls
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const categoryButtons = document.querySelectorAll('.filter-btn');

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    setupEventListeners();
});

// ==========================================================================
// PRODUCTS RENDERING & CATALOG CONTROLS
// ==========================================================================
function renderProducts() {
    productsGrid.innerHTML = '';
    
    // Filter Products
    let filtered = PRODUCTS.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                              product.description.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sort Products
    if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    // Check if empty
    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; padding: 60px 0;">
                <i class="fa-solid fa-magnifying-glass empty-icon"></i>
                <p>No products found matching your search.</p>
            </div>
        `;
        return;
    }

    // Build Cards
    filtered.forEach(product => {
        const isWishlisted = wishlist.includes(product.id);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-id', product.id);
        
        card.innerHTML = `
            <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)" title="Add to Wishlist">
                <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
                <div class="product-overlay">
                    <button class="quickview-trigger" onclick="openQuickView(${product.id})">Quick View</button>
                </div>
            </div>
            <span class="product-category">${product.category}</span>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-meta">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <div class="product-rating">
                    <i class="fa-solid fa-star"></i>
                    <span>${product.rating} (${product.reviews})</span>
                </div>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                <i class="fa-solid fa-bag-shopping"></i> Add to Cart
            </button>
        `;
        productsGrid.appendChild(card);
    });
}

// Event Listeners for Filters/Search
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderProducts();
    });

    // Category Buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            renderProducts();
        });
    });

    // Sort Dropdown
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    // Toggles for Drawers
    document.getElementById('cart-toggle-btn').addEventListener('click', openCart);
    document.getElementById('cart-close-btn').addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    document.getElementById('wishlist-toggle-btn').addEventListener('click', openWishlist);
    document.getElementById('wishlist-close-btn').addEventListener('click', closeWishlist);
    wishlistOverlay.addEventListener('click', closeWishlist);

    // Mobile Menu Toggle
    document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    // Close drawers when Browse buttons are clicked
    document.querySelectorAll('.close-drawers-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            closeCart();
            closeWishlist();
        });
    });

    // Quickview modal closing
    document.getElementById('modal-close-btn').addEventListener('click', closeQuickView);
    quickviewOverlay.addEventListener('click', closeQuickView);

    // Checkout Modal closing
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
    document.getElementById('checkout-success-close').addEventListener('click', closeCheckoutSuccess);
    checkoutOverlay.addEventListener('click', closeCheckoutSuccess);
}

// ==========================================================================
// CART STATE & UI ACTIONS
// ==========================================================================
function addToCart(productId, qty = 1) {
    const existing = cart.find(item => item.id === productId);
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({ id: productId, quantity: qty });
    }

    localStorage.setItem('lumina_cart', JSON.stringify(cart));
    updateCartUI();
    showToast(`Added ${product.name} to Cart`, 'success');
}

function updateCartQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
        const prod = PRODUCTS.find(p => p.id === productId);
        showToast(`Removed ${prod.name} from Cart`, 'danger');
    }
    
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
    updateCartUI();
}

function removeFromCart(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
    updateCartUI();
    showToast(`Removed ${prod.name} from Cart`, 'danger');
}

function updateCartUI() {
    // Total count
    const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.innerText = totalItemsCount;
    cartTotalQty.innerText = totalItemsCount;

    if (cart.length === 0) {
        cartEmptyState.style.display = 'flex';
        cartItemsList.style.display = 'none';
        cartFooter.style.display = 'none';
    } else {
        cartEmptyState.style.display = 'none';
        cartItemsList.style.display = 'block';
        cartFooter.style.display = 'block';
        
        cartItemsList.innerHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            const product = PRODUCTS.find(p => p.id === item.id);
            if (!product) return;
            
            subtotal += product.price * item.quantity;
            
            const card = document.createElement('div');
            card.className = 'cart-item';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div>
                        <h4 class="cart-item-title">${product.name}</h4>
                        <span class="cart-item-price">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="cart-item-controls">
                        <div class="qty-selector">
                            <button class="qty-btn" onclick="updateCartQuantity(${product.id}, -1)">-</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateCartQuantity(${product.id}, 1)">+</button>
                        </div>
                        <span class="remove-item-btn" onclick="removeFromCart(${product.id})">
                            <i class="fa-solid fa-trash"></i>
                        </span>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(card);
        });

        cartSubtotal.innerText = `$${subtotal.toFixed(2)}`;
        cartTotal.innerText = `$${subtotal.toFixed(2)}`;
    }
}

// Cart Drawer open/close
function openCart() {
    closeWishlist();
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// ==========================================================================
// WISHLIST STATE & UI ACTIONS
// ==========================================================================
function toggleWishlist(productId, event) {
    if (event) event.stopPropagation();
    
    const index = wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        showToast(`Removed ${product.name} from Wishlist`, 'info');
    } else {
        wishlist.push(productId);
        showToast(`Added ${product.name} to Wishlist`, 'success');
    }

    localStorage.setItem('lumina_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    renderProducts();
}

function updateWishlistUI() {
    wishlistCount.innerText = wishlist.length;

    if (wishlist.length === 0) {
        wishlistEmptyState.style.display = 'flex';
        wishlistItemsList.style.display = 'none';
    } else {
        wishlistEmptyState.style.display = 'none';
        wishlistItemsList.style.display = 'block';
        
        wishlistItemsList.innerHTML = '';
        wishlist.forEach(id => {
            const product = PRODUCTS.find(p => p.id === id);
            if (!product) return;

            const card = document.createElement('div');
            card.className = 'wishlist-item';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="wishlist-item-img">
                <div class="wishlist-item-details">
                    <h4 class="wishlist-item-title">${product.name}</h4>
                    <span class="wishlist-item-price">$${product.price.toFixed(2)}</span>
                </div>
                <div class="wishlist-item-actions">
                    <button class="wishlist-action-btn" onclick="addToCart(${product.id}); toggleWishlist(${product.id});" title="Move to Cart">
                        <i class="fa-solid fa-bag-shopping"></i>
                    </button>
                    <button class="wishlist-action-btn remove" onclick="toggleWishlist(${product.id})" title="Remove">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            wishlistItemsList.appendChild(card);
        });
    }
}

// Wishlist Drawer open/close
function openWishlist() {
    closeCart();
    wishlistDrawer.classList.add('active');
    wishlistOverlay.classList.add('active');
}

function closeWishlist() {
    wishlistDrawer.classList.remove('active');
    wishlistOverlay.classList.remove('active');
}

// ==========================================================================
// PRODUCT QUICK VIEW MODAL
// ==========================================================================
function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modalContent = document.getElementById('modal-content');
    
    // Generate spec rows
    let specsHtml = '';
    for (const [key, value] of Object.entries(product.specs)) {
        specsHtml += `<li><strong>${key}:</strong> <span>${value}</span></li>`;
    }

    const isWishlisted = wishlist.includes(product.id);

    modalContent.innerHTML = `
        <div class="modal-gallery">
            <img src="${product.image}" alt="${product.name}" class="modal-main-img">
        </div>
        <div class="modal-details">
            <div>
                <span class="product-category">${product.category}</span>
                <h2>${product.name}</h2>
                <div class="product-rating" style="margin-top: 4px;">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <span style="margin-left: 6px;">5.0 / 5.0 (${product.reviews} reviews)</span>
                </div>
            </div>
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <p class="modal-description">${product.description}</p>
            <div>
                <h4 style="margin-bottom: 8px; font-family: var(--font-heading);">Specifications</h4>
                <ul class="modal-specs">
                    ${specsHtml}
                </ul>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="addToCart(${product.id}); closeQuickView();" style="flex-grow: 1;">
                    <i class="fa-solid fa-bag-shopping"></i> Add to Cart
                </button>
                <button class="btn btn-secondary ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event); closeQuickView();" style="width: 48px; padding: 0; border-radius: 50%;">
                    <i class="fa-solid fa-heart" style="${isWishlisted ? 'color: var(--accent-pink)' : ''}"></i>
                </button>
            </div>
        </div>
    `;

    quickviewModal.classList.add('active');
    quickviewOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeQuickView() {
    quickviewModal.classList.remove('active');
    quickviewOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
}

// ==========================================================================
// CHECKOUT SIMULATION
// ==========================================================================
function handleCheckout() {
    if (cart.length === 0) return;

    // Calculate total paid
    let totalPaid = 0;
    cart.forEach(item => {
        const prod = PRODUCTS.find(p => p.id === item.id);
        if (prod) totalPaid += prod.price * item.quantity;
    });

    // Populate checkout fields
    const orderRef = document.getElementById('order-ref');
    const orderAmount = document.getElementById('order-amount');
    
    // Generate mock order details
    orderRef.innerText = `#LUM-${Math.floor(100000 + Math.random() * 900000)}`;
    orderAmount.innerText = `$${totalPaid.toFixed(2)}`;

    // Close Cart Drawer
    closeCart();

    // Show Checkout Modal
    checkoutModal.classList.add('active');
    checkoutOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Clear cart
    cart = [];
    localStorage.removeItem('lumina_cart');
    updateCartUI();
}

function closeCheckoutSuccess() {
    checkoutModal.classList.remove('active');
    checkoutOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Get icon matching type
    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'danger') iconClass = 'fa-circle-exclamation';

    toast.innerHTML = `
        <i class="fa-solid ${iconClass} toast-icon"></i>
        <div class="toast-message">${message}</div>
        <span class="toast-close"><i class="fa-solid fa-xmark"></i></span>
    `;

    container.appendChild(toast);

    // Toast exit animation and deletion
    const dismiss = () => {
        toast.style.animation = 'toast-out 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    };

    // Close button click
    toast.querySelector('.toast-close').addEventListener('click', dismiss);

    // Auto-remove after 4 seconds
    setTimeout(dismiss, 4000);
}
