/**
🧁 Bakenco - Centralized Product Data & Utilities (ULTRA PERFORMANCE EDITION)
📁 Path: /bakenco/js/products-bakenco.js
✅ FIXED: Removed all syntax errors, fixed template literals, and exposed window.BAKENCO_PRODUCTS.
*/
(function () {
'use strict';
// 🎛️ ADVANCED CONFIGURATION
const CONFIG = {
    SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbzdihEiRthAz1RjCIPBYxXWtQ7SJMLC1Hz8ZTEAHB_RPpg7Hp8_1Hq2uwvbokg6vyR0/exec",
    basePath: "",
    imageDir: "/bakenco/images",
    fallbackImage: "/bakenco/images/bakenco-logo.jpg",
    businessName: "Bakenco",
    businessLogo: "/bakenco/images/bakenco-logo.jpg",
    CACHE_KEY: "bakenco_products_cache",
    CART_KEY: "bakenco_cart",
    CACHE_TTL: 10 * 60 * 1000, // 10 minutes
    WHATSAPP_NUMBER: "27670527209",
    resolveImage: function(src) {
        if (!src) return CONFIG.fallbackImage;
        if (src.indexOf('http://') === 0 || src.indexOf('https://') === 0) return src;
        if (src.indexOf(CONFIG.basePath) === 0) return src;
        if (src.indexOf('/') === 0) return src;
        return CONFIG.basePath + CONFIG.imageDir + "/" + src;
    }
};

// 📦 STATIC FALLBACK DATA (used if API fails and no inline data)
const FALLBACK_PRODUCTS = [
    { id: "minicakes1", name: "Chocolate & Vanilla Mini Cakes", price: 17.00, category: "mini-cakes", niche: "baking", location: "cape-town", description: "Moist carrot cakes with cream cheese frosting.", badge: "🥕 Popular", image: "minicakes1.jpg" },
    { id: "minicakes2", name: "Mini Carrot Cakes", price: 17.00, category: "mini-cakes", niche: "baking", location: "cape-town", description: "Moist carrot cakes with cream cheese frosting.", badge: "🥕 Popular", image: "minicakes2.jpg" },
    { id: "minicakes3", name: "Sweetie Pie Cupcakes", price: 18.00, category: "mini-cakes", niche: "baking", location: "cape-town", description: "Adorable cupcakes perfect for any celebration.", badge: "🧁 New", image: "minicakes3.jpg" },
    { id: "minicakes4", name: "Chocolate & Vanilla Drips", price: 17.00, category: "mini-cakes", niche: "baking", location: "cape-town", description: "Beautiful drip cakes with chocolate and vanilla.", badge: "🥕 Popular", image: "minicakes4.jpg" },
    { id: "peanut-drip", name: "Chocolate Peanut Drips", price: 17.00, category: "mini-cakes", niche: "baking", location: "cape-town", description: "Rich chocolate with peanut butter drizzle.", badge: "🥜 Fan Favorite", image: "peanut-drip.jpg" },
    { id: "choc-bundts", name: "Chocolate & Vanilla Bundts (No Cream)", price: 16.00, category: "mini-bundts", niche: "baking", location: "cape-town", description: "Classic bundt cakes without cream.", badge: "🍊 New", image: "choc-bundts.jpg" },
    { id: "vanilla-bundts", name: "Vanilla Bundts with Cream", price: 17.00, category: "mini-bundts", niche: "baking", location: "cape-town", description: "Delicious bundts topped with cream.", badge: "🍊 New", image: "vanilla-bundts.jpg" },
    { id: "orange-bundt", name: "Orange Bundt with Cream Cheese", price: 16.00, category: "mini-bundts", niche: "baking", location: "cape-town", description: "Zesty orange bundt with cream cheese frosting and pistachio topping.", badge: "🍊 New", image: "orange-bundt.jpg" },
    { id: "logs", name: "Chocolate & Vanilla Logs (Ganache & Strawberry)", price: 16.00, category: "mini-logs", niche: "baking", location: "cape-town", description: "Classic log cakes with ganache and strawberry.", badge: "🍊 New", image: "logs.jpg" },
    { id: "vanilla-logs", name: "Chocolate & Vanilla Logs (Full Toppings)", price: 16.00, category: "mini-logs", niche: "baking", location: "cape-town", description: "With ganache, cream and toppings.", badge: "🍊 New", image: "vanilla-logs.jpg" },
    { id: "box6", name: "Box of 6 Mini Carrot Cakes", price: 100.00, category: "promo-boxes", niche: "baking", location: "cape-town", description: "Perfect gift box with 6 mini carrot cakes.", badge: "🎁 Gift Ready", image: "box6.jpg" },
    { id: "box32", name: "Box of 32 Cakes (Assorted)", price: 570.00, category: "promo-boxes", niche: "baking", location: "cape-town", description: "8 mini cakes, 8 mini bundts, 8 mini logs, 8 mini drips.", badge: "💰 Best Value", image: "box32.jpg" },
    { id: "box24", name: "Box of 24 Cakes (Mixed)", price: 570.00, category: "promo-boxes", niche: "baking", location: "cape-town", description: "12 mini cakes & 12 mini bundts.", badge: "💰 Best Value", image: "box24.jpg" }
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
                console.log('⚡ Loaded bakenco products from cache (instant)');
                processProducts(cached);
                isLoading = false;
                setTimeout(() => backgroundRefresh(), 100);
                return PRODUCTS;
            }
        }
        if (!CONFIG.SHEETS_API_URL || CONFIG.SHEETS_API_URL === "") {
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
    if (!CONFIG.SHEETS_API_URL || CONFIG.SHEETS_API_URL === "") return;
    try {
        const url = CONFIG.SHEETS_API_URL + (CONFIG.SHEETS_API_URL.includes('?') ? '&' : '?') + 't=' + Date.now() + '&bg=1&format=json';
        const response = await fetch(url, { cache: 'no-cache' });
        const data = await response.json();
        const productsArray = Array.isArray(data) ? data : (data.products || []);
        if (!productsArray) return;
        const snapshot = JSON.stringify(productsArray);
        if (lastRawSnapshot === null) lastRawSnapshot = JSON.stringify(window.BAKENCO_INLINE_PRODUCTS || window.BAKENCO_PRODUCTS || []);
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
        const resolvedPopupImages = (product.popupImages || product.popup_images || product.images || []).map(img => CONFIG.resolveImage(img));
        const processed = {
            id: (product.id || "").trim(),
            name: (product.name || "").trim(),
            price: parseFloat(product.price) || 0,
            category: (product.category || "").trim(),
            subcategory: (product.subcategory || "").trim(),
            niche: (product.niche || "baking").trim(),
            location: (product.location || "cape-town").trim(),
            description: (product.description || "").trim(),
            badge: (product.badge || "").trim(),
            image: resolvedImage,
            popupImages: resolvedPopupImages,
            imageFallback: CONFIG.fallbackImage,
            businessName: (product.businessName || CONFIG.businessName).trim(),
            businessLogo: CONFIG.businessLogo,
            whatsappNumber: (product.whatsappNumber || CONFIG.WHATSAPP_NUMBER).trim(),
            categorySlug: (product.category || "").trim().toLowerCase().replace(/\s+/g, '-'),
            nicheSlug: (product.niche || "baking").trim().toLowerCase().replace(/\s+/g, '-'),
            locationSlug: (product.location || "cape-town").trim().toLowerCase().replace(/\s+/g, '-')
        };
        PRODUCTS_MAP.set(processed.id, processed);
        return processed;
    });

    // ✅ CRITICAL FIX: Expose to window.BAKENCO_PRODUCTS so index.html can render them!
    window.BAKENCO_PRODUCTS = PRODUCTS;
    window.BAKENCO_DATA = PRODUCTS;
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
        this.dispatchEvent('bakenco:cart:updated', { cart: this.items, addedProduct: product });
        return true;
    },
    async remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
        this.dispatchEvent('bakenco:cart:updated', { cart: this.items });
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
            el.textContent = count;
        });
        const total = this.getTotal();
        document.querySelectorAll('.cart-total, [data-cart-total], #cartTotal').forEach(el => {
            el.textContent = 'R' + total.toFixed(2);
        });
        if (typeof window.updateCartUI === 'function') window.updateCartUI(this.items);
    },
    dispatchEvent(name, detail) {
        try { document.dispatchEvent(new CustomEvent(name, { detail })); } catch(err) {}
    }
};

