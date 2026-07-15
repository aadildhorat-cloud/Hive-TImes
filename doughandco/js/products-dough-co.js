/**
🍪 Dough & Co - Centralized Product Data & Utilities (ULTRA PERFORMANCE EDITION)
📁 Path: /doughandco/js/products-dough-co.js
✅ FIXED: Cleaned malformed JSON, fixed template literals, and exposed window.DOUGH_CO_PRODUCTS.
*/
(function () {
'use strict';

// 🎛️ ADVANCED CONFIGURATION
const CONFIG = {
    // ⚠️ IMPORTANT: Ensure this ends in /exec (not /dev) for public access!
    SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbxI8Fkxidy46aU8khR2i6qnPwwllwLooLk8Pjbj7bi_Kh58B64DRck2oxepgC518BF9Tw/exec",
    basePath: "/doughandco",
    imageDir: "/images",
    fallbackImage: "/doughandco/images/doughandco-logo.jpg",
    businessName: "Dough & Co",
    businessLogo: "/doughandco/images/doughandco-logo.jpg",
    CACHE_KEY: "doughco_products_cache",
    CART_KEY: "doughco_cart",
    CACHE_TTL: 10 * 60 * 1000, // 10 minutes
    WHATSAPP_NUMBER: "27670048277",
    
    resolveImage: function(src) {
        if (!src) return CONFIG.fallbackImage;
        if (src.indexOf('http://') === 0 || src.indexOf('https://') === 0) return src;
        if (src.indexOf(CONFIG.basePath) === 0) return src;
        if (src.indexOf('/') === 0) return src;
        return CONFIG.basePath + CONFIG.imageDir + "/" + src;
    }
};

// 📦 STATIC FALLBACK DATA (Cleaned & Corrected from provided JSON)
const FALLBACK_PRODUCTS = [
    { 
        id: "flake", 
        name: "Flake Butter Biscuits", 
        price: 125, 
        category: "butter-biscuits", 
        niche: "baking", 
        location: "gauteng", 
        description: "Premium flake butter biscuits with layers of delicate, buttery goodness.", 
        badge: "🔥 Best Seller", 
        image: "https://hivetimes.co.za/doughandco/images/flake.jpg",
        popupImages: ["https://hivetimes.co.za/doughandco/images/flake.jpg"],
        businessName: "Dough & Co",
        businessLogo: "/doughandco/images/doughandco-logo.jpg",
        active: true
    },
    { 
        id: "nuttyflakes", 
        name: "Nutty Flake Butter Biscuits", 
        price: 125, 
        category: "butter-biscuits", 
        niche: "baking", 
        location: "gauteng", 
        description: "Classic flake biscuits topped with roasted nuts for extra crunch.", 
        badge: "🔥 Best Seller", 
        image: "https://hivetimes.co.za/doughandco/images/nuttyflakes.jpg",
        popupImages: ["https://hivetimes.co.za/doughandco/images/nuttyflakes.jpg"],
        businessName: "Dough & Co",
        businessLogo: "/doughandco/images/doughandco-logo.jpg",
        active: true
    },
    { 
        id: "1kgassorted", 
        name: "Assorted Butter Biscuits (1kg)", 
        price: 230, 
        category: "butter-biscuits", 
        niche: "baking", 
        location: "gauteng", 
        description: "A curated selection of our most popular butter biscuit flavours.", 
        badge: "✨ Value Pack", 
        image: "https://hivetimes.co.za/doughandco/images/1kgassorted.jpg",
        popupImages: ["https://hivetimes.co.za/doughandco/images/1kgassorted.jpg"],
        businessName: "Dough & Co",
        businessLogo: "/doughandco/images/doughandco-logo.jpg",
        active: true
    },
    { 
        id: "mintaero", 
        name: "Mint Aero Butter Biscuits", 
        price: 115, 
        category: "butter-biscuits", 
        niche: "baking", 
        location: "gauteng", 
        description: "Refreshing mint-infused butter biscuits with a light, airy texture.", 
        badge: "🔥 Best Seller", 
        image: "https://hivetimes.co.za/doughandco/images/mintaero.jpg",
        popupImages: ["https://hivetimes.co.za/doughandco/images/mintaero.jpg"],
        businessName: "Dough & Co",
        businessLogo: "/doughandco/images/doughandco-logo.jpg",
        active: true
    },
    { 
        id: "peppermint", 
        name: "Peppermint Butter Biscuits", 
        price: 115, 
        category: "butter-biscuits", 
        niche: "baking", 
        location: "gauteng", 
        description: "Classic peppermint flavour in a crisp, buttery biscuit base.", 
        badge: "🔥 Best Seller", 
        image: "https://hivetimes.co.za/doughandco/images/peppermint.jpg",
        popupImages: ["https://hivetimes.co.za/doughandco/images/peppermint.jpg"],
        businessName: "Dough & Co",
        businessLogo: "/doughandco/images/doughandco-logo.jpg",
        active: true
    },
    { 
        id: "diycookies", 
        name: "DIY Cookies", 
        price: 360, 
        category: "sugar-cookies", 
        niche: "baking", 
        location: "gauteng", 
        description: "Customize your own batch of delicious sugar cookies, R360 per kg.", 
        badge: "🔥 Best Seller", 
        image: "https://hivetimes.co.za/doughandco/images/diycookies.jpg",
        popupImages: ["https://hivetimes.co.za/doughandco/images/diycookies.jpg"],
        businessName: "Dough & Co",
        businessLogo: "/doughandco/images/doughandco-logo.jpg",
        active: true
    },
    { 
        id: "almondroca", 
        name: "Classic Almond Rocca", 
        price: 40, 
        category: "almond-rocca", 
        niche: "baking", 
        location: "gauteng", 
        description: "Fan-favourite toffee-almond clusters in a cute clear tin with handle.", 
        badge: "🎁 Gift Ready", 
        image: "https://hivetimes.co.za/doughandco/images/almondroca.jpg",
        popupImages: ["https://hivetimes.co.za/doughandco/images/almondroca.jpg"],
        businessName: "Dough & Co",
        businessLogo: "/doughandco/images/doughandco-logo.jpg",
        active: true
    },
    { 
        id: "1kgassorted500g", 
        name: "Assorted Butter Biscuits (500g)", 
        price: 130, 
        category: "butter-biscuits", 
        niche: "baking", 
        location: "gauteng", 
        description: "A smaller curated selection of our popular butter biscuit flavours.", 
        badge: "✨ Value Pack", 
        image: "https://hivetimes.co.za/doughandco/images/1kgassorted500g.jpg",
        popupImages: ["https://hivetimes.co.za/doughandco/images/1kgassorted500g.jpg"],
        businessName: "Dough & Co",
        businessLogo: "/doughandco/images/doughandco-logo.jpg",
        active: true
    }
];

// 🌐 State management
let PRODUCTS = [];
let PRODUCTS_MAP = new Map();
let isLoading = false;
let loadError = null;
let lastRawSnapshot = null;

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
        if (!forceRefresh) {
            const cached = getCachedProducts();
            if (cached && cached.length > 0) {
                console.log('⚡ Loaded Dough & Co products from cache (instant)');
                processProducts(cached);
                isLoading = false;
                setTimeout(() => backgroundRefresh(), 100);
                return PRODUCTS;
            }
        }

        if (!CONFIG.SHEETS_API_URL || CONFIG.SHEETS_API_URL === "" || CONFIG.SHEETS_API_URL.includes("YOUR_DOUGHCO_DEPLOYMENT_ID")) {
            console.warn("⚠️ Using fallback data - SHEETS_API_URL not configured");
            processProducts(FALLBACK_PRODUCTS);
            isLoading = false;
            return PRODUCTS;
        }

        const url = CONFIG.SHEETS_API_URL + (CONFIG.SHEETS_API_URL.includes('?') ? '&' : '?') + 't=' + Date.now() + '&format=json';
        const response = await fetch(url, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
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
async function backgroundRefresh(knownHash) {
    if (!CONFIG.SHEETS_API_URL || CONFIG.SHEETS_API_URL === "" || CONFIG.SHEETS_API_URL.includes("YOUR_DOUGHCO_DEPLOYMENT_ID")) return;
    try {
        const url = CONFIG.SHEETS_API_URL + (CONFIG.SHEETS_API_URL.includes('?') ? '&' : '?') + 't=' + Date.now() + '&bg=1&format=json';
        const response = await fetch(url, { cache: 'no-cache' });
        const data = await response.json();
        const productsArray = Array.isArray(data) ? data : (data.products || []);
        if (!productsArray) return;

        const snapshot = JSON.stringify(productsArray);
        if (lastRawSnapshot === null) lastRawSnapshot = JSON.stringify(window.DOUGH_CO_PRODUCTS || []);
        
        if (snapshot === lastRawSnapshot) {
            console.log('🔄 Background refresh: no changes since last sync');
            return;
        }
        lastRawSnapshot = snapshot;
        processProducts(productsArray);
        setCachedProducts(productsArray);
        console.log('🔄 Background refresh: newer product data found, updated silently');
        
        if (document.getElementById('dynamicCategoriesContainer')) {
            if (typeof window.renderDynamicCategories === 'function') window.renderDynamicCategories();
        }
    } catch (error) {}
}

// 🔄 Process raw product data
function processProducts(rawProducts) {
    PRODUCTS = rawProducts.map(product => {
        const resolvedImage = CONFIG.resolveImage(product.image);
        // Handle both popupImages and popup_images from sheet
        const rawPopup = product.popupImages || product.popup_images || product.images || [];
        const resolvedPopupImages = (Array.isArray(rawPopup) ? rawPopup : [rawPopup]).map(img => CONFIG.resolveImage(img));
        
        const processed = {
            id: (product.id || "").trim(),
            name: (product.name || "").trim(),
            price: parseFloat(product.price) || 0,
            category: (product.category || "").trim(),
            subcategory: (product.subcategory || "").trim(),
            niche: (product.niche || "baking").trim(),
            location: (product.location || "gauteng").trim(),
            description: (product.description || "").trim(),
            badge: (product.badge || "").trim(),
            image: resolvedImage,
            popupImages: resolvedPopupImages,
            imageFallback: CONFIG.fallbackImage,
            businessName: (product.businessName || CONFIG.businessName).trim(),
            businessLogo: CONFIG.resolveImage(product.businessLogo),
            whatsappNumber: (product.whatsappNumber || CONFIG.WHATSAPP_NUMBER).trim(),
            categorySlug: (product.category || "uncategorized").trim().toLowerCase().replace(/\s+/g, '-'),
            nicheSlug: (product.niche || "baking").trim().toLowerCase().replace(/\s+/g, '-'),
            locationSlug: (product.location || "gauteng").trim().toLowerCase().replace(/\s+/g, '-')
        };
        PRODUCTS_MAP.set(processed.id, processed);
        return processed;
    });

    // ✅ CRITICAL FIX: Expose to window so index.html can render them instantly!
    window.DOUGH_CO_PRODUCTS = PRODUCTS;
    window.DOUGHANDCO_DATA = PRODUCTS;
    window.HIVETIMES_DOUGHANDCO_PRODUCTS = PRODUCTS;
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
        this.dispatchEvent('doughco:cart:updated', { cart: this.items, addedProduct: product });
        return true;
    },
    async remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
        this.dispatchEvent('doughco:cart:updated', { cart: this.items });
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
        document.querySelectorAll('.cart-count, [data-cart-count], #cartCount').forEach(el => {
            if(el) el.textContent = count;
        });
        const total = this.getTotal();
        document.querySelectorAll('.cart-total, [data-cart-total], #cartTotal').forEach(el => {
            if(el) el.textContent = 'R' + total.toFixed(2);
        });
        if (typeof window.updateCartUI === 'function') window.updateCartUI(this.items);
    },
    dispatchEvent(name, detail) {
        try { document.dispatchEvent(new CustomEvent(name, { detail })); } catch(err) {}
    }
};

// 🛠️ Utility API
window.DoughCoProducts = {
    getAll: () => PRODUCTS,
    getById: (id) => PRODUCTS_MAP.get(id),
    getByCategory: (category) => PRODUCTS.filter(p => p.categorySlug === category.toLowerCase().replace(/\s+/g, '-')),
    getByLocation: (location) => PRODUCTS.filter(p => p.locationSlug === location.toLowerCase()),
    getByNiche: (niche) => PRODUCTS.filter(p => p.nicheSlug === niche.toLowerCase()),
    filter: (filters) => {
        return PRODUCTS.filter(p => {
            if (filters.category && p.categorySlug !== filters.category.toLowerCase().replace(/\s+/g, '-')) return false;
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
        return `<article class="product-card" data-id="${p.id}" data-category="${p.categorySlug}" data-price="${p.price}" data-name="${p.name}" data-description="${p.description}" data-image="${p.image}" onclick="openModal('${p.id}')" role="button" tabindex="0" style="cursor:pointer;"> 
            <div class="product-image-wrap"> 
                <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" class="product-image" onerror="this.src='${p.imageFallback}'"> 
                ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''} 
            </div> 
            <div class="product-info"> 
                <h3 class="product-name">${p.name}</h3> 
                <p class="product-description">${p.description}</p> 
                <div class="product-price">${priceDisplay}</div> 
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); DoughCoProducts.addToCart('${p.id}'); return false;"> 
                    ${btnText} 
                </button> 
            </div> 
        </article>`;
    },
    getWhatsAppLink: (product, phoneNumber) => {
        phoneNumber = phoneNumber || product.whatsappNumber || CONFIG.WHATSAPP_NUMBER;
        const priceStr = product.price > 0 ? `R${product.price.toFixed(2)}` : 'Price on Application';
        const msg = encodeURIComponent(`Hi ${product.businessName}! I'd like to order:\n\n🍪 *${product.name}*\n💰 Price: ${priceStr}\n\nPlease confirm availability.`);
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
        else document.dispatchEvent(new CustomEvent('doughco:modal:open', { detail: { productId } }));
    },
    getStatus: () => ({
        loaded: PRODUCTS.length > 0,
        count: PRODUCTS.length,
        error: loadError ? loadError.message : null,
        loading: isLoading
    })
};
window.DoughCoCart = Cart;

// 🚀 INITIALIZATION
(async function init() {
    Cart.init();
    
    // ✅ FIXED: Check for inline products injected by Apps Script
    const inlineData = window.DOUGH_CO_PRODUCTS;
    const hasInlineData = Array.isArray(inlineData) && inlineData.length > 0;
    
    if (hasInlineData) {
        processProducts(inlineData);
        setCachedProducts(inlineData);
        isLoading = false;
        console.log(`⚡ ${PRODUCTS.length} products loaded instantly from inline data (0 network requests)`);
        try {
            document.dispatchEvent(new CustomEvent('doughco:products:loaded', { detail: { products: PRODUCTS } }));
        } catch (err) {}
        setTimeout(() => backgroundRefresh(window.DOUGH_CO_PRODUCTS_HASH), 1500);
    } else {
        await fetchProducts();
        try {
            document.dispatchEvent(new CustomEvent('doughco:products:loaded', { detail: { products: PRODUCTS } }));
        } catch (err) {}
    }
    
    console.group('🍪 Dough & Co Products Initialized');
    console.log(`✅ ${PRODUCTS.length} products ready`);
    console.log(`🛒 Cart: ${Cart.getCount()} items`);
    console.groupEnd();
})();

// ========== 🚀 DYNAMIC PRODUCT SCHEMA GENERATION (SEO) ==========
function generateProductSchema() {
    if (PRODUCTS.length === 0) return;
    const productList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Dough & Co Product Catalog",
        "description": "Artisanal baked goods, butter biscuits, sugar cookies, almond rocca, tea cakes, rusks, and gift hampers from Dough & Co.",
        "numberOfItems": PRODUCTS.length,
        "itemListElement": PRODUCTS.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": product.name,
                "description": product.description,
                "image": product.image.startsWith('http') ? product.image : `https://doughandco.hivetimes.co.za${product.image}`,
                "sku": product.id,
                "brand": { "@type": "Brand", "name": "Dough & Co" },
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "ZAR",
                    "price": product.price > 0 ? product.price.toFixed(2) : "0",
                    "availability": product.price > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
                    "seller": { "@type": "Organization", "name": "Dough & Co" }
                }
            }
        }))
    };
    
    let schemaEl = document.getElementById('doughcoProductSchema') || document.getElementById('productSchema');
    if (!schemaEl) {
        schemaEl = document.createElement('script');
        schemaEl.type = 'application/ld+json';
        schemaEl.id = 'doughcoProductSchema';
        document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(productList);
}

document.addEventListener('doughco:products:loaded', () => setTimeout(generateProductSchema, 500));
document.addEventListener('DOMContentLoaded', () => {
    if (PRODUCTS.length > 0) setTimeout(generateProductSchema, 500);
});

})();