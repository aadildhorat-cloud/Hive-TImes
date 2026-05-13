/**
🌿 Nuhas Healthy Living - Centralized Product Data & Utilities
📁 Recommended Path: /nuhas-healthy-living/js/products-nuhas-healthy-living.js
🔗 Usage: Include this exact script on BOTH Hive Times & Nuhas Healthy Living pages.
✅ Edit the RAW_PRODUCTS array below → Auto-syncs across all linked sites.
*/
(function () {
  // 📌 ASSET CONFIGURATION
  const CONFIG = {
    basePath: "",
    imageDir: "/nuhas-healthy-living/images2", 
    fallbackImage: "/nuhas-healthy-living/images2/nuhashealthyliving-logo.jpg",
    businessName: "Nuhas Healthy Living",
    businessLogo: "/nuhas-healthy-living/images2/nuhashealthyliving-logo.jpg"
  };

  // 📦 RAW PRODUCT DATA - ✏️ EDIT THIS ARRAY TO UPDATE EVERYWHERE
  const RAW_PRODUCTS = [
  
  // === 💊 SUPPLEMENTS & CAPSULES ===
  { id: "kulunji-oil-capsules", name: "Kulonji Oil Capsules", price: 275.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Fights cancer, promotes liver health, combats diabetes, aids weight loss, protects skin & hair, treats infections, balances cholesterol, improves fertility, relieves asthma & joint pain, boosts memory & stamina.", badge: "✨ Best Seller", image: "1.jpg" },
  { id: "marine-collagen-peptides", name: "Hydrolysed Marine Collagen Peptides (Type I)", price: 275.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Anti-ageing & joint support, repairs skin/hair/nails, reduces wrinkles, improves elasticity, reduces inflammation, aids wound healing, supports calcium absorption, boosts metabolism, aids weight loss, improves sleep.", badge: "✨ Premium", image: "2.jpg" },
  { id: "coconut-moringa-blackseed", name: "Coconut + Moringa & Black Seed", price: 245.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Strengthens immune system, boosts stamina, aids weight loss, protects liver & kidneys, stimulates hair growth, treats depression, fights allergies, restores thyroid function.", badge: "🌟 Blend", image: "3.jpg" },
  { id: "olive-garlic-capsules", name: "Olive Oil & Garlic Capsules", price: 245.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Lowers blood pressure, prevents strokes, protects cholesterol, supports type 2 diabetes, relieves arthritis pain, regulates blood glucose.", badge: "", image: "4.jpg" },
  { id: "kulunji-seed-powder", name: "Kulonji Seed Powder Capsules", price: 125.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Improves memory, relieves asthma & respiratory issues, fights fungal infections, boosts fertility, aids weight loss, balances cholesterol, benefits skin & hair.", badge: "", image: "5.jpg" },
  { id: "black-seeds-kulonji", name: "Black Seeds / Kulonji", price: 100.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Fights cancer, promotes liver health, combats diabetes, aids weight loss, protects skin & hair, treats infections, balances cholesterol, improves fertility & memory.", badge: "", image: "6.jpg" },
  { id: "advanced-liver-health", name: "Advanced Liver Health Formula", price: 250.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Detoxifies liver, supports digestion, improves liver function, combats allergies, treats hepatitis & fatty liver, assists with gallstones.", badge: "", image: "7.jpg" },
  { id: "desire-for-him", name: "Desire for Him", price: 395.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Boosts testosterone & libido, enhances energy & mood, increases blood flow, prevents early ejaculation, promotes sperm production, supports muscle growth.", badge: "👨 Men's Health", image: "8.jpg" },
  { id: "keep-calm-junior", name: "Keep Calm Junior", price: 250.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Stress & anxiety relief for kids, boosts mood & focus, non-drowsy, supports cognitive function & sleep.", badge: "👶 Kids", image: "9.jpg" },
  { id: "smart-kidz", name: "Smart Kidz", price: 250.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Enhances memory & focus, supports eye & brain health, combats stress, boosts energy & concentration.", badge: "👶 Kids", image: "10.jpg" },
  { id: "weight-gain-capsules", name: "Weight Gain Capsules", price: 295.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Promotes healthy weight gain, increases appetite & energy, improves skin complexion & digestion.", badge: "", image: "11.jpg" },
  { id: "vegan-omega3", name: "Vegan Omega 3 (EPA, DHA, ALA)", price: 275.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Supports heart & joint health, reduces inflammation, boosts muscle recovery, improves skin & brain health.", badge: "", image: "12.jpg" },
  { id: "all-flora-probiotics", name: "All Flora Pro-Probiotics", price: 275.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Replenishes gut bacteria, boosts immunity, aids digestion & nutrient absorption, reduces IBS & inflammation.", badge: "", image: "13.jpg" },
  { id: "vitiligo-care-combo", name: "Vitiligo Care Capsules + Lotion Combo", price: 500.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Promotes skin pigmentation, stimulates melanin, repairs skin cells, improves blood flow, reduces white spots.", badge: "✨ Premium", image: "14.jpg" },
  { id: "thyroid-support", name: "Thyroid Support Complete Formula", price: 275.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Balances thyroid function, boosts metabolism, supports energy & hormonal health.", badge: "", image: "15.jpg" },
  { id: "natural-diuretic-pills", name: "Natural Diuretic Water Pills", price: 235.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Reduces water retention & bloating, supports kidney & urinary health, lowers blood pressure, manages electrolytes.", badge: "", image: "16.jpg" },
  { id: "luscious-glow-hairvites", name: "Luscious Glow & Grow Hair-Vites", price: 275.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Stimulates hair growth, prevents thinning, improves scalp circulation, increases shine & volume.", badge: "", image: "17.jpg" },
  { id: "quit-habit-capsules", name: "Quit the Habit Capsules", price: 250.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Helps quit smoking, cleanses lungs, reduces stress & toxins, prevents irritability & headaches.", badge: "", image: "18.jpg" },
   { id: "elderberry-cough-syrup", name: "Elderberry Cough Syrup + Immune Booster", price: 250.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Fights colds & sore throat, relieves congestion, rich in vitamins A/B/C, boosts immunity & respiratory health.", badge: "", image: "19.jpg" },
  { id: "turmeric-golden-latte", name: "Turmeric Golden Milk Latte", price: 130.00, category: "supplements-capsules", niche: "medication", location: "azadville", description: "Immune booster, anti-inflammatory, aids digestion & sleep, improves memory & recovery.", badge: "☕ Drink", image: "20.jpg" },
 
  
  // === 🧴 OILS & TOPICALS ===
  { id: "nasal-inhaler", name: "Nasal Inhaler", price: 130.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Relieves blocked nose, facilitates breathing, assists with deviated septum, may reduce snoring, supports respiratory issues.", badge: "🔥 Popular", image: "21.jpg" },
  { id: "alert-oil", name: "Alert Oil", price: 130.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Improves focus & concentration, boosts stamina & memory, reduces fatigue & headaches, stimulates mind, ideal for students & professionals.", badge: "", image: "22.jpg" },
  { id: "sweet-dreams-oil", name: "Sweet Dreams Oil", price: 130.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Natural sleep aid, relieves stress, calms overactive minds, assists with depression, promotes relaxation, can be used with insomnia capsules.", badge: "", image: "23.jpg" },
  { id: "arthritis-salve", name: "Arthritis Salve", price: 150.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Relieves pain from arthritis, fibromyalgia, sciatica, muscle/tendon/joint lesions.", badge: "", image: "24.jpg" },
  { id: "sinus-oil", name: "Sinus Oil", price: 130.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Relieves congestion, promotes sinus drainage, reduces inflammation, fights bacteria, clears mucus, eases breathing.", badge: "", image: "25.jpg" },
  { id: "curb-urge-inhaler", name: "Curb the Urge Inhaler", price: 100.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Reduces nicotine cravings, calms irritability, eases withdrawal headaches, natural & side-effect-free.", badge: "", image: "26.jpg" },
  { id: "breathe-easy-bags", name: "Breathe Easy Bags", price: 75.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Relieves respiratory issues, increases oxygen, helps sinus & coughs, reduces anxiety, all-natural ingredients.", badge: "", image: "27.jpg" },
  { id: "cayenne-turmeric-balm", name: "Cayenne & Turmeric Warming Balm", price: 150.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Relieves pain from arthritis, fibromyalgia, sciatica, tennis elbow, back & joint pain.", badge: "", image: "28.jpg" },
  { id: "roll-away-pain-oil", name: "Roll Away Pain Oil Roll-On", price: 200.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Instant pain relief for fibromyalgia, plantar fasciitis, arthritis, sciatica, tendonitis, neuropathy, headaches.", badge: "🔥 Popular", image: "29.jpg" },
  { id: "herbal-pain-relief-oil", name: "Herbal Pain Relief Oil", price: 250.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Soothes muscle & joint pain, reduces inflammation, improves circulation, 100% natural ingredients.", badge: "", image: "30.jpg" },
  { id: "hair-growth-oil", name: "Hair Growth Oil", price: 250.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Stimulates follicles, reduces hair loss, strengthens roots, promotes thicker healthier hair.", badge: "", image: "31.jpg" },
  { id: "anti-dandruff-oil", name: "Anti-Dandruff Oil", price: 220.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Clears scalp, prevents flakes, soothes itching, promotes healthy scalp environment.", badge: "", image: "32.jpg" },
  { id: "massage-oil-herbal", name: "Herbal Massage Oil", price: 250.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Relaxes muscles, improves circulation, reduces tension, nourishes skin with natural botanicals.", badge: "", image: "33.jpg" },
  { id: "body-oil-herbal", name: "Herbal Body Oil", price: 200.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Moisturizes, improves elasticity, soothes dry skin, rich in antioxidants & vitamins.", badge: "", image: "34.jpg" },
  { id: "perfume-oil-herbal", name: "Herbal Perfume Oil", price: 180.00, category: "oils-topicals", niche: "medication", location: "azadville", description: "Natural fragrance, long-lasting, alcohol-free, gentle on sensitive skin.", badge: "", image: "35.jpg" },
  
  // === 👶 BABY & PERSONAL CARE ===
  { id: "organic-baby-powder", name: "Organic Baby Dusting Powder", price: 200.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Talc-free, prevents nappy rash, absorbs moisture, deodorizes, protects delicate skin, antibacterial & vegan.", badge: "👶 Baby", image: "36.jpg" },
  { id: "oh-baby-soap", name: "Oh Baby Soap", price: 65.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Gentle cleansing, moisturizes, protects sensitive skin, prevents rashes, antibacterial & tea-tree-infused.", badge: "👶 Baby Best Value", image: "37.jpg" },
  { id: "happy-nappy-gel", name: "Happy Nappy Baby Bum Gel", price: 130.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Prevents & treats nappy rash, antibacterial & anti-fungal, moisturizes & protects baby's skin.", badge: "👶 Baby", image: "38.jpg" },
  { id: "moisturizing-baby-lotion", name: "Moisturizing Baby Lotion", price: 130.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Deep hydration, nourishes & protects skin, rich in avocado oil & vitamin E, non-greasy formula.", badge: "👶 Baby", image: "39.jpg" },
  { id: "teething-roller", name: "Teething Roller", price: 75.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Soothes teething pain, calming & gentle for babies, natural ingredients, easy application.", badge: "👶 Baby", image: "40.jpg" },
  { id: "sleep-tight-roller", name: "Sleep Tight Oil Roller", price: 75.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Calms & relaxes baby, promotes peaceful sleep for mom & child, gentle aromatherapy blend.", badge: "👶 Baby", image: "41.jpg" },
  { id: "squeaky-clean-wash", name: "Squeaky Clean Baby Wash", price: 140.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Non-foaming, cleans & moisturizes, prevents dryness & irritation, antimicrobial & organic.", badge: "👶 Baby", image: "42.jpg" },
  { id: "baby-bath-massage-oil", name: "Baby Bath Body & Massage Oil", price: 130.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Hydrates & nourishes skin, improves circulation, rich in antioxidants, softens & restores skin.", badge: "👶 Baby", image: "43.jpg" },
  { id: "peaceful-baby-tea", name: "Peaceful Baby Tea Bags", price: 250.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Calms baby & mom, relieves gas & indigestion, soothes gums, aids sleep, vegan & caffeine-free.", badge: "👶 Baby", image: "44.jpg" },
  { id: "lemon-honey-soap", name: "Lemon & Honey Soap", price: 70.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Antioxidant vitamin C boost, tightens pores, smooths skin, suitable for all ages.", badge: "🧼 Soap", image: "45.jpg" },
  { id: "herbal-toothpaste", name: "Herbal Toothpaste", price: 130.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Oral hygiene, gum health, natural ingredients, fluoride-free, freshens breath.", badge: "", image: "46.jpg" },
  { id: "herbal-face-wash", name: "Herbal Face Wash", price: 130.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Cleanses, refreshes skin, removes impurities, gentle formula for daily use.", badge: "", image: "47.jpg" },
  { id: "herbal-shampoo", name: "Herbal Shampoo", price: 200.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Strengthens hair, reduces hair fall, nourishes scalp, sulfate-free formula.", badge: "", image: "48.jpg" },
  { id: "herbal-conditioner", name: "Herbal Conditioner", price: 200.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Smoothens hair, adds shine, detangles, protects from damage.", badge: "", image: "49.jpg" },
  { id: "herbal-body-wash", name: "Herbal Body Wash", price: 180.00, category: "baby-personal", niche: "medication", location: "azadville", description: "Refreshes, nourishes skin, gentle cleansing, moisturizing botanicals.", badge: "", image: "50.jpg" },
  
  // === 🧴 SKINCARE ===
  { id: "skin-cream-herbal", name: "Skin Cream", price: 200.00, category: "skincare", niche: "medication", location: "azadville", description: "Moisturizes, reduces blemishes, evens tone, promotes healthy radiant skin.", badge: "", image: "51.jpg" },
  { id: "face-cream-herbal", name: "Herbal Face Cream", price: 200.00, category: "skincare", niche: "medication", location: "azadville", description: "Hydrates, anti-aging, reduces fine lines, improves skin texture.", badge: "", image: "52.jpg" },
  { id: "herbal-scrub", name: "Herbal Scrub", price: 180.00, category: "skincare", niche: "medication", location: "azadville", description: "Exfoliates, brightens skin, removes dead cells, reveals smoother complexion.", badge: "", image: "53.jpg" },
  { id: "body-scrub-herbal", name: "Herbal Body Scrub", price: 180.00, category: "skincare", niche: "medication", location: "azadville", description: "Exfoliates, smoothens skin, improves circulation, leaves skin soft.", badge: "", image: "54.jpg" },
  { id: "face-pack-herbal", name: "Herbal Face Pack", price: 180.00, category: "skincare", niche: "medication", location: "azadville", description: "Detoxifies, brightens complexion, tightens pores, rejuvenates skin.", badge: "", image: "55.jpg" },
  { id: "moisturizing-gel", name: "Herbal Moisturizing Gel", price: 180.00, category: "skincare", niche: "medication", location: "azadville", description: "Hydrates, refreshes skin, lightweight formula, absorbs quickly.", badge: "", image: "56.jpg" },
  { id: "body-lotion-herbal", name: "Herbal Body Lotion", price: 180.00, category: "skincare", niche: "medication", location: "azadville", description: "Hydration, smooth skin, non-greasy, daily nourishment.", badge: "", image: "57.jpg" },
  { id: "body-butter-herbal", name: "Herbal Body Butter", price: 200.00, category: "skincare", niche: "medication", location: "azadville", description: "Deep nourishment, smooth texture, repairs dry skin, long-lasting moisture.", badge: "", image: "58.jpg" },
  { id: "foot-cream-herbal", name: "Herbal Foot Cream", price: 150.00, category: "skincare", niche: "medication", location: "azadville", description: "Softens heels, repairs cracks, soothes tired feet, prevents calluses.", badge: "", image: "59.jpg" },
  { id: "hand-cream-herbal", name: "Herbal Hand Cream", price: 150.00, category: "skincare", niche: "medication", location: "azadville", description: "Moisturizes, repairs hands, protects from dryness, fast-absorbing.", badge: "", image: "60.jpg" },
  { id: "skin-brightening-cream", name: "Skin Brightening Cream", price: 250.00, category: "skincare", niche: "medication", location: "azadville", description: "Evens tone, reduces pigmentation, fades dark spots, promotes radiant glow.", badge: "", image: "61.jpg" },
  { id: "anti-acne-gel", name: "Anti-Acne Gel", price: 200.00, category: "skincare", niche: "medication", location: "azadville", description: "Clears pimples, reduces scars, controls oil, prevents breakouts.", badge: "", image: "62.jpg" },
  { id: "anti-wrinkle-cream", name: "Anti-Wrinkle Cream", price: 250.00, category: "skincare", niche: "medication", location: "azadville", description: "Firms skin, reduces lines, boosts collagen, restores youthful appearance.", badge: "", image: "63.jpg" },
  { id: "skin-repair-cream", name: "Skin Repair Cream", price: 250.00, category: "skincare", niche: "medication", location: "azadville", description: "Heals dryness, improves texture, soothes irritation, restores barrier.", badge: "", image: "64.jpg" },
  { id: "herbal-toner", name: "Herbal Skin Toner", price: 150.00, category: "skincare", niche: "medication", location: "azadville", description: "Refreshes, tightens pores, balances pH, preps skin for moisturizer.", badge: "", image: "65.jpg" },
  { id: "face-serum-herbal", name: "Herbal Face Serum", price: 250.00, category: "skincare", niche: "medication", location: "azadville", description: "Brightens, hydrates skin, reduces signs of aging, concentrated actives.", badge: "✨ Premium", image: "66.jpg" },
  { id: "eye-cream-herbal", name: "Herbal Eye Cream", price: 200.00, category: "skincare", niche: "medication", location: "azadville", description: "Reduces puffiness, dark circles, hydrates delicate eye area.", badge: "", image: "67.jpg" },
  { id: "eye-serum-herbal", name: "Herbal Eye Serum", price: 200.00, category: "skincare", niche: "medication", location: "azadville", description: "Reduces fine lines around eyes, firms skin, brightens under-eye area.", badge: "", image: "68.jpg" },
  { id: "lip-balm-herbal", name: "Herbal Lip Balm", price: 100.00, category: "skincare", niche: "medication", location: "azadville", description: "Moisturizes lips, prevents dryness, protects from elements, natural shine.", badge: "", image: "69.jpg" },
  { id: "lip-scrub-herbal", name: "Herbal Lip Scrub", price: 100.00, category: "skincare", niche: "medication", location: "azadville", description: "Exfoliates, softens lips, removes dead skin, prepares for lip color.", badge: "", image: "70.jpg" },
  
  // === 💆 HAIRCARE ===
  { id: "hair-mask-herbal", name: "Herbal Hair Mask", price: 220.00, category: "haircare", niche: "medication", location: "azadville", description: "Deep conditioning, repair, restores damaged hair, adds shine & strength.", badge: "", image: "71.jpg" },
  { id: "hair-serum-herbal", name: "Herbal Hair Serum", price: 220.00, category: "haircare", niche: "medication", location: "azadville", description: "Shine, frizz control, protects from heat, smooths flyaways.", badge: "", image: "72.jpg" },
  { id: "hair-tonic-herbal", name: "Herbal Hair Tonic", price: 220.00, category: "haircare", niche: "medication", location: "azadville", description: "Strengthens roots, adds shine, promotes growth, reduces breakage.", badge: "", image: "73.jpg" },
  { id: "hair-color-herbal", name: "Herbal Hair Color", price: 250.00, category: "haircare", niche: "medication", location: "azadville", description: "Natural dye, no chemicals, covers grays, nourishes while coloring.", badge: "", image: "74.jpg" },
  { id: "hair-spray-herbal", name: "Herbal Hair Spray", price: 180.00, category: "haircare", niche: "medication", location: "azadville", description: "Adds volume, shine, holds style, flexible hold without stiffness.", badge: "", image: "75.jpg" },
  { id: "hair-gel-herbal", name: "Herbal Hair Gel", price: 150.00, category: "haircare", niche: "medication", location: "azadville", description: "Styles, strengthens hair, defines curls, non-flaking formula.", badge: "", image: "76.jpg" },
  { id: "hair-wax-herbal", name: "Herbal Hair Wax", price: 150.00, category: "haircare", niche: "medication", location: "azadville", description: "Shapes, nourishes hair, matte finish, reworkable hold.", badge: "", image: "77.jpg" },
  { id: "hair-cream-herbal", name: "Herbal Hair Cream", price: 180.00, category: "haircare", niche: "medication", location: "azadville", description: "Softens, conditions hair, reduces frizz, enhances manageability.", badge: "", image: "78.jpg" },
  { id: "hair-butter-herbal", name: "Herbal Hair Butter", price: 200.00, category: "haircare", niche: "medication", location: "azadville", description: "Deep nourishment for hair, seals moisture, defines curls, prevents breakage.", badge: "", image: "79.jpg" },
  { id: "beard-oil-herbal", name: "Herbal Beard Oil", price: 200.00, category: "haircare", niche: "medication", location: "azadville", description: "Softens beard, promotes growth, reduces itch, nourishes skin underneath.", badge: "👨 Men", image: "80.jpg" },
  { id: "beard-wash-herbal", name: "Herbal Beard Wash", price: 150.00, category: "haircare", niche: "medication", location: "azadville", description: "Cleanses beard, refreshes, removes buildup, gentle on skin.", badge: "👨 Men", image: "81.jpg" },
  { id: "beard-balm-herbal", name: "Herbal Beard Balm", price: 180.00, category: "haircare", niche: "medication", location: "azadville", description: "Styles, conditions beard, tames flyaways, adds light hold.", badge: "👨 Men", image: "82.jpg" },
  { id: "aftershave-herbal", name: "Herbal Aftershave", price: 150.00, category: "haircare", niche: "medication", location: "azadville", description: "Soothes skin, prevents irritation, reduces razor burn, alcohol-free.", badge: "👨 Men", image: "83.jpg" },
  
  // === 🌿 SPECIALTY WELLNESS ===
  { id: "shifa-paste", name: "9 Shifa Paste", price: 350.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Strengthens bones & teeth, cures pain & knee aches, reduces fat, nourishes heart & brain, improves memory.", badge: "✨ Premium", image: "84.jpg" },
  { id: "slimming-tea", name: "Slimming Tea", price: 180.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Fat metabolism, appetite control, supports weight management, natural detox.", badge: "", image: "85.jpg" },
  { id: "stress-relief-tea", name: "Stress Relief Tea", price: 180.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Calms nerves, reduces anxiety, promotes relaxation, herbal blend.", badge: "", image: "86.jpg" },
  { id: "honey-blend", name: "Honey Blend", price: 180.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Natural energy, immune support, soothes throat, antioxidant rich.", badge: "", image: "87.jpg" },
  { id: "herbal-tonic-wellness", name: "Herbal Tonic", price: 250.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "General wellness, vitality, boosts energy, supports immune function.", badge: "", image: "88.jpg" },
  { id: "herbal-deodorant", name: "Herbal Deodorant", price: 150.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Natural freshness, odor control, aluminum-free, gentle on skin.", badge: "", image: "89.jpg" },
  { id: "bath-salt-herbal", name: "Herbal Bath Salt", price: 200.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Detox, relaxation, soothes muscles, mineral-rich blend.", badge: "", image: "90.jpg" },
  { id: "foot-soak-herbal", name: "Herbal Foot Soak", price: 150.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Relaxes, deodorizes feet, softens skin, reduces fatigue.", badge: "", image: "91.jpg" },
  { id: "body-mist-herbal", name: "Herbal Body Mist", price: 150.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Refreshing scent, hydration, light fragrance, alcohol-free.", badge: "", image: "92.jpg" },
  { id: "massage-cream-herbal", name: "Herbal Massage Cream", price: 250.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Relieves tension, nourishes skin, absorbs well, therapeutic blend.", badge: "", image: "93.jpg" },
  { id: "energy-boost-powder", name: "Energy Boost Powder", price: 300.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Increases stamina, reduces fatigue, natural caffeine, sustained energy.", badge: "", image: "94.jpg" },
  { id: "sleep-support-capsules", name: "Sleep Support Capsules", price: 250.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Promotes restful sleep, calms mind, non-habit forming, herbal blend.", badge: "", image: "95.jpg" },
  { id: "anti-hair-fall-capsules", name: "Anti-Hair Fall Capsules", price: 250.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Strengthens roots, reduces shedding, promotes growth, nutrient-rich.", badge: "", image: "96.jpg" },
  { id: "hair-repair-capsules", name: "Hair Repair Capsules", price: 250.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Restores damaged hair, strengthens strands, adds shine, internal nourishment.", badge: "", image: "97.jpg" },
  { id: "spirulina-powder", name: "Spirulina Powder", price: 300.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Detox, energy boost, protein source, rich in vitamins & minerals.", badge: "", image: "98.jpg" },
  { id: "charcoal-capsules", name: "Charcoal Capsules", price: 200.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Detoxification, digestive health, absorbs toxins, supports gut.", badge: "", image: "99.jpg" },
  { id: "colon-detox", name: "Colon Detox", price: 250.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Improves digestion, cleanses intestines, supports regularity, herbal formula.", badge: "", image: "100.jpg" },
  { id: "acv-capsules", name: "Apple Cider Vinegar Capsules", price: 200.00, category: "specialty-wellness", niche: "medication", location: "azadville", description: "Weight management, digestion aid, supports metabolism, easy to take.", badge: "", image: "101.jpg" }
];
  // 🔄 Process & Attach Metadata
  const PROCESSED = RAW_PRODUCTS.map(product => ({
    ...product,
    image: `${CONFIG.basePath}${CONFIG.imageDir}/${product.image}`,
    imageFallback: `${CONFIG.basePath}${CONFIG.fallbackImage}`,
    businessName: product.businessName || CONFIG.businessName,
    businessLogo: `${CONFIG.basePath}${CONFIG.fallbackImage}`,
    categorySlug: product.category.trim().toLowerCase(),
    nicheSlug: product.niche?.trim().toLowerCase() || "health-beauty",
    locationSlug: product.location?.trim().toLowerCase() || "gauteng"
  }));

    // 🌐 Global Export
  window.NUHAS_HEALTHY_LIVING_PRODUCTS = PROCESSED;
  window.NUHASHEALTHYLIVING_DATA = PROCESSED;

  // 🛠️ Utility API
  window.NuhaHealthyLivingProducts = {
    getAll: () => window.NUHAS_HEALTHY_LIVING_PRODUCTS,
    getById: (id) => window.NUHAS_HEALTHY_LIVING_PRODUCTS.find(p => p.id === id),
    getByCategory: (category) => window.NUHAS_HEALTHY_LIVING_PRODUCTS.filter(p => p.categorySlug === category.toLowerCase()),
    getByLocation: (location) => window.NUHAS_HEALTHY_LIVING_PRODUCTS.filter(p => p.locationSlug === location.toLowerCase()),
    getByNiche: (niche) => window.NUHAS_HEALTHY_LIVING_PRODUCTS.filter(p => p.nicheSlug === niche.toLowerCase()),
    filter: ({ category, location, niche }) => window.NUHAS_HEALTHY_LIVING_PRODUCTS.filter(p => {
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
    
    getWhatsAppLink: (product, phoneNumber = "27123456789") => {
      const msg = encodeURIComponent(
        `Hi! I'd like to order from Nuhas Healthy Living:\n\n` +
        `🌿 *${product.name}*\n` +
        `💰 Price: R${product.price.toFixed(2)}\n` +
        `📝 ${product.description}\n\n` +
        `Please confirm availability. Thank you!`
      );
      return `https://wa.me/${phoneNumber}?text=${msg}`;
    }
  };

  // 📊 Dev Console
  console.group("🌿 Nuhas Healthy Living Products Synced");
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