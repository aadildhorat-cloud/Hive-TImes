/**
🍦 Polar Ice Cream - Centralized Product Data & Utilities
📁 Recommended Path: /polaricecream/js/products-polaricecream.js
🔗 Usage: Include this exact script on BOTH Hive Times & POLAR ICE CREAM pages.
✅ Edit the RAW_PRODUCTS array below → Auto-syncs across all linked sites.
*/
(function () {
  // 📌 ASSET CONFIGURATION
  const CONFIG = {
    basePath: "",
    imageDir: "images-polar-ice-cream",
    fallbackImage: "images-logo/polar-ice-cream-logo.png",
    businessName: "Polar Ice Cream",
    businessLogo: "images-logo/polar-ice-cream-logo.png"
  };

  // 📦 RAW PRODUCT DATA - ✏️ EDIT THIS ARRAY TO UPDATE EVERYWHERE
  const RAW_PRODUCTS = [
    // === ICUP PREMIUM DAIRY ===
    { id: "icup-premium", name: "iCUP Premium Dairy Ice Cream", price: 410, category: "icup-premium", niche: "frozen-desserts", location: "gauteng", description: "Premium dairy ice cream cup. Box of 24: R410 | Per Unit: R17.08", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/286b4a414-85d4-463a-9351-a60baa8259202114.png" },

    // === ICONE ===
    { id: "icone", name: "iCone", price: 189, category: "icone", niche: "frozen-desserts", location: "gauteng", description: "Ice cream cone. Box of 15: R189 | Per Unit: R12.60", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259207785.png" },

    // === COCOMINT / CARAMELLO / CHOC 99 ===
    { id: "cocomint", name: "Cocomint Lollie", price: 189, category: "cocomint-caramello-choc99", niche: "frozen-desserts", location: "gauteng", description: "Coconut & mint ice lolly. Box of 20: R189 | Per Unit: R9.45", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },
    { id: "caramello", name: "Caramello Lollie", price: 189, category: "cocomint-caramello-choc99", niche: "frozen-desserts", location: "gauteng", description: "Caramel filled ice lolly. Box of 20: R189 | Per Unit: R9.45", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },
    { id: "choc99", name: "Choc 99 Lollie", price: 189, category: "cocomint-caramello-choc99", niche: "frozen-desserts", location: "gauteng", description: "Chocolate dipped ice lolly. Box of 20: R189 | Per Unit: R9.45", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },

    // === GRANADILLA SHERBET ===
    { id: "granadilla-sherbet", name: "Granadilla Sherbet", price: 189, category: "granadilla-sherbet", niche: "frozen-desserts", location: "gauteng", description: "Refreshing granadilla sherbet lolly. Box of 20: R189 | Per Unit: R9.45", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/386b4a414-85d4-463a-9351-a60baa8259205070.png" },

    // === RAVE ===
    { id: "rave", name: "Rave!", price: 115, category: "rave", niche: "frozen-desserts", location: "gauteng", description: "Fruit swirl ice lolly. Box of 20: R115 | Per Unit: R5.75", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259201078.png" },

    // === SUNDAE ===
    { id: "sundae", name: "Sundae", price: 287, category: "sundae", niche: "frozen-desserts", location: "gauteng", description: "Ice cream sundae cup. Box of 24: R287 | Per Unit: R11.96", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/286b4a414-85d4-463a-9351-a60baa8259202114.png" },

    // === NOT JUST ANY TUBS ===
    { id: "nja-2l", name: "Not Just Any 2L Tub", price: 60.00, category: "not-just-any-tub", niche: "frozen-desserts", location: "gauteng", description: "2 Litre tub - Various flavours available", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/386b4a414-85d4-463a-9351-a60baa8259204838.png" },
    { id: "nja-5l", name: "Not Just Any 5L Tub", price: 115.00, category: "not-just-any-tub", niche: "frozen-desserts", location: "gauteng", description: "5 Litre tub - Various flavours available", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/386b4a414-85d4-463a-9351-a60baa8259204838.png" },

    // === NOT JUST ANY 500ML CUPS ===
    { id: "nja-500ml", name: "Not Just Any 500ml Cup", price: 205, category: "not-just-any-cups", niche: "frozen-desserts", location: "gauteng", description: "500ml premium cup. Box of 12: R205 | Per Unit: R17.08", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/186b4a414-85d4-463a-9351-a60baa8259208348.png" },

    // === CANNOLI ===
    { id: "cannoli", name: "Cannoli", price: 285, category: "cannoli", niche: "frozen-desserts", location: "gauteng", description: "Wafer biscuit with dairy ice cream & milk chocolate. Box of 20: R285 | Per Unit: R14.25", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },

    // === KISSES ===
    { id: "kisses", name: "Kisses", price: 160, category: "kisses", niche: "frozen-desserts", location: "gauteng", description: "Mini chocolate kisses. Box of 24: R160 | Per Unit: R6.67", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },

    // === GUILT FREE ===
    { id: "guilt-free-1l", name: "Guilt Free Dairy Ice Cream 1L", price: 95.00, category: "guilt-free", niche: "frozen-desserts", location: "gauteng", description: "No added sugar dairy ice cream. Per 1 Litre: R95", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },

    // === PREMIER DAIRY ICE CREAM ===
    { id: "premier-dairy-2l", name: "Premier Dairy Ice Cream 2L", price: 112.00, category: "premier-dairy", niche: "frozen-desserts", location: "gauteng", description: "Premium dairy ice cream 2L - Flavours: Double Vanilla, Swiss Chocolate, Fresh Strawberry, Blueberry Cheesecake, Burfee, Mango Coconut & more", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259209383.png" },
    { id: "premier-dairy-5l", name: "Premier Dairy Ice Cream 5L", price: 209.00, category: "premier-dairy", niche: "frozen-desserts", location: "gauteng", description: "Premium dairy ice cream 5L - Flavours: Double Vanilla, Swiss Chocolate, Fresh Strawberry, Blueberry Cheesecake, Burfee, Mango Coconut & more", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259209383.png" },

    // === MAXI CLASSIC ===
    { id: "maxi-classic", name: "Maxi Classic", price: 195, category: "maxi", niche: "frozen-desserts", location: "gauteng", description: "Classic maxi ice cream bar. Box of 12: R195 | Per Unit: R16.25", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/186b4a414-85d4-463a-9351-a60baa8259208754.png" },
    { id: "maxi-white-almond", name: "Maxi White Almond", price: 195, category: "maxi", niche: "frozen-desserts", location: "gauteng", description: "White almond maxi bar. Box of 12: R195 | Per Unit: R16.25", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259203063.png" },
    { id: "maxi-almond", name: "Maxi Almond", price: 195, category: "maxi", niche: "frozen-desserts", location: "gauteng", description: "Crunchy almond maxi bar. Box of 12: R195 | Per Unit: R16.25", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259203063.png" },

    // === MAXI DAIRY PREMIUM ===
    { id: "maxi-ruby-chocolate", name: "Maxi Ruby Chocolate", price: 145, category: "maxi-dairy", niche: "frozen-desserts", location: "gauteng", description: "Ruby chocolate dairy maxi. Box of 6: R145 | Per Unit: R24.17", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259203063.png" },
    { id: "maxi-chocolate-therapy", name: "Maxi Chocolate Therapy", price: 145, category: "maxi-dairy", niche: "frozen-desserts", location: "gauteng", description: "Rich chocolate therapy maxi. Box of 6: R145 | Per Unit: R24.17", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259203063.png" },

    // === SIGNATURE RANGE CUPS ===
    { id: "signature-500ml", name: "Signature Range 500ml Cup", price: 96.00, category: "signature-range", niche: "frozen-desserts", location: "gauteng", description: "Premium signature cup. Per 500ml: R96", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/186b4a414-85d4-463a-9351-a60baa8259208348.png" },

    // === POLAR BUCKETS ===
    { id: "polar-bucket-2-5l", name: "Polar Ice Cream Bucket 2.5L", price: 59.00, category: "polar-buckets", niche: "frozen-desserts", location: "gauteng", description: "2.5L bucket - Flavours: Vanilla, Rainbow, Choc Chip, Choc Mint, Neapolitan, Bubblegum, Choc Vanilla, Black Forest, Banana Delight, Blueberry Cheesecake", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259206875.png" },
    { id: "polar-bucket-5l", name: "Polar Ice Cream Bucket 5L", price: 99.00, category: "polar-buckets", niche: "frozen-desserts", location: "gauteng", description: "5L bucket - Multiple flavours available", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259206875.png" },
    { id: "polar-bucket-10l", name: "Polar Ice Cream Bucket 10L", price: 165.00, category: "polar-buckets", niche: "frozen-desserts", location: "gauteng", description: "10L catering bucket - Multiple flavours available", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259206875.png" },

    // === SOFT SERVE MIX ===
    { id: "soft-serve-catering-5l", name: "Soft Serve Mix Catering 5L", price: 139.00, category: "soft-serve", niche: "frozen-desserts", location: "gauteng", description: "Catering soft serve mix - Vanilla or Strawberry. Per 5 Litre: R139", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/575328cfb-bb13-44b0-9699-2cc4738bd3054395.png" },
    { id: "soft-serve-premier-5l", name: "Soft Serve Mix Premier 5L", price: 172.00, category: "soft-serve", niche: "frozen-desserts", location: "gauteng", description: "Premier soft serve mix - Vanilla or Chocolate. Per 5 Litre: R172", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/575328cfb-bb13-44b0-9699-2cc4738bd3054395.png" },

    // === POLAR MILKY ===
    { id: "polar-milky", name: "Polar Milky", price: 65, category: "polar-milky", niche: "frozen-desserts", location: "gauteng", description: "Milk-based ice lolly sachet. Bag of 30: R65 | Per Unit: R2.17", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3052716.png" },

    // === FRUITY LICKS ===
    { id: "fruity-licks", name: "Fruity Licks", price: 75, category: "fruity-licks", niche: "frozen-desserts", location: "gauteng", description: "Fruit flavoured ice lolly. Box of 30: R75 | Per Unit: R2.50", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259207503.png" },

    // === STRAWBERRY SENSATION ===
    { id: "strawberry-sensation", name: "Strawberry Sensation", price: 84, category: "strawberry-sensation", niche: "frozen-desserts", location: "gauteng", description: "Strawberry fruit ice. Box of 30: R84 | Per Unit: R2.80", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },

    // === FLOAT ===
    { id: "float", name: "Float", price: 97, category: "float", niche: "frozen-desserts", location: "gauteng", description: "Vanilla ice cream in fruit ice shell. Box of 20: R97 | Per Unit: R4.85", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/175328cfb-bb13-44b0-9699-2cc4738bd3051648.png" },

    // === EISH ===
    { id: "eish", name: "Eish!", price: 115, category: "eish", niche: "frozen-desserts", location: "gauteng", description: "Mixed fruit explosion ice lolly. Box of 20: R115 | Per Unit: R5.75", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/286b4a414-85d4-463a-9351-a60baa8259207237.png" },

    // === ICE LOLLIES ASSORTED ===
    { id: "ice-lollies-tropical", name: "Ice Lolly - Tropical", price: 75, category: "ice-lollies", niche: "frozen-desserts", location: "gauteng", description: "Tropical fruit ice. Box of 30: R75 | Per Unit: R2.50", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/186b4a414-85d4-463a-9351-a60baa8259206530.png" },
    { id: "ice-lollies-lemonade", name: "Ice Lolly - Lemonade", price: 75, category: "ice-lollies", niche: "frozen-desserts", location: "gauteng", description: "Lemonade fruit ice. Box of 30: R75 | Per Unit: R2.50", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259206737.png" },
    { id: "ice-lollies-apple", name: "Ice Lolly - Apple", price: 75, category: "ice-lollies", niche: "frozen-desserts", location: "gauteng", description: "Apple fruit ice. Box of 30: R75 | Per Unit: R2.50", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259206737.png" },
    { id: "ice-lollies-berry-blast", name: "Ice Lolly - Berry Blast", price: 75, category: "ice-lollies", niche: "frozen-desserts", location: "gauteng", description: "Mixed berry fruit ice. Box of 30: R75 | Per Unit: R2.50", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259206737.png" },
    { id: "ice-lollies-polar-pop", name: "Ice Lolly - Polar Pop Raspberry", price: 75, category: "ice-lollies", niche: "frozen-desserts", location: "gauteng", description: "Raspberry polar pop. Box of 30: R75 | Per Unit: R2.50", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259206737.png" },

    // === WOZA GOAL ===
    { id: "woza-chocolate", name: "Woza Goal - Chocolate & Vanilla", price: 85, category: "woza", niche: "frozen-desserts", location: "gauteng", description: "Soccer ball shaped ice cream. Box of 16: R85 | Per Unit: R5.31", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },
    { id: "woza-vanilla", name: "Woza Goal - Vanilla", price: 85, category: "woza", niche: "frozen-desserts", location: "gauteng", description: "Soccer ball shaped vanilla ice cream. Box of 16: R85 | Per Unit: R5.31", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },

    // === THREE IN ONE ===
    { id: "three-in-one-polar-split", name: "Three in One - Polar Split", price: 97, category: "three-in-one", niche: "frozen-desserts", location: "gauteng", description: "Triple flavour ice lolly. Box of 30: R97 | Per Unit: R3.23", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },
    { id: "three-in-one-just-jolly", name: "Three in One - Just Jolly", price: 97, category: "three-in-one", niche: "frozen-desserts", location: "gauteng", description: "Triple flavour jolly lolly. Box of 30: R97 | Per Unit: R3.23", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },

    // === ASSORTED LOLLIES ===
    { id: "assorted-custard-jelly", name: "Assorted Lolly - Custard & Jelly", price: 115, category: "assorted-lollies", niche: "frozen-desserts", location: "gauteng", description: "Custard and jelly combo lolly. Box of 30: R115 | Per Unit: R3.83", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },
    { id: "assorted-balkan", name: "Assorted Lolly - Balkan", price: 115, category: "assorted-lollies", niche: "frozen-desserts", location: "gauteng", description: "Balkan flavoured lolly. Box of 30: R115 | Per Unit: R3.83", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },

    // === CHOC OVERLOAD / BANANA PARTY ===
    { id: "choc-overload", name: "Choc Overload", price: 115, category: "choc-banana", niche: "frozen-desserts", location: "gauteng", description: "Triple chocolate ice lolly. Box of 30: R115 | Per Unit: R3.83", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/186b4a414-85d4-463a-9351-a60baa8259207000.png" },
    { id: "banana-party", name: "Banana Party", price: 115, category: "choc-banana", niche: "frozen-desserts", location: "gauteng", description: "Banana flavoured ice lolly. Box of 30: R115 | Per Unit: R3.83", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },

    // === ASSORTED BARS ===
    { id: "bar-lemon", name: "Bar - Lemon", price: 115, category: "assorted-bars", niche: "frozen-desserts", location: "gauteng", description: "Lemon flavoured ice bar. Box of 30: R115 | Per Unit: R3.83", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/286b4a414-85d4-463a-9351-a60baa8259203731.png" },
    { id: "bar-granadilla", name: "Bar - Granadilla", price: 115, category: "assorted-bars", niche: "frozen-desserts", location: "gauteng", description: "Granadilla flavoured ice bar. Box of 30: R115 | Per Unit: R3.83", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/286b4a414-85d4-463a-9351-a60baa8259203731.png" },

    // === COCONUT BAR ===
    { id: "coconut-bar", name: "Coconut Bar", price: 115, category: "coconut-bar", niche: "frozen-desserts", location: "gauteng", description: "Coconut ice cream bar. Box of 15: R115 | Per Unit: R7.67", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3059190.png" },

    // === MILKY PIE ===
    { id: "milky-pie", name: "Milky Pie", price: 158, category: "milky-pie", niche: "frozen-desserts", location: "gauteng", description: "Creamy milk pie ice cream. Box of 25: R158 | Per Unit: R6.32", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/186b4a414-85d4-463a-9351-a60baa8259205201.png" },
    { id: "milky-pie-almond", name: "Milky Pie Almond", price: 179, category: "milky-pie", niche: "frozen-desserts", location: "gauteng", description: "Almond crunchy milk pie. Box of 25: R179 | Per Unit: R7.16", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/086b4a414-85d4-463a-9351-a60baa8259204025.png" },

    // === POLAR SANDWICH ===
    { id: "polar-sandwich", name: "Polar Sandwich", price: 158, category: "polar-sandwich", niche: "frozen-desserts", location: "gauteng", description: "Ice cream sandwich wafer. Box of 24: R158 | Per Unit: R6.58", image: "https://image.qwenlm.ai/public_source/ea0842ba-66cb-4389-b0bb-541399ddd9a8/075328cfb-bb13-44b0-9699-2cc4738bd3055500.png" }
  ];

  // 🔄 Process & Attach Metadata
  const PROCESSED = RAW_PRODUCTS.map(product => ({
    ...product,
    image: product.image || `${CONFIG.basePath}${CONFIG.imageDir}/${product.id}.jpg`,
    imageFallback: `${CONFIG.basePath}${CONFIG.fallbackImage}`,
    businessName: product.businessName || CONFIG.businessName,
    businessLogo: `${CONFIG.basePath}${CONFIG.fallbackImage}`,
    categorySlug: product.category.trim().toLowerCase(),
    locationSlug: product.location?.trim().toLowerCase() || "gauteng",
    nicheSlug: product.niche?.trim().toLowerCase() || "frozen-desserts"
  }));

  // 🌐 Global Export
  window.POLAR_ICE_CREAM_PRODUCTS = PROCESSED;
  window.POLAR_DATA = PROCESSED;

  // 🛠️ Utility API
  window.PolarProducts = {
    getAll: () => window.POLAR_ICE_CREAM_PRODUCTS,
    getById: (id) => window.POLAR_ICE_CREAM_PRODUCTS.find(p => p.id === id),
    getByCategory: (category) => window.POLAR_ICE_CREAM_PRODUCTS.filter(p => p.categorySlug === category.toLowerCase()),
    getByLocation: (location) => window.POLAR_ICE_CREAM_PRODUCTS.filter(p => p.locationSlug === location.toLowerCase()),
    getByNiche: (niche) => window.POLAR_ICE_CREAM_PRODUCTS.filter(p => p.nicheSlug === niche.toLowerCase()),
    filter: ({ category, location, niche }) => window.POLAR_ICE_CREAM_PRODUCTS.filter(p => {
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
               data-image="${p.image}">
        
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
    
    getWhatsAppLink: (product, phoneNumber = "27604368376") => {
      const msg = encodeURIComponent(
        `Hi! I'd like to order from Polar Ice Cream:\n\n` +
        `🍦 *${product.name}*\n` +
        `💰 Price: R${product.price.toFixed(2)}\n` +
        `📝 ${product.description}\n\n` +
        `Please confirm availability and delivery. Thank you!`
      );
      return `https://wa.me/${phoneNumber}?text=${msg}`;
    }
  };

  // 📊 Dev Console
  console.group("🍦 Polar Ice Cream Products Synced");
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