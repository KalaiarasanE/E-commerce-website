/* ==========================================================================
   Smart Search & Suggestions Controller (E-Commerce Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    searchController.init();
});

const searchController = {
    popularSearches: ['Headphones', 'Running Shoes', 'OLED Laptop', 'Air Fryer', 'Matcha', 'Smartphone'],
    
    init() {
        this.searchInput = document.querySelector('.search-bar');
        this.searchContainer = document.querySelector('.search-container');
        
        if (!this.searchInput || !this.searchContainer) return;

        this.createSuggestionsContainer();
        this.setupEventListeners();
    },

    createSuggestionsContainer() {
        const popup = document.createElement('div');
        popup.className = 'search-suggestions-popup';
        popup.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            margin-top: 8px;
            box-shadow: var(--card-shadow);
            z-index: 1001;
            display: none;
            overflow: hidden;
            padding: 16px 0;
        `;
        this.searchContainer.appendChild(popup);
        this.suggestionsPopup = popup;
    },

    setupEventListeners() {
        // Show popular searches on focus
        this.searchInput.addEventListener('focus', () => {
            this.renderSuggestions();
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchContainer.contains(e.target)) {
                this.suggestionsPopup.style.display = 'none';
            }
        });

        // Autocomplete filtering on input
        this.searchInput.addEventListener('input', () => {
            this.renderSuggestions();
        });

        // Submit search on form submit
        const form = this.searchContainer.closest('form') || this.searchContainer;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = this.searchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });
    },

    renderSuggestions() {
        const value = this.searchInput.value.trim().toLowerCase();
        let html = '';

        if (value === '') {
            // Render Popular Searches
            html += `
                <div style="padding: 0 20px 10px 20px; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Popular Searches</div>
                <div class="popular-search-tags" style="padding: 0 20px; display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
            `;
            this.popularSearches.forEach(search => {
                html += `<span class="popular-tag" style="background-color: var(--bg-tertiary); padding: 6px 12px; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 500; cursor: pointer; border: 1px solid var(--border-color); transition: all 0.2s;" onclick="searchController.fillSearch('${search}')">${search}</span>`;
            });
            html += `</div>`;

            // Recent Searches (Mock)
            html += `
                <div style="padding: 10px 20px; border-top: 1px solid var(--border-color); font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Recent Searches</div>
                <div class="recent-search-list">
                    <div class="recent-item" style="padding: 10px 20px; font-size: 0.9rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="searchController.fillSearch('Wireless Headset')">
                        <span><i class="far fa-clock" style="margin-right: 10px; color: var(--text-muted);"></i>Wireless Headset</span>
                        <i class="fas fa-times" style="color: var(--text-muted); font-size: 0.8rem;"></i>
                    </div>
                    <div class="recent-item" style="padding: 10px 20px; font-size: 0.9rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="searchController.fillSearch('Matcha tea')">
                        <span><i class="far fa-clock" style="margin-right: 10px; color: var(--text-muted);"></i>Matcha tea</span>
                        <i class="fas fa-times" style="color: var(--text-muted); font-size: 0.8rem;"></i>
                    </div>
                </div>
            `;
        } else {
            // Find matches in products Data
            const matches = (window.productsData || []).filter(p => 
                p.title.toLowerCase().includes(value) || 
                p.category.toLowerCase().includes(value)
            ).slice(0, 5);

            if (matches.length > 0) {
                html += `<div style="padding: 0 20px 10px 20px; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Products Found</div>`;
                matches.forEach(product => {
                    html += `
                        <div class="suggestion-item" style="padding: 10px 20px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: background 0.2s;" onclick="window.location.href='product-details.html?id=${product.id}'">
                            <img src="${product.image}" style="width: 40px; height: 40px; border-radius: var(--radius-sm); object-fit: cover;">
                            <div>
                                <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 350px;">${product.title}</div>
                                <div style="font-size: 0.8rem; color: var(--primary); font-weight: 700;">₹${product.price.toFixed(2)}</div>
                            </div>
                        </div>
                    `;
                });
            } else {
                html += `<div style="padding: 10px 20px; font-size: 0.9rem; color: var(--text-secondary); text-align: center;">No suggestions for "${value}"</div>`;
            }
        }

        this.suggestionsPopup.innerHTML = html;
        this.suggestionsPopup.style.display = 'block';

        // Add hover effects dynamically
        const items = this.suggestionsPopup.querySelectorAll('.suggestion-item, .recent-item');
        items.forEach(item => {
            item.addEventListener('mouseenter', () => item.style.backgroundColor = 'var(--bg-tertiary)');
            item.style.transition = 'background 0.2s';
            item.addEventListener('mouseleave', () => item.style.backgroundColor = 'transparent');
        });
        
        const tags = this.suggestionsPopup.querySelectorAll('.popular-tag');
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.backgroundColor = 'var(--primary)';
                tag.style.color = 'white';
                tag.style.borderColor = 'var(--primary)';
            });
            tag.addEventListener('mouseleave', () => {
                tag.style.backgroundColor = 'var(--bg-tertiary)';
                tag.style.color = 'var(--text-primary)';
                tag.style.borderColor = 'var(--border-color)';
            });
        });
    },

    fillSearch(query) {
        this.searchInput.value = query;
        this.suggestionsPopup.style.display = 'none';
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
};
window.searchController = searchController;
