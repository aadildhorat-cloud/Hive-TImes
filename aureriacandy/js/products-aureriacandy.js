/**
🍓 Aureria Candy – Centralized Product Data & Utilities (ULTRA PERFORMANCE EDITION)
📁 Path: /js/products-aureriacandy.js
✅ Specially coated candy fruits – Crackly outside, juicy within. Customizable colours for events & gifts.
*/
(function () {
'use strict';

// 🎛️ CONFIGURATION
const CONFIG = {
  // ⚠️ Optional: Google Apps Script deployment URL for sheet-driven stock
  SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbwnEeL1AXswTjHhUBwEpkLey6GVzCnYAj4VZLTFx-HDeJudl443h-fpun6f7k8PKaA7/exec",
  basePath: "",
  imageDir: "images",
  fallbackImage: "https://raw.githubusercontent.com/aadildhorat-cloud/hive-times-assets/main/aureria-candy/images/logo.jpg",
  businessName: "Aureria Candy",
  businessLogo: "https://raw.githubusercontent.com/aadildhorat-cloud/hive-times-assets/main/aureria-candy/images/logo.jpg",
  CACHE_KEY: "aureria_products_cache",
  CART_KEY: "aureria_cart",
  CACHE_TTL: 10 * 60 * 1000, // 10 minutes
  WHATSAPP_NUMBER: "27793388849", // ⚠️ Replace with Aureria Candy's actual WhatsApp number
  resolveImage: function (src) {
    if (!src) return CONFIG.fallbackImage;
    if (src.indexOf('http://') === 0 || src.indexOf('https://') === 0) return src;
    if (src.indexOf(CONFIG.basePath) === 0) return src;
    if (src.indexOf('/') === 0) return src;
    return CONFIG.basePath + CONFIG.imageDir + "/" + src;
  }
};

// 🍓 STATIC FALLBACK DATA – Aureria Candy Collection
const FALLBACK_PRODUCTS = [
  { 
    id: "sherbet-delight-box", 
    name: "Sherbet Delight Box 🍓🍊", 
    price: 75.00, 
    category: "Sherbet Range", 
    niche: "candy", 
    location: "south africa",
    description: "6x Strawberry Sherbet & 6x Orange Sherbet. Classic crackly coated favourites made with fresh, juicy fruits.",
    badge: "🔥 Best Seller", 
    image: "images/products/sherbet-delight.jpg", 
    popupImages: ["images/products/sherbet-delight.jpg"], 
    active: true 
  },
  { 
    id: "bubblegum-bliss-box", 
    name: "Bubblegum Bliss Box 🫧💗", 
    price: 75.00, 
    category: "Bubblegum Range", 
    niche: "candy", 
    location: "south africa",
    description: "6x Strawberry Bubblegum & 6x Bubblegum Sherbet. Sweet, playful and loved by kids and grown-ups alike.",
    badge: "✨ Popular", 
    image: "images/products/bubblegum-bliss.jpg", 
    popupImages: ["images/products/bubblegum-bliss.jpg"], 
    active: true 
  },
  { 
    id: "sour-kick-box", 
    name: "Sour Kick Box 🍋😝", 
    price: 75.00, 
    category: "Sour Range", 
    niche: "candy", 
    location: "south africa",
    description: "6x Sour Strawberry Sherbet & 6x Sour Blue Raspberry Sherbet. For that perfect tangy kick!",
    badge: "🆕 New Drop", 
    image: "images/products/sour-kick.jpg", 
    popupImages: ["images/products/sour-kick.jpg"], 
    active: true 
  },
  { 
    id: "custom-mix-box", 
    name: "Custom Mix Box 🎨🍬", 
    price: 75.00, 
    category: "Custom Orders", 
    niche: "candy", 
    location: "south africa",
    description: "Pick ANY two flavours (6 + 6). Colors customizable to your suitings for weddings, birthdays & corporate events!",
    badge: "⭐ Premium", 
    image: "images/products/custom-mix.jpg", 
    popupImages: ["images/products/custom-mix.jpg"], 
    active: true 
  }
];

// 🌐 State
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
  } catch (e) { 
    return null; 
  }
}

function setCachedProducts(products) {
  try { 
    localStorage.setItem(CONFIG.CACHE_KEY, JSON.stringify({ products: products, timestamp: Date.now() })); 
  } catch (e) {}
}

