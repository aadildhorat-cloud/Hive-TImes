// ====================================================================
// 1. CONFIGURATION
// ====================================================================

// NOTE: This MUST match the key used in script.js to save the cart
const CART_STORAGE_KEY = 'broadwaySweetsCart'; 
const HOME_PAGE_URL = 'broadway page.html'; 
// *** NEW: Formspree Endpoint ***
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzzjnqpr'; 

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
 * Handles the checkout form submission, sends data to Formspree, 
 * clears the cart, and finalises the order.
 * @param {Event} e The submit event.
 */
async function handleCheckout(e) { // *** Made function 'async' to use 'await' with fetch
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
    
    // --- Collect and Prepare Data ---
    const orderTotalText = checkoutTotalElement.textContent;
    const cartItems = getCartFromStorage();
    
    // Create a FormData object from the form fields
    const formData = new FormData(checkoutForm);
    // Add the total and cart details to the submission data for Formspree
    formData.append('Order_Total', orderTotalText);
    formData.append('Order_Items', JSON.stringify(cartItems, null, 2));

    try {
        // 1. Send form data to Formspree (simulating the order submission)
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                // Ensure Formspree knows this is an AJAX/fetch submission
                'Accept': 'application/json' 
            }
        });

        if (response.ok) {
            // 2. Formspree submission successful
            alert(`Payment of ${orderTotalText} successful! Your order has been placed and confirmed with Formspree. Thank you for shopping with Broadway Sweets!`);

            // 3. Clear the cart from Local Storage to finalize the transaction
            localStorage.removeItem(CART_STORAGE_KEY);

            // 4. Redirect the user back to the homepage
            window.location.href = HOME_PAGE_URL;
        } else {
            // Formspree returned an error (e.g., too many submissions)
            let data = await response.json();
            if (Object.hasOwnProperty.call(data, 'errors')) {
                alert(`Form submission failed: ${data["errors"].map(e => e.message).join(", ")}`);
            } else {
                alert('Order placement failed. Please try again or contact support.');
            }
        }
    } catch (error) {
        console.error('Submission Error:', error);
        alert('An unexpected error occurred during submission. Check the console for details.');
    }
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