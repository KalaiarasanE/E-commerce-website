/* ==========================================================================
   User Profile Dashboard Controller (E-Commerce Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    profileController.init();
});

const profileController = {
    init() {
        this.navItems = document.querySelectorAll('.profile-nav-item');
        this.tabContents = document.querySelectorAll('.profile-tab-content');
        this.addressesGrid = document.getElementById('addressesGrid');
        
        // Seed default addresses
        this.seedMockAddresses();
        this.loadProfileInfo();
        this.setupNavigation();
        this.setupAddressActions();
        this.setupProfileForm();
    },

    seedMockAddresses() {
        let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
        if (addresses.length === 0) {
            addresses = [
                {
                    id: 'addr1',
                    name: 'Kalaiarasan E',
                    tag: 'HOME',
                    isDefault: true,
                    details: '123 Tech Lane, Adyar',
                    city: 'Chennai',
                    state: 'Tamil Nadu',
                    zip: '600020',
                    phone: '9876543210'
                },
                {
                    id: 'addr2',
                    name: 'Kalaiarasan E (Office)',
                    tag: 'WORK',
                    isDefault: false,
                    details: '456 Innovation Parkway, OMR',
                    city: 'Chennai',
                    state: 'Tamil Nadu',
                    zip: '600096',
                    phone: '9876543211'
                }
            ];
            localStorage.setItem('addresses', JSON.stringify(addresses));
        }
    },

    loadProfileInfo() {
        // Mock profile information
        const defaultProfile = {
            fullName: 'Kalaiarasan E',
            email: 'kalai@example.com',
            phone: '9876543210',
            gender: 'male'
        };

        const profile = JSON.parse(localStorage.getItem('userProfile')) || defaultProfile;

        // Set inputs if they exist in DOM
        const nameInput = document.getElementById('profileNameInput');
        const emailInput = document.getElementById('profileEmailInput');
        const phoneInput = document.getElementById('profilePhoneInput');
        const genderSelect = document.getElementById('profileGenderSelect');

        if (nameInput) nameInput.value = profile.fullName;
        if (emailInput) emailInput.value = profile.email;
        if (phoneInput) phoneInput.value = profile.phone;
        if (genderSelect) genderSelect.value = profile.gender;

        // Update header details in sidebar
        const usernameEl = document.querySelector('.profile-username');
        const emailEl = document.querySelector('.profile-email');
        if (usernameEl) usernameEl.textContent = profile.fullName;
        if (emailEl) emailEl.textContent = profile.email;

        // Load stats numbers
        const orderHistory = JSON.parse(localStorage.getItem('orders')) || [];
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const addresses = JSON.parse(localStorage.getItem('addresses')) || [];

        const ordersCountEl = document.getElementById('statOrdersCount');
        const wishlistCountEl = document.getElementById('statWishlistCount');
        const addressesCountEl = document.getElementById('statAddressesCount');

        if (ordersCountEl) ordersCountEl.textContent = orderHistory.length;
        if (wishlistCountEl) wishlistCountEl.textContent = wishlist.length;
        if (addressesCountEl) addressesCountEl.textContent = addresses.length;

        this.renderAddresses(addresses);
    },

    setupNavigation() {
        if (this.navItems.length === 0) return;

        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // If it is logout button, handle differently
                if (item.classList.contains('logout-btn')) {
                    e.preventDefault();
                    if (confirm('Are you sure you want to log out?')) {
                        localStorage.removeItem('loggedInUser');
                        window.showToast('Logged out successfully.', 'info');
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 1000);
                    }
                    return;
                }

                e.preventDefault();
                const targetTab = item.getAttribute('data-tab');

                this.navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                this.tabContents.forEach(tab => {
                    if (tab.id === targetTab) {
                        tab.style.display = 'block';
                    } else {
                        tab.style.display = 'none';
                    }
                });
            });
        });
    },

    renderAddresses(addresses) {
        if (!this.addressesGrid) return;

        this.addressesGrid.innerHTML = '';
        addresses.forEach(address => {
            const card = document.createElement('div');
            card.className = `address-card ${address.isDefault ? 'default' : ''}`;
            
            card.innerHTML = `
                <span class="address-tag">${address.tag}</span>
                <h4 class="address-name">${address.name}</h4>
                <div class="address-details">
                    <p>${address.details}</p>
                    <p>${address.city}, ${address.state} ${address.zip}</p>
                    <p style="margin-top:6px;">Phone: ${address.phone}</p>
                </div>
                <div class="address-actions">
                    <button class="address-edit-btn btn-text" onclick="profileController.editAddress('${address.id}')">Edit</button>
                    ${!address.isDefault ? `<button class="address-delete-btn btn-text" onclick="profileController.deleteAddress('${address.id}')">Delete</button>` : ''}
                    ${!address.isDefault ? `<button class="btn-text" style="color:var(--primary);" onclick="profileController.setDefaultAddress('${address.id}')">Set Default</button>` : ''}
                </div>
            `;
            this.addressesGrid.appendChild(card);
        });
    },

    setupAddressActions() {
        const addBtn = document.getElementById('addNewAddressBtn');
        const modal = document.getElementById('addressModal');
        const modalClose = document.getElementById('addressModalClose');
        const cancelBtn = document.getElementById('addressModalCancel');
        const form = document.getElementById('addressModalForm');

        if (!modal) return;

        const openModal = () => modal.classList.add('active');
        const closeModal = () => {
            modal.classList.remove('active');
            if (form) form.reset();
        };

        if (addBtn) addBtn.addEventListener('click', openModal);
        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const tag = document.getElementById('addrTag').value;
                const name = document.getElementById('addrName').value.trim();
                const phone = document.getElementById('addrPhone').value.trim();
                const details = document.getElementById('addrDetails').value.trim();
                const city = document.getElementById('addrCity').value.trim();
                const state = document.getElementById('addrState').value.trim();
                const zip = document.getElementById('addrZip').value.trim();

                if (!name || !phone || !details || !city || !state || !zip) {
                    window.showToast('Please fill out all address fields.', 'warning');
                    return;
                }

                let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
                
                // Add new address
                const newAddress = {
                    id: 'addr' + Date.now(),
                    name,
                    tag: tag.toUpperCase(),
                    isDefault: addresses.length === 0, // Make default if it is the first address
                    details,
                    city,
                    state,
                    zip,
                    phone
                };

                addresses.push(newAddress);
                localStorage.setItem('addresses', JSON.stringify(addresses));
                this.renderAddresses(addresses);
                closeModal();
                window.showToast('New address added successfully!', 'success');
            });
        }
    },

    deleteAddress(id) {
        let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
        addresses = addresses.filter(addr => addr.id !== id);
        localStorage.setItem('addresses', JSON.stringify(addresses));
        this.renderAddresses(addresses);
        window.showToast('Address deleted successfully.', 'info');
    },

    setDefaultAddress(id) {
        let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
        addresses.forEach(addr => {
            addr.isDefault = addr.id === id;
        });
        localStorage.setItem('addresses', JSON.stringify(addresses));
        this.renderAddresses(addresses);
        window.showToast('Default address updated.', 'success');
    },

    editAddress(id) {
        // Placeholder for edit address logic in UI prototype
        window.showToast('Edit Address mode loaded (not fully connected).', 'info');
    },

    setupProfileForm() {
        const form = document.getElementById('profileDetailsForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('profileNameInput').value.trim();
            const email = document.getElementById('profileEmailInput').value.trim();
            const phone = document.getElementById('profilePhoneInput').value.trim();
            const gender = document.getElementById('profileGenderSelect').value;

            if (!name || !email || !phone) {
                window.showToast('Please enter your personal details.', 'warning');
                return;
            }

            const updatedProfile = { fullName: name, email, phone, gender };
            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

            // Sync sidebar texts
            const usernameEl = document.querySelector('.profile-username');
            const emailEl = document.querySelector('.profile-email');
            if (usernameEl) usernameEl.textContent = name;
            if (emailEl) emailEl.textContent = email;

            window.showToast('Profile information saved successfully!', 'success');
        });
    }
};

// Bind to window for direct HTML onclick execution
window.profileController = profileController;
