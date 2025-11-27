// product_data.js
// Centralized product data for all businesses
// Structure: { id: unique_id, name: string, price: number, image: string, description: string, businessName: string, businessLogo: string, category: string (e.g., 'lollipops', 'chocolate', 'jelly-gums') }

const ALL_PRODUCTS = [
    // --- Broadway Sweets Products ---
    // Example based on provided Broadway data
    {
        id: 'broadway-1',
        name: 'Big Pops XXXL Cherry Plum Lollipops 48',
        price: 71.50,
        image: 'images-broadway-sweets/lolipops 8.jpg', // Ensure path is correct relative to index.html
        description: 'Giant lollipops in a delicious cherry plum flavor, perfect for sharing or a big treat.',
        businessName: 'Broadway Sweets',
        businessLogo: 'images-logo/broadway-sweets-logo.jpg', // Ensure path is correct relative to index.html
        category: 'lollipops',
        section: 'retail-shops' // Or 'home-businesses' depending on your classification
    },
    {
        id: 'broadway-2',
        name: 'Big Pops XXXL Guavadilla Lollipops 48',
        price: 71.50,
        image: 'images-broadway-sweets/Big Pops XXXL Guavadilla Lollipops 48 Product 2.jpg',
        description: 'Massive lollipops bursting with exotic guavadilla flavour. A sweet and tangy delight.',
        businessName: 'Broadway Sweets',
        businessLogo: 'images-logo/broadway-sweets-logo.jpg',
        category: 'lollipops',
        section: 'retail-shops'
    },
    {
        id: 'broadway-9',
        name: 'Fligos Eclair Milky Lollipops',
        price: 77.00,
        image: 'images-broadway-sweets/1..Fligos Eclair Milky Lollipops 48.jpg',
        description: 'Creamy, milky eclair flavored lollipops. A soft, sweet taste sensation.',
        businessName: 'Broadway Sweets',
        businessLogo: 'images-logo/broadway-sweets-logo.jpg',
        category: 'lollipops',
        section: 'retail-shops'
    },
    // Add more Broadway products here following the same structure...

    // --- Polar Ice Cream Products ---
    // Example based on provided Polar data
    {
        id: 'polar-1',
        name: 'Ankara Caramel & Nouga Chocolate 55g (24’s)',
        price: 93.90,
        image: 'images-sweetmart/Ankara-Caramel-&-Nouga-Chocolate-55g-(24’s)-chocolate.jpg', // Note: Using path from Sweet Mart file structure, adjust if needed
        description: 'A delicious chocolate bar.',
        businessName: 'Polar Ice Cream',
        businessLogo: 'images-logo/polar-ice-cream-logo.png',
        category: 'chocolate-bar',
        section: 'retail-shops' // Adjust section if necessary
    },
    // Add more Polar products here following the same structure...

    // --- Sweet Mart Products ---
    // Example based on provided Sweet Mart data
    {
        id: 'sweetmart-1',
        name: 'Mallowman Honey Plum 50’s',
        price: 33.90,
        image: 'images-sweetmart/Mallowman Honey Plum 50’s.jpg', // Ensure path is correct relative to index.html
        description: 'A chewy toffee treat.',
        businessName: 'Sweet Mart',
        businessLogo: 'images-logo/sweet-mart-logo.jpg',
        category: 'chewy-toffee',
        section: 'retail-shops' // Adjust section if necessary
    },
    // Add more Sweet Mart products here following the same structure...

    // --- Add products from other businesses similarly ---

];

// Optional: Create a lookup object for faster product retrieval by ID if needed elsewhere
const PRODUCT_LOOKUP = {};
ALL_PRODUCTS.forEach(product => {
    PRODUCT_LOOKUP[product.id] = product;
});

// Export data if using modules (not strictly needed for script tag inclusion)
// export { ALL_PRODUCTS, PRODUCT_LOOKUP };