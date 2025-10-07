/**
 * ==============================================================================
 * E-commerce Shopping Cart Logic (cart.js)
 * ==============================================================================
 * * ARCHITECTURE: Server-Side Cart for Security & Persistence.
 * - Local Storage is used ONLY for temporary persistence (Cart ID and display data).
 * - All crucial logic (price calculation, stock check) happens on the server.
 */

// --- Configuration ---
const CART_STORAGE_KEY = 'ecomCartState';
const API_ENDPOINT = 'http://localhost:3001/api/cart'; // Updated to match your server

// --- Global Cart State ---
let cartState = {
    // cartId is the secure identifier sent to the server (UUID)
    cartId: localStorage.getItem('cartId') || null, 
    items: [],
    total: 0
};

// ==============================================================================
// 1. CORE UTILITIES (Client-Side Persistence)
// ==============================================================================

/**
 * Loads the cart from Local Storage (for instant UI display).
 * Then, it immediately tries to sync with the secure server data.
 */
function initializeCart() {
    const storedState = localStorage.getItem(CART_STORAGE_KEY);
    if (storedState) {
        try {
            const parsedState = JSON.parse(storedState);
            cartState.items = parsedState.items || [];
            cartState.total = parsedState.total || 0;
            // The cartId is prioritized from Local Storage's dedicated 'cartId' key.
            cartState.cartId = localStorage.getItem('cartId') || parsedState.cartId || null;
        } catch (e) {
            console.error("Failed to parse cart state from Local Storage:", e);
            // Fallback to empty cart on parse error
        }
    }

    renderCart(); // Render current local state immediately
    syncCartWithServer(); // Securely fetch/sync the true cart data
}

/**
 * Saves the current cart state (display data) to Local Storage.
 * Crucial for multi-page accessibility.
 */
function saveCartState() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
    if (cartState.cartId) {
        localStorage.setItem('cartId', cartState.cartId);
    }
}

// ==============================================================================
// 2. SERVER COMMUNICATION (Security & Data Validation)
// ==============================================================================

/**
 * SECURE: Fetches the authoritative cart data from the server.
 * This should be called on every page load to ensure data integrity.
 */
async function syncCartWithServer() {
    // Determine the URL based on whether a Cart ID exists
    const url = cartState.cartId ? `${API_ENDPOINT}/get/${cartState.cartId}` : `${API_ENDPOINT}/get/new`;

    try {
        // In a real application, you'd send an Auth token (JWT) if the user is logged in
        const response = await fetch(url, { method: 'GET' });
        
        if (!response.ok) throw new Error('Server could not retrieve cart.');

        const serverData = await response.json();

        // 🚨 CRITICAL SECURITY STEP: Overwrite client state with secure server data
        cartState.items = serverData.items || [];
        cartState.total = serverData.total || 0;
        cartState.cartId = serverData.cartId; // Get/confirm the secure Cart ID

        saveCartState(); 
        renderCart(); // Re-render with validated data

    } catch (error) {
        console.error("Error syncing cart with server:", error);
        // Alert the user if the server cart could not be loaded.
    }
}

/**
 * Handles adding a product to the cart.
 * @param {object} product - Must contain {id, name, price}
 * @param {number} quantity - The quantity to add
 */
async function addItemToCart(product, quantity = 1) {
    // 1. Optimistic Client-Side Update (Good UX)
    const existingItem = cartState.items.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        // Use the price from the client for display, but trust the server price later.
        cartState.items.push({ ...product, quantity: quantity, price: parseFloat(product.price) });
    }
    // Calculate display total (client-side)
    cartState.total = cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    renderCart();

    // 2. SECURE: Send the minimal, non-sensitive data to the server
    try {
        const response = await fetch(`${API_ENDPOINT}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                cartId: cartState.cartId, 
                productId: product.id, 
                quantity: quantity 
            })
        });

        if (!response.ok) throw new Error('Failed to add item on server.');

        const serverUpdate = await response.json();
        
        // 🚨 CRITICAL SECURITY STEP: Overwrite client state with secure server state
        cartState.items = serverUpdate.items;
        cartState.total = serverUpdate.total;
        cartState.cartId = serverUpdate.cartId;
        
        saveCartState();
        renderCart();

    } catch (error) {
        console.error("Server update failed:", error);
        alert("Sorry, there was an error adding this item. Please try again.");
        // Consider calling syncCartWithServer() here to revert the optimistic change.
    }
}

/**
 * Handles removing an item from the cart
 * @param {string} productId - The ID of the product to remove
 */
async function removeItemFromCart(productId) {
    // 1. Optimistic Client-Side Update (Good UX)
    cartState.items = cartState.items.filter(item => item.id !== productId);
    cartState.total = cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    renderCart();

    // 2. SECURE: Send the removal to the server
    try {
        const response = await fetch(`${API_ENDPOINT}/remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                cartId: cartState.cartId, 
                productId: productId 
            })
        });

        if (!response.ok) throw new Error('Failed to remove item on server.');

        const serverUpdate = await response.json();
        
        // 🚨 CRITICAL SECURITY STEP: Overwrite client state with secure server state
        cartState.items = serverUpdate.items;
        cartState.total = serverUpdate.total;
        cartState.cartId = serverUpdate.cartId;
        
        saveCartState();
        renderCart();

    } catch (error) {
        console.error("Server update failed:", error);
        alert("Sorry, there was an error removing this item. Please try again.");
        // Re-sync to revert optimistic change
        syncCartWithServer();
    }
}

