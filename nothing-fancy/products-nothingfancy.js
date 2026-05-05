/**
 * 🧻 Nothing Fancy - Centralized Product Data & Utilities
 * 📁 Path: /nothingfancy/js/products-nothing-fancy.js
 * 🔗 Usage: Include on both Hive Times & Nothing Fancy pages
 * ✅ Edit RAW_PRODUCTS array → Auto-syncs everywhere
 */
(function () {
  const CONFIG = {
    basePath: "/nothingfancy",
    imageDir: "/images",
    fallbackImage: "/images/nothing-fancy-logo.jpg",
    businessName: "Nothing Fancy",
    businessLogo: "/images/nothing-fancy-logo.jpg",
    contactPhone: "27710218554",
    contactEmail: "contact@nothingfancy.co.za",
    location: "johannesburg"
  };

  // 📦 RAW PRODUCT DATA - ✏️ EDIT HERE TO UPDATE EVERYWHERE
  const RAW_PRODUCTS = [
    // === 🧻 2-PLY TOILET PAPER (category: "2-ply") ===
    { 
      id: "48Pack-350sheets", 
      name: "Le Fleur 48-Pack 350 Sheets", 
      price: 275.00, 
      category: "2-ply",
      niche: "tissue",
      type: "toilet-paper",
      location: "johannesburg",
      description: "Premium 2-ply toilet paper, 350 sheets per roll, 48-pack bale. Soft, strong, and perfect for high-traffic environments.",
      badge: "🔥 Best Value",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/48pack-350sheets.jpg"
    },
    { 
      id: "18Pack-350Sheets-2ply", 
      name: "La Fleur 18-Pack 350 Sheets", 
      price: 105.00, 
      category: "2-ply",
      niche: "tissue",
      type: "toilet-paper",
      location: "johannesburg",
      description: "Soft 2-ply toilet paper, 350 sheets per roll. Ideal for homes, offices, and small businesses.",
      badge: "✨ Popular",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/18Pack-350Sheets-2ply.jpg"
    },
    { 
      id: "La-Fleur-18-Pack-350-Sheets(recycled-paper)", 
      name: "La Fleur 18-Pack 350 Sheets Recycled Paper", 
      price: 95.00, 
      category: "2-ply",
      niche: "tissue",
      type: "toilet-paper",
      location: "johannesburg",
      description: "Eco-friendly 2-ply toilet paper made from recycled paper. Gentle on skin and the planet.",
      badge: "🌱 Eco Choice",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/La-Fleur-18-Pack-350-Sheets(recycled-paper).jpg"
    },
    { 
      id: "La-Fleur-9-Pack-350-Sheets", 
      name: "La Fleur 9-Pack 350 Sheets", 
      price: 70.00, 
      category: "2-ply",
      niche: "tissue",
      type: "toilet-paper",
      location: "johannesburg",
      description: "Compact 9-pack of premium 2-ply toilet paper. Great for households or small offices.",
      badge: "",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/La-Fleur-9-Pack-350-Sheets.jpg"
    },
    { 
      id: "La-Fleur-4-Pack-350-Sheets", 
      name: "La Fleur 4-Pack 350 Sheets", 
      price: 40.00, 
      category: "2-ply",
      niche: "tissue",
      type: "toilet-paper",
      location: "johannesburg",
      description: "Convenient 4-pack of soft 2-ply toilet paper. Perfect for trial or emergency stock.",
      badge: "",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/La-Fleur-4-Pack-350-Sheets.jpg"
    },
    { 
      id: "plan-packaging-48-pack-200-sheets", 
      name: "Plain Packaging 48-Pack 200 Sheets", 
      price: 205.00, 
      category: "2-ply",
      niche: "tissue",
      type: "toilet-paper",
      location: "johannesburg",
      description: "Budget-friendly 2-ply toilet paper in plain packaging. 200 sheets per roll, 48-pack bale.",
      badge: "💰 Budget Pick",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/plan-packaging-48-pack-200-sheets.jpg"
    },
    { 
      id: "plan-packaging-30-pack-200-sheets", 
      name: "Plain Packaging 30-Pack 200 Sheets", 
      price: 125.00, 
      category: "2-ply",
      niche: "tissue",
      type: "toilet-paper",
      location: "johannesburg",
      description: "Affordable 2-ply toilet paper, 200 sheets per roll. Reliable quality for everyday use.",
      badge: "",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/plan-packaging-30-pack-200-sheets.jpg"
    },

    // === 📦 2-PLY BALES (category: "2-ply-bales") ===
    { 
      id: "Le-Fleur-18-Pack-350-Sheets-Bale-of-4-chocolate", 
      name: "Le Fleur 18-Pack 350 Sheets Bale of 4", 
      price: 405.00, 
      category: "2-ply-bales",
      niche: "household-essentials",
      type: "bulk",
      location: "johannesburg",
      description: "Bulk bale of 4 x Le Fleur 18-packs (72 rolls total). Perfect for retailers, schools, and offices.",
      badge: "🏢 Bulk Saver",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/Le-Fleur-18-Pack-350-Sheets-Bale-of-4-chocolate.jpg"
    },
    { 
      id: "Le-Fleur-18-Pack-350-Sheets-Bale-of-4-chocolate", 
      name: "Le Fleur 18-Pack Recycled Paper Bale of 4", 
      price: 365.00, 
      category: "2-ply-bales",
      niche: "household-essentials",
      type: "bulk",
      location: "johannesburg",
      description: "Eco-friendly bulk bale: 4 x 18-packs of recycled 2-ply toilet paper. Sustainable choice for large orders.",
      badge: "🌱 Eco Bulk",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/Le-Fleur-18-Pack-350-Sheets-Bale-of-4-chocolate.jpg"
    },
    { 
      id: "La-Fleur-9-Pack-350-Sheets", 
      name: "Le Fleur 9-Pack 350 Sheets Bale of 8", 
      price: 525.00, 
      category: "2-ply-bales",
      niche: "household-essentials",
      type: "bulk",
      location: "johannesburg",
      description: "Wholesale bale of 8 x Le Fleur 9-packs (72 rolls). Ideal for distributors and large facilities.",
      badge: "📦 Wholesale",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/La-Fleur-9-Pack-350-Sheets.jpg"
    },
    { 
      id: "La-Fleur-4-Pack-350-Sheets", 
      name: "Le Fleur 4-Pack 350 Sheets Bale of 12", 
      price: 450.00, 
      category: "2-ply-bales",
      niche: "household-essentials",
      type: "bulk",
      location: "johannesburg",
      description: "Bulk bale of 12 x Le Fleur 4-packs (48 rolls). Compact packaging for easy storage and distribution.",
      badge: "",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/La-Fleur-4-Pack-350-Sheets.jpg"
    },

    // === 📄 1-PLY TOILET PAPER (category: "1-ply") ===
    { 
      id: "1ply-virgin-paper-48pack-500-sheets", 
      name: "Virgin Paper 48-Pack 500 Sheets", 
      price: 225.00, 
      category: "1-ply",
      niche: "household-essentials",
      type: "toilet-paper",
      location: "johannesburg",
      description: "High-capacity 1-ply toilet paper made from virgin pulp. 500 sheets per roll, 48-pack bale.",
      badge: "💪 Heavy Duty",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/1ply-virgin-paper-48pack-500-sheets.jpg"
    },
    { 
      id: "recycled-paper-48-pack-500-sheets", 
      name: "Recycled Paper 48-Pack 500 Sheets", 
      price: 175.00, 
      category: "1-ply",
      niche: "household-essentials",
      type: "toilet-paper",
      location: "johannesburg",
      description: "Eco-conscious 1-ply toilet paper from recycled materials. 500 sheets per roll, 48-pack.",
      badge: "🌍 Green Choice",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/recycled-paper-48-pack-500-sheets.jpg"
    },
    { 
      id: "recycled-paper-48-pack-500-sheets(2nd-grade-paper)", 
      name: "Recycled Paper 48-Pack 500 Sheets 2nd Grade", 
      price: 125.00, 
      category: "1-ply",
      niche: "household-essentials",
      type: "toilet-paper",
      location: "johannesburg",
      description: "Budget 1-ply toilet paper from 2nd-grade recycled paper. Cost-effective solution for high-volume use.",
      badge: "💰 Economy",
      businessName: "Nothing Fancy",
      businessLogo: "/images-logo/nothing-fancy-logo.jpg",
      image: "/nothing-fancy/images/recycled-paper-48-pack-500-sheets(2nd-grade-paper).jpg"
    },

    // === 🧽 KITCHEN TOWELS (category: "kitchen-towels") ===
{ 
  id: "kt-nova-2-hq", 
  name: "Nova Brand 2-Pack High Quality", 
  price: 25.00, 
  category: "kitchen-towels",
  niche: "household-essentials",
  type: "kitchen",
  location: "johannesburg",
  description: "Premium 2-pack kitchen towels. Highly absorbent, strong when wet, perfect for home or commercial use.",
  badge: "⭐ Premium",
  businessName: "Nothing Fancy",
  businessLogo: "/images-logo/nothing-fancy-logo.jpg",
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65052.png"
},
{ 
  id: "kt-nova-2-sq", 
  name: "Nova Brand 2-Pack Standard Quality", 
  price: 20.00, 
  category: "kitchen-towels",
  niche: "household-essentials",
  type: "kitchen",
  location: "johannesburg",
  description: "Reliable standard-quality kitchen towels. Great value for everyday cleaning tasks.",
  badge: "",
  businessName: "Nothing Fancy",
  businessLogo: "/images-logo/nothing-fancy-logo.jpg",
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65053.png"
},
{ 
  id: "kt-nova-12-hq-bale2", 
  name: "Nova Brand 12-Pack High Quality Bale of 2", 
  price: 245.00, 
  category: "kitchen-towels",
  niche: "household-essentials",
  type: "bulk",
  location: "johannesburg",
  description: "Bulk bale of 2 x Nova 12-packs (24 rolls total). Premium kitchen towels for restaurants and offices.",
  badge: "🏢 Commercial",
  businessName: "Nothing Fancy",
  businessLogo: "/images-logo/nothing-fancy-logo.jpg",
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65054.png"
},
{ 
  id: "kt-nova-12-sq-bale2", 
  name: "Nova Brand 12-Pack Standard Quality Bale of 2", 
  price: 195.00, 
  category: "kitchen-towels",
  niche: "household-essentials",
  type: "bulk",
  location: "johannesburg",
  description: "Wholesale bale of standard kitchen towels. Cost-effective solution for high-volume cleaning needs.",
  badge: "💼 Value Bulk",
  businessName: "Nothing Fancy",
  businessLogo: "/images-logo/nothing-fancy-logo.jpg",
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65055.png"
},

// === 🏭 GARAGE ROLLS (category: "garage-rolls") ===
{ 
  id: "gr-super-wipes", 
  name: "Super Wipes 170mm 3.2kg 1500m", 
  price: 200.00, 
  category: "garage-rolls",
  niche: "household-essentials",
  type: "garage",
  location: "johannesburg",
  description: "Heavy-duty industrial garage roll. 170mm width, 3.2kg weight, 1500m length. Perfect for workshops and factories.",
  badge: "🔧 Industrial",
  businessName: "Nothing Fancy",
  businessLogo: "/images-logo/nothing-fancy-logo.jpg",
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65056.png"
},
{ 
  id: "gr-econo-wipes", 
  name: "Econo Wipes 160m Width 860m Length", 
  price: 170.00, 
  category: "garage-rolls",
  niche: "household-essentials",
  type: "garage",
  location: "johannesburg",
  description: "Economical garage roll for general cleaning. 160mm width, 860m length. Great for automotive and maintenance use.",
  badge: "💰 Budget Industrial",
  businessName: "Nothing Fancy",
  businessLogo: "/images-logo/nothing-fancy-logo.jpg",
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65057.png"
},
{ 
  id: "gr-standard-2.5kg", 
  name: "Standard Quality 160m Width 750m Length 2.5kg", 
  price: 125.00, 
  category: "garage-rolls",
  niche: "household-essentials",
  type: "garage",
  location: "johannesburg",
  description: "Standard garage roll for everyday workshop use. Reliable absorption and durability at an affordable price.",
  badge: "",
  businessName: "Nothing Fancy",
  businessLogo: "/images-logo/nothing-fancy-logo.jpg",
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65058.png"
},

// === 📦 OTHER ACCESSORIES (category: "other") ===
{ 
  id: "other-2ply-laminated-1pack", 
  name: "2-Ply Laminated Paper Towels 1-Pack 196mm x 125mm", 
  price: 85.00, 
  category: "other",
  niche: "household-essentials",
  type: "accessory",
  location: "johannesburg",
  description: "Premium laminated paper towels. 2-ply strength, 196mm x 125mm size. Ideal for food service and hospitality.",
  badge: "✨ Premium",
  businessName: "Nothing Fancy",
  businessLogo: "/images-logo/nothing-fancy-logo.jpg",
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65059.png"
},
{ 
  id: "other-2ply-laminated-6pack", 
  name: "2-Ply Laminated Paper Towels 6-Pack 196mm x 125mm", 
  price: 450.00, 
  category: "other",
  niche: "household-essentials",
  type: "accessory",
  location: "johannesburg",
  description: "Bulk pack of premium laminated paper towels. 6 packs for restaurants, cafes, and catering businesses.",
  badge: "🍽️ Food Service",
  businessName: "Nothing Fancy",
  businessLogo: "/images-logo/nothing-fancy-logo.jpg",
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65060.png"
},
{ 
  id: "other-garage-roll-stand", 
  name: "Garage Roll Stand", 
  price: 475.00, 
  category: "other",
  niche: "household-essentials",
  type: "accessory",
  location: "johannesburg",
  description: "Sturdy metal stand for garage rolls. Adjustable height, stable base. Essential for workshops and garages.",
  badge: "🛠️ Essential",
  businessName: "Nothing Fancy",
  businessLogo: "/images-logo/nothing-fancy-logo.jpg",
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65061.png"
},
{ 
  id: "other-toilet-holder-tr2", 
  name: "3 Toilet Rolls Holder TR2", 
  price: 285.00, 
  category: "other",
  niche: "household-essentials",
  type: "accessory",
  location: "johannesburg",
  description: "Wall-mounted holder for 3 toilet rolls. Durable construction, easy installation. Perfect for public restrooms.",
  badge: "",
  businessName: "Nothing Fancy",
  businessLogo: "/images/nothing-fancy-logo.jpg",
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65062.png"
}
  ];

  // 🔄 Process products with metadata + SMART image path handling
  const PROCESSED = RAW_PRODUCTS.map(product => ({
    ...product,
    // ✅ Smart image logic: external URL → absolute path → relative filename → fallback to ID
    image: product.image 
      ? (product.image.startsWith('http') || product.image.startsWith('/') 
          ? product.image 
          : `${CONFIG.basePath}${CONFIG.imageDir}/${product.image.replace(/^images\//, '')}`)
      : `${CONFIG.basePath}${CONFIG.imageDir}/${product.id.replace(/\s+/g, '-')}.jpg`,
    imageFallback: `${CONFIG.basePath}${CONFIG.fallbackImage}`,
    businessName: product.businessName || CONFIG.businessName,
    businessLogo: product.businessLogo 
      ? (product.businessLogo.startsWith('/') ? product.businessLogo : `${CONFIG.basePath}${product.businessLogo}`)
      : `${CONFIG.basePath}${CONFIG.businessLogo}`,
    categorySlug: product.category.trim().toLowerCase().replace(/\s+/g, '-'),
    locationSlug: product.location?.trim().toLowerCase() || "johannesburg",
    nicheSlug: product.niche?.trim().toLowerCase() || "tissue"
  }));

  // 🌐 Global Export
  window.NOTHING_FANCY_PRODUCTS = PROCESSED;
  window.NOTHINGFANCY_DATA = PROCESSED; // backward compatibility

  // 🛠️ Utility API
  window.NothingFancyProducts = {
    getAll: () => window.NOTHING_FANCY_PRODUCTS,
    getById: (id) => window.NOTHING_FANCY_PRODUCTS.find(p => p.id === id),
    getByCategory: (cat) => 
      window.NOTHING_FANCY_PRODUCTS.filter(p => p.categorySlug === cat.toLowerCase().replace(/\s+/g, '-')),
    getByNiche: (niche) => 
      window.NOTHING_FANCY_PRODUCTS.filter(p => p.nicheSlug === niche.toLowerCase()),
    getByLocation: (loc) => 
      window.NOTHING_FANCY_PRODUCTS.filter(p => p.locationSlug === loc.toLowerCase()),
    filter: ({ category, location, niche }) => {
      return window.NOTHING_FANCY_PRODUCTS.filter(p => {
        if (category && p.categorySlug !== category.toLowerCase().replace(/\s+/g, '-')) return false;
        if (location && p.locationSlug !== location.toLowerCase()) return false;
        if (niche && p.nicheSlug !== niche.toLowerCase()) return false;
        return true;
      });
    },
    getImageUrl: (id, fallback = true) => {
      const product = window.NOTHING_FANCY_PRODUCTS.find(p => p.id === id);
      return product ? product.image : (fallback ? `${CONFIG.basePath}${CONFIG.fallbackImage}` : null);
    },
    renderCard: (p) => `
      <article class="product-card" 
               data-id="${p.id}" 
               data-category="${p.categorySlug}" 
               data-location="${p.locationSlug}"
               data-niche="${p.nicheSlug}"
               data-price="${p.price}"
               data-name="${p.name}"
               data-description="${p.description}"
               data-image="${p.image}">
        ${p.businessLogo ? `
          <div class="product-business">
            <img src="${p.businessLogo}" alt="${p.businessName} logo" class="business-logo" loading="lazy">
            <span class="business-name">${p.businessName}</span>
          </div>
        ` : ''}
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-image-wrap">
          <img 
            src="${p.image}" 
            alt="${p.name}" 
            loading="lazy" 
            class="product-image"
            onerror="this.src='${p.imageFallback}'; this.alt='Product image unavailable'">
        </div>
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
    getWhatsAppLink: (product, phoneNumber = CONFIG.contactPhone) => {
      const msg = encodeURIComponent(`Hi from Hive Times! I'd like to order: ${product.name} (R${product.price}) from ${product.businessName}`);
      return `https://wa.me/${phoneNumber}?text=${msg}`;
    }
  };

  // 📊 Dev Console Diagnostics
  console.group("🧻 Nothing Fancy Products Synced");
  console.log(`✅ ${PROCESSED.length} products loaded`);
  const grouped = {};
  PROCESSED.forEach(p => {
    grouped[p.categorySlug] = grouped[p.categorySlug] || [];
    grouped[p.categorySlug].push(p.name);
  });
  Object.entries(grouped).forEach(([cat, items]) => 
    console.log(`📁 ${cat}: ${items.length} item(s)`)
  );
  console.log(`🎯 Location: "${PROCESSED[0]?.locationSlug || 'johannesburg'}" | Niche: "${PROCESSED[0]?.nicheSlug || 'tissue'}"`);
  console.groupEnd();
  window.NO_THING_FANCY_DATA = PROCESSED;
})();