// 🛠️ Utility API
window.BakencoProducts = {
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
        return `<article class="product-card" data-id="${p.id}" data-category="${p.categorySlug}" data-price="${p.price}" data-name="${p.name}" data-description="${p.description}" data-image="${p.image}" onclick="openProductModal('${p.id}')" role="button" tabindex="0" style="cursor:pointer;">
            <div class="product-image-wrap">
                <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" class="product-image" onerror="this.src='${p.imageFallback}'">
                ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <p class="product-description">${p.description}</p>
                <div class="product-price">${priceDisplay}</div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); BakencoProducts.addToCart('${p.id}'); return false;">
                    ${btnText}
                </button>
            </div>
        </article>`;
    },
    getWhatsAppLink: (product, phoneNumber) => {
        phoneNumber = phoneNumber || product.whatsappNumber || CONFIG.WHATSAPP_NUMBER;
        const priceStr = product.price > 0 ? `R${product.price.toFixed(2)}` : 'Price on Application';
        const msg = encodeURIComponent(`Hi ${product.businessName}! I'd like to order:\n\n🧁 *${product.name}*\n💰 Price: ${priceStr}\n\nPlease confirm availability.`);
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
        else document.dispatchEvent(new CustomEvent('bakenco:modal:open', { detail: { productId } }));
    },
    getStatus: () => ({
        loaded: PRODUCTS.length > 0,
        count: PRODUCTS.length,
        error: loadError ? loadError.message : null,
        loading: isLoading
    })
};
window.BakencoCart = Cart;