/**
 * Handles updating the quantity of an item in the cart
 * @param {string} productId - The ID of the product to update
 * @param {number} newQuantity - The new quantity
 */
async function updateItemQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeItemFromCart(productId);
        return;
    }

    // 1. Optimistic Client-Side Update (Good UX)
    const item = cartState.items.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        cartState.total = cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        renderCart();
    }

    // 2. SECURE: Send the quantity update to the server
    try {
        const response = await fetch(`${API_ENDPOINT}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                cartId: cartState.cartId, 
                productId: productId,
                quantity: newQuantity
            })
        });

        if (!response.ok) throw new Error('Failed to update item on server.');

        const serverUpdate = await response.json();
        
        // 🚨 CRITICAL SECURITY STEP: Overwrite client state with secure server state
        cartState.items = serverUpdate.items;
        cartState.total = serverUpdate.total;
        cartState.cartId = serverUpdate.cartId;
        
        saveCartState();
        renderCart();

    } catch (error) {
        console.error("Server update failed:", error);
        alert("Sorry, there was an error updating this item. Please try again.");
        // Re-sync to revert optimistic change
        syncCartWithServer();
    }
}

// ==============================================================================
// 3. UI RENDERING AND EVENTS
// ==============================================================================

/**
 * Renders the entire cart component based on the current cartState.
 */
function renderCart() {
    const listEl = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal');
    const countEl = document.getElementById('cart-item-count');
    const checkoutBtn = document.getElementById('checkout-btn');

    listEl.innerHTML = '';
    const totalItems = cartState.items.reduce((sum, item) => sum + item.quantity, 0);

    // Update floating icon count and visibility
    countEl.textContent = totalItems;

    if (cartState.items.length === 0) {
        listEl.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        checkoutBtn.disabled = true;
    } else {
        cartState.items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item');
            const itemTotal = (item.price * item.quantity).toFixed(2);

            itemEl.innerHTML = `
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-quantity">Qty: ${item.quantity}</span>
                </div>
                <span class="item-price">$${itemTotal}</span>
                <button data-id="${item.id}" class="remove-item-btn" title="Remove Item">&times;</button>
            `;
            listEl.appendChild(itemEl);
        });
        checkoutBtn.disabled = false;
    }

    // Update totals display (client-side)
    subtotalEl.textContent = `$${cartState.total.toFixed(2)}`;
}

/**
 * Initializes all necessary DOM event listeners.
 */
function setupEventListeners() {
    const cartContainer = document.getElementById('cart-container');
    const openBtn = document.getElementById('open-cart-btn');
    const closeBtn = document.getElementById('close-cart-btn');
    const overlay = document.getElementById('cart-overlay');
    
    // 1. Cart visibility controls (Multi-Page Access)
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            cartContainer.classList.add('open');
            overlay.classList.add('active');
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            cartContainer.classList.remove('open');
            overlay.classList.remove('active');
        });
    }
    
    // Close cart when clicking on overlay
    overlay.addEventListener('click', () => {
        cartContainer.classList.remove('open');
        overlay.classList.remove('active');
    });

    // 2. Universal "Add to Cart" button listeners
    document.querySelectorAll('.add-to-cart-product-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Fetch product details from data attributes on the button/parent element
            const product = { 
                id: e.currentTarget.dataset.productId, 
                name: e.currentTarget.dataset.productName, 
                // IMPORTANT: Parse price as a float
                price: parseFloat(e.currentTarget.dataset.productPrice) || 0.00
            };
            addItemToCart(product, 1);
            cartContainer.classList.add('open'); // Open cart after adding
            overlay.classList.add('active');
        });
    });

    // 3. Remove item functionality
    document.getElementById('cart-items-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const productId = e.target.getAttribute('data-id');
            removeItemFromCart(productId);
        }
    });

    // 4. Checkout button handler (Final server validation)
    document.getElementById('checkout-btn')?.addEventListener('click', async () => {
        if (!cartState.items.length) return;
        
        console.log("Redirecting to checkout... Final Server Validation will occur now.");
        
        // In a real app, this would be a secure POST request to initiate checkout
        // window.location.href = `/checkout?cartId=${cartState.cartId}`;
        alert("Proceeding to checkout! Cart ID: " + cartState.cartId);
    });
}

// ==============================================================================
// 4. MAIN EXECUTION
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Check for the cart container before proceeding
    if (!document.getElementById('cart-container')) {
        console.error("Cart container (#cart-container) not found in the DOM. Cart cannot initialize.");
        return;
    }
    
    initializeCart();
    setupEventListeners();
});