/**
👜 HSS Fashion Playground (Handbag Superstore) – Centralized Product Data & Utilities
📁 Path: /js/products-hssfashion.js
✅ Quality handbags, luggage, travel accessories & lifestyle essentials.
🛡️ FAILSAFE: fallback products ensure the site NEVER shows "no products available".
*/
(function () {
'use strict';

// ─────────────────────────────────────────────
// 🎛️ CONFIGURATION
// ─────────────────────────────────────────────
const CONFIG = {
    // ⚠️ Paste your Google Apps Script /exec URL here for sheet-driven stock
    SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbzJlzCnM0W16aKsgrJPTWY7_eV_Y-s4x31y5rjSdkqmGxi70JOnI9h0B1_pjnQ6zOInBg/exec",
    basePath: "",
    imageDir: "images",
    fallbackImage: "https://raw.githubusercontent.com/aadildhorat-cloud/hive-times-assets/main/hss-fashion/images/logo-hssfashion.jpg",
    businessName: "HSS Fashion Playground",
    businessLogo: "https://raw.githubusercontent.com/aadildhorat-cloud/hive-times-assets/main/hss-fashion/images/logo-hssfashion.jpg",
    CACHE_KEY: "hss_products_cache",
    CART_KEY: "hss_cart",
    CACHE_TTL: 10 * 60 * 1000, // 10 minutes
    WHATSAPP_NUMBER: "27715767445", // ⚠️ Replace with HSS WhatsApp number
    resolveImage: function (src) {
        if (!src) return CONFIG.fallbackImage;
        if (src.indexOf('http://') === 0 || src.indexOf('https://') === 0) return src;
        if (src.indexOf('/') === 0) return src;
        return CONFIG.basePath + CONFIG.imageDir + "/" + src;
    }
};

// ─────────────────────────────────────────────
// 🗂️ STATIC FALLBACK DATA (from Saleys master catalog)
// ─────────────────────────────────────────────
const FALLBACK_PRODUCTS = [ 
    {
        id: "samsonite-base-boost-55-blue",
        name: "Samsonite Base Boost 55cm Cabin - Blue",
        brand: "SAMSONITE",
        price: 3799.00,
        compare_at_price: 0,
        category: "Soft Luggage",
        niche: "luggage",
        location: "Johannesburg",
        description: "Lightweight softside cabin trolley with 4 spinner wheels, TSA lock and smart organisation.",
        badge: "🔥 Best Seller",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/gopals-bags-samsonite-base-boost-blue-5_535597ff-a287-4141-a55c-6e3b8f307257.jpg?v=1558269487",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/gopals-bags-samsonite-base-boost-blue-5_535597ff-a287-4141-a55c-6e3b8f307257.jpg?v=1558269487"],
        active: true
    },
    {
        id: "samsonite-base-boost-66-black",
        name: "Samsonite Base Boost 66cm Medium - Black",
        brand: "SAMSONITE",
        price: 4299.00,
        compare_at_price: 0,
        category: "Soft Luggage",
        niche: "luggage",
        location: "Johannesburg",
        description: "Medium check-in softside spinner, close to the budget conscious traveller's heart.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/samsonite-base-boost-black-gopals-bags-66cm-8--3_e019e360-8566-4b0f-a8b5-503c560fb927.jpg?v=1558269117",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/samsonite-base-boost-black-gopals-bags-66cm-8--3_e019e360-8566-4b0f-a8b5-503c560fb927.jpg?v=1558269117"],
        active: true
    },
    {
        id: "samsonite-lite-shock-55",
        name: "Samsonite Lite-Shock 55cm Hardside Spinner",
        brand: "SAMSONITE",
        price: 8499.00,
        compare_at_price: 0,
        category: "Hard Luggage",
        niche: "luggage",
        location: "Johannesburg",
        description: "Iconic 3-point locking system, ultra-light Curv material, premium carry-on.",
        badge: "⭐ Premium",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/samsonite_lite-shock_-gopals_bags-_55cm.jpg?v=1555081426",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/samsonite_lite-shock_-gopals_bags-_55cm.jpg?v=1555081426"],
        active: true
    },
    {
        id: "samsonite-scure-55-aqua",
        name: "Samsonite SCure Spinner 55cm Aqua Blue",
        brand: "SAMSONITE",
        price: 4200.00,
        compare_at_price: 0,
        category: "Hard Luggage",
        niche: "luggage",
        location: "Johannesburg",
        description: "100% polypropylene hardside cabin spinner with lockable zippers.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/49539-1041-08_a91bdc4b-c5e5-4d22-abef-91938db91a2c.jpg?v=1560462107",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/49539-1041-08_a91bdc4b-c5e5-4d22-abef-91938db91a2c.jpg?v=1560462107"],
        active: true
    },
    {
        id: "samsonite-scure-69-petrol",
        name: "Samsonite SCure Spinner 69cm Petrol Blue",
        brand: "SAMSONITE",
        price: 5299.00,
        compare_at_price: 0,
        category: "Hard Luggage",
        niche: "luggage",
        location: "Johannesburg",
        description: "Medium hardside check-in spinner, HS polypropylene, standard & lockable zippers.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/Samsonite-Gopals-Bags-Scure-13-June-2023-8_9207837d-898d-4b01-a54f-b8363a77eadf.png?v=1692694750",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/Samsonite-Gopals-Bags-Scure-13-June-2023-8_9207837d-898d-4b01-a54f-b8363a77eadf.png?v=1692694750"],
        active: true
    },
    {
        id: "samsonite-base-boost-3pc-set",
        name: "Samsonite Base Boost 3 Piece Set + 2 Free Luggage Gloves DUO 2.0",
        brand: "SAMSONITE",
        price: 9999.00,
        compare_at_price: 12499.00,
        category: "Luggage Sets",
        niche: "luggage",
        location: "Johannesburg",
        description: "55cm + 65cm + 75cm softside set with TWO free locking Luggage Glove DUO 2.0 covers.",
        badge: "🎁 Super Deal",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/49539-1041-03_ea48b677-3639-46b7-b39f-ae391e799929.jpg?v=1560460452",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/49539-1041-03_ea48b677-3639-46b7-b39f-ae391e799929.jpg?v=1560460452"],
        active: true
    },
    {
        id: "luggage-glove-eco-medium",
        name: "Luggage Glove ECO Love SA Medium",
        brand: "LUGGAGE GLOVES",
        price: 899.00,
        compare_at_price: 999.00,
        category: "Travel Accessories",
        niche: "accessories",
        location: "Johannesburg",
        description: "The world's only original locking luggage cover - no more plastic wrapping!",
        badge: "🇿🇦 SA Invention",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/Luggage_Glove_ECO_Love_SA_medium_front3qrtr.jpg?v=1758545694",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/Luggage_Glove_ECO_Love_SA_medium_front3qrtr.jpg?v=1758545694"],
        active: true
    },
    {
        id: "luggage-glove-eco-small",
        name: "Luggage Glove ECO Love SA Small",
        brand: "LUGGAGE GLOVES",
        price: 699.00,
        compare_at_price: 799.00,
        category: "Travel Accessories",
        niche: "accessories",
        location: "Johannesburg",
        description: "Locking eco cover for cabin-size spinners and trolleys.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/Luggage_Glove_ECO_Love_SA_small_front3qrtr.jpg?v=1758545808",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/Luggage_Glove_ECO_Love_SA_small_front3qrtr.jpg?v=1758545808"],
        active: true
    },
    {
        id: "luggage-glove-diamond-duo",
        name: "Luggage Glove Diamond 2.0 DUO Black",
        brand: "LUGGAGE GLOVES",
        price: 1300.00,
        compare_at_price: 0,
        category: "Travel Accessories",
        niche: "accessories",
        location: "Johannesburg",
        description: "The 'must-have' travel accessory - diamond mesh locking cover, fits medium & large.",
        badge: "✨ Popular",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/Luggage_Glove_Diamond_2-0_DUO_Black_handle.png?v=1747923278",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/Luggage_Glove_Diamond_2-0_DUO_Black_handle.png?v=1747923278"],
        active: true
    },
    {
        id: "cellini-business-handbag-46540",
        name: "Cellini Business Handbag 46540",
        brand: "CELLINI",
        price: 1995.00,
        compare_at_price: 2000.00,
        category: "Business Handbags",
        niche: "handbags",
        location: "Johannesburg",
        description: "Structured business handbag with top handles - boardroom ready.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/465405-2.jpg?v=1571956419",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/465405-2.jpg?v=1571956419"],
        active: true
    },
    {
        id: "cellini-megapak-large-bronze",
        name: "Cellini Large Megapak Luggage Bag Bronze",
        brand: "CELLINI",
        price: 3690.00,
        compare_at_price: 0,
        category: "Duffle Bags",
        niche: "luggage",
        location: "Johannesburg",
        description: "Extra-large wheeled megapak with durable build and smooth glide wheels.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/cellini-large-megapak-luggage-bag-bronze-main.jpg?v=1756391583",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/cellini-large-megapak-luggage-bag-bronze-main.jpg?v=1756391583"],
        active: true
    },
    {
        id: "cellini-diva-sling-cognac",
        name: "Cellini Diva NS Sling Bag Cognac",
        brand: "CELLINI",
        price: 1495.00,
        compare_at_price: 0,
        category: "Cross Over Bags",
        niche: "handbags",
        location: "Johannesburg",
        description: "Compact sling with gold zip and charm branding - luxury textured PU.",
        badge: "🆕 New",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/cellini-diva-ns-sling-bag-cognac_1.jpg?v=1755771735",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/cellini-diva-ns-sling-bag-cognac_1.jpg?v=1755771735"],
        active: true
    },
    {
        id: "polo-handbag-pos432102",
        name: "POLO Handbag POS432102",
        brand: "POLO",
        price: 2995.00,
        compare_at_price: 0,
        category: "Handbags",
        niche: "handbags",
        location: "Johannesburg",
        description: "Classic POLO leather-look handbag with signature hardware.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/01_c26b04a0-7791-44a3-8ab1-b7beca34adc8.jpg?v=1651144635",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/01_c26b04a0-7791-44a3-8ab1-b7beca34adc8.jpg?v=1651144635"],
        active: true
    },
    {
        id: "polo-chalbi-tote-cream",
        name: "POLO Chalbi Tote Bag Cream",
        brand: "POLO",
        price: 2399.00,
        compare_at_price: 0,
        category: "Shoppers & Totes",
        niche: "handbags",
        location: "Johannesburg",
        description: "Roomy structured tote in soft cream - everyday elegance.",
        badge: "✨ Popular",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/polo-chalbi-tote-bag-cream-main.jpg?v=1751449042",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/polo-chalbi-tote-bag-cream-main.jpg?v=1751449042"],
        active: true
    },
    {
        id: "polo-iconic-laptop-black",
        name: "POLO Iconic Medium Laptop Bag Black",
        brand: "POLO",
        price: 2795.00,
        compare_at_price: 0,
        category: "Business Handbags",
        niche: "handbags",
        location: "Johannesburg",
        description: "Padded laptop compartment, organiser pockets, detachable shoulder strap.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/medium-polo-iconic-laptop-bag-handbag-black-tag.jpg?v=1741859404",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/medium-polo-iconic-laptop-bag-handbag-black-tag.jpg?v=1741859404"],
        active: true
    },
    {
        id: "pierre-cardin-multi-tote",
        name: "Pierre Cardin Multi Tote",
        brand: "PIERRE CARDIN",
        price: 400.00,
        compare_at_price: 600.00,
        category: "Shoppers & Totes",
        niche: "handbags",
        location: "Johannesburg",
        description: "Value-for-money everyday tote from an iconic French house.",
        badge: "💥 Special",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/pierre-cardin-multi-tote_800x_ed9c354d-51ee-46a1-b8f1-92b96b57ac1a.jpg?v=1636662189",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/pierre-cardin-multi-tote_800x_ed9c354d-51ee-46a1-b8f1-92b96b57ac1a.jpg?v=1636662189"],
        active: true
    },
    {
        id: "serenade-cynthia-grip",
        name: "Serenade Cynthia Grip Handle Handbag",
        brand: "SERENADE",
        price: 4095.00,
        compare_at_price: 0,
        category: "Handbags",
        niche: "handbags",
        location: "Johannesburg",
        description: "Beverly Hills Collection wildflower grip-handle leather handbag - striking design.",
        badge: "⭐ Premium",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/seh26-0810_2.jpg?v=1676536754",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/seh26-0810_2.jpg?v=1676536754"],
        active: true
    },
    {
        id: "serenade-rae-tote",
        name: "Serenade Rae Tote - Allura Patent Leather",
        brand: "SERENADE",
        price: 4295.00,
        compare_at_price: 0,
        category: "Shoppers & Totes",
        niche: "handbags",
        location: "Johannesburg",
        description: "Two main zip compartments, interior slip pockets, custom gold metal fittings.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/29663_5_750x1000_a532181e-43b4-44bf-9686-63a503451e4d.jpg?v=1639221201",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/29663_5_750x1000_a532181e-43b4-44bf-9686-63a503451e4d.jpg?v=1639221201"],
        active: true
    },
    {
        id: "jo-borkett-regent-green",
        name: "Jo Borkett Regent Street Bag Green",
        brand: "JO BORKETT",
        price: 1799.00,
        compare_at_price: 0,
        category: "Handbags",
        niche: "handbags",
        location: "Johannesburg",
        description: "Shopper style with black metal hardware, zip close - look ultra chic.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/2_1333x_57b6c8ed-733b-457b-be45-886bebb8b0b7.webp?v=1676464628",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/2_1333x_57b6c8ed-733b-457b-be45-886bebb8b0b7.webp?v=1676464628"],
        active: true
    },
    {
        id: "jo-borkett-shopper-black",
        name: "Jo Borkett Shopper Bag Black",
        brand: "JO BORKETT",
        price: 1750.00,
        compare_at_price: 0,
        category: "Shoppers & Totes",
        niche: "handbags",
        location: "Johannesburg",
        description: "Understated black shopper with thick canvas straps and branded cover bag.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/jo-borkett-shopper-bag-black-base.jpg?v=1747734469",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/jo-borkett-shopper-bag-black-base.jpg?v=1747734469"],
        active: true
    },
    {
        id: "hedgren-rush-crossbody",
        name: "Hedgren Inner City Rush HIC23 Crossbody Black",
        brand: "HEDGREN",
        price: 1500.00,
        compare_at_price: 1900.00,
        category: "Cross Over Bags",
        niche: "handbags",
        location: "Johannesburg",
        description: "Slim RFID-protected crossbody with adjustable strap - partially recycled fabric.",
        badge: "💥 Special",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/Hedgren_Inner_City_Rush_HIC23_small_crossbody_handbag_black_front.jpg?v=1710842516",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/Hedgren_Inner_City_Rush_HIC23_small_crossbody_handbag_black_front.jpg?v=1710842516"],
        active: true
    },
    {
        id: "delsey-business-cho",
        name: "Delsey Business Handbag Chocolate DL00539",
        brand: "DELSEY",
        price: 5499.00,
        compare_at_price: 0,
        category: "Business Handbags",
        niche: "handbags",
        location: "Johannesburg",
        description: "French-designed business bag with laptop protection and premium finish.",
        badge: "⭐ Premium",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/DL00539-CHO-1.webp?v=1708434006",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/DL00539-CHO-1.webp?v=1708434006"],
        active: true
    },
    {
        id: "bella-bianca-amber-lavender",
        name: "Bella Bianca Amber Range Shopper Lavender",
        brand: "BELLA BIANCA",
        price: 1449.00,
        compare_at_price: 1700.00,
        category: "Shoppers & Totes",
        niche: "handbags",
        location: "Johannesburg",
        description: "Soft lavender shopper from the Amber range - feminine and functional.",
        badge: "💥 Special",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/bella-bianca-ladies-handbags-bella-bianca-ladies-shopper-amber-range-lavender-1130930518.webp?v=1755697121",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/bella-bianca-ladies-handbags-bella-bianca-ladies-shopper-amber-range-lavender-1130930518.webp?v=1755697121"],
        active: true
    },
    {
        id: "american-tourister-bon-air",
        name: "American Tourister Bon Air DLX Spinner TSA 55cm Midnight Navy",
        brand: "AMERICAN TOURISTER",
        price: 3499.00,
        compare_at_price: 0,
        category: "Hard Luggage",
        niche: "luggage",
        location: "Johannesburg",
        description: "Hardside cabin spinner with TSA lock and 4 double wheels.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/Gopals-Bags-Disney-Luggage-35-1.png?v=1636242181",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/Gopals-Bags-Disney-Luggage-35-1.png?v=1636242181"],
        active: true
    },
    {
        id: "adventure-duffle-75-red",
        name: "Adventure 75cm 600D Strong Duffle Bag Red",
        brand: "ADVENTURE",
        price: 550.00,
        compare_at_price: 0,
        category: "Duffle Bags",
        niche: "luggage",
        location: "Johannesburg",
        description: "Tough 600D polyester duffle - U-shape opening, side pockets, shoulder strap.",
        badge: "💪 Value",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/N-1101-1102-1103_81acfcb9-7627-46f8-bfc6-d1dadbc26cf3.jpg?v=1676019319",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/N-1101-1102-1103_81acfcb9-7627-46f8-bfc6-d1dadbc26cf3.jpg?v=1676019319"],
        active: true
    },
    {
        id: "stg-sports-65-black",
        name: "STG Large 65cm Sports Bag Black",
        brand: "STG COLLECTION",
        price: 699.00,
        compare_at_price: 0,
        category: "Sports Bags",
        niche: "lifestyle",
        location: "Johannesburg",
        description: "Large U-shape main compartment, rubber domes, thick webbing, quality zippers.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/files/DEFAULT_1024X1024_dce0f122-6f80-4ea3-bcc9-f62d760fcb2e.jpg?v=1755176284",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/files/DEFAULT_1024X1024_dce0f122-6f80-4ea3-bcc9-f62d760fcb2e.jpg?v=1755176284"],
        active: true
    },
    {
        id: "secrid-cardholder-red",
        name: "Secrid Slide Up Card Holder Red",
        brand: "SECRID",
        price: 650.00,
        compare_at_price: 0,
        category: "Wallets",
        niche: "accessories",
        location: "Johannesburg",
        description: "RFID-protected aluminium card case with slide-up mechanism.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/secrid-red-2.png?v=1678876872",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/secrid-red-2.png?v=1678876872"],
        active: true
    },
    {
        id: "brics-cosmetic-35",
        name: "Brics Life Cosmetic Bag 35cm Dark Blue",
        brand: "BRICS",
        price: 1899.00,
        compare_at_price: 0,
        category: "Travel Accessories",
        niche: "accessories",
        location: "Johannesburg",
        description: "Italian-styled cosmetic case in water-resistant fabric.",
        badge: "",
        image: "https://cdn.shopify.com/s/files/1/0061/9400/4050/products/brics-life-cosmetic-bag-dark-blue-35-cm-blf02530-396-35.jpg?v=1592684024",
        popupImages: ["https://cdn.shopify.com/s/files/1/0061/9400/4050/products/brics-life-cosmetic-bag-dark-blue-35-cm-blf02530-396-35.jpg?v=1592684024"],
        active: true
    }
];

