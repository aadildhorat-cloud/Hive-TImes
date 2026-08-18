/**
👜 Bagit – Centralized Product Data & Utilities (ULTRA PERFORMANCE EDITION)
📁 Path: /js/products-bagit.js
✅ Affordable & quality handbags for every occasion – Boksburg, Johannesburg
*/
(function () {
'use strict';

// 🎛️ CONFIGURATION
const CONFIG = {
  // ⚠️ Optional: Google Apps Script deployment URL for sheet-driven stock
  SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbwlklRU-42Va4VnlonyRrxSF4qGlEysPelaoacudI-4mFheTYnwmoDC61K25tN0qRShUQ/exec",
  basePath: "",
  imageDir: "images",
  fallbackImage: "https://user16425.na.imgto.link/BagIt/20260817/image-11.avif",
  businessName: "BagIt",
  businessLogo: "https://user16425.na.imgto.link/BagIt/20260817/image-11.avif",
  CACHE_KEY: "bagit_products_cache",
  CART_KEY: "bagit_cart",
  CACHE_TTL: 10 * 60 * 1000, // 10 minutes
  WHATSAPP_NUMBER: "27723706786", // ⚠️ Replace with Bagit's WhatsApp number
  resolveImage: function (src) {
    if (!src) return CONFIG.fallbackImage;
    if (src.indexOf('http://') === 0 || src.indexOf('https://') === 0) return src;
    if (src.indexOf(CONFIG.basePath) === 0) return src;
    if (src.indexOf('/') === 0) return src;
    return CONFIG.basePath + CONFIG.imageDir + "/" + src;
  }
};

// 👜 STATIC FALLBACK DATA – Bagit Handbag Collection
const FALLBACK_PRODUCTS = [
  { id: "classic-tan", name: "Classic Tan 👜", price: 280.00, category: "Top Handle Bags", niche: "clothing", location: "boksburg",
    description: "Timeless tan top-handle bag with gold turn-lock hardware — the perfect everyday statement piece.",
    badge: "🔥 Best Seller", image: "images/products/classic-tan.jpg", popupImages: ["images/products/classic-tan.jpg"], active: true },
  { id: "black-barbie", name: "Black Barbie 😍", price: 280.00, category: "Top Handle Bags", niche: "clothing", location: "boksburg",
    description: "Chic structured black handbag with gold hardware. Bold, classy and ready for a night out.",
    badge: "🔥 Best Seller", image: "images/products/black-barbie.jpg", popupImages: ["images/products/black-barbie.jpg"], active: true },
  { id: "blue-babe", name: "Blue babe 🤔💙", price: 270.00, category: "Top Handle Bags", niche: "clothing", location: "boksburg",
    description: "Soft pastel-blue quilted handbag with gold clasp and charms. Sweet, dreamy and unique.",
    badge: "🆕 New Drop", image: "images/products/blue-babe.jpg", popupImages: ["images/products/blue-babe.jpg"], active: true },
  { id: "brown-and-white", name: "Brown & White 🤎🤍", price: 280.00, category: "Top Handle Bags", niche: "clothing", location: "boksburg",
    description: "Two-tone brown & white top-handle bag with gold detailing — pure elegance.",
    badge: "⭐ Premium", image: "images/products/brown-and-white.jpg", popupImages: ["images/products/brown-and-white.jpg"], active: true },
  { id: "brown-chanel", name: "Brown Chanel 🤎", price: 270.00, category: "Crossbody & Chain Bags", niche: "clothing", location: "boksburg",
    description: "Quilted brown chain bag with gold chain strap. A classic designer-look favourite.",
    badge: "🔥 Best Seller", image: "images/products/brown-chanel.jpg", popupImages: ["images/products/brown-chanel.jpg"], active: true },
  { id: "pink-barbie", name: "Pink Barbie 💗", price: 270.00, category: "Clutches & Evening Bags", niche: "clothing", location: "boksburg",
    description: "Vibrant pink croc-texture clutch. A playful pop of colour for parties and brunches.",
    badge: "✨ Popular", image: "images/products/pink-barbie.jpg", popupImages: ["images/products/pink-barbie.jpg"], active: true },
  { id: "grey-chic", name: "Grey Chic 🩶", price: 280.00, category: "Top Handle Bags", niche: "clothing", location: "boksburg",
    description: "Woven-texture grey handbag with gold clasp and charm. Understated, sophisticated style.",
    badge: "✨ Popular", image: "images/products/grey-chic.jpg", popupImages: ["images/products/grey-chic.jpg"], active: true },
  { id: "dior-bag", name: "Dior bag 💙", price: 280.00, category: "Tote Bags", niche: "clothing", location: "boksburg",
    description: "Light-blue quilted tote with signature charms. Roomy, luxe and oh-so pretty.",
    badge: "⭐ Premium", image: "images/products/dior-bag.jpg", popupImages: ["images/products/dior-bag.jpg"], active: true },
  { id: "working-girly", name: "Working girly 😊💻", price: 280.00, category: "Tote Bags", niche: "clothing", location: "boksburg",
    description: "Spacious beige tote with scarf accent — fits your laptop, your makeup and your hustle.",
    badge: "✨ Popular", image: "images/products/working-girly.jpg", popupImages: ["images/products/working-girly.jpg"], active: true },
  { id: "sexy-babe", name: "Sexy babe 💋🖤", price: 270.00, category: "Clutches & Evening Bags", niche: "clothing", location: "boksburg",
    description: "Sleek black pleated evening bag with gold hardware. After-dark perfection.",
    badge: "💰 Value", image: "images/products/sexy-babe.jpg", popupImages: ["images/products/sexy-babe.jpg"], active: true }
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
    if (Date.now() - data.timestamp > CONFIG.CACHE_TTL) { localStorage.removeItem(CONFIG.CACHE_KEY); return null; }
    return data.products;
  } catch (e) { return null; }
}
function setCachedProducts(products) {
  try { localStorage.setItem(CONFIG.CACHE_KEY, JSON.stringify({ products: products, timestamp: Date.now() })); } catch (e) {}
}

// 🔄 Fetch products with caching
async function fetchProducts(forceRefresh = false) {
  if (isLoading) {
    return new Promise(resolve => {
      const t = setInterval(() => { if (!isLoading) { clearInterval(t); resolve(PRODUCTS); } }, 50);
    });
  }
  isLoading = true;
  try {
    if (!forceRefresh) {
      const cached = getCachedProducts();
      if (cached && cached.length > 0) {
        console.log('⚡ Loaded Bagit products from cache (instant)');
        processProducts(cached); isLoading = false;
        setTimeout(() => backgroundRefresh(), 100);
        return PRODUCTS;
      }
    }
    if (!CONFIG.SHEETS_API_URL) {
      console.warn("⚠️ Using fallback data - SHEETS_API_URL not configured");
      processProducts(FALLBACK_PRODUCTS); isLoading = false; return PRODUCTS;
    }
    const url = CONFIG.SHEETS_API_URL + (CONFIG.SHEETS_API_URL.includes('?') ? '&' : '?') + 't=' + Date.now() + '&format=json';
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    const arr = Array.isArray(data) ? data : (data.products || []);
    processProducts(arr); setCachedProducts(arr);
    console.log('✅ Products loaded from Google Sheets');
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
    if (lastRawSnapshot === null) lastRawSnapshot = JSON.stringify(window.BAGIT_PRODUCTS || []);
    if (snapshot === lastRawSnapshot) return;
    lastRawSnapshot = snapshot;
    processProducts(arr); setCachedProducts(arr);
    console.log('🔄 Background refresh: newer product data found');
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
      category: (product.category || "Handbags").trim(),
      niche: (product.niche || "handbags").trim(),
      location: (product.location || "boksburg").trim(),
      description: (product.description || "").trim(),
      badge: (product.badge || "").trim(),
      image: CONFIG.resolveImage(product.image),
      popupImages: (Array.isArray(product.popupImages) ? product.popupImages : [product.popupImages]).map(img => CONFIG.resolveImage(img)),
      imageFallback: CONFIG.fallbackImage,
      businessName: (product.businessName || CONFIG.businessName).trim(),
      businessLogo: CONFIG.resolveImage(product.businessLogo),
      whatsappNumber: (product.whatsappNumber || CONFIG.WHATSAPP_NUMBER).trim(),
      categorySlug: (product.category || "handbags").trim().toLowerCase().replace(/\s+/g, '-')
    };
    PRODUCTS_MAP.set(processed.id, processed);
    return processed;
  });
  window.BAGIT_PRODUCTS = PRODUCTS;
  window.BAGIT_DATA = PRODUCTS;
  return PRODUCTS;
}

