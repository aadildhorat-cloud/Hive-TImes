// ====================================================================
// 1. CONFIGURATION
// ====================================================================

// NOTE: This MUST match the key used in script.js to save the cart
const CART_STORAGE_KEY = 'broadwaySweetsCart'; 
const HOME_PAGE_URL = 'broadway page.html'; 

// Element References
const checkoutSummaryItems = document.getElementById('checkoutSummaryItems');
const checkoutTotalElement = document.getElementById('checkoutTotal');
const checkoutForm = document.getElementById('checkoutForm'); 

// ====================================================================
// 2. CORE FUNCTIONS
// ====================================================================

/**
 * Loads the cart data from Local Storage.
 * @returns {Array} An array of cart items, or an empty array if none found.
 */
function getCartFromStorage() {
    try {
        const cartData = localStorage.getItem(CART_STORAGE_KEY);
        // Safely parse the JSON data. If it's null or invalid, return an empty array.
        const parsedCart = cartData ? JSON.parse(cartData) : [];
        return Array.isArray(parsedCart) ? parsedCart : []; 
    } catch (e) {
        console.error("Error loading cart from storage:", e);
        return [];
    }
}

/**
 * Renders the order summary (cart items and total) on the checkout page.
 */
function renderOrderSummary() {
    const cartItems = getCartFromStorage();
    
    if (cartItems.length === 0) {
        checkoutSummaryItems.innerHTML = '<p class="empty-cart-message">Your cart is empty. Please return to the shop.</p>';
        checkoutTotalElement.textContent = 'R0.00';
        // Redirect the user if the cart is empty (e.g., if they refresh the page after checkout)
        setTimeout(() => {
            alert('Your cart is empty. Redirecting to the shop.');
            window.location.href = HOME_PAGE_URL;
        }, 1000); 
        return;
    }

    let total = 0;
    
    checkoutSummaryItems.innerHTML = cartItems.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="summary-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>R${itemTotal.toFixed(2)}</span>
            </div>
        `;
    }).join('');

    checkoutTotalElement.textContent = `R${total.toFixed(2)}`;
}

/**
 * Handles the checkout form submission (simulating the payment and finalising the order).
 * @param {Event} e The submit event.
 */
function handleCheckout(e) {
    e.preventDefault();

    // --- Simple Form Validation Check ---
    const requiredInputs = checkoutForm.querySelectorAll('input[required]');
    let allValid = true;
    requiredInputs.forEach(input => {
        if (!input.value) {
            allValid = false;
        }
    });

    if (!allValid) {
        alert('Please fill in all required shipping and contact fields.');
        return;
    }
    
    // --- Purchase Simulation ---
    const orderTotalText = checkoutTotalElement.textContent;
    
    // 1. Simulate a successful payment
    alert(`Payment of ${orderTotalText} successful! Your order has been placed. Thank you for shopping with Broadway Sweets!`);

    // 2. Clear the cart from Local Storage to finalize the transaction
    localStorage.removeItem(CART_STORAGE_KEY);

    // 3. Redirect the user back to the homepage
    window.location.href = HOME_PAGE_URL;
}

// ====================================================================
// 3. INITIALIZATION
// ====================================================================

// Wait for the entire page to load before running the scripts
document.addEventListener('DOMContentLoaded', function() {
    // 1. Display the cart contents
    renderOrderSummary();

    // 2. Attach the submit handler to the checkout form
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
});