// ─────────────────────────────────────────────
// 🌐 STATE
// ─────────────────────────────────────────────
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
    } catch (e) { return null; }
}

function setCachedProducts(products) {
    try { localStorage.setItem(CONFIG.CACHE_KEY, JSON.stringify({ products: products, timestamp: Date.now() })); } catch (e) {}
}

// 🔄 Fetch with caching + background refresh
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
                console.log('⚡ Loaded HSS Fashion products from cache (instant)');
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
        if (!arr.length) throw new Error('Empty payload');
        processProducts(arr);
        setCachedProducts(arr);
        console.log('✅ HSS Fashion products loaded from Google Sheets');
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
        if (!arr || !arr.length) return;
        const snapshot = JSON.stringify(arr);
        if (lastRawSnapshot === null) lastRawSnapshot = JSON.stringify(window.HSS_PRODUCTS || []);
        if (snapshot === lastRawSnapshot) return;
        lastRawSnapshot = snapshot;
        processProducts(arr);
        setCachedProducts(arr);
        console.log('🔄 Background refresh: newer HSS product data found');
        try { document.dispatchEvent(new CustomEvent('hssfashion:products:loaded', { detail: { products: PRODUCTS } })); } catch (e) {}
    } catch (e) {}
}

// 🔄 Process raw product rows (sheet or fallback)
function processProducts(rawProducts) {
    PRODUCTS_MAP = new Map();
    PRODUCTS = rawProducts.map(product => {
        const processed = {
            id: (product.id || "").toString().trim(),
            name: (product.name || "").trim(),
            brand: (product.brand || "").toString().trim().toUpperCase(),
            price: parseFloat(product.price) || 0,
            compare_at_price: parseFloat(product.compare_at_price || product.compareAtPrice) || 0,
            category: (product.category || "Handbags").trim(),
            niche: (product.niche || "handbags").trim(),
            location: (product.location || "Johannesburg").trim(),
            description: (product.description || "").trim(),
            badge: (product.badge || "").trim(),
            image: CONFIG.resolveImage(product.image),
            popupImages: (Array.isArray(product.popupImages) ? product.popupImages : String(product.popup_images || product.popupImages || "").split(/[,|]/).filter(s => s && s.trim())).map(img => CONFIG.resolveImage(img.trim())),
            imageFallback: CONFIG.fallbackImage,
            businessName: (product.businessName || product.businessname || CONFIG.businessName).trim(),
            businessLogo: CONFIG.resolveImage(product.businessLogo || product.businesslogo),
            whatsappNumber: (product.whatsappNumber || product.whatsappnumber || CONFIG.WHATSAPP_NUMBER).trim(),
            categorySlug: (product.categorySlug || product.category || "handbags").toString().toLowerCase().trim().replace(/\s+/g, '-'),
            nicheSlug: (product.niche || "handbags").toString().toLowerCase().trim().replace(/\s+/g, '-'),
            active: true
        };
        PRODUCTS_MAP.set(processed.id, processed);
        return processed;
    });
    window.HSS_PRODUCTS = PRODUCTS;
    window.HSS_DATA = PRODUCTS;
    window.HSS_FASHION_PRODUCTS = PRODUCTS;
    return PRODUCTS;
}

