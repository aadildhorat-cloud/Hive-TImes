/**
🔥 Wadee's Braai Catering - Centralized Product Data & Utilities (ULTRA PERFORMANCE EDITION)
📁 Path: /js/products-wadees.js
✅ Premium marinated meats and braai catering products
*/
(function () {
'use strict';

// 🎛️ ADVANCED CONFIGURATION
const CONFIG = {
    // ⚠️ IMPORTANT: Replace with your Google Apps Script deployment URL
    SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbxi2MELZ3FA9g-YOk_FpNfaw2956v7as_U4aPduuDrOkgfV6GYnCb9CW9X4Gf-hXlxBkQ/exec",
    basePath: "",
    imageDir: "/images",
    fallbackImage: "/wadeesbraai/images/wadeesbraai-logo.jpg",
    businessName: "wadees-braai",
    businessLogo: "/wadeesbraai/images/wadeesbraai-logo.jpg",
    CACHE_KEY: "wadees_products_cache",
    CART_KEY: "wadees_cart",
    CACHE_TTL: 10 * 60 * 1000, // 10 minutes
    WHATSAPP_NUMBER: "27723706786",
    
    resolveImage: function(src) {
        if (!src) return CONFIG.fallbackImage;
        if (src.indexOf('http://') === 0 || src.indexOf('https://') === 0) return src;
        if (src.indexOf(CONFIG.basePath) === 0) return src;
        if (src.indexOf('/') === 0) return src;
        return CONFIG.basePath + CONFIG.imageDir + "/" + src;
    }
};

//  STATIC FALLBACK DATA (Marinated Meats from Wadee's Braai)
const FALLBACK_PRODUCTS = [
    { 
        id: "lamb-chops", 
        name: "Lamb Chops", 
        price: 210.00, 
        category: "Premium Steaks & Chops", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Premium marinated lamb chops, perfectly seasoned for the ultimate braai experience.", 
        badge: "🔥 Best Seller", 
        image: "/images/products/lamb-chops.jpg",
        popupImages: ["/images/products/lamb-chops.jpg"],
        businessName: "wadees-braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "min-steak", 
        name: "Min Steak", 
        price: 160.00, 
        category: "Premium Steaks & Chops", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Tender marinated min steak, perfect for a quick and delicious braai.", 
        badge: "✨ Popular", 
        image: "/images/products/min-steak.jpg",
        popupImages: ["/images/products/min-steak.jpg"],
        businessName: "wadees-braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "tbone-steak-hot", 
        name: "T-bone Steak (Hot)", 
        price: 160.00, 
        category: "Premium Steaks & Chops", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Spicy marinated T-bone steak with a fiery kick. HALAAL certified.", 
        badge: "🌶️ Spicy", 
        image: "/images/products/tbone-steak.jpg",
        popupImages: ["/images/products/tbone-steak.jpg"],
        businessName: "wadees-braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "beef-rashers", 
        name: "Beef Rashers (500g)", 
        price: 80.00, 
        category: "Premium Steaks & Chops", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Thinly sliced marinated beef rashers, 500g pack. Great for quick grilling.", 
        badge: "💰 Value", 
        image: "/images/products/beef-rashers.jpg",
        popupImages: ["/images/products/beef-rashers.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "aged-fillet-steak", 
        name: "Aged Fillet Steak (500g)", 
        price: 165.00, 
        category: "Premium Steaks & Chops", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Premium aged fillet steak, 500g pack. Tender and full of flavour.", 
        badge: "⭐ Premium", 
        image: "/images/products/aged-fillet.jpg",
        popupImages: ["/images/products/aged-fillet.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "wors", 
        name: "Wors (500g)", 
        price: 65.00, 
        category: "Wors & Sausages", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Traditional South African wors, 500g pack. A braai essential!", 
        badge: " Best Seller", 
        image: "/images/products/wors.jpg",
        popupImages: ["/images/products/wors.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "chicken-tikka", 
        name: "Chicken Tikka", 
        price: 120.00, 
        category: "Chicken Specialties", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Marinated chicken tikka with authentic spices. HALAAL certified.", 
        badge: "🔥 Best Seller", 
        image: "/images/products/chicken-tikka.jpg",
        popupImages: ["/images/products/chicken-tikka.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "spare-ribs", 
        name: "Spare Ribs", 
        price: 150.00, 
        category: "Premium Steaks & Chops", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Succulent marinated spare ribs, fall-off-the-bone tender.", 
        badge: "✨ Popular", 
        image: "/images/products/spare-ribs.jpg",
        popupImages: ["/images/products/spare-ribs.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "spicy-wings", 
        name: "Spicy Wings", 
        price: 120.00, 
        category: "Chicken Specialties", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Hot and spicy marinated chicken wings. Perfect for game day!", 
        badge: "️ Spicy", 
        image: "/images/products/spicy-wings.jpg",
        popupImages: ["/images/products/spicy-wings.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "chicken-fillet", 
        name: "Chicken Fillet", 
        price: 120.00, 
        category: "Chicken Specialties", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Tender marinated chicken fillets, versatile and delicious.", 
        badge: "✨ Popular", 
        image: "/images/products/chicken-fillet.jpg",
        popupImages: ["/images/products/chicken-fillet.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "garlic-polony", 
        name: "Garlic Polony", 
        price: 70.00, 
        category: "Wors & Sausages", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Flavourful garlic polony sausage. A braai favourite!", 
        badge: "💰 Value", 
        image: "/images/products/garlic-polony.jpg",
        popupImages: ["/images/products/garlic-polony.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "mutton-dhania-ssgs", 
        name: "Mutton Dhania Sausages", 
        price: 160.00, 
        category: "Wors & Sausages", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Premium mutton sausages with fresh dhania (coriander). HALAAL.", 
        badge: "⭐ Premium", 
        image: "/images/products/mutton-dhania.jpg",
        popupImages: ["/images/products/mutton-dhania.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "dhania-sausages-beef", 
        name: "Dhania Sausages (Beef) - Hot", 
        price: 150.00, 
        category: "Wors & Sausages", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Spicy beef sausages with fresh dhania. Packed with flavour!", 
        badge: "️ Spicy", 
        image: "/images/products/dhania-beef.jpg",
        popupImages: ["/images/products/dhania-beef.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "gourmet-chicken-kebabs", 
        name: "Gourmet Chicken Kebabs", 
        price: 140.00, 
        category: "Kebabs & Skewers", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Gourmet marinated chicken kebabs, ready for the grill.", 
        badge: "✨ Popular", 
        image: "/images/products/chicken-kebabs.jpg",
        popupImages: ["/images/products/chicken-kebabs.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "mutton-kebabs", 
        name: "Mutton Kebabs", 
        price: 160.00, 
        category: "Kebabs & Skewers", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Premium marinated mutton kebabs. Tender and flavourful.", 
        badge: "⭐ Premium", 
        image: "/images/products/mutton-kebabs.jpg",
        popupImages: ["/images/products/mutton-kebabs.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "beef-kebabs", 
        name: "Beef Kebabs", 
        price: 150.00, 
        category: "Kebabs & Skewers", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Marinated beef kebabs, perfect for a hearty braai.", 
        badge: "🔥 Best Seller", 
        image: "/images/products/beef-kebabs.jpg",
        popupImages: ["/images/products/beef-kebabs.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "skewers", 
        name: "Skewers", 
        price: 70.00, 
        category: "Kebabs & Skewers", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Colourful mixed meat and vegetable skewers. Fun and delicious!", 
        badge: "💰 Value", 
        image: "/images/products/skewers.jpg",
        popupImages: ["/images/products/skewers.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "beef-patties", 
        name: "Beef Patties (6 in a pack)", 
        price: 80.00, 
        category: "Patties", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Seasoned beef patties, pack of 6. Perfect for burgers or braai.", 
        badge: " Value", 
        image: "/images/products/beef-patties.jpg",
        popupImages: ["/images/products/beef-patties.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "mutton-patties", 
        name: "Mutton Patties (6)", 
        price: 85.00, 
        category: "Patties", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Premium mutton patties, pack of 6. HALAAL certified.", 
        badge: "✨ Popular", 
        image: "/images/products/mutton-patties.jpg",
        popupImages: ["/images/products/mutton-patties.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
        active: true
    },
    { 
        id: "sweet-chilli-sausages", 
        name: "Sweet Chilli Sausages", 
        price: 165.00, 
        category: "Wors & Sausages", 
        niche: "braai-catering", 
        location: "emmerentia", 
        description: "Delicious sweet chilli flavoured sausages. A unique braai treat!", 
        badge: "🔥 Best Seller", 
        image: "/images/products/sweet-chilli.jpg",
        popupImages: ["/images/products/sweet-chilli.jpg"],
        businessName: "Wadees-Braai",
        businessLogo: "/images/wadeesbraai-logo.jpg",
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
                console.log('⚡ Loaded Wadee\'s Braai products from cache (instant)');
                processProducts(cached);
                isLoading = false;
                setTimeout(() => backgroundRefresh(), 100);
                return PRODUCTS;
            }
        }

        if (!CONFIG.SHEETS_API_URL || CONFIG.SHEETS_API_URL === "" || CONFIG.SHEETS_API_URL.includes("YOUR_WADEES_DEPLOYMENT_ID")) {
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
    if (!CONFIG.SHEETS_API_URL || CONFIG.SHEETS_API_URL === "" || CONFIG.SHEETS_API_URL.includes("YOUR_WADEES_DEPLOYMENT_ID")) return;
    try {
        const url = CONFIG.SHEETS_API_URL + (CONFIG.SHEETS_API_URL.includes('?') ? '&' : '?') + 't=' + Date.now() + '&bg=1&format=json';
        const response = await fetch(url, { cache: 'no-cache' });
        const data = await response.json();
        const productsArray = Array.isArray(data) ? data : (data.products || []);
        if (!productsArray) return;

        const snapshot = JSON.stringify(productsArray);
        if (lastRawSnapshot === null) lastRawSnapshot = JSON.stringify(window.WADEES_BRAAI_PRODUCTS || []);
        
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
            niche: (product.niche || "braai-catering").trim(),
            location: (product.location || "emmerentia").trim(),
            description: (product.description || "").trim(),
            badge: (product.badge || "").trim(),
            image: resolvedImage,
            popupImages: resolvedPopupImages,
            imageFallback: CONFIG.fallbackImage,
            businessName: (product.businessName || CONFIG.businessName).trim(),
            businessLogo: CONFIG.resolveImage(product.businessLogo),
            whatsappNumber: (product.whatsappNumber || CONFIG.WHATSAPP_NUMBER).trim(),
            categorySlug: (product.category || "uncategorized").trim().toLowerCase().replace(/\s+/g, '-'),
            nicheSlug: (product.niche || "braai-catering").trim().toLowerCase().replace(/\s+/g, '-'),
            locationSlug: (product.location || "emmerentia").trim().toLowerCase().replace(/\s+/g, '-')
        };
        PRODUCTS_MAP.set(processed.id, processed);
        return processed;
    });

    // ✅ CRITICAL: Expose to window so index.html can render them instantly!
    window.WADEES_BRAAI_PRODUCTS = PRODUCTS;
    window.WADEES_DATA = PRODUCTS;
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
        this.dispatchEvent('wadees:cart:updated', { cart: this.items, addedProduct: product });
        return true;
    },
    async remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
        this.dispatchEvent('wadees:cart:updated', { cart: this.items });
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
window.WadeesBraaiProducts = {
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
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); WadeesBraaiProducts.addToCart('${p.id}'); return false;"> 
                    ${btnText} 
                </button> 
            </div> 
        </article>`;
    },
    getWhatsAppLink: (product, phoneNumber) => {
        phoneNumber = phoneNumber || product.whatsappNumber || CONFIG.WHATSAPP_NUMBER;
        const priceStr = product.price > 0 ? `R${product.price.toFixed(2)}` : 'Price on Application';
        const msg = encodeURIComponent(`Hi ${product.businessName}! I'd like to order:\n\n🔥 *${product.name}*\n💰 Price: ${priceStr}\n\nPlease confirm availability.`);
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
        else document.dispatchEvent(new CustomEvent('wadees:modal:open', { detail: { productId } }));
    },
    getStatus: () => ({
        loaded: PRODUCTS.length > 0,
        count: PRODUCTS.length,
        error: loadError ? loadError.message : null,
        loading: isLoading
    })
};
window.WadeesBraaiCart = Cart;

// 🚀 INITIALIZATION
(async function init() {
    Cart.init();
    
    // ✅ Check for inline products injected by Apps Script
    const inlineData = window.WADEES_BRAAI_PRODUCTS;
    const hasInlineData = Array.isArray(inlineData) && inlineData.length > 0;
    
    if (hasInlineData) {
        processProducts(inlineData);
        setCachedProducts(inlineData);
        isLoading = false;
        console.log(`⚡ ${PRODUCTS.length} products loaded instantly from inline data (0 network requests)`);
        try {
            document.dispatchEvent(new CustomEvent('wadees:products:loaded', { detail: { products: PRODUCTS } }));
        } catch (err) {}
        setTimeout(() => backgroundRefresh(window.WADEES_BRAAI_PRODUCTS_HASH), 1500);
    } else {
        await fetchProducts();
        try {
            document.dispatchEvent(new CustomEvent('wadees:products:loaded', { detail: { products: PRODUCTS } }));
        } catch (err) {}
    }
    
    console.group('🔥 Wadee\'s Braai Catering Products Initialized');
    console.log(`✅ ${PRODUCTS.length} products ready`);
    console.log(` Cart: ${Cart.getCount()} items`);
    console.groupEnd();
})();

// ========== 🚀 DYNAMIC PRODUCT SCHEMA GENERATION (SEO) ==========
function generateProductSchema() {
    if (PRODUCTS.length === 0) return;
    const productList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Wadee's Braai Product Catalog",
        "description": "Premium marinated meats, kebabs, wors, steaks, and braai catering products from Wadee's Braai Catering. All products HALAAL certified by SANHA.",
        "numberOfItems": PRODUCTS.length,
        "itemListElement": PRODUCTS.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": product.name,
                "description": product.description,
                "image": product.image.startsWith('http') ? product.image : `https://wadeesbraai.co.za${product.image}`,
                "sku": product.id,
                "brand": { "@type": "Brand", "name": "Wadee's Braai Catering" },
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "ZAR",
                    "price": product.price > 0 ? product.price.toFixed(2) : "0",
                    "availability": product.price > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
                    "seller": { "@type": "Organization", "name": "Wadee's Braai Catering" }
                }
            }
        }))
    };
    
    let schemaEl = document.getElementById('wadeesProductSchema') || document.getElementById('productSchema');
    if (!schemaEl) {
        schemaEl = document.createElement('script');
        schemaEl.type = 'application/ld+json';
        schemaEl.id = 'wadeesProductSchema';
        document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(productList);
}

document.addEventListener('wadees:products:loaded', () => setTimeout(generateProductSchema, 500));
document.addEventListener('DOMContentLoaded', () => {
    if (PRODUCTS.length > 0) setTimeout(generateProductSchema, 500);
});

})();