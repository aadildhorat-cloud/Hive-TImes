/**
🍫 Bake & Co. - Centralized Product Data & Utilities
📁 Recommended Path: /bakenco/js/products-bakenco.js
🔗 Usage: Include this exact script on BOTH Hive Times & Bake & Co. pages.
✅ Edit the RAW_PRODUCTS array below → Auto-syncs across all linked sites.
*/
(function () {
  // 📌 ASSET CONFIGURATION
  const CONFIG = {
    basePath: "/bakenco",
    imageDir: "/images",
    fallbackImage: "/bakenco/images/bakenco-logo.jpg",
    businessName: "Bake & Co.",
    businessLogo: "/bakenco/images/bakenco-logo.jpg",
    // Helper to resolve image paths (handles both absolute URLs and relative paths)
    resolveImage: (src) => {
      if (!src) return CONFIG.fallbackImage;
      // If already an absolute URL, return as-is
      if (src.startsWith('http://') || src.startsWith('https://')) {
        return src;
      }
      // If starts with /bakenco, already prefixed
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
// === 🍣 DESSERT SUSHI COLLECTION ===
{ id: "biscoff-bliss-sushi", name: "Biscoff Bliss Sushi", price: 60.00, category: "dessert-sushi", niche: "food-beverages", location: "gauteng", description: "Soft crepes filled with rich brownie, topped with Biscoff drizzle. 3 pieces", badge: "✨ Popular",businessName: "Bake N Co", businessLogo: "/bakenco/images/bakenco-logo.jpg", image: "https://cdn.qwenlm.ai/output/238f3988-0a30-4fda-bc9e-3d3306192e15/image_gen/a75a4072-9aee-46c5-a2d1-cd4e7abc3b9f/1778165741.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiMjM4ZjM5ODgtMGEzMC00ZmRhLWJjOWUtM2QzMzA2MTkyZTE1IiwicmVzb3VyY2VfaWQiOiIxNzc4MTY1NzQxIiwicmVzb3VyY2VfY2hhdF9pZCI6IjI0OGM2ZDczLWZiOWUtNDEzZS1iODRmLThiOGU5YTdmM2M4ZSJ9.K3L2Kh-dAE1fsLOUOqQF-7_T2bXBeJbl7XqH0Uv6ECE&x-oss-process=image/resize,m_mfit,w_450,h_450" },
{ id: "chocolate-overload-sushi", name: "Chocolate Overload Sushi", price: 60.00, category: "dessert-sushi", niche: "food-beverages", location: "gauteng", description: "Brownie-filled crepes smothered in chocolate sauce. 3 pieces", badge: "🍫 Best Seller", image: "https://cdn.qwenlm.ai/output/238f3988-0a30-4fda-bc9e-3d3306192e15/image_gen/a75a4072-9aee-46c5-a2d1-cd4e7abc3b9f/1778165747.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiMjM4ZjM5ODgtMGEzMC00ZmRhLWJjOWUtM2QzMzA2MTkyZTE1IiwicmVzb3VyY2VfaWQiOiIxNzc4MTY1NzQ3IiwicmVzb3VyY2VfY2hhdF9pZCI6IjI0OGM2ZDczLWZiOWUtNDEzZS1iODRmLThiOGU5YTdmM2M4ZSJ9.Hx3piU29iKbVDPiCD8couOCrEYEybddtlH3UrfzkeoA&x-oss-process=image/resize,m_mfit,w_450,h_450" },
{ id: "bar-one-dream-sushi", name: "Bar One Dream Sushi", price: 65.00, category: "dessert-sushi", niche: "food-beverages", location: "gauteng", description: "Filled with brownie & topped with creamy Bar One sauce. 3 pieces", badge: "🔥 Hot", image: "https://cdn.qwenlm.ai/output/238f3988-0a30-4fda-bc9e-3d3306192e15/image_gen/a75a4072-9aee-46c5-a2d1-cd4e7abc3b9f/1778165752.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiMjM4ZjM5ODgtMGEzMC00ZmRhLWJjOWUtM2QzMzA2MTkyZTE1IiwicmVzb3VyY2VfaWQiOiIxNzc4MTY1NzUyIiwicmVzb3VyY2VfY2hhdF9pZCI6IjI0OGM2ZDczLWZiOWUtNDEzZS1iODRmLThiOGU5YTdmM2M4ZSJ9.OfUgTHUaHLBqxEGtApRL7e69Mw3VbJrk0bmZX6u_vkI" },
{ id: "oreo-crunch-sushi", name: "Oreo Crunch Sushi", price: 65.00, category: "dessert-sushi", niche: "food-beverages", location: "gauteng", description: "Brownie crepes topped with crushed Oreos & chocolate drizzle. 3 pieces", badge: "", image: "https://cdn.qwenlm.ai/output/238f3988-0a30-4fda-bc9e-3d3306192e15/image_gen/22aa912e-0495-49bb-96af-3ebe8f84bd7c/1778166381.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiMjM4ZjM5ODgtMGEzMC00ZmRhLWJjOWUtM2QzMzA2MTkyZTE1IiwicmVzb3VyY2VfaWQiOiIxNzc4MTY2MzgxIiwicmVzb3VyY2VfY2hhdF9pZCI6ImJkZDY5NDJmLTgzYWItNGY5Yi1iNjdhLWY0OGMyOWRlZWRiYSJ9.yiFK6yqG1aptZQlBtznxCddKHqf1X0_Aq3ZM2rlda-A" },
{ id: "nutella-fantasy-sushi", name: "Nutella Fantasy Sushi", price: 65.00, category: "dessert-sushi", niche: "food-beverages", location: "gauteng", description: "Creamy Nutella filled & drizzled to perfection. 3 pieces", badge: "✨ Premium", image: "https://cdn.qwenlm.ai/output/238f3988-0a30-4fda-bc9e-3d3306192e15/image_gen/22aa912e-0495-49bb-96af-3ebe8f84bd7c/1778166369.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiMjM4ZjM5ODgtMGEzMC00ZmRhLWJjOWUtM2QzMzA2MTkyZTE1IiwicmVzb3VyY2VfaWQiOiIxNzc4MTY2MzY5IiwicmVzb3VyY2VfY2hhdF9pZCI6ImJkZDY5NDJmLTgzYWItNGY5Yi1iNjdhLWY0OGMyOWRlZWRiYSJ9.E9uSimn5076zE0dFWvc7_X7Xdhnt80DAAFtB1nMtjJs" },
    // === 🍰 EXTRAS ===
    { id: "extra-sauce", name: "Extra Sauce (Chocolate/Biscoff/Bar One)", price: 10.00, category: "extras", niche: "food-beverages", location: "gauteng", description: "Add extra sauce to your order", badge: "", image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop" },
    { id: "crushed-toppings", name: "Crushed Toppings (Oreo/Biscoff)", price: 10.00, category: "extras", niche: "food-beverages", location: "gauteng", description: "Add crushed toppings to your order", badge: "", image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop" },

    // === 🍪 CRUMBLE COOKIES ===
    { id: "choc-chip-cookie", name: "Choc Chip Cookie", price: 18.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Classic chocolate chip cookie", badge: "🍪 Classic", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "smores-cookie", name: "Smores Cookie", price: 25.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Graham cracker, chocolate & marshmallow cookie", badge: "", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "red-velvet-cookie", name: "Red Velvet Cookie", price: 25.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Rich red velvet flavored cookie", badge: "❤️ Popular", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "nutella-stuffed-cookie", name: "Nutella Stuffed Cookie", price: 30.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Cookie stuffed with creamy Nutella", badge: "✨ Premium", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "death-by-chocolate", name: "Death By Chocolate", price: 35.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Ultimate chocolate lover's cookie", badge: "🍫 Best Seller", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "pink-sugar-cookie", name: "Pink Sugar Cookie", price: 20.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Sweet pink sugar cookie", badge: "", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "salted-caramel-cookie", name: "Salted Caramel Cookie", price: 30.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Salted caramel filled cookie", badge: "🔥 Hot", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "kinder-bueno-cookie", name: "Kinder Bueno Cookie", price: 35.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Kinder Bueno inspired cookie", badge: "✨ Premium", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "matcha-cookie", name: "Matcha Cookie", price: 25.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Green tea matcha flavored cookie", badge: "", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "churro-cookie", name: "Churro Cookie", price: 20.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Cinnamon churro inspired cookie", badge: "", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "m&m-cookie", name: "M&M Cookie", price: 20.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Cookie loaded with M&Ms", badge: "", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "smarties-cookie", name: "Smarties Cookie", price: 20.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Cookie loaded with Smarties", badge: "", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "birthday-cake-cookie", name: "Birthday Cake Cookie", price: 20.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Funfetti birthday cake cookie", badge: "🎂 Special", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "lemon-cream-cookie", name: "Lemon Cream Cookie", price: 20.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Zesty lemon cream cookie", badge: "", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "choc-chip-cookie-dough", name: "Choc Chip Cookie Dough", price: 25.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Edible chocolate chip cookie dough", badge: "", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "oreo-cookie", name: "Oreo Cookie", price: 25.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Oreo stuffed cookie", badge: "", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "confetti-cookie", name: "Confetti Cookie", price: 20.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Colorful confetti cookie", badge: "", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "pecan-pie-cookie", name: "Pecan Pie Cookie", price: 25.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Pecan pie inspired cookie", badge: "", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },
    { id: "biscoff-cookie", name: "Biscoff Cookie", price: 35.00, category: "crumble-cookies", niche: "food-beverages", location: "gauteng", description: "Lotus Biscoff flavored cookie", badge: "✨ Premium", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop" },

    // === 🍫 BROWNIES ===
    { id: "brookie", name: "Brookie", price: 20.00, category: "brownies", niche: "food-beverages", location: "gauteng", description: "Brownie cookie hybrid", badge: "", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop" },
    { id: "nutty-brownie", name: "Nutty Brownie", price: 25.00, category: "brownies", niche: "food-beverages", location: "gauteng", description: "Brownie loaded with nuts", badge: "", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop" },
    { id: "plain-brownie", name: "Plain Brownie", price: 20.00, category: "brownies", niche: "food-beverages", location: "gauteng", description: "Classic chocolate brownie", badge: "🍫 Classic", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop" },
    { id: "cookie-dough-brownie", name: "Cookie Dough Brownie", price: 25.00, category: "brownies", niche: "food-beverages", location: "gauteng", description: "Brownie topped with cookie dough", badge: "🔥 Hot", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop" }
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
      nicheSlug: product.niche?.trim().toLowerCase() || "food-beverages",
      locationSlug: product.location?.trim().toLowerCase() || "gauteng"
    };
  });

  // 🌐 Global Export
  window.BAKE_N_CO_PRODUCTS = PROCESSED;
  window.BAKENCO_DATA = PROCESSED;

  // 🛠️ Utility API
  window.BakeNCoProducts = {
    getAll: () => window.BAKE_N_CO_PRODUCTS,
    getById: (id) => window.BAKE_N_CO_PRODUCTS.find(p => p.id === id),
    getByCategory: (category) => window.BAKE_N_CO_PRODUCTS.filter(p => p.categorySlug === category.toLowerCase()),
    getByLocation: (location) => window.BAKE_N_CO_PRODUCTS.filter(p => p.locationSlug === location.toLowerCase()),
    getByNiche: (niche) => window.BAKE_N_CO_PRODUCTS.filter(p => p.nicheSlug === niche.toLowerCase()),
    filter: ({ category, location, niche }) => window.BAKE_N_CO_PRODUCTS.filter(p => {
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
    
    getWhatsAppLink: (product, phoneNumber = "27670527209") => {
      const msg = encodeURIComponent(
        `Hi! I'd like to order from Bake & Co.:\n\n` +
        `🍫 *${product.name}*\n` +
        `💰 Price: R${product.price.toFixed(2)}\n` +
        `📝 ${product.description}\n\n` +
        `Please confirm availability. Thank you!`
      );
      return `https://wa.me/${phoneNumber}?text=${msg}`;
    }
  };

  // 📊 Dev Console
  console.group("🍫 Bake & Co. Products Synced");
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