// 🛍️ CART SYSTEM ("Your Bag")
const Cart = {
    items: [],
    init() {
        try { this.items = JSON.parse(localStorage.getItem(CONFIG.CART_KEY) || '[]'); } catch (e) { this.items = []; }
        this.updateUI();
        return this.items;
    },
    async add(productId, quantity = 1) {
        const product = PRODUCTS_MAP.get(productId);
        if (!product) return false;
        const existing = this.items.find(i => i.id === productId);
        if (existing) existing.quantity += quantity;
        else this.items.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: quantity, addedAt: Date.now() });
        this.save(); this.updateUI();
        return true;
    },
    async remove(productId) { this.items = this.items.filter(i => i.id !== productId); this.save(); this.updateUI(); return true; },
    async updateQuantity(productId, quantity) {
        const item = this.items.find(i => i.id === productId);
        if (!item) return false;
        if (quantity <= 0) return await this.remove(productId);
        item.quantity = quantity; this.save(); this.updateUI();
        return true;
    },
    async clear() { this.items = []; this.save(); this.updateUI(); return true; },
    save() { try { localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(this.items)); } catch (e) {} },
    getCount() { return this.items.reduce((s, i) => s + i.quantity, 0); },
    getTotal() { return this.items.reduce((s, i) => s + (i.price * i.quantity), 0); },
    updateUI() {
        const count = this.getCount();
        document.querySelectorAll('.cart-count').forEach(el => { el.textContent = count; });
        const total = 'R' + this.getTotal().toFixed(2);
        document.querySelectorAll('.cart-total').forEach(el => { el.textContent = total; });
        if (typeof window.updateCartUI === 'function') window.updateCartUI(this.items);
    }
};

