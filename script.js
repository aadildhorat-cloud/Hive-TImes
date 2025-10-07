// ====================================================================
// 1. GLOBAL VARIABLES & PRODUCT DATA
// ====================================================================

// Element References
const productsContainer = document.querySelector('.products-container'); 
const productModalOverlay = document.querySelector('.product-modal-overlay');
const productModal = document.querySelector('.product-modal');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');
const cartModal = document.querySelector('.cart-modal');
const userModalOverlay = document.querySelector('.user-modal-overlay');
const userModal = document.querySelector('.user-modal');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCountElement = document.getElementById('cartCount');
const checkoutButton = document.getElementById('checkoutButton'); 
// REFERENCE TO THE CART BUTTON ID ADDED IN HTML (REQUIRED FIX)
const cartIconBtn = document.getElementById('cartIconBtn'); 
const searchInput = document.getElementById('searchInput'); 

// Product data structure (Expanded list for display)
const allProducts = [
    { 
        id: 'broadway-1', 
        name: 'Big Pops XXXL Cherry Plum Lollipops 48', 
        price: 71.50, 
        category: 'lollipops', 
        image: 'Broadway sweets products/Lolipops/big pops/lolipops 8.jpg', 
        description: 'Giant lollipops in a delicious cherry plum flavor, perfect for sharing or a big treat.', 
        thumbnails: ['Broadway sweets products/Lolipops/big pops/lolipops 8.jpg'] 
    },
    { 
        id: 'broadway-2', 
        name: 'Chupa Chups Mega Lollipop Mix 100', 
        price: 125.99, 
        category: 'lollipops', 
        image: 'Broadway sweets products/Lolipops/chupa chups/chupa chups 4.jpg', 
        description: 'A massive mix of 100 classic Chupa Chups lollipops in various flavors.', 
        thumbnails: ['Broadway sweets products/Lolipops/chupa chups/chupa chups 4.jpg'] 
    },
    // Add more of your products here to complete the list
    // { id: '...', name: '...', price: ..., category: '...', image: '...', description: '...', thumbnails: ['...'] },
];

// Cart Data Storage
const CART_STORAGE_KEY = 'broadwaySweetsCart';
let cartItems = []; // Array to hold the cart item objects

// ====================================================================
// 2. CART LOGIC OBJECT (Modularized)
// ====================================================================

