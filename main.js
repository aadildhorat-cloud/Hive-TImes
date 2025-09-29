<script>
        // --- User Authentication System ---
        let currentUser = null;
        // Check if user is logged in (from localStorage)
        function checkUserLogin() {
            const savedUser = localStorage.getItem('hiveTimesUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                updateUserUI();
            }
        }
        // Update UI based on user login status
        function updateUserUI() {
            if (currentUser) {
                document.getElementById('userDisplay').textContent = 'My Account';
                document.getElementById('userName').textContent = currentUser.name;
                document.getElementById('userEmail').textContent = currentUser.email;
                document.getElementById('userBtn').addEventListener('click', toggleUserProfile);
            } else {
                document.getElementById('userDisplay').textContent = 'Account';
                document.getElementById('userBtn').addEventListener('click', showLoginPopup);
            }
        }
        // Toggle user profile dropdown
        function toggleUserProfile() {
            const userProfile = document.getElementById('userProfile');
            userProfile.classList.toggle('active');
        }
        // Logout function
        function logout() {
            currentUser = null;
            localStorage.removeItem('hiveTimesUser');
            document.getElementById('userProfile').classList.remove('active');
            updateUserUI();
            alert('You have been logged out successfully!');
        }
        // --- Login Popup Script ---
        const loginPopup = document.getElementById('loginPopup');
        const loginForm = document.getElementById('loginForm');
        function showLoginPopup() {
            loginPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            loginPopup.setAttribute('aria-hidden', 'false');
            loginForm.querySelector('input').focus();
        }
        function hideLoginPopup() {
            loginPopup.style.display = 'none';
            document.body.style.overflow = '';
            loginPopup.setAttribute('aria-hidden', 'true');
        }
        // Handle login form submission
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = this.loginEmail.value;
            const password = this.loginPassword.value;
            // Get registered users from localStorage
            const users = JSON.parse(localStorage.getItem('hiveTimesUsers') || '[]');
            // Find user with matching email and password
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                // Login successful
                currentUser = {
                    name: user.name,
                    email: user.email
                };
                // Save to localStorage
                localStorage.setItem('hiveTimesUser', JSON.stringify(currentUser));
                // Update UI
                updateUserUI();
                // Hide popup
                hideLoginPopup();
                // Show success message
                alert('Login successful! Welcome back, ' + currentUser.name);
            } else {
                // Login failed
                alert('Invalid email or password. Please try again.');
            }
        });
        // --- Register Popup Script ---
        const registerPopup = document.getElementById('registerPopup');
        const registerForm = document.getElementById('registerForm');
        function showRegisterPopup() {
            registerPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            registerPopup.setAttribute('aria-hidden', 'false');
            registerForm.querySelector('input').focus();
        }
        function hideRegisterPopup() {
            registerPopup.style.display = 'none';
            document.body.style.overflow = '';
            registerPopup.setAttribute('aria-hidden', 'true');
        }
        // Handle register form submission
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = this.registerName.value;
            const email = this.registerEmail.value;
            const password = this.registerPassword.value;
            const confirmPassword = this.registerConfirmPassword.value;
            // Validate password match
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }
            // Get existing users
            let users = JSON.parse(localStorage.getItem('hiveTimesUsers') || '[]');
            // Check if email already exists
            if (users.some(u => u.email === email)) {
                alert('An account with this email already exists. Please login or use a different email.');
                return;
            }
            // Create new user
            const newUser = {
                name: name,
                email: email,
                password: password
            };
            // Add to users array
            users.push(newUser);
            // Save to localStorage
            localStorage.setItem('hiveTimesUsers', JSON.stringify(users));
            // Show success message
            alert('Account created successfully! You can now login with your credentials.');
            // Hide register popup and show login popup
            hideRegisterPopup();
            showLoginPopup();
            // Reset form
            registerForm.reset();
        });
        // --- Generic Popup Script ---
        const genericPopup = document.getElementById('myPopup');
        const popupTitle = document.getElementById('popup-title');
        const popupText = document.getElementById('popup-text');
        const closeButton = genericPopup.querySelector('.close-button');
        const openPopupButtons = document.querySelectorAll('.open-popup');
        // Define content for each popup
        const popupContents = {
            broadwaysweetsPopup: {
                title: "About Broadway Sweets",
                text: "Broadway Sweets is a premier destination for traditional Indian sweets and desserts. Established with a passion for authentic flavors, we craft our products using time-honored recipes passed down through generations. Our commitment to quality ingredients and traditional methods ensures that every bite delivers the rich, authentic taste of Indian confectionery. From festive specialties to everyday treats, Broadway Sweets brings the sweetness of tradition to your table."
            },
            sweetdeportPopup: {
                title: "About Sweet Depot",
                text: "Sweet Depot is your comprehensive source for a wide variety of sweets, snacks, and confectionery items from around the world. Our mission is to bring joy to every occasion with our diverse selection of quality products. Whether you're looking for traditional favorites or international treats, Sweet Depot offers something for every palate. With a focus on customer satisfaction and competitive pricing, we've become a trusted name in the confectionery industry."
            },
            sweetmartPopup: {
                title: "About Sweet Mart",
                text: "Sweet Mart has been serving sweet lovers for over two decades with our extensive range of quality sweets, snacks, and confectionery. Our stores are designed to be a paradise for those with a sweet tooth, offering everything from traditional Indian mithai to international chocolates and candies. We pride ourselves on our customer service, product quality, and unbeatable value. Sweet Mart is more than just a store – it's a destination for creating sweet memories."
            },
            polaricecreampopup: {
                title: "About Polar Ice Cream",
                text: "Polar Ice Cream brings the chill to your summer days with our delicious range of premium ice creams and frozen desserts. Using only the finest ingredients and innovative recipes, we create ice creams that delight the senses. From classic vanilla and chocolate to exotic flavors inspired by global cuisines, Polar Ice Cream offers something for everyone. Our commitment to quality and innovation has made us a favorite among ice cream lovers of all ages."
            },
            sunrisesweetsPopup: {
                title: "About Sunrise Sweets",
                text: "Sunrise Sweets specializes in morning treats and breakfast desserts that start your day on a sweet note. Our products are crafted to complement your morning tea or coffee, offering a perfect balance of sweetness and flavor. From light pastries to traditional breakfast sweets, Sunrise Sweets uses quality ingredients to create products that are both delicious and satisfying. We believe that every day should begin with a touch of sweetness."
            },
            zandsweetsPopup: {
                title: "About Z and S Sweets",
                text: "Z and S Sweets represents generations of expertise in traditional sweet-making. Our products are crafted using time-honored methods and recipes that have been perfected over decades. Specializing in authentic regional specialties, we bring the rich heritage of Indian confectionery to discerning customers. Each sweet is made with care and attention to detail, ensuring consistent quality and authentic flavor. Z and S Sweets is a name synonymous with tradition and quality."
            },
            desertsweetsPopup: {
                title: "About Desert Sweets",
                text: "Desert Sweets draws inspiration from the rich culinary traditions of the Middle East, creating unique sweets that blend ancient flavors with modern techniques. Our products feature ingredients like dates, pistachios, rose water, and saffron, creating distinctive flavors that transport you to the heart of the desert. Whether you're enjoying our baklava, halva, or other specialties, Desert Sweets offers a taste of Middle Eastern hospitality and tradition."
            },
            royalsweetsPopup: {
                title: "About Royal Sweets",
                text: "Royal Sweets offers a premium line of luxury confectionery fit for royalty. Our products feature the finest ingredients, exquisite presentation, and innovative flavor combinations. From gold-leaf chocolates to truffles infused with rare spices, Royal Sweets creates memorable experiences through exceptional quality and craftsmanship. Perfect for special occasions and gift-giving, our sweets are designed to impress and delight even the most discerning palates."
            },
            goldensweetsPopup: {
                title: "About Golden Sweets",
                text: "Golden Sweets represents the pinnacle of luxury confectionery, featuring edible gold and the finest ingredients for special occasions. Our master confectioners combine traditional techniques with innovative designs to create sweets that are as beautiful as they are delicious. From gold-dusted chocolates to intricately designed mithai, Golden Sweets transforms ordinary treats into extraordinary experiences. Perfect for weddings, anniversaries, and other milestone celebrations."
            }
        };
        function openGenericPopup(contentKey) {
            const content = popupContents[contentKey];
            if (content) {
                popupTitle.textContent = content.title;
                popupText.textContent = content.text;
                genericPopup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                genericPopup.setAttribute('aria-hidden', 'false');
                closeButton.focus();
            } else {
                console.error('Popup content not found for key:', contentKey);
                closeGenericPopup();
            }
        }
        function closeGenericPopup() {
            genericPopup.style.display = 'none';
            popupTitle.textContent = '';
            popupText.textContent = '';
            document.body.style.overflow = '';
            genericPopup.setAttribute('aria-hidden', 'true');
        }
        openPopupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetKey = button.getAttribute('data-popup-target');
                if (targetKey) {
                    openGenericPopup(targetKey);
                    button.setAttribute('aria-expanded', 'true');
                }
            });
        });
        closeButton.addEventListener('click', closeGenericPopup);
        genericPopup.addEventListener('click', function(event) {
            if (event.target === genericPopup) {
                closeGenericPopup();
            }
        });
        // --- Contact Popup Script ---
        const contactPopup = document.getElementById('contactPopup');
        const overlay = document.querySelector('.overlay');
        function showContactPopup() {
            contactPopup.style.display = 'block';
            overlay.style.display = 'block';
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            contactPopup.setAttribute('aria-hidden', 'false');
            contactPopup.querySelector('button').focus(); 
        }
        function hideContactPopup() {
            contactPopup.style.display = 'none';
            overlay.classList.remove('active');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            contactPopup.setAttribute('aria-hidden', 'true');
        }
        overlay.addEventListener('click', hideContactPopup);
        // --- Dropdown Menu Accessibility ---
        const dropdownBtn = document.getElementById('businessesDropdownBtn');
        const dropdownContent = document.getElementById('businessesDropdownContent');
        const dropdownLi = dropdownBtn.closest('.dropdown');
        dropdownBtn.addEventListener('click', () => {
            const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
            dropdownBtn.setAttribute('aria-expanded', String(!isExpanded));
            dropdownLi.setAttribute('aria-expanded', String(!isExpanded));
        });
        // Close dropdown if clicking outside
        document.addEventListener('click', (event) => {
            if (!dropdownLi.contains(event.target) && dropdownBtn.getAttribute('aria-expanded') === 'true') {
                dropdownBtn.setAttribute('aria-expanded', 'false');
                dropdownLi.setAttribute('aria-expanded', 'false');
            }
            // Close user profile if clicking outside
            const userMenu = document.querySelector('.user-menu');
            const userProfile = document.getElementById('userProfile');
            if (!userMenu.contains(event.target) && userProfile.classList.contains('active')) {
                userProfile.classList.remove('active');
            }
        });
        // --- Toggle between Login and Register forms ---
        document.getElementById('showRegister').addEventListener('click', function(e) {
            e.preventDefault();
            hideLoginPopup();
            showRegisterPopup();
        });
        document.getElementById('showLogin').addEventListener('click', function(e) {
            e.preventDefault();
            hideRegisterPopup();
            showLoginPopup();
        });
        // --- Logout button event listener ---
        document.getElementById('logoutBtn').addEventListener('click', logout);
        // --- Slider functionality ---
        let currentSlide = 0;
        const slider = document.getElementById('slider');
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        const sliderContainer = document.getElementById('sliderContainer');
        let slideInterval;
        const SLIDE_DURATION = 4000; // 4 seconds
        function showSlide(index) {
            // Ensure index is within bounds
            currentSlide = (index + slides.length) % slides.length;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === currentSlide);
                ind.setAttribute('aria-selected', i === currentSlide);
            });
            // Update aria-controls for accessibility
            slides.forEach((slide, i) => {
                slide.id = `slide${i + 1}`;
            });
            if (indicators[currentSlide]) {
                indicators[currentSlide].setAttribute('aria-controls', `slide${currentSlide + 1}`);
            }
        }
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        function changeSlide(index) {
            clearInterval(slideInterval); // Stop auto-slide when manual change
            showSlide(index);
            startSlider(); // Restart auto-slide
        }
        function startSlider() {
            slideInterval = setInterval(nextSlide, SLIDE_DURATION);
        }
        // Pause/Resume on hover
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            sliderContainer.addEventListener('mouseleave', () => {
                startSlider();
            });
        }
        // Initialize indicators and start slider
        showSlide(0);
        startSlider();
        // --- Keyboard Accessibility for Popups and Dropdown ---
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                if (genericPopup.style.display === 'flex') {
                    closeGenericPopup();
                }
                if (contactPopup.style.display === 'block') {
                    hideContactPopup();
                }
                if (loginPopup.style.display === 'flex') {
                    hideLoginPopup();
                }
                if (registerPopup.style.display === 'flex') {
                    hideRegisterPopup();
                }
                if (dropdownBtn.getAttribute('aria-expanded') === 'true') {
                    dropdownBtn.setAttribute('aria-expanded', 'false');
                    dropdownLi.setAttribute('aria-expanded', 'false');
                    dropdownBtn.focus();
                }
                if (document.getElementById('userProfile').classList.contains('active')) {
                    document.getElementById('userProfile').classList.remove('active');
                }
                if (document.getElementById('cartModal').style.display === 'flex') {
                    hideCartModal();
                }
            }
        });
        // --- Animate blocks on page load ---
        document.addEventListener('DOMContentLoaded', function() {
            // Check if user is already logged in
            checkUserLogin();
            updateUserUI();
            // Initialize cart
            initCart();
            // Add event listener for cart button
            document.getElementById('cartBtn').addEventListener('click', showCartModal);
        });
        // --- Search Functionality ---
        const searchInput = document.getElementById('searchInput');
        const businessBlocks = document.querySelectorAll('.block');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            businessBlocks.forEach(block => {
                const businessName = block.querySelector('h3').textContent.toLowerCase();
                const businessDescription = block.querySelector('p').textContent.toLowerCase();
                if (businessName.includes(searchTerm) || businessDescription.includes(searchTerm)) {
                    block.style.display = 'block';
                    block.style.opacity = '1';
                } else {
                    block.style.display = 'none';
                    block.style.opacity = '0.5';
                }
            });
        });
        // --- Back to Top Button ---
        const backToTopButton = document.querySelector('.back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        // Add contact button
        const contactButton = document.createElement('button');
        contactButton.innerHTML = '<i class="fas fa-comment-dots"></i>';
        contactButton.className = 'back-to-top';
        contactButton.style.bottom = '110px';
        contactButton.style.right = '40px';
        contactButton.style.background = 'linear-gradient(135deg, #27ae60 0%, #219653 100%)';
        contactButton.onclick = showContactPopup;
        contactButton.setAttribute('aria-label', 'Contact us');
        document.body.appendChild(contactButton);
        // --- Shopping Cart System ---
        let cart = [];
        // Initialize cart from localStorage
        function initCart() {
            try {
                const savedCart = localStorage.getItem('hiveTimesCart');
                if (savedCart) {
                    cart = JSON.parse(savedCart);
                    updateCartCount();
                }
            } catch (error) {
                console.error("Error loading cart:", error);
                cart = [];
            }
        }
        // Update cart count display
        function updateCartCount() {
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cartCount').textContent = count;
        }
        // Show cart modal
        function showCartModal() {
            const cartModal = document.getElementById('cartModal');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            const emptyCartMessage = document.getElementById('emptyCartMessage');
            const cartBusinessLogo = document.getElementById('cartBusinessLogo');
            const cartBusinessName = document.getElementById('cartBusinessName');

            if (!cartModal || !cartItems || !cartTotal || !cartBusinessLogo || !cartBusinessName) {
                console.error('Cart modal elements not found');
                return;
            }

            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                if (emptyCartMessage) {
                    emptyCartMessage.style.display = 'block';
                }
                cartTotal.textContent = 'Total: R0.00';
                cartBusinessLogo.style.display = 'none';
                cartBusinessName.textContent = '';
            } else {
                if (emptyCartMessage) {
                    emptyCartMessage.style.display = 'none';
                }
                
                // Populate business info from the first item
                const firstItem = cart[0];
                cartBusinessLogo.style.display = 'block';
                cartBusinessLogo.src = firstItem.businessLogo;
                cartBusinessName.textContent = firstItem.businessName;

                let total = 0;
                cart.forEach((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">R${item.price.toFixed(2)}</div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn decrease-qty" data-index="${index}">-</button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="quantity-btn increase-qty" data-index="${index}">+</button>
                                <button class="remove-item-btn" data-index="${index}">Remove</button>
                            </div>
                        </div>
                    `;
                    cartItems.appendChild(cartItem);
                });

                cartTotal.textContent = `Total: R${total.toFixed(2)}`;
                // Add event listeners for quantity buttons and remove buttons
                document.querySelectorAll('.increase-qty').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.dataset.index);
                        cart[index].quantity++;
                        saveCart();
                        showCartModal(); // Refresh the display
                    });
                });
                document.querySelectorAll('.decrease-qty').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.dataset.index);
                        if (cart[index].quantity > 1) {
                            cart[index].quantity--;
                            saveCart();
                            showCartModal(); // Refresh the display
                        }
                    });
                });
                document.querySelectorAll('.remove-item-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.dataset.index);
                        cart.splice(index, 1);
                        saveCart();
                        showCartModal(); // Refresh the display
                    });
                });
            }
            
            cartModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            cartModal.setAttribute('aria-hidden', 'false');
        }
        // Hide cart modal
        function hideCartModal() {
            const cartModal = document.getElementById('cartModal');
            if (cartModal) {
                cartModal.style.display = 'none';
                document.body.style.overflow = '';
                cartModal.setAttribute('aria-hidden', 'true');
            }
        }
        // Save cart to localStorage
        function saveCart() {
            try {
                localStorage.setItem('hiveTimesCart', JSON.stringify(cart));
                updateCartCount();
            } catch (error) {
                console.error("Error saving cart:", error);
            }
        }
        // Checkout function
        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            // Calculate total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            // In a real application, this would redirect to a checkout page
            // For demo purposes, we'll just show an alert
            alert(`Proceeding to checkout with ${cart.length} items totaling R${total.toFixed(2)}.
Thank you for shopping with us! Your order will be processed shortly.`);
            // Clear cart after checkout
            cart = [];
            saveCart();
            hideCartModal();
        }
        // Add sample products to cart (for demonstration purposes)
        function addSampleProducts() {
            // Check if cart is empty, if so, add some sample products
            if (cart.length === 0) {
                cart = [
                    {
                        id: 1,
                        name: "Big Pops XXXL Cherry Plum Lollipops",
                        price: 71.50,
                        quantity: 2,
                        image: "Broadway sweets products/Lolipops/big pops/lolipops 8.jpg",
                        businessName: "Broadway Sweets",
                        businessLogo: "Broadway sweets products/BRoadway Sweets Logo.jpg"
                    },
                    {
                        id: 2,
                        name: "Stumbo Tropical Twist Lollipops",
                        price: 66.00,
                        quantity: 1,
                        image: "Broadway sweets products/Lolipops/stumbo pops/stumbo pops 1.jpg",
                        businessName: "Broadway Sweets",
                        businessLogo: "Broadway sweets products/BRoadway Sweets Logo.jpg"
                    },
                    {
                        id: 3,
                        name: "Brats Sour String Candy",
                        price: 20.00,
                        quantity: 3,
                        image: "Broadway sweets products/sour strips/brats/1..Brats Sour String Candy.jpg",
                        businessName: "Broadway Sweets",
                        businessLogo: "Broadway sweets products/BRoadway Sweets Logo.jpg"
                    }
                ];
                saveCart();
            }
        }
        // Add sample products for demonstration (you can remove this in production)
        document.addEventListener('DOMContentLoaded', function() {
            addSampleProducts();
        });
    </script>