/**
🥩 Butcher Block - Centralized Product Data & Utilities
📁 Recommended Path: /butcherblock/js/products.js
🔗 Usage: Include this exact script on BOTH Butcher Block & Hive Times pages.
✅ Edit the RAW_PRODUCTS array below → Auto-syncs across all linked sites.
*/
(function () {
// 📌 ASSET CONFIGURATION (Adjust if folder structure changes)
const CONFIG = {
  basePath: "",
  imageDir: "/butcherblock/images",
  fallbackImage: "/butcherblock/images/placeholder-meat.jpg",
  businessName: "Butcher Block",
  businessLogo: "/butcherblock/images/butcherblock-logo.jpg"
};

// 📦 RAW PRODUCT DATA - ✏️ EDIT THIS ARRAY TO UPDATE EVERYWHERE
const RAW_PRODUCTS = [
  // === BULK SALES ===
  { id: "forequarter-a-grade-500kg", name: "Forequarter A Grade", price: 0.00, category: "bulk-sales", niche: "meat", location: "mpumalanga", description: "Premium A-grade beef forequarter, ideal for bulk processing and commercial use. 500kg minimum order.", badge: "Bulk Only", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "forequater.jpg" },
  { id: "hindquarter-a-grade-500kg", name: "Hindquarter A Grade", price: 0.00, category: "bulk-sales", niche: "meat", location: "mpumalanga", description: "Premium A-grade beef hindquarter, perfect for butcheries and restaurants. 500kg minimum order.", badge: "Bulk Only", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "hindquater.jpg" },

  // === BEEF CUTS ===
  { id: "beef-short-rib", name: "Short Rib", price: 154.90, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Tender, flavorful beef short ribs perfect for braising, grilling, or slow cooking.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "short-rib.jpg" },
  { id: "beef-chuck", name: "Chuck", price: 129.90, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Versatile beef chuck cut, excellent for stews, pot roasts, and slow-cooked dishes.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "beef-chuck.jpg" },
  { id: "beef-brisket", name: "Brisket", price: 145.00, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Premium beef brisket, ideal for smoking, braising, or traditional pot roast.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "beef-brisket.jpg" },
  { id: "beef-shin", name: "Shin", price: 129.99, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Rich, gelatinous beef shin perfect for osso buco, soups, and hearty stews.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "beef-shin.jpg" },
  { id: "beef-stew", name: "Stew Meat", price: 119.90, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Pre-cut beef cubes ready for your favorite stew recipes. Tender and flavorful.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "beef-stew.jpg" },
  { id: "beef-goulash", name: "Goulash", price: 135.00, category: "beef-cuts", niche: "meat", location: "mpumalanga", description: "Premium beef cut specially prepared for authentic goulash and Hungarian-style dishes.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "beef-goulash.jpg" },

  // === PREMIUM STEAKS ===
   { id: "steak-tbone.jpg", name: "T-Bone Steak", price: 289.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "Classic T-bone featuring both strip loin and tender fillet, separated by the signature T-shaped bone.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "steak-tbone.jpg" },
{ id: "steak-sirloin", name: "Sirloin Steak", price: 249.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "Lean, flavorful sirloin steak with excellent marbling. Perfect for grilling or pan-searing.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "steak-sirloin.jpg" },
  { id: "ribeye", name: "Ribeye Steak", price: 319.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "Richly marbled ribeye with exceptional flavor and tenderness. The ultimate steak experience.", badge: "Chef's Choice", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "steak-ribeye.jpg" },
  { id: "fillet", name: "Fillet Steak", price: 399.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "The most tender cut of beef. Butter-soft texture with delicate, refined flavor.", badge: "Premium", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "steak-fillet.jpg" },
  { id: "tomahawk", name: "Tomahawk Steak", price: 459.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "Dramatic bone-in ribeye with an extended frenched bone. Perfect for sharing and special occasions.", badge: "Showstopper", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "steak-tomahawk.jpg" },
  { id: "rump", name: "Rump Steak", price: 199.90, category: "premium-steaks", niche: "meat", location: "mpumalanga", description: "Flavorful, lean rump steak with a robust beefy taste. Great value for everyday grilling.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "steak-rump.jpg" },

  // === SPECIALTY CUTS ===
  { id: "tongue", name: "Beef Tongue", price: 149.90, category: "specialty-cuts", niche: "meat", location: "mpumalanga", description: "Traditional beef tongue, perfect for slow-cooking, pickling, or authentic cultural dishes.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "oxtail-tongue.jpg" },
  { id: "trotters", name: "Beef Trotters", price: 89.90, category: "specialty-cuts", niche: "meat", location: "mpumalanga", description: "Gelatin-rich beef trotters ideal for stocks, soups, and traditional recipes.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "beef-trotters.jpg" },

  // === PROCESSED MEAT ===
  { id: "processed-mince", name: "Premium Mince", price: 99.90, category: "processed-meat", niche: "meat", location: "mpumalanga", description: "Freshly ground beef mince, perfect for burgers, bolognese, meatloaf, and more.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "processed-mince.jpg" },
  { id: "processed-boerewors", name: "Traditional Boerewors", price: 119.90, category: "processed-meat", niche: "meat", location: "mpumalanga", description: "Authentic South African boerewors made with premium beef and traditional spices.", badge: "Local Favorite", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "processed-boerewors.jpg" },
  { id: "processed-braaiwors", name: "Braaiwors", price: 109.90, category: "processed-meat", niche: "meat", location: "mpumalanga", description: "Classic braai sausage with coriander and spice blend. Perfect for your next barbecue.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "processed-boerewors.jpg" },
  { id: "processed-meat-balls", name: "Beef Meatballs", price: 129.90, category: "processed-meat", niche: "meat", location: "mpumalanga", description: "Hand-rolled beef meatballs with herbs and spices. Ready to cook or freeze.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "processed-meatballs.jpg" },
  { id: "processed-patties", name: "Beef Patties", price: 139.90, category: "processed-meat", niche: "meat", location: "mpumalanga", description: "Premium beef patties, perfectly seasoned for burgers or quick meals.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "processed-patties.jpg" },

  // === WHOLE PRIMAL CUTS ===
  { id: "neck", name: "Beef Neck", price: 109.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Flavorful beef neck cut, ideal for slow-cooking, stocks, and traditional dishes.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-neck.jpg",whatsappNumber: '27615023930',businessLogo: 'butcherblock/images/butcherbock-logo' },
  { id: "chuck-top", name: "Chuck Top", price: 145.00, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Premium chuck top primal cut, excellent for roasting or breaking down into steaks.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-chucktop.jpg" },
  { id: "chuck-bottom", name: "Chuck Bottom", price: 135.00, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Versatile chuck bottom primal, perfect for braising, grinding, or slow-cooking.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-chuckbottom.jpg" },
  { id: "cube-rolls", name: "Cube Roll", price: 289.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Premium cube roll primal, the source of ribeye steaks. Excellent marbling and flavor.", badge: "Premium", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-cuberoll.jpg" },
  { id: "striploin-top", name: "Striploin Top", price: 269.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Top-grade striploin primal, perfect for cutting into premium sirloin steaks.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-striplointop.jpg" },
  { id: "striploin-bottom", name: "Striploin Bottom", price: 239.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Quality striploin bottom primal, great value for restaurants and home butchering.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-striploinbottom.jpg" },
  { id: "whole-fillet", name: "Whole Fillet", price: 449.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Entire beef fillet primal, the most tender cut. Perfect for special events or professional use.", badge: "Premium", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-wholefillet.jpg" },
  { id: "rump-top", name: "Rump Top", price: 219.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Premium rump top primal, ideal for cutting into thick, flavorful steaks.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-rumptop.jpg" },
  { id: "rump-bottom", name: "Rump Bottom", price: 199.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Versatile rump bottom primal, excellent for roasting, grinding, or cutting into steaks.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-rumpbottom.jpg" },
  { id: "topside-top", name: "Topside Top", price: 189.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Lean topside top primal, perfect for roasting or cutting into lean steaks.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-topside.jpg" },
  { id: "topside-bottom", name: "Topside Bottom", price: 179.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Quality topside bottom primal, great for roasts, slow-cooking, or grinding.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-chuckbottom.jpg" },
  { id: "topside-defatted", name: "Topside Defatted", price: 199.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Trimmed topside with minimal fat, ideal for health-conscious cooking and lean meals.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-topsidedefatted.jpg" },
  { id: "silverside-bottom", name: "Silverside Bottom", price: 169.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Traditional silverside bottom primal, perfect for corned beef, roasting, or pot roast.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-silversidebottom.jpg" },
  { id: "silverside-top", name: "Silverside Top", price: 189.90, category: "whole-primal-cuts", niche: "meat", location: "mpumalanga", description: "Premium silverside top primal, excellent for roasting or cutting into lean steaks.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "wholeprimalcuts-silversidetop.jpg" },

  // === LAMB - CARCASS ===
  { id: "whole-half-lamb", name: "Whole / Half Lamb Carcass", price: 0.00, category: "lamb-carcass", niche: "meat", location: "mpumalanga", description: "Premium lamb carcass, whole or half. Perfect for restaurants, events, or large families. Call for custom quote.", badge: "Bulk Order", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "lamb-whole-half.jpg" },

  // === LAMB CUTS ===
  { id: "lamb-loin-chop", name: "Lamb Loin Chop", price: 189.90, category: "lamb-cuts", niche: "meat", location: "mpumalanga", description: "Tender lamb loin chops with excellent flavor. Perfect for grilling or pan-searing.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "lamb-loinchop.jpg" },
  { id: "lamb-best-end", name: "Lamb Best End (Rib)", price: 179.90, category: "lamb-cuts", niche: "meat", location: "mpumalanga", description: "Classic lamb best end with tender rib meat. Ideal for roasting or cutting into chops.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "lamb-bestend.jpg" },
  { id: "lamb-leg-chop", name: "Lamb Leg Chop", price: 169.90, category: "lamb-cuts", niche: "meat", location: "mpumalanga", description: "Flavorful lamb leg chops with robust taste. Great for grilling or braising.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "lamb-legchop.jpg" },
  { id: "lamb-leg-of-lamb", name: "Leg of Lamb", price: 219.90, category: "lamb-cuts", niche: "meat", location: "mpumalanga", description: "Whole or half leg of lamb, perfect for Sunday roasts and special occasions.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "lamb-leg.jpg" },
  { id: "lamb-shank", name: "Lamb Shank", price: 159.90, category: "lamb-cuts", niche: "meat", location: "mpumalanga", description: "Gelatin-rich lamb shanks, ideal for slow-cooking and authentic osso buco.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "lamb-shank.jpg" },
  { id: "lamb-curry", name: "Lamb Curry Meat", price: 149.90, category: "lamb-cuts", niche: "meat", location: "mpumalanga", description: "Pre-cut lamb pieces perfect for curries, stews, and traditional dishes.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "lamb-curry.jpg" },

// === CHICKEN - SKIN ON ===
{ id: "chicken-whole-skin-on", name: "Whole Chicken (Skin On)", price: 89.90, category: "chicken-skin-on", niche: "meat", location: "mpumalanga", description: "Fresh whole chicken with skin, perfect for roasting, grilling, or traditional cooking.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/12c6d7488-1677-4f4a-83a3-d59883efb1c65807.png" },

{ id: "chicken-12pcs-skin-on", name: "12 Pcs Chicken (Skin On)", price: 159.90, category: "chicken-skin-on", niche: "meat", location: "mpumalanga", description: "Convenient 12-piece chicken pack with skin. Great for family meals and batch cooking.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/12c6d7488-1677-4f4a-83a3-d59883efb1c63291.png" },

{ id: "chicken-drum-sticks-skin-on", name: "Chicken Drumsticks (Skin On)", price: 79.90, category: "chicken-skin-on", niche: "meat", location: "mpumalanga", description: "Juicy chicken drumsticks with skin, perfect for grilling, baking, or frying.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/4cfdedbe7-4877-4bf8-8951-f94a3a3239c58257.png" },
{ id: "chicken-thighs-skin-on", name: "Chicken Thighs (Skin On)", price: 89.90, category: "chicken-skin-on", niche: "meat", location: "mpumalanga", description: "Flavorful chicken thighs with skin. Tender, juicy, and perfect for any cooking method.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/32c6d7488-1677-4f4a-83a3-d59883efb1c63557.png" },

{ id: "chicken-leg-quarters-skin-on", name: "Chicken Leg Quarters (Skin On)", price: 99.90, category: "chicken-skin-on", niche: "meat", location: "mpumalanga", description: "Complete leg quarters with thigh and drumstick. Great value for hearty meals.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/12c6d7488-1677-4f4a-83a3-d59883efb1c64791.png" },

{ id: "chicken-fillets-skin-on", name: "Chicken Fillets (Skin On)", price: 119.90, category: "chicken-skin-on", niche: "meat", location: "mpumalanga", description: "Premium chicken fillets with skin. Lean, tender, and versatile for any recipe.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c65052.png" },

// === CHICKEN - SKIN OFF ===
{ id: "chicken-whole-bird-skin-off", name: "Whole Chicken (Skin Off)", price: 94.90, category: "chicken-skin-off", niche: "meat", location: "mpumalanga", description: "Fresh whole chicken, skin removed. Ideal for health-conscious cooking and meal prep.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/32c6d7488-1677-4f4a-83a3-d59883efb1c67489.png" },

{ id: "chicken-12pcs-skin-off", name: "12 Pcs Chicken (Skin Off)", price: 169.90, category: "chicken-skin-off", niche: "meat", location: "mpumalanga", description: "Convenient 12-piece skinless chicken pack. Perfect for healthy family meals.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c68974.png" },
{ 
  id: "chicken-drum-sticks-skin-off", 
  name: "Chicken Drumsticks (Skin Off)", 
  price: 84.90, 
  category: "chicken-skin-off", 
  niche: "meat", 
  location: "mpumalanga", 
  description: "Lean chicken drumsticks without skin. Great for grilling, baking, or healthy cooking.", 
  businessName: "Butcher Block", 
  businessLogo: "/butcherblock/images/butcherblock-logo.jpg", 
  image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c68974.png",
  images: [
    "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c68974.png",
    "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/38262494d-f95f-4b05-8ba3-c916c46ad9e68824.png"
  ]
},

{ id: "chicken-leg-quarters-skin-off", name: "Chicken Leg Quarters (Skin Off)", price: 104.90, category: "chicken-skin-off", niche: "meat", location: "mpumalanga", description: "Skinless leg quarters for healthier cooking. Great value and versatile.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/32c6d7488-1677-4f4a-83a3-d59883efb1c65866.png" },

{ id: "chicken-fillets-skin-off", name: "Chicken Fillets (Skin Off)", price: 124.90, category: "chicken-skin-off", niche: "meat", location: "mpumalanga", description: "Premium skinless chicken fillets. Lean protein perfect for healthy meals.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/32c6d7488-1677-4f4a-83a3-d59883efb1c64158.png" },

// === MEAT HAMPERS ===
{ id: "hamper-1", name: "Meat Hamper 1", price: 0.00, category: "meat-hampers", niche: "meat", location: "mpumalanga", description: "Curated selection of premium beef cuts, perfect for gifts or family gatherings.", badge: "Gift Ready", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/42c6d7488-1677-4f4a-83a3-d59883efb1c63087.png" },

{ id: "hamper-2", name: "Meat Hamper 2", price: 0.00, category: "meat-hampers", niche: "meat", location: "mpumalanga", description: "Mixed selection featuring beef, lamb, and chicken. Ideal for variety lovers.", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/52c6d7488-1677-4f4a-83a3-d59883efb1c67158.png" },

{ id: "hamper-3", name: "Meat Hamper 3", price: 0.00, category: "meat-hampers", niche: "meat", location: "mpumalanga", description: "Premium steak selection with ribeye, fillet, and sirloin. Perfect for special occasions.", badge: "Premium", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/22c6d7488-1677-4f4a-83a3-d59883efb1c65320.png" },

{ id: "hamper-4", name: "Meat Hamper 4", price: 0.00, category: "meat-hampers", niche: "meat", location: "mpumalanga", description: "Ultimate butcher's selection with exotic cuts and specialty items. Call for custom options.", badge: "Custom", businessName: "Butcher Block", businessLogo: "/butcherblock/images/butcherblock-logo.jpg", image: "https://image.qwenlm.ai/public_source/33788ea6-80c1-4871-8a11-734c1bc9f8a1/72c6d7488-1677-4f4a-83a3-d59883efb1c65413.png" }];
// 🔄 Process & Attach Metadata + Image Paths
const PROCESSED = RAW_PRODUCTS.map(product => ({
  ...product,
  image: product.image 
    ? (product.image.startsWith('http') || product.image.startsWith('/') 
        ? product.image 
        : `${CONFIG.basePath}${CONFIG.imageDir}/${product.image.replace(/^images\//, '')}`)
    : `${CONFIG.basePath}${CONFIG.imageDir}/${product.id}.jpg`,
  imageFallback: `${CONFIG.basePath}${CONFIG.fallbackImage}`,
  businessName: product.businessName || CONFIG.businessName,
  businessLogo: product.businessLogo 
    ? (product.businessLogo.startsWith('/') ? product.businessLogo : `${CONFIG.basePath}${product.businessLogo}`)
    : `${CONFIG.basePath}${CONFIG.businessLogo}`,
  categorySlug: product.category.trim().toLowerCase(),
  locationSlug: product.location?.trim().toLowerCase() || "mpumalanga",
  nicheSlug: product.niche?.trim().toLowerCase() || "meat"
}));

// 🌐 Global Export (Used by both websites)
window.BUTCHER_BLOCK_PRODUCTS = PROCESSED;
// 🔄 Backward compatibility for legacy scripts
window.BUTCHERBLOCK_DATA = PROCESSED;

// 🛠️ Utility API for both sites
window.ButcherBlockProducts = {
  getAll: () => window.BUTCHER_BLOCK_PRODUCTS,
  getById: (id) => window.BUTCHER_BLOCK_PRODUCTS.find(p => p.id === id),

  getByCategory: (category) => 
    window.BUTCHER_BLOCK_PRODUCTS.filter(p => p.categorySlug === category.toLowerCase()),

  getByLocation: (location) => 
    window.BUTCHER_BLOCK_PRODUCTS.filter(p => p.locationSlug === location.toLowerCase()),

  // 🎯 NEW: Filter by niche (e.g., "meat")
  getByNiche: (niche) => 
    window.BUTCHER_BLOCK_PRODUCTS.filter(p => p.nicheSlug === niche.toLowerCase()),

  // 🔄 NEW: Combined filter helper for advanced queries
  filter: ({ category, location, niche }) => {
    return window.BUTCHER_BLOCK_PRODUCTS.filter(p => {
      if (category && p.categorySlug !== category.toLowerCase()) return false;
      if (location && p.locationSlug !== location.toLowerCase()) return false;
      if (niche && p.nicheSlug !== niche.toLowerCase()) return false;
      return true;
    });
  },

  getImageUrl: (productId, useFallback = true) => {
    const product = window.BUTCHER_BLOCK_PRODUCTS.find(p => p.id === productId);
    return product ? product.image : (useFallback ? `${CONFIG.basePath}${CONFIG.fallbackImage}` : null);
  },

  // ✅ Enhanced renderCard with business branding, WhatsApp & niche data attributes
  renderCard: (p) => `
    <article class="product-card" 
            data-id="${p.id}" 
            data-category="${p.categorySlug}" 
            data-location="${p.locationSlug}"
            data-niche="${p.nicheSlug}" >
      
      <!-- Business Header -->
     ${p.businessLogo ? `
        <div class="product-business" >
          <img src="${p.businessLogo}" alt="${p.businessName} logo" class="business-logo" loading="lazy" >
          <span class="business-name" >${p.businessName}</span >
        </div >
     ` : ''}
     
      <!-- Optional Niche Badge (style via CSS) -->
     ${p.nicheSlug ? ` <span class="product-niche-badge" style="display:none;" >${p.nicheSlug}</span >` : ''}
     
      <!-- Product Image Container -->
      <div class="product-image-wrap" >
        <img 
         src="${p.image}" 
         alt="${p.name}" 
         loading="lazy" 
         class="product-image"
         onerror="this.src='${p.imageFallback}'; this.alt='Product image unavailable'" >
       ${p.badge ? ` <span class="product-badge" >${p.badge}</span >` : " "}
      </div >
     
      <!-- Product Details -->
      <div class="product-details" >
        <h3 class="product-name" title="${p.name}" >${p.name}</h3 >
        <p class="product-desc" >${p.description}</p >
       
        <div class="product-footer" >
          <span class="product-price" >${p.price > 0 ? `R${p.price.toFixed(2)}` : 'POA'}</span >
          <button 
           class="btn-add" 
           data-product-id="${p.id}"
           data-product-name="${p.name}"
           data-product-price="${p.price}"
           aria-label="Add ${p.name} to cart" >
           ${p.price > 0 ? 'Add to Cart' : 'Request Quote'}
          </button >
        </div >
      </div >
    </article >
  `,

  // 📱 WhatsApp deep-link helper (per your preference)
  getWhatsAppLink: (product, phoneNumber = "27615023930") => {
    const priceStr = product.price > 0 ? `R${product.price.toFixed(2)}` : 'Price on Application';
    const msg = encodeURIComponent(`Hi, I'd like to order: ${product.name} (${priceStr}) from ${product.businessName}`);
    return `https://wa.me/${phoneNumber}?text=${msg}`;
  }
};

// 📊 Dev Console Diagnostics (Remove in production)
console.group("🥩 Butcher Block Products Synced");
console.log(`✅ ${PROCESSED.length} products loaded`);
const grouped = {};
PROCESSED.forEach(p => {
  grouped[p.categorySlug] = grouped[p.categorySlug] || [];
  grouped[p.categorySlug].push(p.name);
});
Object.entries(grouped).forEach(([cat, items]) =>
  console.log(`📁 ${cat}: ${items.length} item(s)`)
);
console.log(`🎯 Niche: "${PROCESSED[0]?.nicheSlug || 'meat'}" applied to all products`);
console.groupEnd();
})();