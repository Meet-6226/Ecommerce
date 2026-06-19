// Utility functions
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
};

// We'll use user ID 2 for the MVP demo (John Doe from seed.sql)
const CURRENT_USER_ID = 2;

const updateCartCount = async () => {
    const countElement = document.getElementById('cart-count');
    if (countElement && typeof api !== 'undefined') {
        const cartItems = await api.getCart(CURRENT_USER_ID);
        if(cartItems) {
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            countElement.textContent = totalItems;
            if (totalItems > 0) {
                countElement.classList.remove('hidden');
            } else {
                countElement.classList.add('hidden');
            }
        }
    }
};

const addToCart = async (product, quantity = 1) => {
    if (typeof api !== 'undefined') {
        await api.addToCartAPI(CURRENT_USER_ID, product.id, quantity);
        updateCartCount();
        showToast(`${product.name} added to cart!`);
    } else {
        showToast('API not loaded');
    }
};

// Toast notification
const showToast = (message) => {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'bg-dark text-white px-6 py-3 rounded-lg shadow-xl transform transition-all duration-300 translate-y-10 opacity-0';
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);
    
    // Animate out
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