// 🛠️ PUBLIC API
window.HssProducts = {
    getAll: () => PRODUCTS,
    getById: (id) => PRODUCTS_MAP.get(id),
    getByCategory: (cat) => PRODUCTS.filter(p => p.categorySlug === cat.toLowerCase().replace(/\s+/g, '-')),
    getByBrand: (brand) => PRODUCTS.filter(p => (p.brand || '').toLowerCase() === brand.toLowerCase()),
    getWhatsAppLink: (product, phoneNumber) => {
        phoneNumber = phoneNumber || product.whatsappNumber || CONFIG.WHATSAPP_NUMBER;
        const msg = encodeURIComponent(`Hi HSS Fashion Playground! I'd like to order:\n\n👜 *${product.name}*\n💰 Price: R${product.price.toFixed(2)}\n\nPlease confirm availability.`);
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

window.HssCart = Cart;
window.HSS_WHATSAPP = window.HSS_WHATSAPP || CONFIG.WHATSAPP_NUMBER;

// 🚀 INIT
(async function init() {
    Cart.init();
    const inlineData = window.HSS_FASHION_PRODUCTS;
    if (Array.isArray(inlineData) && inlineData.length > 0) {
        processProducts(inlineData);
        setCachedProducts(inlineData);
        setTimeout(() => backgroundRefresh(), 1500);
    } else {
        await fetchProducts();
    }
    try { document.dispatchEvent(new CustomEvent('hssfashion:products:loaded', { detail: { products: PRODUCTS } })); } catch (e) {}
    console.log('👜 HSS Fashion Playground initialized – ' + PRODUCTS.length + ' products ready');
})();

// ========== PRODUCT SCHEMA (SEO) ==========
function generateProductSchema() {
    if (PRODUCTS.length === 0) return;
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "HSS Fashion Playground Catalog",
        "description": "Quality handbags, luggage, travel accessories and lifestyle essentials from Handbag Superstore - proudly South African.",
        "numberOfItems": PRODUCTS.length,
        "itemListElement": PRODUCTS.map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
                "@type": "Product",
                "name": p.name,
                "description": p.description,
                "sku": p.id,
                "image": (p.image || '').startsWith('http') ? p.image : 'https://hssfashion.co.za/' + p.image,
                "brand": { "@type": "Brand", "name": p.brand || "HSS Fashion Playground" },
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "ZAR",
                    "price": p.price.toFixed(2),
                    "availability": "https://schema.org/InStock",
                    "seller": { "@type": "Organization", "name": "Handbag Superstore" }
                }
            }
        }))
    };
    let el = document.getElementById('hssProductSchema');
    if (!el) {
        el = document.createElement('script');
        el.type = 'application/ld+json';
        el.id = 'hssProductSchema';
        document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
}

document.addEventListener('hssfashion:products:loaded', () => setTimeout(generateProductSchema, 500));
})();