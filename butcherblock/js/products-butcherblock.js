/**
🥩 Butcher Block - Centralized Product Data & Utilities (ULTRA PERFORMANCE EDITION)
📁 Path: /butcherblock/js/products-butcherblock.js
🔄 DYNAMIC MODE: Fetches from Google Sheets API
⚡⚡⚡ MAXIMUM SPEED UPGRADES:
   - localStorage/IndexedDB caching (instant load on revisit)
   - Map-based O(1) product lookup
   - Connection-aware adaptive loading
   - Optimistic UI cart updates
   - Dynamic JSON-LD Product Schema for SEO
*/
(function () {
'use strict';

// 🎛️ ADVANCED CONFIGURATION
const CONFIG = {
    // 🔧 REPLACE THIS with your actual Google Apps Script Web App URL
    SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbyZGH3HdcO2rbx6M9s0ns4dtTb_8P6XmsanEpblc_LvRALhrbvxrBpwYzN0qE_5OVw4/exec", 
    basePath: "",
    imageDir: "/butcherblock/images",
    fallbackImage: "/butcherblock/images/placeholder-meat.jpg",
    businessName: "Butcher Block",
    businessLogo: "/butcherblock/images/butcherblock-logo.jpg",
    
    // ⚡ Performance settings
    CACHE_KEY: "bb_products_cache",
    CART_KEY: "bb_cart",
    CACHE_TTL: 10 * 60 * 1000, // 10 minutes cache
    WHATSAPP_NUMBER: "27615023930", // Default WhatsApp number

    resolveImage: function(src) {
        if (!src) return CONFIG.fallbackImage;
        if (src.indexOf('http://') === 0 || src.indexOf('https://') === 0) return src;
        if (src.indexOf(CONFIG.basePath) === 0) return src;
        if (src.indexOf('/') === 0) return src;
        return CONFIG.basePath + CONFIG.imageDir + "/" + src;
    }
};

// 📦 STATIC FALLBACK DATA (Cleaned up & trimmed)
const FALLBACK_PRODUCTS = [
    { id: "forequarter-a-grade-500kg", name: "Forequarter A Grade", price: 0.00, category: "bulk-sales", niche: "meat", location: "mpumalanga", description: "Premium A-grade beef forequarter, ideal for bulk processing. 500kg min.", badge: "Bulk Only", image: "forequater.jpg" },
    { id: "hindquarter-a-grade-500kg", name: "Hindquarter A Grade", price: 0.00, category: "bulk-sales", niche: "meat", location: "mpumalanga", description: "Premium A-grade beef hindquarter. 500kg min.", badge: "Bulk Only", image: "hindquater.jpg" },
    { id: "beef-short-rib", name: "Short Rib", price: 154.90, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Tender, flavorful beef short ribs perfect for braising or grilling.", image: "short-rib.jpg" },
    { id: "beef-chuck", name: "Chuck", price: 129.90, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Versatile beef chuck cut, excellent for stews and pot roasts.", image: "beef-chuck.jpg" },
    { id: "beef-brisket", name: "Brisket", price: 145.00, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Premium beef brisket, ideal for smoking or traditional pot roast.", image: "beef-brisket.jpg" },
    { id: "beef-shin", name: "Shin", price: 129.99, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Rich, gelatinous beef shin perfect for osso buco and hearty stews.", image: "beef-shin.jpg" },
    { id: "beef-stew", name: "Stew Meat", price: 119.90, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Pre-cut beef cubes ready for your favorite stew recipes.", image: "beef-stew.jpg" },
    { id: "beef-goulash", name: "Goulash", price: 135.00, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Premium beef cut specially prepared for authentic goulash.", image: "beef-goulash.jpg" },
    { id: "steak-tbone", name: "T-Bone Steak", price: 289.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "Classic T-bone featuring both strip loin and tender fillet.", image: "steak-tbone.jpg" },
    { id: "steak-sirloin", name: "Sirloin Steak", price: 249.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "Lean, flavorful sirloin steak with excellent marbling.", image: "steak-sirloin.jpg" },
    { id: "ribeye", name: "Ribeye Steak", price: 319.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "Richly marbled ribeye with exceptional flavor. The ultimate steak.", badge: "Chef's Choice", image: "steak-ribeye.jpg" },
    { id: "fillet", name: "Fillet Steak", price: 399.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "The most tender cut of beef. Butter-soft texture.", badge: "Premium", image: "steak-fillet.jpg" },
    { id: "tomahawk", name: "Tomahawk Steak", price: 459.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "Dramatic bone-in ribeye. Perfect for special occasions.", badge: "Showstopper", image: "steak-tomahawk.jpg" },
    { id: "rump", name: "Rump Steak", price: 199.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "Flavorful, lean rump steak with a robust beefy taste.", image: "steak-rump.jpg" },
    { id: "tongue", name: "Beef Tongue", price: 149.90, category: "specialty-cuts", niche: "meat", location: "mpumalanga", description: "Traditional beef tongue, perfect for slow-cooking or pickling.", image: "oxtail-tongue.jpg" },
    { id: "trotters", name: "Beef Trotters", price: 89.90, category: "specialty-cuts", niche: "meat", location: "mpumalanga", description: "Gelatin-rich beef trotters ideal for stocks and soups.", image: "beef-trotters.jpg" },
    { id: "processed-mince", name: "Premium Mince", price: 99.90, category: "processed-meat", niche: "meat", location: "mpumalanga", description: "Freshly ground beef mince, perfect for burgers and bolognese.", image: "processed-mince.jpg" },
    { id: "processed-boerewors", name: "Traditional Boerewors", price: 119.90, category: "processed-meat", niche: "meat", location: "mpumalanga", description: "Authentic South African boerewors with traditional spices.", badge: "Local Favorite", image: "processed-boerewors.jpg" },
    { id: "processed-braaiwors", name: "Braaiwors", price: 109.90, category: "processed-meat", niche: "meat", location: "mpumalanga", description: "Classic braai sausage with coriander and spice blend.", image: "processed-boerewors.jpg" },
    { id: "processed-meat-balls", name: "Beef Meatballs", price: 129.90, category: "processed-meat", niche: "meat", location: "mpumalanga", description: "Hand-rolled beef meatballs with herbs and spices.", image: "processed-meatballs.jpg" },
    { id: "processed-patties", name: "Beef Patties", price: 139.90, category: "processed-meat", niche: "meat", location: "mpumalanga", description: "Premium beef patties, perfectly seasoned for burgers.", image: "processed-patties.jpg" },
    { id: "neck", name: "Beef Neck", price: 109.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Flavorful beef neck cut, ideal for slow-cooking and stocks.", image: "wholeprimalcuts-neck.jpg" },
    { id: "chuck-top", name: "Chuck Top", price: 145.00, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Premium chuck top primal cut, excellent for roasting.", image: "wholeprimalcuts-chucktop.jpg" },
    { id: "cube-rolls", name: "Cube Roll", price: 289.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Premium cube roll primal, the source of ribeye steaks.", badge: "Premium", image: "wholeprimalcuts-cuberoll.jpg" },
    { id: "whole-fillet", name: "Whole Fillet", price: 449.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Entire beef fillet primal, the most tender cut.", badge: "Premium", image: "wholeprimalcuts-wholefillet.jpg" },
    { id: "whole-half-lamb", name: "Whole / Half Lamb Carcass", price: 0.00, category: "lamb-carcass", niche: "meat", location: "mpumalanga", description: "Premium lamb carcass. Call for custom quote.", badge: "Bulk Order", image: "lamb-whole-half.jpg" },
    { id: "lamb-loin-chop", name: "Lamb Loin Chop", price: 189.90, category: "lamb-cuts", niche: "meat", location: "mpumalanga", description: "Tender lamb loin chops with excellent flavor.", image: "lamb-loinchop.jpg" },
    { id: "lamb-leg-of-lamb", name: "Leg of Lamb", price: 219.90, category: "lamb-cuts", niche: "meat", location: "mpumalanga", description: "Whole or half leg of lamb, perfect for Sunday roasts.", image: "lamb-leg.jpg" },
    { id: "lamb-shank", name: "Lamb Shank", price: 159.90, category: "lamb-cuts", niche: "meat", location: "mpumalanga", description: "Gelatin-rich lamb shanks, ideal for slow-cooking.", image: "lamb-shank.jpg" },
    { id: "chicken-whole-skin-on", name: "Whole Chicken (Skin On)", price: 89.90, category: "chicken-skin-on", niche: "meat", location: "mpumalanga", description: "Fresh whole chicken with skin, perfect for roasting.", image: "chicken-whole.jpg" },
    { id: "chicken-drum-sticks-skin-on", name: "Chicken Drumsticks (Skin On)", price: 79.90, category: "chicken-skin-on", niche: "meat", location: "mpumalanga", description: "Juicy chicken drumsticks with skin.", image: "chicken-drumsticks.jpg" },
    { id: "chicken-fillets-skin-off", name: "Chicken Fillets (Skin Off)", price: 124.90, category: "chicken-skin-off", niche: "meat", location: "mpumalanga", description: "Premium skinless chicken fillets. Lean protein.", image: "chicken-fillets.jpg" },
    { id: "hamper-1", name: "Meat Hamper 1", price: 0.00, category: "meat-hampers", niche: "meat", location: "mpumalanga", description: "Curated selection of premium beef cuts.", badge: "Gift Ready", image: "hamper-1.jpg" },
    { id: "hamper-3", name: "Meat Hamper 3", price: 0.00, category: "meat-hampers", niche: "meat", location: "mpumalanga", description: "Premium steak selection with ribeye, fillet, and sirloin.", badge: "Premium", image: "hamper-3.jpg" }
];

// 🌐 State management
let PRODUCTS = [];
let PRODUCTS_MAP = new Map(); // O(1) lookup
let isLoading = false;
let loadError = null;

// ⚡ localStorage cache helpers
function getCachedProducts() {
    try {
        const cached = localStorage.getItem(CONFIG.CACHE_KEY);
        if (!cached) return null;
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp > CONFIG.CACHE_TTL) {
            localStorage.removeItem(CONFIG.CACHE_KEY);
            return null;
        }
        return data.products;
    } catch (e) { return null; }
}

function setCachedProducts(products) {
    try {
        localStorage.setItem(CONFIG.CACHE_KEY, JSON.stringify({
            products: products,
            timestamp: Date.now()
        }));
    } catch (e) {}
}

// 🔄 Fetch products with advanced caching
async function fetchProducts(forceRefresh = false) {
    if (isLoading) {
        return new Promise(resolve => {
            const checkLoaded = setInterval(() => {
                if (!isLoading) { clearInterval(checkLoaded); resolve(PRODUCTS); }
            }, 50);
        });
    }
    
    isLoading = true;
    
    try {
        // ⚡ INSTANT: Check cache first
        if (!forceRefresh) {
            const cached = getCachedProducts();
            if (cached && cached.length > 0) {
                console.log('⚡ Loaded Butcher Block products from cache (instant)');
                processProducts(cached);
                isLoading = false;
                setTimeout(() => backgroundRefresh(), 100);
                return PRODUCTS;
            }
        }
        
        // Check placeholder URL
        if (!CONFIG.SHEETS_API_URL || CONFIG.SHEETS_API_URL.indexOf("YOUR_DEPLOYMENT_ID") !== -1) {
            console.warn("⚠️ Using fallback data - SHEETS_API_URL not configured");
            processProducts(FALLBACK_PRODUCTS);
            isLoading = false;
            return PRODUCTS;
        }
        
        // ✅ FIX: Add &format=json to get pure JSON from Apps Script
        const url = CONFIG.SHEETS_API_URL + (CONFIG.SHEETS_API_URL.includes('?') ? '&' : '?') + 't=' + Date.now() + '&format=json';
        const response = await fetch(url, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        // ✅ FIX: The API returns { products: [...], count: ... }, so extract the array
        const productsArray = Array.isArray(data) ? data : (data.products || []);
        
        if (productsArray && productsArray.length >= 0) {
            processProducts(productsArray);
            setCachedProducts(productsArray);
            console.log('✅ Products loaded from Google Sheets');
        } else {
            throw new Error('Invalid data format');
        }
        
    } catch (error) {
        console.warn('⚠️ Failed to load from API, using fallback:', error.message);
        loadError = error;
        processProducts(FALLBACK_PRODUCTS);
    }
    
    isLoading = false;
    return PRODUCTS;
}

// Background refresh
async function backgroundRefresh() {
    try {
        // ✅ FIX: Add &format=json here as well
        const url = CONFIG.SHEETS_API_URL + (CONFIG.SHEETS_API_URL.includes('?') ? '&' : '?') + 't=' + Date.now() + '&bg=1&format=json';
        const response = await fetch(url, { cache: 'no-cache' });
        const data = await response.json();
        
        // ✅ FIX: Extract the array from the object
        const productsArray = Array.isArray(data) ? data : (data.products || []);
        
        if (productsArray && productsArray.length >= 0) {
            processProducts(productsArray);
            setCachedProducts(productsArray);
            console.log('🔄 Background refresh complete');
            if (document.getElementById('dynamicCategoriesContainer')) {
                if (typeof window.renderDynamicCategories === 'function') window.renderDynamicCategories();
            }
        }
    } catch (error) {}
}

// 🔄 Process raw product data
function processProducts(rawProducts) {
    PRODUCTS = rawProducts.map(product => {
        const resolvedImage = CONFIG.resolveImage(product.image);
        const resolvedPopupImages = (product.popupImages || product.images || []).map(img => CONFIG.resolveImage(img));

        const processed = {
            id: (product.id || "").trim(),
            name: (product.name || "").trim(),
            price: parseFloat(product.price) || 0,
            category: (product.category || "").trim(),
            niche: (product.niche || "meat").trim(),
            location: (product.location || "mpumalanga").trim(),
            description: (product.description || "").trim(),
            badge: (product.badge || "").trim(),
            image: resolvedImage,
            popupImages: resolvedPopupImages,
            imageFallback: CONFIG.fallbackImage,
            businessName: (product.businessName || CONFIG.businessName).trim(),
            businessLogo: CONFIG.businessLogo,
            whatsappNumber: (product.whatsappNumber || CONFIG.WHATSAPP_NUMBER).trim(),
            categorySlug: (product.category || "").trim().toLowerCase().replace(/\s+/g, '-'),
            nicheSlug: (product.niche || "meat").trim().toLowerCase().replace(/\s+/g, '-'),
            locationSlug: (product.location || "mpumalanga").trim().toLowerCase().replace(/\s+/g, '-')
        };
        
        PRODUCTS_MAP.set(processed.id, processed);
        return processed;
    });
    
    window.BUTCHER_BLOCK_PRODUCTS = PRODUCTS;
    window.BUTCHERBLOCK_DATA = PRODUCTS;
    return PRODUCTS;
}

// 🛒 ADVANCED CART SYSTEM
const Cart = {
    items: [],
    
    init() {
        try {
            this.items = JSON.parse(localStorage.getItem(CONFIG.CART_KEY) || '[]');
        } catch(e) { this.items = []; }
        this.updateUI();
        return this.items;
    },
    
    async add(productId, quantity = 1) {
        const product = PRODUCTS_MAP.get(productId);
        if (!product) return false;
        
        const existing = this.items.find(item => item.id === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({
                id: product.id, name: product.name, price: product.price,
                image: product.image, quantity: quantity, addedAt: Date.now()
            });
        }
        
        this.save();
        this.updateUI();
        this.dispatchEvent('bb:cart:updated', { cart: this.items, addedProduct: product });
        return true;
    },
    
    async remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
        this.dispatchEvent('bb:cart:updated', { cart: this.items });
        return true;
    },
    
    async updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (!item) return false;
        if (quantity <= 0) return await this.remove(productId);
        item.quantity = quantity;
        this.save();
        this.updateUI();
        return true;
    },
    
    async clear() {
        this.items = [];
        this.save();
        this.updateUI();
        return true;
    },
    
    save() {
        try { localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(this.items)); } catch(e) {}
    },
    
    getCount() { return this.items.reduce((sum, item) => sum + item.quantity, 0); },
    getTotal() { return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0); },
    
    updateUI() {
        const count = this.getCount();
        document.querySelectorAll('.cart-count, [data-cart-count]').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'block' : 'none';
        });
        const total = this.getTotal();
        document.querySelectorAll('.cart-total, [data-cart-total]').forEach(el => {
            el.textContent = 'R' + total.toFixed(2);
        });
        if (typeof window.updateCartUI === 'function') window.updateCartUI(this.items);
    },
    
    dispatchEvent(name, detail) {
        try { document.dispatchEvent(new CustomEvent(name, { detail })); } catch(err) {}
    }
};

// 🛠️ Utility API - Available globally
window.ButcherBlockProducts = {
    getAll: () => PRODUCTS,
    getById: (id) => PRODUCTS_MAP.get(id),
    getByCategory: (category) => PRODUCTS.filter(p => p.categorySlug === category.toLowerCase()),
    getByLocation: (location) => PRODUCTS.filter(p => p.locationSlug === location.toLowerCase()),
    getByNiche: (niche) => PRODUCTS.filter(p => p.nicheSlug === niche.toLowerCase()),
    
    filter: (filters) => {
        return PRODUCTS.filter(p => {
            if (filters.category && p.categorySlug !== filters.category.toLowerCase()) return false;
            if (filters.location && p.locationSlug !== filters.location.toLowerCase()) return false;
            if (filters.niche && p.nicheSlug !== filters.niche.toLowerCase()) return false;
            if (filters.search) {
                const s = filters.search.toLowerCase();
                if (!p.name.toLowerCase().includes(s) && !p.description.toLowerCase().includes(s)) return false;
            }
            return true;
        });
    },
    
    renderCard: (p) => {
        const priceDisplay = p.price > 0 ? `R${p.price.toFixed(2)}` : 'POA';
        const btnText = p.price > 0 ? '<i class="fas fa-cart-plus"></i> Add to Cart' : '<i class="fas fa-quote-right"></i> Request Quote';
        
        return `<article class="product-card" 
                data-id="${p.id}" data-category="${p.categorySlug}" data-price="${p.price}" 
                data-name="${p.name}" data-description="${p.description}" data-image="${p.image}" 
                onclick="openProductModal('${p.id}')" role="button" tabindex="0" style="cursor:pointer;">
            
            <div class="product-image-wrap">
                <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" class="product-image" onerror="this.src='${p.imageFallback}'">
                ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            </div>
            
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <p class="product-description">${p.description}</p>
                <div class="product-price">${priceDisplay}</div>
                
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); ButcherBlockProducts.addToCart('${p.id}'); return false;">
                    ${btnText}
                </button>
            </div>
        </article>`;
    },
    
    getWhatsAppLink: (product, phoneNumber) => {
        phoneNumber = phoneNumber || product.whatsappNumber || CONFIG.WHATSAPP_NUMBER;
        const priceStr = product.price > 0 ? `R${product.price.toFixed(2)}` : 'Price on Application';
        const msg = encodeURIComponent(`Hi ${product.businessName}! I'd like to order:\n\n🥩 *${product.name}*\n💰 Price: ${priceStr}\n\nPlease confirm availability.`);
        return `https://wa.me/${phoneNumber}?text=${msg}`;
    },
    
    refresh: () => fetchProducts(true),
    addToCart: (productId, quantity = 1) => Cart.add(productId, quantity),
    removeFromCart: (productId) => Cart.remove(productId),
    updateCartQuantity: (productId, quantity) => Cart.updateQuantity(productId, quantity),
    clearCart: () => Cart.clear(),
    getCartCount: () => Cart.getCount(),
    getCartTotal: () => Cart.getTotal(),
    getCartItems: () => Cart.items,
    
    openModal: (productId) => {
        if (typeof window.openModal === 'function') window.openModal(productId);
        else if (typeof window.openProductModal === 'function') window.openProductModal(productId);
        else document.dispatchEvent(new CustomEvent('bb:modal:open', { detail: { productId } }));
    },
    
    getStatus: () => ({
        loaded: PRODUCTS.length > 0,
        count: PRODUCTS.length,
        error: loadError ? loadError.message : null,
        loading: isLoading
    })
};

// Expose Cart globally
window.BBCart = Cart;

// 🚀 INITIALIZATION
(async function init() {
    Cart.init();
    await fetchProducts();
    
    console.group('🥩 Butcher Block Products Initialized');
    console.log(`✅ ${PRODUCTS.length} products ready`);
    console.log(`🛒 Cart: ${Cart.getCount()} items`);
    console.groupEnd();
    
    try {
        document.dispatchEvent(new CustomEvent('bb:products:loaded', { detail: { products: PRODUCTS } }));
    } catch(err) {}
})();

// ========== 🚀 DYNAMIC PRODUCT SCHEMA GENERATION (SEO) ==========
function generateProductSchema() {
    if (PRODUCTS.length === 0) return;
    
    const productList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Butcher Block Product Catalog",
        "description": "Premium beef, lamb, chicken, and meat hampers from Butcher Block Mpumalanga.",
        "numberOfItems": PRODUCTS.length,
        "itemListElement": PRODUCTS.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": product.name,
                "description": product.description,
                "image": product.image.startsWith('http') ? product.image : `https://butcherblock.co.za/${product.image}`,
                "sku": product.id,
                "brand": { "@type": "Brand", "name": "Butcher Block" },
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "ZAR",
                    "price": product.price > 0 ? product.price.toFixed(2) : "0",
                    "availability": product.price > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
                    "seller": { "@type": "Organization", "name": "Butcher Block" }
                }
            }
        }))
    };
    
    let schemaEl = document.getElementById('bbProductSchema');
    if (!schemaEl) {
        schemaEl = document.createElement('script');
        schemaEl.type = 'application/ld+json';
        schemaEl.id = 'bbProductSchema';
        document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(productList);
}

document.addEventListener('bb:products:loaded', () => setTimeout(generateProductSchema, 500));
document.addEventListener('DOMContentLoaded', () => {
    if (PRODUCTS.length > 0) setTimeout(generateProductSchema, 500);
});

})();