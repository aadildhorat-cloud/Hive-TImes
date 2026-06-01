/**
🪣 Stashsell - Centralized Product Data & Utilities
📁 Recommended Path: /stashsell/js/products-stashsell.js
🔗 Usage: Include this exact script on all Stashsell pages.
✅ Edit the RAW_PRODUCTS array below → Auto-syncs across all linked sites.
*/
(function () {
// 📌 ASSET CONFIGURATION
const CONFIG = {
    basePath: "",
    imageDir: "/stashdell/images",
    fallbackImage: "/stashdell/images/stashdell-logo.jpg",
    businessName: "Stashsell",
    businessLogo: "/stashdell/images/stashdell-logo.jpg",
    // Helper to resolve image paths (handles both absolute URLs and relative paths)
    resolveImage: (src) => {
        if (!src) return CONFIG.fallbackImage;
        // If already an absolute URL, return as-is
        if (src.startsWith('http://') || src.startsWith('https://')) {
            return src;
        }
        // If starts with /stashsell, already prefixed
        if (src.startsWith(CONFIG.basePath)) {
            return src;
        }
        // If starts with /, it's root-relative
        if (src.startsWith('/')) {
            return src;
        }
        // Otherwise, prepend basePath + imageDir
        return `${CONFIG.basePath}${CONFIG.imageDir}/${src}`;
    }
};

// 📦 RAW PRODUCT DATA - ✏️ EDIT THIS ARRAY TO UPDATE EVERYWHERE
const RAW_PRODUCTS = [
    // === 🏭 BOILER BUCKETS ===
    { 
        id: "10l-boiler-bucket", 
        name: "10 L Boiler Bucket", 
        price: 49.99, 
        category: "boiler-buckets", 
        niche: "buckets", 
        location: "south-africa", 
        description: "Durable 10-liter boiler bucket perfect for industrial and commercial use", 
        badge: "💚 Popular",
        businessName: "Stashsell", 
        businessLogo: "/stashdell/images/stashdell-logo.jpg", 
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
        businessName: "Stashsell", 
        businessLogo: "/stashsell/images/stashsell-logo.jpg", 
        image: "images/20l-boiler-bucket.jpg" 
    },
    { 
        id: "20l-dynamic-boiler-bucket", 
        name: "20 L Dynamic Boiler Bucket", 
        price: 55.99, 
        category: "boiler-buckets", 
        niche: "buckets", 
        location: "south-africa", 
        description: "Premium 20-liter dynamic boiler bucket with enhanced features", 
        badge: "✨ Premium", 
        businessName: "Stashsell", 
        businessLogo: "/stashsell/images/stashsell-logo.jpg", 
        image: "images/20l-dynamic-boiler-bucket.jpg" 
    },

    // === 🪣 STANDARD BUCKETS ===
    { 
        id: "5l-standard-bucket", 
        name: "5 L Standard Bucket", 
        price: 17.00, 
        category: "standard-buckets", 
        niche: "buckets", 
        location: "south-africa", 
        description: "Versatile 5-liter standard bucket for everyday household use", 
        badge: "💰 Budget Friendly", 
        businessName: "Stashsell", 
        businessLogo: "/stashsell/images/stashdell-logo.jpg", 
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
        businessName: "Stashsell", 
        businessLogo: "/stashsell/images/stashsell-logo.jpg", 
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
        businessName: "Stashsell", 
        businessLogo: "/stashsell/images/stashsell-logo.jpg", 
        image: "images/20l-standard-bucket.jpg" 
    },

    // === 🪑 FURNITURE ===
    { 
        id: "white-folding-chair", 
        name: "White Folding Chair", 
        price: 110.00, 
        category: "furniture", 
        niche: "furniture", 
        location: "south-africa", 
        description: "Sturdy white folding chair, perfect for events and extra seating", 
        badge: "🎯 Special", 
        businessName: "Stashsell", 
        businessLogo: "/stashsell/images/stashsell-logo.jpg", 
        image: "images/white-folding-chair.jpg" 
    }
];

// 🔄 Process & Attach Metadata
const PROCESSED = RAW_PRODUCTS.map(product => {
    const resolvedImage = CONFIG.resolveImage(product.image);
    return {
        ...product,
        image: resolvedImage,
        imageFallback: CONFIG.fallbackImage,
        businessName: product.businessName || CONFIG.businessName,
        businessLogo: CONFIG.businessLogo,
        categorySlug: product.category.trim().toLowerCase(),
        nicheSlug: product.niche?.trim().toLowerCase() || "buckets",
        locationSlug: product.location?.trim().toLowerCase() || "south-africa"
    };
});

// 🌐 Global Export
window.STASHSELL_PRODUCTS = PROCESSED;
window.STASHSELL_DATA = PROCESSED;

// 🛠️ Utility API
window.StashsellProducts = {
    getAll: () => window.STASHSELL_PRODUCTS,
    getById: (id) => window.STASHSELL_PRODUCTS.find(p => p.id === id),
    getByCategory: (category) => window.STASHSELL_PRODUCTS.filter(p => p.categorySlug === category.toLowerCase()),
    getByLocation: (location) => window.STASHSELL_PRODUCTS.filter(p => p.locationSlug === location.toLowerCase()),
    getByNiche: (niche) => window.STASHSELL_PRODUCTS.filter(p => p.nicheSlug === niche.toLowerCase()),
    filter: ({ category, location, niche }) => window.STASHSELL_PRODUCTS.filter(p => {
        if (category && p.categorySlug !== category.toLowerCase()) return false;
        if (location && p.locationSlug !== location.toLowerCase()) return false;
        if (niche && p.nicheSlug !== niche.toLowerCase()) return false;
        return true;
    }),
    renderCard: (p) => `
        <article class="product-card" 
                data-id="${p.id}" 
                data-category="${p.categorySlug}" 
                data-price="${p.price}"
                data-name="${p.name}"
                data-description="${p.description}"
                data-image="${p.image}"
                data-niche="${p.nicheSlug}"
                data-location="${p.locationSlug}">
            
            <div class="product-image-wrap" onclick="openProductModal('${p.id}')">
                <img 
                    src="${p.image}" 
                    alt="${p.name}" 
                    loading="lazy" 
                    class="product-image"
                    onerror="this.src='${p.imageFallback}'">
                ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            </div>
            
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <p class="product-description">${p.description}</p>
                <div class="product-price">R${p.price.toFixed(2)}</div>
                
                <button 
                    class="add-to-cart-btn" 
                    onclick="event.stopPropagation(); cart.addToCart({
                        id: '${p.id}', 
                        name: '${p.name}', 
                        price: ${p.price}, 
                        quantity: 1, 
                        image: '${p.image}',
                        businessName: '${p.businessName}',
                        businessLogo: '${p.businessLogo}'
                    }); showToast('✅ ${p.name} added to cart!');">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </article>
    `,
    getWhatsAppLink: (product, phoneNumber = "27676567587") => {
        const msg = encodeURIComponent(
            `Hi! I'd like to order from Stashsell:\n\n` +
            `🪣 *${product.name}*\n` +
            `💰 Price: R${product.price.toFixed(2)}\n` +
            `📝 ${product.description}\n\n` +
            `Please confirm availability. Thank you!`
        );
        return `https://wa.me/${phoneNumber}?text=${msg}`;
    }
};

// 📊 Dev Console
console.group("🪣 Stashsell Products Synced");
console.log(`✅ ${PROCESSED.length} products loaded`);
const grouped = {};
PROCESSED.forEach(p => {
    grouped[p.categorySlug] = grouped[p.categorySlug] || [];
    grouped[p.categorySlug].push(p.name);
});
Object.entries(grouped).forEach(([cat, items]) =>
    console.log(`📁 ${cat}: ${items.length} item(s)`)
);
console.groupEnd();
})();