// 🔄 Fetch products with caching
async function fetchProducts(forceRefresh = false) {
  if (isLoading) {
    return new Promise(resolve => {
      const t = setInterval(() => { 
        if (!isLoading) { 
          clearInterval(t); 
          resolve(PRODUCTS); 
        } 
      }, 50);
    });
  }
  isLoading = true;
  try {
    if (!forceRefresh) {
      const cached = getCachedProducts();
      if (cached && cached.length > 0) {
        console.log('⚡ Loaded Aureria Candy products from cache (instant)');
        processProducts(cached); 
        isLoading = false;
        setTimeout(() => backgroundRefresh(), 100);
        return PRODUCTS;
      }
    }
    if (!CONFIG.SHEETS_API_URL) {
      console.warn("⚠️ Using fallback data - SHEETS_API_URL not configured");
      processProducts(FALLBACK_PRODUCTS); 
      isLoading = false; 
      return PRODUCTS;
    }
    const url = CONFIG.SHEETS_API_URL + (CONFIG.SHEETS_API_URL.includes('?') ? '&' : '?') + 't=' + Date.now() + '&format=json';
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    const arr = Array.isArray(data) ? data : (data.products || []);
    processProducts(arr); 
    setCachedProducts(arr);
    console.log('✅ Aureria Candy products loaded from Google Sheets');
  } catch (error) {
    console.warn('⚠️ Failed to load from API, using fallback:', error.message);
    loadError = error;
    processProducts(FALLBACK_PRODUCTS);
  }
  isLoading = false;
  return PRODUCTS;
}

async function backgroundRefresh() {
  if (!CONFIG.SHEETS_API_URL) return;
  try {
    const url = CONFIG.SHEETS_API_URL + (CONFIG.SHEETS_API_URL.includes('?') ? '&' : '?') + 't=' + Date.now() + '&bg=1&format=json';
    const response = await fetch(url, { cache: 'no-cache' });
    const data = await response.json();
    const arr = Array.isArray(data) ? data : (data.products || []);
    if (!arr) return;
    const snapshot = JSON.stringify(arr);
    if (lastRawSnapshot === null) lastRawSnapshot = JSON.stringify(window.AURERIA_PRODUCTS || []);
    if (snapshot === lastRawSnapshot) return;
    lastRawSnapshot = snapshot;
    processProducts(arr); 
    setCachedProducts(arr);
    console.log('🔄 Background refresh: newer Aureria Candy product data found');
  } catch (e) {}
}

// 🔄 Process raw product data
function processProducts(rawProducts) {
  PRODUCTS_MAP = new Map();
  PRODUCTS = rawProducts.map(product => {
    const processed = {
      id: (product.id || "").trim(),
      name: (product.name || "").trim(),
      price: parseFloat(product.price) || 0,
      category: (product.category || "Candy Boxes").trim(),
      niche: (product.niche || "candy").trim(),
      location: (product.location || "south africa").trim(),
      description: (product.description || "").trim(),
      badge: (product.badge || "").trim(),
      image: CONFIG.resolveImage(product.image),
      popupImages: (Array.isArray(product.popupImages) ? product.popupImages : [product.popupImages]).map(img => CONFIG.resolveImage(img)),
      imageFallback: CONFIG.fallbackImage,
      businessName: (product.businessName || CONFIG.businessName).trim(),
      businessLogo: CONFIG.resolveImage(product.businessLogo),
      whatsappNumber: (product.whatsappNumber || CONFIG.WHATSAPP_NUMBER).trim(),
      categorySlug: (product.category || "candy-boxes").trim().toLowerCase().replace(/\s+/g, '-')
    };
    PRODUCTS_MAP.set(processed.id, processed);
    return processed;
  });
  window.AURERIA_PRODUCTS = PRODUCTS;
  window.AURERIA_DATA = PRODUCTS;
  window.AURERIA_CANDY_PRODUCTS = PRODUCTS; 
  return PRODUCTS;
}