// 🚀 INITIALIZATION
(async function init() {
    Cart.init();
    // ✅ FIXED: Check for both BAKENCO_INLINE_PRODUCTS and BAKENCO_PRODUCTS
    const inlineData = window.BAKENCO_INLINE_PRODUCTS || window.BAKENCO_PRODUCTS;
    const hasInlineData = Array.isArray(inlineData) && inlineData.length > 0;
    if (hasInlineData) {
        processProducts(inlineData);
        setCachedProducts(inlineData);
        isLoading = false;
        console.log(`⚡ ${PRODUCTS.length} products loaded instantly from inline data (0 network requests)`);
        try {
            document.dispatchEvent(new CustomEvent('bakenco:products:loaded', { detail: { products: PRODUCTS } }));
        } catch (err) {}
        setTimeout(() => backgroundRefresh(window.BAKENCO_INLINE_PRODUCTS_HASH), 1500);
    } else {
        await fetchProducts();
        try {
            document.dispatchEvent(new CustomEvent('bakenco:products:loaded', { detail: { products: PRODUCTS } }));
        } catch (err) {}
    }
    console.group('🧁 Bakenco Products Initialized');
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
        "name": "Bakenco Product Catalog",
        "description": "Artisanal mini cakes, bundts, logs, and promo boxes from Bakenco.",
        "numberOfItems": PRODUCTS.length,
        "itemListElement": PRODUCTS.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": product.name,
                "description": product.description,
                "image": product.image.startsWith('http') ? product.image : `https://bakenco.co.za/${product.image}`,
                "sku": product.id,
                "brand": { "@type": "Brand", "name": "Bakenco" },
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "ZAR",
                    "price": product.price > 0 ? product.price.toFixed(2) : "0",
                    "availability": product.price > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
                    "seller": { "@type": "Organization", "name": "Bakenco" }
                }
            }
        }))
    };
    let schemaEl = document.getElementById('bakencoProductSchema');
    if (!schemaEl) {
        schemaEl = document.createElement('script');
        schemaEl.type = 'application/ld+json';
        schemaEl.id = 'bakencoProductSchema';
        document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(productList);
}

document.addEventListener('bakenco:products:loaded', () => setTimeout(generateProductSchema, 500));
document.addEventListener('DOMContentLoaded', () => {
    if (PRODUCTS.length > 0) setTimeout(generateProductSchema, 500);
});
})();