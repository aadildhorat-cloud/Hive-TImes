/**
 * 🍪 Dough & Co - Centralized Product Data & Utilities
 * 📁 Recommended Path: /doughandco/js/products.js
 * 🔗 Usage: Include this exact script on BOTH Hive Times & DOUGH & CO pages.
 * ✅ Edit the RAW_PRODUCTS array below → Auto-syncs across all linked sites.
 */
(function () {
  // 📌 ASSET CONFIGURATION (Adjust if folder structure changes)
  const CONFIG = {
    basePath: "",
    imageDir: "/doughandco/images",
    fallbackImage: "/images/logo.jpg",
    businessName: "Dough & Co",
    businessLogo: "/doughandco/images/dlogo.jpg"
  };

  // 📦 RAW PRODUCT DATA - ✏️ EDIT THIS ARRAY TO UPDATE EVERYWHERE
  const RAW_PRODUCTS = [
    // === 🍪 BUTTER BISCUITS (category: "butter-biscuits") ===
    { 
      id: "flake", 
      name: "Flake Butter Biscuits", 
      price: 125.00, 
      category: "butter-biscuits",
      niche: "baking",              // ← ADDED for Hive Times filtering
      type: "baking", 
      location: "gauteng",
      description: "Premium flake butter biscuits with layers of delicate, buttery goodness.",
      badge: "🔥 Best Seller",
      businessName: "Dough & Co",
      businessLogo: "/doughandco/images/logo.jpg"
    },
    { 
      id: "nuttyflakes", 
      name: "Nutty Flake Butter Biscuits", 
      price: 125.00, 
      category: "butter-biscuits", 
      niche: "baking",              // ← ADDED
      location: "gauteng",
      description: "Classic flake biscuits topped with roasted nuts for extra crunch.", 
      badge: "🔥 Best Seller",
      businessName: "Dough & Co",
      businessLogo: "/doughandco/images/logo.jpg"
    },
    { 
      id: "1kgassorted", 
      name: "Assorted Butter Biscuits", 
      price: 130.00, 
      category: "butter-biscuits", 
      niche: "baking",              // ← ADDED
      location: "gauteng",
      description: "A curated selection of our most popular butter biscuit flavours.", 
      badge: "✨ Value Pack",
      businessName: "Dough & Co",
      businessLogo: "/doughandco/images/logo.jpg"
    },
    { 
      id: "mintaero", 
      name: "Mint Aero Butter Biscuits", 
      price: 115.00, 
      category: "butter-biscuits", 
      niche: "baking",              // ← ADDED
      location: "gauteng",
      description: "Refreshing mint-infused butter biscuits with a light, airy texture.", 
      badge: "🔥 Best Seller",
      businessName: "Dough & Co",
      businessLogo: "/doughandco/images/logo.jpg"
    },
    { 
      id: "peppermint", 
      name: "Peppermint Butter Biscuits", 
      price: 115.00, 
      category: "butter-biscuits", 
      niche: "baking",              // ← ADDED
      location: "gauteng",
      description: "Classic peppermint flavour in a crisp, buttery biscuit base.", 
      badge: "🔥 Best Seller",
      businessName: "Dough & Co",
      businessLogo: "/doughandco/images/logo.jpg"
    },
    { 
      id: "diycookies", 
      name: "DIY Cookies", 
      price: 360.00, 
      category: "sugar-cookies", 
      niche: "baking",              // ← ADDED
      location: "gauteng",
      description: "Customize your own batch of delicious sugar cookies, R360 per kg.", 
      badge: "🔥 Best Seller",
      businessName: "Dough & Co",
      businessLogo: "/doughandco/images/logo.jpg"
    },
  
    // === 🌰 ALMOND ROCCA (category: "almond-rocca") ===
    { 
      id: "almondroca", 
      name: "Classic Almond Rocca", 
      price: 40.00, 
      category: "almond-rocca", 
      niche: "baking",              // ← ADDED
      location: "gauteng",
      description: "Fan-favourite toffee-almond clusters in a cute clear tin with handle.", 
      badge: "🎁 Gift Ready",
      businessName: "Dough & Co",
      businessLogo: "/doughandco/images/logo.jpg"
    }
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
  window.DOUGH_AND_CO_PRODUCTS = PROCESSED;
  
  // 🔄 Backward compatibility for legacy scripts
  window.DOUGHANDCO_DATA = PROCESSED;

  // 🛠️ Utility API for both sites
  window.DoughCoProducts = {
    getAll: () => window.DOUGH_AND_CO_PRODUCTS,
    
    getById: (id) => window.DOUGH_AND_CO_PRODUCTS.find(p => p.id === id),
    
    getByCategory: (category) => 
      window.DOUGH_AND_CO_PRODUCTS.filter(p => p.categorySlug === category.toLowerCase()),
    
    getByLocation: (location) => 
      window.DOUGH_AND_CO_PRODUCTS.filter(p => p.locationSlug === location.toLowerCase()),
    
    // 🎯 NEW: Filter by niche (e.g., "baking", "confectionery")
    getByNiche: (niche) => 
      window.DOUGH_AND_CO_PRODUCTS.filter(p => p.nicheSlug === niche.toLowerCase()),
    
    // 🔄 NEW: Combined filter helper for advanced queries
    filter: ({ category, location, niche }) => {
      return window.DOUGH_AND_CO_PRODUCTS.filter(p => {
        if (category && p.categorySlug !== category.toLowerCase()) return false;
        if (location && p.locationSlug !== location.toLowerCase()) return false;
        if (niche && p.nicheSlug !== niche.toLowerCase()) return false;
        return true;
      });
    },
    
    getImageUrl: (productId, useFallback = true) => {
      const product = window.DOUGH_AND_CO_PRODUCTS.find(p => p.id === productId);
      return product ? product.image : (useFallback ? `${CONFIG.basePath}${CONFIG.fallbackImage}` : null);
    },
    
    // ✅ Enhanced renderCard with business branding, WhatsApp & niche data attributes
    renderCard: (p) => `
      <article class="product-card" 
               data-id="${p.id}" 
               data-category="${p.categorySlug}" 
               data-location="${p.locationSlug}"
               data-niche="${p.nicheSlug}">  <!-- ← ADDED for Hive Times filtering -->
        
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
  console.group("🍪 Dough & Co Products Synced");
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