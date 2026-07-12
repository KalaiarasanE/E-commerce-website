/* ==========================================================================
   Global App Controller (E-Commerce Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

const app = {
    init() {
        this.initTheme();
        this.initStickyHeader();
        this.initMobileMenu();
        this.initBackToTop();
        this.syncCounters();
        this.setupNewsletter();
    },

    /* Theme Management (Dark / Light Mode) */
    initTheme() {
        const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        this.setTheme(savedTheme);

        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
            });
        });
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update theme toggle icons across all page references
        const icons = document.querySelectorAll('.theme-toggle-btn i');
        icons.forEach(icon => {
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    },

    /* Sticky Header on Scroll */
    initStickyHeader() {
        const header = document.querySelector('.main-header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    },

    /* Mobile Hamburger Menu */
    initMobileMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const mobileNav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.mobile-overlay');
        const closeBtn = document.querySelector('.mobile-nav-close');

        if (!hamburger) return;

        const toggleMenu = () => {
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        };

        hamburger.addEventListener('click', toggleMenu);
        if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
        if (overlay) overlay.addEventListener('click', toggleMenu);
    },

    /* Back To Top Button */
    initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    /* Sync Cart and Wishlist Badges */
    syncCounters() {
        const cartCountBadges = document.querySelectorAll('.cart-count');
        const wishlistCountBadges = document.querySelectorAll('.wishlist-count');

        // Cart items sync
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadges.forEach(badge => {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        });

        // Wishlist items sync
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistCountBadges.forEach(badge => {
            badge.textContent = wishlist.length;
            badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
        });
    },

    /* Newsletter form setup */
    setupNewsletter() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = form.querySelector('.newsletter-input');
                if (input && input.value.trim() !== '') {
                    window.showToast('Thank you for subscribing to our newsletter!', 'success');
                    input.value = '';
                } else {
                    window.showToast('Please enter a valid email address.', 'warning');
                }
            });
        });
    }
};

// Export app helper functions globally
window.syncCounters = () => app.syncCounters();
