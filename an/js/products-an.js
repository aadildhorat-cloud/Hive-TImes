/**
 🪣 AN - Centralized Product Data & Utilities
 📁 Path: /an/products-an.js
 🔄 DYNAMIC MODE: Fetches from Google Sheets API (JSON)
*/
(function () {
const CONFIG = {
    // ⚠️ IMPORTANT: Use the EXACT same URL that worked in your browser
    SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbxxuoRYa2qwzS0cqAbvJvK3AS-Q6_eefetP3rMi1XCvjj6n2Y_NwygUucrFeKxT9Qcn/exec", 
    basePath: "",
    imageDir: "/an/images",
    fallbackImage: "/an/images/an-logo.jpg",
    businessName: "AN Wholesalers and Retails",
    businessLogo: "/an/images/an-logo.jpg",

    resolveImage: function(src) {
        if (!src) return CONFIG.fallbackImage;
        if (src.indexOf('http') === 0 || src.indexOf('/') === 0) return src;
        return CONFIG.basePath + CONFIG.imageDir + "/" + src;
    }
};

// 📦 STATIC FALLBACK DATA
const FALLBACK_PRODUCTS = [
    { id: "super-b-25kg", name: "Super B 25kg", price: 187.99, category: "maize-meal", niche: "wholesale", location: "Johannesburg", description: "Super B maize meal 25kg bag", badge: "💚 Popular", image: "images/super-b-25kg.jpg" },
    { id: "dl-sugar-12-5kg", name: "DL Sugar 12.5kg", price: 217.99, category: "sugar", niche: "wholesale", location: "Johannesburg", description: "DL Brown Sugar 12.5kg", badge: "⭐ Value Pack", image: "images/dl-sugar-12-5kg.jpg" }
];

let PRODUCTS = [];
let isLoading = false;
let loadError = null;

function fetchProducts() {
    return new Promise(function(resolve) {
        if (!CONFIG.SHEETS_API_URL || CONFIG.SHEETS_API_URL.indexOf("YOUR_DEPLOYMENT_ID") !== -1) {
            console.warn("⚠️ SHEETS_API_URL not configured. Using fallback data.");
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
        
        // 🚀 FIX: Use fetch() with ?format=json to avoid browser script-blocking
        fetch(CONFIG.SHEETS_API_URL + '?format=json')
            .then(response => response.json())
            .then(data => {
                isLoading = false;
                if (data.products && Array.isArray(data.products) && data.products.length > 0) {
                    console.log("✅ Loaded " + data.products.length + " products from Sheets via JSON");
                    processProducts(data.products);
                } else {
                    console.warn("⚠️ API returned empty products. Using fallback.");
                    processProducts(FALLBACK_PRODUCTS);
                }
                resolve(PRODUCTS);
            })
            .catch(err => {
                isLoading = false;
                loadError = err;
                console.error("❌ Fetch error:", err);
                console.warn("⚠️ Failed to fetch from Sheets. Using fallback.");
                processProducts(FALLBACK_PRODUCTS);
                resolve(PRODUCTS);
            });
    });
}

function processProducts(rawProducts) {
    PRODUCTS = rawProducts.map(function(product) {
        return {
            id: product.id,
            name: product.name,
            price: parseFloat(product.price) || 0,
            category: product.category,
            niche: product.niche,
            location: product.location,
            description: product.description,
            badge: product.badge,
            image: CONFIG.resolveImage(product.image),
            popupImages: (product.popupImages || []).map(img => CONFIG.resolveImage(img)), // ✅ Gallery images for popup
            imageFallback: CONFIG.fallbackImage,
            businessName: product.businessName || CONFIG.businessName,
            businessLogo: CONFIG.businessLogo,
            categorySlug: (product.category || "").trim().toLowerCase(),
            nicheSlug: (product.niche || "general").trim().toLowerCase(),
            locationSlug: (product.location || "south-africa").trim().toLowerCase()
        };
    });
    window.AN_PRODUCTS = PRODUCTS;
    window.AN_DATA = PRODUCTS;
    return PRODUCTS;
}

// 🛠️ Utility API - Available globally (Matches Stashsell)
window.ANProducts = {
    getAll: function() { return PRODUCTS; },
    getById: function(id) { return PRODUCTS.find(p => p.id === id); },
    getByCategory: function(category) { 
        return PRODUCTS.filter(p => p.categorySlug === category.toLowerCase()); 
    },
    getByLocation: function(location) { 
        return PRODUCTS.filter(p => p.locationSlug === location.toLowerCase()); 
    },
    getByNiche: function(niche) { 
        return PRODUCTS.filter(p => p.nicheSlug === niche.toLowerCase()); 
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
    
    if (typeof document !== 'undefined' && document.dispatchEvent) {
        try {
            document.dispatchEvent(new CustomEvent('an:products:loaded', {
                detail: { products: PRODUCTS }
            }));
        } catch(err) {
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('an:products:loaded', true, true, { products: PRODUCTS });
            document.dispatchEvent(evt);
        }
    }
});

// Listen for products loaded from Google Sheets
document.addEventListener('DOMContentLoaded', () => {
    if (window.AN_PRODUCTS && window.AN_PRODUCTS.length > 0) {
        renderDynamicCategories();
    } else {
        document.addEventListener('an:products:loaded', renderDynamicCategories);
    }
});

function renderDynamicCategories() {
    const products = window.AN_PRODUCTS || [];
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
        sectionsHTML += `<section id="${cat.slug}"><h2 class="section-title"><i class="fas ${cat.icon}"></i> ${cat.name}</h2><div class="products-grid">${cat.products.map(p => `<article class="product-card" onclick="openProductModal('${p.id}')"><div class="product-image-wrap"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}</div><div class="product-info"><h3 class="product-name">${p.name}</h3><p class="product-description">${p.description}</p><div class="product-price">R${p.price.toFixed(2)}</div><button class="add-to-cart-btn" onclick="event.stopPropagation();openProductModal('${p.id}')"><i class="fas fa-eye"></i> View Details</button></div></article>`).join('')}</div></section>`;
        menuHTML += `<div class="menu-item"><a href="#${cat.slug}" class="menu-link" onclick="scrollToSection('${cat.slug}')"><i class="fas ${cat.icon}"></i><span>${cat.name}</span></a></div>`;
    });
    
    if (container) container.innerHTML = sectionsHTML;
    if (menuContainer) menuContainer.innerHTML = menuHTML;
}

// Helper functions
function formatCategoryName(slug) {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}


function getCategoryIcon(slug) {
    const icons = {
        'maize-meal': 'fa-bread-slice',
        'flour': 'fa-wheat-awn',
        'sugar': 'fa-cube',
        'rice': 'fa-bowl-rice',
        'cooking-oil': 'fa-bottle-droplet',
        'beans': 'fa-seedling',
        'soap': 'fa-soap',
        'frozen-meat': 'fa-snowflake',
        'wholesale': 'fa-boxes-stacked',
        'groceries': 'fa-cart-shopping'
    };
    return icons[slug] || 'fa-box';
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Fallback for modal if not defined in HTML
window.openProductModal = window.openProductModal || function(id) { 
    console.log('Opening modal for product:', id); 
};

})();