// 🛍️ CART SYSTEM ("Your Candy Order")
const Cart = {
  items: [],
  init() { 
    try { 
      this.items = JSON.parse(localStorage.getItem(CONFIG.CART_KEY) || '[]'); 
    } catch (e) { 
      this.items = []; 
    } 
    this.updateUI(); 
    return this.items; 
  },
  async add(productId, quantity = 1) {
    const product = PRODUCTS_MAP.get(productId); 
    if (!product) return false;
    const existing = this.items.find(i => i.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image, 
        quantity: quantity, 
        addedAt: Date.now() 
      });
    }
    this.save(); 
    this.updateUI(); 
    return true;
  },
  async remove(productId) { 
    this.items = this.items.filter(i => i.id !== productId); 
    this.save(); 
    this.updateUI(); 
    return true; 
  },
  async updateQuantity(productId, quantity) {
    const item = this.items.find(i => i.id === productId); 
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
    try { 
      localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(this.items)); 
    } catch (e) {} 
  },
  getCount() { 
    return this.items.reduce((s, i) => s + i.quantity, 0); 
  },
  getTotal() { 
    return this.items.reduce((s, i) => s + (i.price * i.quantity), 0); 
  },
  updateUI() {
    const count = this.getCount();
    document.querySelectorAll('.cart-count').forEach(el => { 
      el.textContent = count; 
    });
    const total = 'R' + this.getTotal().toFixed(2);
    document.querySelectorAll('.cart-total').forEach(el => { 
      el.textContent = total; 
    });
    if (typeof window.updateCartUI === 'function') {
      window.updateCartUI(this.items);
    }
  }
};

// 🛠️ Public API
window.AureriaProducts = {
  getAll: () => PRODUCTS,
  getById: (id) => PRODUCTS_MAP.get(id),
  getByCategory: (cat) => PRODUCTS.filter(p => p.categorySlug === cat.toLowerCase().replace(/\s+/g, '-')),
  getWhatsAppLink: (product, phoneNumber) => {
    phoneNumber = phoneNumber || product.whatsappNumber || CONFIG.WHATSAPP_NUMBER;
    const msg = encodeURIComponent(`Hi Aureria Candy! I'd like to order:\n\n🍓 *${product.name}*\n💰 Price: R${product.price.toFixed(2)}\n\nPlease confirm availability and colour customisation options.`);
    return 'https://wa.me/' + phoneNumber + '?text=' + msg;
  },
  refresh: () => fetchProducts(true),
  addToCart: (id, q) => Cart.add(id, q),
  removeFromCart: (id) => Cart.remove(id),
  updateCartQuantity: (id, q) => Cart.updateQuantity(id, q),
  clearCart: () => Cart.clear(),
  getCartCount: () => Cart.getCount(),
  getCartTotal: () => Cart.getTotal(),
  getCartItems: () => Cart.items,
  getStatus: () => ({ loaded: PRODUCTS.length > 0, count: PRODUCTS.length, error: loadError ? loadError.message : null, loading: isLoading })
};

window.AureriaCart = Cart;
window.AURERIA_WHATSAPP = CONFIG.WHATSAPP_NUMBER;

// 🚀 INIT
(async function init() {
  Cart.init();
  const inlineData = window.AURERIA_PRODUCTS;
  if (Array.isArray(inlineData) && inlineData.length > 0) {
    processProducts(inlineData); 
    setCachedProducts(inlineData);
    setTimeout(() => backgroundRefresh(), 1500);
  } else {
    await fetchProducts();
  }
  try { 
    document.dispatchEvent(new CustomEvent('aureria:products:loaded', { detail: { products: PRODUCTS } })); 
  } catch (e) {}
  console.log('🍓 Aureria Candy initialized – ' + PRODUCTS.length + ' products ready');
})();

// ==========  PRODUCT SCHEMA (SEO) ==========
function generateProductSchema() {
  if (PRODUCTS.length === 0) return;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Aureria Candy Box Collection",
    "description": "Specially coated candy fruits made with fresh ingredients and the juiciest of fruits. R75 per box of twelve pieces, two flavours per box. Colors customizable to your suitings.",
    "numberOfItems": PRODUCTS.length,
    "itemListElement": PRODUCTS.map((p, i) => ({
      "@type": "ListItem", 
      "position": i + 1,
      "item": {
        "@type": "Product", 
        "name": p.name, 
        "description": p.description, 
        "sku": p.id,
        "image": p.image.startsWith('http') ? p.image : 'https://aureriacandy.co.za/' + p.image,
        "brand": { "@type": "Brand", "name": "Aureria Candy" },
        "offers": { 
          "@type": "Offer", 
          "priceCurrency": "ZAR", 
          "price": p.price.toFixed(2), 
          "availability": "https://schema.org/InStock", 
          "seller": { "@type": "Organization", "name": "Aureria Candy" } 
        }
      }
    }))
  };
  let el = document.getElementById('aureriaProductSchema');
  if (!el) { 
    el = document.createElement('script'); 
    el.type = 'application/ld+json'; 
    el.id = 'aureriaProductSchema'; 
    document.head.appendChild(el); 
  }
  el.textContent = JSON.stringify(schema);
}

document.addEventListener('aureria:products:loaded', () => setTimeout(generateProductSchema, 500));
})();