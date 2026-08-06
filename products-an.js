/**
🪣 AN - Centralized Product Data & Utilities
📁 Path: /an/products-an.js
🔄 DYNAMIC MODE: Fetches from Google Sheets API
*/
(function () {
// 🎛️ CONFIGURATION
const CONFIG = {
    SHEETS_API_URL: "https://script.google.com/macros/s/AKfycby0HsCmA3mYRVQJsRG54Y5rkUsMH1P3iPWMpf1HmTXnnrS1AkdqNfxWxXnylgcAn18s/exec",
    basePath: "",
    imageDir: "/an/images",
    fallbackImage: "/an/images/an-logo.jpg",
    businessName: "AN Wholesalers and Retails",
    businessLogo: "/an/images/an-logo.jpg",
    WHATSAPP_NUMBER: "27746234239",

    resolveImage: function(src) {
        if (!src) return CONFIG.fallbackImage;
        if (src.indexOf('http://') === 0 || src.indexOf('https://') === 0) return src;
        if (src.indexOf(CONFIG.basePath) === 0) return src;
        if (src.indexOf('/') === 0) return src;
        return CONFIG.basePath + CONFIG.imageDir + "/" + src;
    }
};

// 📦 STATIC FALLBACK DATA - Used if Sheets API fails
const FALLBACK_PRODUCTS = [
    { 
        id: "super-b-25kg", 
        name: "Super B 25kg", 
        price: 187.99, 
        category: "maize-meal", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Super B maize meal 25kg bag - premium quality", 
        badge: "💚 Popular",
        image: "images/super-b-25kg.jpg", 
        businessLogo: "/an/images/an-logo.jpg"
    },
    { 
        id: "super-b-12-5kg", 
        name: "Super B 12.5kg", 
        price: 92.99, 
        category: "maize-meal", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Super B maize meal 12.5kg bag", 
        badge: "🔥 Best Seller",
        image: "images/super-b-12-5kg.jpg" 
    },
    { 
        id: "shaya-25kg", 
        name: "Shaya 25kg", 
        price: 180.99, 
        category: "maize-meal", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Shaya maize meal 25kg - quality guaranteed", 
        badge: "⭐ Value Pack",
        image: "images/shaya-25kg.jpg" 
    },
    { 
        id: "shaya-12-5kg", 
        name: "Shaya 12.5kg", 
        price: 89.99, 
        category: "maize-meal", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Shaya maize meal 12.5kg bag", 
        badge: "",
        image: "images/shaya-12-5kg.jpg" 
    },
    { 
        id: "pride-praipap-12-5kg", 
        name: "Pride PraiPap 12.5kg", 
        price: 98.99, 
        category: "maize-meal", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Pride PraiPap instant maize meal 12.5kg", 
        badge: "🎯 Special",
        image: "images/pride-praipap.jpg" 
    },
    { 
        id: "golden-cake-flour-5kg", 
        name: "Golden Cake Flour 5kg", 
        price: 265.99, 
        category: "flour", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Golden Cake Flour 5kg - perfect for baking", 
        badge: "",
        image: "images/golden-cake-flour-5kg.jpg" 
    },
    { 
        id: "golden-cake-flour-12-5kg", 
        name: "Golden Cake Flour 12.5kg", 
        price: 128.99, 
        category: "flour", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Golden Cake Flour 12.5kg bulk pack", 
        badge: "💰 Budget Friendly",
        image: "images/golden-cake-flour-12-5kg.jpg" 
    },
    { 
        id: "farm-food-cake-flour-12-5kg", 
        name: "Farm Food Cake Flour 12.5kg", 
        price: 127.50, 
        category: "flour", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Farm Food Cake Flour 12.5kg", 
        badge: "",
        image: "images/farm-food-flour.jpg" 
    },
    { 
        id: "dl-sugar-12-5kg", 
        name: "DL Sugar 12.5kg", 
        price: 217.99, 
        category: "sugar", 
        niche: "groceries", 
        location: "south-africa", 
        description: "DL Brown Sugar 12.5kg bulk pack", 
        badge: "⭐ Value Pack",
        image: "images/dl-sugar-12-5kg.jpg" 
    },
    { 
        id: "dl-sugar-5kg", 
        name: "DL Sugar 5kg", 
        price: 88.99, 
        category: "sugar", 
        niche: "groceries", 
        location: "south-africa", 
        description: "DL Brown Sugar 5kg", 
        badge: "",
        image: "images/dl-sugar-5kg.jpg" 
    },
    { 
        id: "festive-rice-10kg", 
        name: "Festive Rice 10kg", 
        price: 89.99, 
        category: "rice", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Festive Rice 10kg - premium quality", 
        badge: "🔥 Best Seller",
        image: "images/festive-rice-10kg.jpg" 
    },
    { 
        id: "festive-rice-5kg", 
        name: "Festive Rice 5kg", 
        price: 51.99, 
        category: "rice", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Festive Rice 5kg bag", 
        badge: "💰 Budget Friendly",
        image: "images/festive-rice-5kg.jpg" 
    },
    { 
        id: "pan-oil-20l", 
        name: "Pan Oil 20L", 
        price: 565.99, 
        category: "cooking-oil", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Pan Palm Oil 20L bulk - best value", 
        badge: "⭐ Value Pack",
        image: "images/pan-oil-20l.jpg" 
    },
    { 
        id: "pan-oil-5l", 
        name: "Pan Oil 5L", 
        price: 134.99, 
        category: "cooking-oil", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Pan Palm Oil 5L", 
        badge: "",
        image: "images/pan-oil-5l.jpg" 
    },
    { 
        id: "pan-oil-2l", 
        name: "Pan Oil 2L", 
        price: 53.99, 
        category: "cooking-oil", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Pan Palm Oil 2L bottle", 
        badge: "",
        image: "images/pan-oil-2l.jpg" 
    },
    { 
        id: "valley-beans-10kg", 
        name: "Valley Beans 10kg", 
        price: 259.99, 
        category: "beans", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Valley Beans 10kg bulk pack", 
        badge: "",
        image: "images/valley-beans-10kg.jpg" 
    },
    { 
        id: "speko-rice-10kg", 
        name: "Speko Rice 10kg", 
        price: 125.99, 
        category: "rice", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Speko Rice 10kg - quality rice", 
        badge: "🎯 Special",
        image: "images/speko-rice-10kg.jpg" 
    },
    { 
        id: "white-star-12-5kg", 
        name: "White Star 12.5kg", 
        price: 109.99, 
        category: "maize-meal", 
        niche: "groceries", 
        location: "south-africa", 
        description: "White Star maize meal 12.5kg", 
        badge: "",
        image: "images/white-star-12-5kg.jpg" 
    },
    { 
        id: "sasko-12-5kg", 
        name: "Sasko 12.5kg", 
        price: 126.99, 
        category: "flour", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Sasko Cake Wheat Flour 12.5kg", 
        badge: "💚 Popular",
        image: "images/sasko-12-5kg.jpg" 
    },
    { 
        id: "tastic-rice-2kg", 
        name: "Tastic Rice 2kg", 
        price: 289.99, 
        category: "rice", 
        niche: "groceries", 
        location: "south-africa", 
        description: "Tastic Rice 2kg premium pack", 
        badge: "",
        image: "images/tastic-rice-2kg.jpg" 
    },
    { 
        id: "soap-back-10x1kg", 
        name: "Soap Back 10x1kg", 
        price: 259.99, 
        category: "soap", 
        niche: "household", 
        location: "south-africa", 
        description: "Goldi Soap Back 10x1kg bulk pack", 
        badge: "⭐ Value Pack",
        image: "images/soap-back-10x1kg.jpg" 
    },
    { 
        id: "head-feet-10x1kg", 
        name: "Head&Feet 10x1kg", 
        price: 120.99, 
        category: "chicken-parts", 
        niche: "frozen", 
        location: "south-africa", 
        description: "Goldi Chicken Heads & Feet 10x1kg", 
        badge: "🔥 Best Seller",
        image: "images/head-feet-10x1kg.jpg" 
    },
    { 
        id: "neck-10x1kg", 
        name: "Neck 10x1kg", 
        price: 265.99, 
        category: "chicken-parts", 
        niche: "frozen", 
        location: "south-africa", 
        description: "Goldi Frozen Chicken Necks 10x1kg", 
        badge: "",
        image: "images/neck-10x1kg.jpg" 
    },
    { 
        id: "mix-portions-6x2kg", 
        name: "Mix Portions 6x2kg", 
        price: 540.99, 
        category: "chicken-portions", 
        niche: "frozen", 
        location: "south-africa", 
        description: "Goldi Mixed Portions 6x2kg bulk", 
        badge: "⭐ Value Pack",
        image: "images/mix-portions-6x2kg.jpg" 
    }
];

// 🌐 State management
let PRODUCTS = [];
let isLoading = false;
let loadError = null;

// 🔄 Fetch products from Google Sheets
function fetchProducts() {
    return new Promise(function(resolve) {
        // Check if URL is still the placeholder
        if (!CONFIG.SHEETS_API_URL || CONFIG.SHEETS_API_URL.indexOf("YOUR_DEPLOYMENT_ID") !== -1) {
            console.warn("⚠️ Using fallback data - SHEETS_API_URL not configured");
            console.warn("🔧 Fix: Edit this file and replace SHEETS_API_URL with your actual Google Apps Script Web App URL");
            processProducts(FALLBACK_PRODUCTS);
            return resolve(PRODUCTS);
        }
        
        if (isLoading) {
            const checkLoaded = setInterval(function() {
                if (!isLoading) {
                    clearInterval(checkLoaded);
                    resolve(PRODUCTS);
                }
            }, 100);
            return;
        }
        
        isLoading = true;
        
        // Load as dynamic script (since Apps Script serves JS format)
        const script = document.createElement("script");
        // 📱 FIX: Add timestamp to prevent mobile browsers from caching old data
        script.src = CONFIG.SHEETS_API_URL + (CONFIG.SHEETS_API_URL.includes('?') ? '&' : '?') + 't=' + Date.now();
        script.onload = function() {
            console.log("✅ Products loaded from Google Sheets");
            isLoading = false;
            
            // 🔧 CRITICAL FIX: Process the loaded data into the internal PRODUCTS array
            if (window.AN_PRODUCTS && Array.isArray(window.AN_PRODUCTS)) {
                processProducts(window.AN_PRODUCTS);
            }
            
            resolve(PRODUCTS);
        };
        script.onerror = function() {
            console.warn("⚠️ Failed to load from Sheets, using fallback");
            isLoading = false;
            loadError = new Error("Script load failed");
            processProducts(FALLBACK_PRODUCTS);
            resolve(PRODUCTS);
        };
        document.head.appendChild(script);
    });
}

// 🔄 Process raw product data
function processProducts(rawProducts) {
    PRODUCTS = rawProducts.map(function(product) {
        const resolvedImage = CONFIG.resolveImage(product.image);

        // 🖼️ FIX: Resolve popup images URLs
        const resolvedPopupImages = (product.popupImages || []).map(function(img) {
            return CONFIG.resolveImage(img);
        });

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            niche: product.niche,
            location: product.location,
            description: product.description,
            badge: product.badge,
            image: resolvedImage,
            popupImages: resolvedPopupImages, // ✅ ADDED: Passes gallery to HTML
            imageFallback: CONFIG.fallbackImage,
            businessName: product.businessName || CONFIG.businessName,
            businessLogo: CONFIG.businessLogo,
            categorySlug: (product.category || "").trim().toLowerCase(),
            nicheSlug: (product.niche || "general").trim().toLowerCase(),
            locationSlug: (product.location || "south-africa").trim().toLowerCase()
        };
    });
    window.AN_PRODUCTS = PRODUCTS;
    // Add this line to make it compatible with Hive Times marketplace
    window.AN_DATA = PRODUCTS;

    return PRODUCTS;
}

// 🛠️ Utility API - Available globally
window.ANProducts = {
    getAll: function() { return PRODUCTS; },
    getById: function(id) { return PRODUCTS.find(function(p) { return p.id === id; }); },
    getByCategory: function(category) { 
        return PRODUCTS.filter(function(p) { return p.categorySlug === category.toLowerCase(); }); 
    },
    getByLocation: function(location) { 
        return PRODUCTS.filter(function(p) { return p.locationSlug === location.toLowerCase(); }); 
    },
    getByNiche: function(niche) { 
        return PRODUCTS.filter(function(p) { return p.nicheSlug === niche.toLowerCase(); }); 
    },
    filter: function(filters) {
        return PRODUCTS.filter(function(p) {
            if (filters.category && p.categorySlug !== filters.category.toLowerCase()) return false;
            if (filters.location && p.locationSlug !== filters.location.toLowerCase()) return false;
            if (filters.niche && p.nicheSlug !== filters.niche.toLowerCase()) return false;
            return true;
        });
    },
    renderCard: function(p) {
        return '<article class="product-card" ' +
                'data-id="' + p.id + '" ' +
                'data-category="' + p.categorySlug + '" ' +
                'data-price="' + p.price + '" ' +
                'data-name="' + p.name + '" ' +
                'data-description="' + p.description + '" ' +
                'data-image="' + p.image + '" ' +
                'data-niche="' + p.nicheSlug + '" ' +
                'data-location="' + p.locationSlug + '">' +
            
            '<div class="product-image-wrap">' +
                '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" class="product-image" onerror="this.src=\'' + p.imageFallback + '\'">' +
                (p.badge ? '<span class="product-badge">' + p.badge + '</span>' : '') +
            '</div>' +
            
            '<div class="product-info">' +
                '<h3 class="product-name">' + p.name + '</h3>' +
                '<p class="product-description">' + p.description + '</p>' +
                '<div class="product-price">R' + p.price.toFixed(2) + '</div>' +
                
                '<button class="add-to-cart-btn" onclick="event.stopPropagation(); openProductModal(\'' + p.id + '\'); return false;">' +
                    '<i class="fas fa-eye"></i> View Details' +
                '</button>' +
            '</div>' +
        '</article>';
    },
    getWhatsAppLink: function(product, phoneNumber) {
        phoneNumber = phoneNumber || "27676567587";
        const msg = encodeURIComponent(
            "Hi! I'd like to order from AN Wholesalers and Retails:\n\n" +
            "🪣 *" + product.name + "*\n" +
            "💰 Price: R" + product.price.toFixed(2) + "\n" +
            "📝 " + product.description + "\n\n" +
            "Please confirm availability. Thank you!"
        );
        return "https://wa.me/27746234239?text=" + msg;
    },
    refresh: fetchProducts,
    getStatus: function() {
        return {
            loaded: PRODUCTS.length > 0,
            count: PRODUCTS.length,
            error: loadError ? loadError.message : null,
            loading: isLoading
        };
    }
};

// 🚀 Auto-initialize when script loads
fetchProducts().then(function() {
    console.group("🪣 AN Products Initialized");
    console.log("✅ " + PRODUCTS.length + " products ready");
    
    if (PRODUCTS.length > 0) {
        const grouped = {};
        PRODUCTS.forEach(function(p) {
            grouped[p.categorySlug] = grouped[p.categorySlug] || [];
            grouped[p.categorySlug].push(p.name);
        });
        Object.keys(grouped).forEach(function(cat) {
            console.log("📁 " + cat + ": " + grouped[cat].length + " item(s)");
        });
    } else {
        console.warn("⚠️ No products loaded - check FALLBACK_PRODUCTS or Google Sheets connection");
    }
    console.groupEnd();
    
    // Dispatch event so your HTML can listen and render products
    if (typeof document !== 'undefined' && document.dispatchEvent) {
        try {
            document.dispatchEvent(new CustomEvent('an:products:loaded', {
                detail: { products: PRODUCTS }
            }));
        } catch(err) {
            // Fallback for older browsers
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('an:products:loaded', true, true, { products: PRODUCTS });
            document.dispatchEvent(evt);
        }
    }
});



})()