/**
🪣 Stashsell - Centralized Product Data & Utilities
📁 Path: /stashsell/products-stashsell.js
🔄 DYNAMIC MODE: Fetches from Google Sheets API
*/
(function () {
// 🎛️ CONFIGURATION
const CONFIG = {
    // ⚡ IMPORTANT: Replace the URL below with your ACTUAL deployed Apps Script URL
    // Example: "https://script.google.com/macros/s/AKfycbx.../exec?format=js"
    SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbwyvlDBc9GhiiwmLxqiNHqUz3eCoWWyhzgHmc_HbKJ5jEFr2uqX2UV9tnyfe02nz3QMSw/exec?format=js",
    
    basePath: "",
    imageDir: "/stashdell/images",
    fallbackImage: "/stashdell/images/stashdell-logo.jpg",
    businessName: "Stashsell",
    businessLogo: "/stashdell/images/stashdell-logo.jpg",
    
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
        id: "10l-boiler-bucket", 
        name: "10 L Boiler Bucket", 
        price: 49.99, 
        category: "boiler-buckets", 
        niche: "buckets", 
        location: "south-africa", 
        description: "Durable 10-liter boiler bucket perfect for industrial and commercial use", 
        badge: "💚 Popular",
        image: "images/10l-boiler-bucket.jpg" 
    },
    { 
        id: "20l-boiler-bucket", 
        name: "20 L Boiler Bucket", 
        price: 54.99, 
        category: "boiler-buckets", 
        niche: "buckets", 
        location: "south-africa", 
        description: "Heavy-duty 20-liter boiler bucket for demanding applications", 
        badge: "🔥 Best Seller",
        image: "images/20l-boiler-bucket.jpg" 
    },
    { 
        id: "5l-standard-bucket", 
        name: "5 L Standard Bucket", 
        price: 17.00, 
        category: "standard-buckets", 
        niche: "buckets", 
        location: "south-africa", 
        description: "Versatile 5-liter standard bucket for everyday household use", 
        badge: "💰 Budget Friendly",
        image: "images/5l-standard-bucket.jpg" 
    },
    { 
        id: "10l-bucket", 
        name: "10 L Bucket", 
        price: 22.99, 
        category: "standard-buckets", 
        niche: "buckets", 
        location: "south-africa", 
        description: "Reliable 10-liter bucket suitable for various applications", 
        badge: "",
        image: "images/10l-bucket.jpg" 
    },
    { 
        id: "20l-standard-bucket", 
        name: "20 L Standard Bucket", 
        price: 29.99, 
        category: "standard-buckets", 
        niche: "buckets", 
        location: "south-africa", 
        description: "Large capacity 20-liter standard bucket for heavy-duty tasks", 
        badge: "⭐ Value Pack",
        image: "images/20l-standard-bucket.jpg" 
    },
    { 
        id: "white-folding-chair", 
        name: "White Folding Chair", 
        price: 110.00, 
        category: "furniture", 
        niche: "furniture", 
        location: "south-africa", 
        description: "Sturdy white folding chair, perfect for events and extra seating", 
        badge: "🎯 Special",
        image: "images/white-folding-chair.jpg" 
    },
    { 
        id: "black-urban-chair", 
        name: "Black Urban Chair", 
        price: 38.00, 
        category: "furniture", 
        niche: "furniture", 
        location: "south-africa", 
        description: "Sturdy black urban chair, perfect for events and extra seating", 
        badge: "🎯 Special",
        image: "images/blackurbanchair.jpg" 
    },
    { 
        id: "uslite-electric-stove", 
        name: "UsLite Electric Stove", 
        price: 110.00, 
        category: "furniture", 
        niche: "furniture", 
        location: "south-africa", 
        description: "2000W electric stove, perfect for cooking and heating needs", 
        badge: "🎯 Special",
        image: "images/uslite-electric-stove.jpg" 
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
        if (window.STASHSELL_PRODUCTS && Array.isArray(window.STASHSELL_PRODUCTS)) {
            processProducts(window.STASHSELL_PRODUCTS);
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
window.STASHSELL_PRODUCTS = PRODUCTS;
// Add this line to make it compatible with Hive Times marketplace
window.STASHSELL_DATA = PRODUCTS;


return PRODUCTS;
}

// 🛠️ Utility API - Available globally
window.StashsellProducts = {
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
            "Hi! I'd like to order from Stashsell:\n\n" +
            "🪣 *" + product.name + "*\n" +
            "💰 Price: R" + product.price.toFixed(2) + "\n" +
            "📝 " + product.description + "\n\n" +
            "Please confirm availability. Thank you!"
        );
        return "https://wa.me/" + phoneNumber + "?text=" + msg;
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
    console.group("🪣 Stashsell Products Initialized");
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
            document.dispatchEvent(new CustomEvent('stashsell:products:loaded', {
                detail: { products: PRODUCTS }
            }));
        } catch(err) {
            // Fallback for older browsers
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('stashsell:products:loaded', true, true, { products: PRODUCTS });
            document.dispatchEvent(evt);
        }
    }
});
// Listen for products loaded from Google Sheets
document.addEventListener('DOMContentLoaded', () => {
    if (window.STASHSELL_PRODUCTS && window.STASHSELL_PRODUCTS.length > 0) {
        renderDynamicCategories();
    } else {
        document.addEventListener('stashsell:products:loaded', renderDynamicCategories);
    }
});

function renderDynamicCategories() {
    const products = window.STASHSELL_PRODUCTS || [];
    const container = document.getElementById('dynamicCategoriesContainer');
    const menuContainer = document.getElementById('dynamicMenuCategories');
    
    if (!products.length) return;
    
    // Group by category
    const categories = {};
    products.forEach(p => {
        const slug = p.categorySlug || 'uncategorized';
        if (!categories[slug]) categories[slug] = { slug, name: formatCategoryName(slug), icon: getCategoryIcon(slug), products: [] };
        categories[slug].products.push(p);
    });
    
    let sectionsHTML = '', menuHTML = '';
    Object.values(categories).forEach(cat => {
        sectionsHTML += `<section id="${cat.slug}"><h2 class="section-title"><i class="fas ${cat.icon}"></i>${cat.name}</h2><div class="products-grid">${cat.products.map(p => `<article class="product-card" onclick="openModal('${p.id}')"><div class="product-image-wrap"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}</div><div class="product-info"><h3 class="product-name">${p.name}</h3><p class="product-description">${p.description}</p><div class="product-price">R${p.price.toFixed(2)}</div><button class="add-to-cart-btn" onclick="event.stopPropagation();openModal('${p.id}')"><i class="fas fa-eye"></i> View Details</button></div></article>`).join('')}</div></section>`;
        menuHTML += `<div class="menu-item"><a href="#${cat.slug}" class="menu-link" onclick="scrollToSection('${cat.slug}')"><i class="fas ${cat.icon}"></i><span>${cat.name}</span></a></div>`;
    });
    
    container.innerHTML = sectionsHTML;
    menuContainer.innerHTML = menuHTML;
}

})();