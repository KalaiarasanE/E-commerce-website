/* ==========================================================================
   Toast Notifications System (E-Commerce Clone)
   ========================================================================== */

const toastSystem = {
    init() {
        // Create container if it doesn't exist
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        this.container = container;
    },

    show(message, type = 'success', duration = 3000) {
        if (!this.container) {
            this.init();
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        // Select icon based on toast type
        let iconClass = 'fa-check-circle';
        if (type === 'error') iconClass = 'fa-times-circle';
        if (type === 'warning') iconClass = 'fa-exclamation-triangle';
        if (type === 'info') iconClass = 'fa-info-circle';

        toast.innerHTML = `
            <i class="fas ${iconClass} toast-icon"></i>
            <span class="toast-message">${message}</span>
            <i class="fas fa-times toast-close"></i>
        `;

        this.container.appendChild(toast);

        // Close toast on click
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.removeToast(toast);
        });

        // Auto remove toast
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);
    },

    removeToast(toast) {
        toast.style.animation = 'toastIn 0.3s reverse forwards';
        toast.addEventListener('animationend', () => {
            if (toast.parentNode) {
                toast.remove();
            }
        });
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    toastSystem.init();
});

// Export globally
window.showToast = (message, type, duration) => toastSystem.show(message, type, duration);
window.toastSystem = toastSystem;
