/**
🧁 Dainty Delicacies - Centralized Product Data & Utilities
📁 Recommended Path: /daintydelicacies/js/products.js
🔗 Usage: Include this exact script on BOTH Hive Times & DAINTY DELICACIES pages.
✅ Edit the RAW_PRODUCTS array below → Auto-syncs across all linked sites.
*/
(function () {
  // 📌 ASSET CONFIGURATION (Adjust if folder structure changes)
  const CONFIG = {
    basePath: "",
    imageDir: "/daintydelicacies/images",
    fallbackImage: "/daintydelicacies/images/daintydelicacies-logo.jpg",
    businessName: "Dainty Delicacies",
    businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
  };

  // 📦 RAW PRODUCT DATA - ✏️ EDIT THIS ARRAY TO UPDATE EVERYWHERE
  const RAW_PRODUCTS = [
    // === 🎂 MINI CAKES (category: "mini-cakes") ===
    { 
      id: "minicakes1", 
      name: "Chocolate & Vanilla Mini Cakes", 
      price: 17.00, 
      category: "mini-cakes",
      niche: "baking",              // ← ADDED for Hive Times filtering
      location: "cape-town",          // ← ADDED
      description: "Moist carrot cakes with cream cheese frosting.", 
      badge: "🥕 Popular",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    { 
      id: "minicakes2", 
      name: "Mini Carrot Cakes", 
      price: 17.00, 
      category: "mini-cakes", 
      niche: "baking",
      location: "cape-town",
      description: "Moist carrot cakes with cream cheese frosting.", 
      badge: "🥕 Popular",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    { 
      id: "minicakes3", 
      name: "Sweetie Pie Cupcakes", 
      price: 18.00, 
      category: "mini-cakes", 
      niche: "baking",
      location: "cape-town",
      description: "Adorable cupcakes perfect for any celebration.", 
      badge: "🧁 New",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    { 
      id: "minicakes4", 
      name: "Chocolate & Vanilla Drips", 
      price: 17.00, 
      category: "mini-cakes", 
      niche: "baking",
      location: "cape-town",
      description: "Beautiful drip cakes with chocolate and vanilla.", 
      badge: "🥕 Popular",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    { 
      id: "peanut-drip", 
      name: "Chocolate Peanut Drips", 
      price: 17.00, 
      category: "mini-cakes", 
      niche: "baking",
      location: "cape-town",
      description: "Rich chocolate with peanut butter drizzle.", 
      badge: "🥜 Fan Favorite",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    
    // === 🧁 MINI BUNDTS (category: "mini-bundts") ===
    { 
      id: "choc-bundts", 
      name: "Chocolate & Vanilla Bundts (No Cream)", 
      price: 16.00, 
      category: "mini-bundts", 
      niche: "baking",
      location: "cape-town",
      description: "Classic bundt cakes without cream.", 
      badge: "🍊 New",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    { 
      id: "vanilla-bundts", 
      name: "Vanilla Bundts with Cream", 
      price: 17.00, 
      category: "mini-bundts", 
      niche: "baking",
      location: "cape-town",
      description: "Delicious bundts topped with cream.", 
      badge: "🍊 New",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    { 
      id: "orange-bundt", 
      name: "Orange Bundt with Cream Cheese", 
      price: 16.00, 
      category: "mini-bundts", 
      niche: "baking",
      location: "cape-town",
      description: "Zesty orange bundt with cream cheese frosting and pistachio topping.", 
      badge: "🍊 New",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    
    // === 🪵 MINI LOGS (category: "mini-logs") ===
    { 
      id: "logs", 
      name: "Chocolate & Vanilla Logs (Ganache & Strawberry)", 
      price: 16.00, 
      category: "mini-logs", 
      niche: "baking",
      location: "cape-town",
      description: "Classic bundt cakes without cream.", 
      badge: "🍊 New",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    { 
      id: "vanilla-logs", 
      name: "Chocolate & Vanilla Logs (Full Toppings)", 
      price: 16.00, 
      category: "mini-logs", 
      niche: "baking",
      location: "cape-town",
      description: "With ganache, cream and toppings.", 
      badge: "🍊 New",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    
    // === 🎁 PROMO BOXES (category: "promo-boxes") ===
    { 
      id: "box6", 
      name: "Box of 6 Mini Carrot Cakes", 
      price: 100.00, 
      category: "promo-boxes", 
      niche: "baking",
      location: "cape-town",
      description: "Perfect gift box with 6 mini carrot cakes.", 
      badge: "🎁 Gift Ready",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    { 
      id: "box32", 
      name: "Box of 32 Cakes (Assorted)", 
      price: 570.00, 
      category: "promo-boxes", 
      niche: "baking",
      location: "cape-town",
      description: "8 mini cakes, 8 mini bundts, 8 mini logs, 8 mini drips.", 
      badge: "💰 Best Value",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
    { 
      id: "box24", 
      name: "Box of 24 Cakes (Mixed)", 
      price: 570.00, 
      category: "promo-boxes", 
      niche: "baking",
      location: "cape-town",
      description: "12 mini cakes & 12 mini bundts.", 
      badge: "💰 Best Value",
      businessName: "Dainty Delicacies",
      businessLogo: "/daintydelicacies/images/daintydelicacies-logo.jpg"
    },
  ];

  // 🔄 Process & Attach Metadata + Image Paths
  const PROCESSED = RAW_PRODUCTS.map(product => ({
    ...product,
    image: `${CONFIG.basePath}${CONFIG.imageDir}/${product.id}.jpg`,
    imageFallback: `${CONFIG.basePath}${CONFIG.fallbackImage}`,
    businessName: product.businessName || CONFIG.businessName,
    businessLogo: `${CONFIG.basePath}${product.businessLogo || CONFIG.businessLogo}`,
    categorySlug: product.category.trim().toLowerCase(),
    locationSlug: product.location?.trim().toLowerCase() || "gauteng",
    nicheSlug: product.niche?.trim().toLowerCase() || "baking"  // ← ADDED for filtering
  }));

  // 🌐 Global Export (Used by both websites)
  window.DAINTY_DELICACIES_PRODUCTS = PROCESSED;
  
  // 🔄 Backward compatibility for legacy scripts
  window.DAINTY_DATA = PROCESSED;

  // 🛠️ Utility API for both sites
  window.DaintyProducts = {
    getAll: () => window.DAINTY_DELICACIES_PRODUCTS,
    
    getById: (id) => window.DAINTY_DELICACIES_PRODUCTS.find(p => p.id === id),
    
    getByCategory: (category) => 
      window.DAINTY_DELICACIES_PRODUCTS.filter(p => p.categorySlug === category.toLowerCase()),
    
    getByLocation: (location) => 
      window.DAINTY_DELICACIES_PRODUCTS.filter(p => p.locationSlug === location.toLowerCase()),
    
    // 🎯 NEW: Filter by niche (e.g., "baking", "confectionery")
    getByNiche: (niche) => 
      window.DAINTY_DELICACIES_PRODUCTS.filter(p => p.nicheSlug === niche.toLowerCase()),
    
    // 🔄 NEW: Combined filter helper for advanced queries
    filter: ({ category, location, niche }) => {
      return window.DAINTY_DELICACIES_PRODUCTS.filter(p => {
        if (category && p.categorySlug !== category.toLowerCase()) return false;
        if (location && p.locationSlug !== location.toLowerCase()) return false;
        if (niche && p.nicheSlug !== niche.toLowerCase()) return false;
        return true;
      });
    },
    
    getImageUrl: (productId, useFallback = true) => {
      const product = window.DAINTY_DELICACIES_PRODUCTS.find(p => p.id === productId);
      return product ? product.image : (useFallback ? `${CONFIG.basePath}${CONFIG.fallbackImage}` : null);
    },
    
    // ✅ Enhanced renderCard with business branding, WhatsApp & niche data attributes
    renderCard: (p) => `
      <article class="product-card" 
               data-id="${p.id}" 
               data-category="${p.categorySlug}" 
               data-location="${p.locationSlug}"
               data-niche="${p.nicheSlug}">
        
        <!-- Business Header -->
        ${p.businessLogo ? `
          <div class="product-business">
            <img src="${p.businessLogo}" alt="${p.businessName} logo" class="business-logo" loading="lazy">
            <span class="business-name">${p.businessName}</span>
          </div>
        ` : ''}
        
        <!-- Optional Niche Badge (style via CSS) -->
        ${p.nicheSlug ? `<span class="product-niche-badge" style="display:none;">${p.nicheSlug}</span>` : ''}
        
        <!-- Product Image Container -->
        <div class="product-image-wrap">
          <img 
            src="${p.image}" 
            alt="${p.name}" 
            loading="lazy" 
            class="product-image"
            onerror="this.src='${p.imageFallback}'; this.alt='Product image unavailable'">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        </div>
        
        <!-- Product Details -->
        <div class="product-details">
          <h3 class="product-name" title="${p.name}">${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          
          <div class="product-footer">
            <span class="product-price">R${p.price.toFixed(2)}</span>
            <button 
              class="btn-add" 
              data-product-id="${p.id}"
              data-product-name="${p.name}"
              data-product-price="${p.price}"
              aria-label="Add ${p.name} to cart">
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    `,
    
    // 📱 WhatsApp deep-link helper (per your preference)
    getWhatsAppLink: (product, phoneNumber = "27123456789") => {
      const msg = encodeURIComponent(`Hi, I'd like to order: ${product.name} (R${product.price}) from ${product.businessName}`);
      return `https://wa.me/${phoneNumber}?text=${msg}`;
    }
  };

  // 📊 Dev Console Diagnostics (Remove in production)
  console.group("🧁 Dainty Delicacies Products Synced");
  console.log(`✅ ${PROCESSED.length} products loaded`);
  const grouped = {};
  PROCESSED.forEach(p => {
    grouped[p.categorySlug] = grouped[p.categorySlug] || [];
    grouped[p.categorySlug].push(p.name);
  });
  Object.entries(grouped).forEach(([cat, items]) => 
    console.log(`📁 ${cat}: ${items.length} item(s)`)
  );
  console.log(`🎯 Niche: "${PROCESSED[0]?.nicheSlug || 'baking'}" applied to all products`);
  console.groupEnd();
})();