// 🛍️ CART SYSTEM ("Your Bag")
const Cart = {
  items: [],
  init() { try { this.items = JSON.parse(localStorage.getItem(CONFIG.CART_KEY) || '[]'); } catch (e) { this.items = []; } this.updateUI(); return this.items; },
  async add(productId, quantity = 1) {
    const product = PRODUCTS_MAP.get(productId); if (!product) return false;
    const existing = this.items.find(i => i.id === productId);
    if (existing) existing.quantity += quantity;
    else this.items.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: quantity, addedAt: Date.now() });
    this.save(); this.updateUI(); return true;
  },
  async remove(productId) { this.items = this.items.filter(i => i.id !== productId); this.save(); this.updateUI(); return true; },
  async updateQuantity(productId, quantity) {
    const item = this.items.find(i => i.id === productId); if (!item) return false;
    if (quantity <= 0) return await this.remove(productId);
    item.quantity = quantity; this.save(); this.updateUI(); return true;
  },
  async clear() { this.items = []; this.save(); this.updateUI(); return true; },
  save() { try { localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(this.items)); } catch (e) {} },
  getCount() { return this.items.reduce((s, i) => s + i.quantity, 0); },
  getTotal() { return this.items.reduce((s, i) => s + (i.price * i.quantity), 0); },
  updateUI() {
    const count = this.getCount();
    document.querySelectorAll('.cart-count').forEach(el => { el.textContent = count; });
    const total = 'ZAR ' + this.getTotal().toFixed(2);
    document.querySelectorAll('.cart-total').forEach(el => { el.textContent = total; });
    if (typeof window.updateCartUI === 'function') window.updateCartUI(this.items);
  }
};

