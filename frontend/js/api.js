// Unified API Base URL via Nginx Reverse Proxy
const API_BASE_URL = '/api';

const api = {
    // Products
    getProducts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },
    getProductById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    },
    
    // Admin Products
    createProduct: async (productData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    },
    
    // Cart API Integration
    getCart: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching cart:', error);
            return [];
        }
    },
    addToCartAPI: async (userId, productId, quantity) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, product_id: productId, quantity })
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    },
    updateCartItem: async (cartId, quantity) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${cartId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity })
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    },
    removeFromCartAPI: async (cartId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${cartId}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    },
    
    // Orders
    createOrder: async (orderData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }
};