const cart = {
    // Saves the current cart to Local Storage
    saveCart() {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        this.updateCartCount();
    },

    // Loads the cart from Local Storage on page load
    loadCart() {
        try {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            cartItems = storedCart ? JSON.parse(storedCart) : [];
        } catch (e) {
            console.error("Error loading cart:", e);
            cartItems = [];
        }
    },

    // Updates the number displayed next to the cart icon
    updateCartCount() {
        const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalCount;
            // Style update (optional: highlight the icon when not empty)
            cartCountElement.style.display = totalCount > 0 ? 'block' : 'none';
        }
    },

    // Renders the cart contents inside the modal
    renderCart() {
        if (!cartItemsContainer || !cartTotalElement) return;

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty. Start shopping!</p>';
            cartTotalElement.textContent = 'R0.00';
            checkoutButton.disabled = true;
            return;
        }
        
        checkoutButton.disabled = false;
        let total = 0;
        
        cartItemsContainer.innerHTML = cartItems.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">R${item.price.toFixed(2)}</span>
                    </div>
                    <div class="item-quantity-controls">
                        <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">&times;</button>
                </div>
            `;
        }).join('');

        cartTotalElement.textContent = `R${total.toFixed(2)}`;

        // Re-attach listeners to new quantity controls
        this.attachCartControlsListeners();
    },
    
    // Attaches listeners for increasing/decreasing/removing items
    attachCartControlsListeners() {
        cartItemsContainer.querySelectorAll('.increase-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => this.updateQuantity(e.target.dataset.id, 1));
        });
        cartItemsContainer.querySelectorAll('.decrease-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => this.updateQuantity(e.target.dataset.id, -1));
        });
        cartItemsContainer.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.removeItem(e.target.dataset.id));
        });
    },

    // Updates the quantity of a cart item
    updateQuantity(itemId, change) {
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        
        if (itemIndex > -1) {
            cartItems[itemIndex].quantity += change;
            
            if (cartItems[itemIndex].quantity <= 0) {
                // If quantity drops to 0 or less, remove the item
                this.removeItem(itemId);
            } else {
                this.saveCart();
                this.renderCart(); // Re-render the cart to show updated numbers
            }
        }
    },

    // Removes an item entirely from the cart
    removeItem(itemId) {
        cartItems = cartItems.filter(item => item.id !== itemId);
        this.saveCart();
        this.renderCart();
    },
    
    // Adds a product to the cart (called from the product modal)
    addItem(product, quantity) {
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({ 
                id: product.id, 
                name: product.name, 
                price: product.price, 
                image: product.image,
                quantity: quantity 
            });
        }
        
        this.saveCart();
        alert(`${quantity} x ${product.name} added to cart!`);
    }
};

// ====================================================================
// 3. MODAL CONTROLS (PLACEHOLDER FUNCTIONS - You should flesh these out)
// ====================================================================

function openProductModal(product) { 
    console.log(`Opening modal for: ${product.name}`);
    // Your logic to populate the modal with product details goes here.
    if (productModalOverlay) productModalOverlay.style.display = 'block';
}

function closeProductModal() { 
    if (productModalOverlay) productModalOverlay.style.display = 'none';
}

function openUserModal() { 
    console.log("Opening user login/account modal.");
    if (userModalOverlay) userModalOverlay.style.display = 'block';
}

function closeUserModal() { 
    if (userModalOverlay) userModalOverlay.style.display = 'none';
}


// ====================================================================
// 4. CART MODAL CONTROLS (THE CART OPEN/CLOSE FUNCTIONS)
// ====================================================================

/**
 * FIX: Opens the cart modal and renders the current cart contents.
 */
function openCartModal() {
    if (cartModalOverlay && cartModal) {
        // 1. Show the overlay
        cartModalOverlay.style.display = 'block';
        
        // 2. Render the latest cart data
        cart.renderCart(); 
        
        // 3. Add 'active' class to trigger CSS transition for the modal itself
        setTimeout(() => {
            cartModal.classList.add('active');
        }, 10); 
    }
}

/**
 * Closes the cart modal.
 */
function closeCartModal() {
    if (cartModalOverlay && cartModal) {
        // 1. Remove 'active' class to start CSS transition
        cartModal.classList.remove('active');
        
        // 2. Hide the overlay after the CSS transition finishes (e.g., 300ms)
        setTimeout(() => cartModalOverlay.style.display = 'none', 300);
    }
}

// ====================================================================
// 5. PRODUCT RENDERING & SEARCH (Placeholder for your shop display)
// ====================================================================

/**
 * Renders all products to the homepage.
 */
function renderProducts() {
    if (!productsContainer) return;
    
    // Example: Create a simple placeholder product card
    productsContainer.innerHTML = allProducts.map(product => `
        <div class="product-card" data-id="${product.id}" data-name="${product.name}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">R${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
        </div>
    `).join('');
    
    // Attach listeners to the "Add to Cart" buttons
    productsContainer.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            const product = allProducts.find(p => p.id === productId);
            if (product) {
                cart.addItem(product, 1);
            }
        });
    });
}

// Add a simple search function based on the assumption you have a search input
function setupProductSearch() {
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            // Select all product cards
            const productCards = document.querySelectorAll('.product-card');

            productCards.forEach(card => {
                // Get the product name from the data-name attribute we added in renderProducts
                const productName = card.getAttribute('data-name').toLowerCase(); 
                
                // Check if the product name contains the search term
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    }
}


// ====================================================================
// 6. EVENT LISTENERS AND INITIALIZATION
// ====================================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // --- FIX: ATTACH CART OPENING LISTENER ---
    // This connects the icon button to the openCartModal function
    if (cartIconBtn) {
        cartIconBtn.addEventListener('click', openCartModal);
    }
    
    // --- CHECKOUT BUTTON LISTENER ---
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cartItems.length === 0) {
                alert("Your cart is empty. Please add items before checking out.");
                return;
            }
            // 1. Close the cart modal immediately
            closeCartModal();
            
            // 2. Redirect the user to the dedicated checkout page
            window.location.href = 'checkout.html';
            
            // The cart data remains in Local Storage for checkout.html to access!
        });
    }

    // ====================================================================
    // 7. MOBILE HAMBURGER MENU TOGGLE
    // ====================================================================

    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            // Toggle the 'open' class on the navigation menu
            mainNav.classList.toggle('open');
            
            // Optional: Toggle the hamburger icon to an 'X'
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times');
        });
        
        // Close the menu when a link inside it is clicked (for single-page feel)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                navToggle.querySelector('i').classList.add('fa-bars');
                navToggle.querySelector('i').classList.remove('fa-times');
            });
        });
    }
    
    // ====================================================================
    // 8. FINAL SETUP CALLS
    // ====================================================================

    // 1. Load cart data from local storage (and initialize the cart object)
    cart.loadCart(); 
    
    // 2. Render all products to the homepage (essential for the search to work)
    renderProducts(); 
    
    // 3. Setup product search/filtering functionality
    setupProductSearch(); 

    // 4. Update the cart icon count on initial load
    cart.updateCartCount();

}); // Closes the DOMContentLoaded listener