// 🛠️ Public API
window.BagitProducts = {
  getAll: () => PRODUCTS,
  getById: (id) => PRODUCTS_MAP.get(id),
  getByCategory: (cat) => PRODUCTS.filter(p => p.categorySlug === cat.toLowerCase().replace(/\s+/g, '-')),
  getWhatsAppLink: (product, phoneNumber) => {
    phoneNumber = phoneNumber || product.whatsappNumber || CONFIG.WHATSAPP_NUMBER;
    const msg = encodeURIComponent('Hi Bagit! I\'d like to order:\n\n👜 *' + product.name + '*\n💰 Price: ZAR ' + product.price.toFixed(2) + '\n\nPlease confirm availability.');
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
window.BagitCart = Cart;
window.BAGIT_WHATSAPP = CONFIG.WHATSAPP_NUMBER;

// 🚀 INIT
(async function init() {
  Cart.init();
  const inlineData = window.BAGIT_PRODUCTS;
  if (Array.isArray(inlineData) && inlineData.length > 0) {
    processProducts(inlineData); setCachedProducts(inlineData);
    setTimeout(() => backgroundRefresh(), 1500);
  } else {
    await fetchProducts();
  }
  try { document.dispatchEvent(new CustomEvent('bagit:products:loaded', { detail: { products: PRODUCTS } })); } catch (e) {}
  console.log('👜 Bagit initialized – ' + PRODUCTS.length + ' products ready');
})();

// ==========  PRODUCT SCHEMA (SEO) ==========
function generateProductSchema() {
  if (PRODUCTS.length === 0) return;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Bagit Handbag Collection",
    "description": "Affordable and quality handbags for every occasion from Bagit, Boksburg, Johannesburg.",
    "numberOfItems": PRODUCTS.length,
    "itemListElement": PRODUCTS.map((p, i) => ({
      "@type": "ListItem", "position": i + 1,
      "item": {
        "@type": "Product", "name": p.name, "description": p.description, "sku": p.id,
        "image": p.image.startsWith('http') ? p.image : 'https://bagit.co.za/' + p.image,
        "brand": { "@type": "Brand", "name": "Bagit" },
        "offers": { "@type": "Offer", "priceCurrency": "ZAR", "price": p.price.toFixed(2), "availability": "https://schema.org/InStock", "seller": { "@type": "Organization", "name": "Bagit" } }
      }
    }))
  };
  let el = document.getElementById('bagitProductSchema');
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.id = 'bagitProductSchema'; document.head.appendChild(el); }
  el.textContent = JSON.stringify(schema);
}
document.addEventListener('bagit:products:loaded', () => setTimeout(generateProductSchema, 500));
})();