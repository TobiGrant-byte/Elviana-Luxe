// ELVIANA LUXE E-COMMERCE SYSTEM - COMPLETE UPDATED VERSION
(function() {
    // === FIX 1: ALERT BOX SHOWS ON EVERY PAGE LOAD ===
    // Show welcome alert on EVERY page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
        }, 500);
    });

    // Close alert function
    window.closeAlert = function() {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    };
    
    // === CORE FUNCTIONALITY ===
    
    // Initialize cart
    function initializeCart() {
        if (!localStorage.getItem('elvianaCart')) {
            localStorage.setItem('elvianaCart', JSON.stringify([]));
        }
        updateCartCount();
    }
    
    // Update cart count in header
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartElements = document.querySelectorAll('#cart-count');
        cartElements.forEach(el => {
            el.textContent = cartCount;
        });
    }
    
    // === EDITABLE QUICK VIEW TEXTS ===
    const quickViewTexts = {
        colorTitle: "SELECT COLOR",
        sizeTitle: "SELECT SIZE", 
        quantityTitle: "QUANTITY",
        addToCartButton: "🛒 ADD TO CART",
        defaultDescription: "Premium luxury footwear with exquisite craftsmanship and attention to detail. Handcrafted using the finest materials for ultimate comfort and style.",
        addedToCart: "Added to cart successfully!",
        modalTitle: "PRODUCT DETAILS"
    };
    
   // Product database with custom descriptions
    const products = [
        { 
            id: 1, 
            name: "Product 1", 
            price: 40, 
            image: "img 1.jpg", 
            colors: ["Gold", "Rose Gold"], 
            sizes: ["36", "37", "38"], 
            category: "heels",
            description: ""
        },
        { 
            id: 2, 
            name: "product 2", 
            price: 40, 
            image: "img 2.jpg", 
            colors: ["Black", "Brown"], 
            sizes: ["37", "38", "39"], 
            category: "boots",
            description: ""
        },
        { 
            id: 3, 
            name: "Product 3", 
            price: 20, 
            image: "img 3.jpg", 
            colors: ["Clear", "Gold"], 
            sizes: ["36", "37", "38"], 
            category: "heels",
            description: ""
        },
        { 
            id: 4, 
            name: "Product 4", 
            price: 30, 
            image: "img 4.jpg", 
            colors: ["White", "Black"], 
            sizes: ["38", "39", "40"], 
            category: "sneakers",
            description: ""
        },
        { 
            id: 5, 
            name: "Product 5", 
            price: 20, 
            image: "img 5.jpg", 
            colors: ["Black", "Silver"], 
            sizes: ["37", "38"], 
            category: "heels",
            description: ""
        },
        { 
            id: 6, 
            name: "Product 6", 
            price: 17, 
            image: "img 6.jpg", 
            colors: ["Gold", "Silver"], 
            sizes: ["36", "37", "38"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 7, 
            name: "Product 7", 
            price: 24, 
            image: "img7.jpg", 
            colors: ["Brown", "Black"], 
            sizes: ["38", "39", "40"], 
            category: "sneakers",
            description: ""
        },
        { 
            id: 8, 
            name: "Product 8", 
            price: 24, 
            image: "img8.jpg", 
            colors: ["Black", "Navy"], 
            sizes: ["36", "37"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 9, 
            name: "Product 9", 
            price: 17, 
            image: "img9.jpg", 
            colors: ["Black", "Brown"], 
            sizes: ["37", "38", "39"], 
            category: "boots",
            description: ""
        },
        { 
            id: 10, 
            name: "Product 10", 
            price: 24, 
            image: "img10.jpg", 
            colors: ["Black", "Gold"], 
            sizes: ["36", "37"], 
            category: "heels",
            description: ""
        },
        { 
            id: 11, 
            name: "Product 11", 
            price: 24, 
            image: "img11.jpg", 
            colors: ["Black", "Red"], 
            sizes: ["37", "38"], 
            category: "heels",
            description: ""
        },
        { 
            id: 12, 
            name: "Product 12", 
            price: 17, 
            image: "img12.jpg", 
            colors: ["Brown", "Black"], 
            sizes: ["36", "37", "38"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 13, 
            name: "Product 13", 
            price: 24, 
            image: "img13.jpg", 
            colors: ["White", "Black"], 
            sizes: ["37", "38"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 14, 
            name: "Product 14", 
            price: 30, 
            image: "img14.jpg", 
            colors: ["White", "Gray"], 
            sizes: ["38", "39", "40"], 
            category: "sneakers",
            description: ""
        },
        { 
            id: 15, 
            name: "Product 15", 
            price: 17, 
            image: "img15.jpg", 
            colors: ["Brown", "Black"], 
            sizes: ["37", "38", "39"], 
            category: "boots",
            description: ""
        },
        { 
            id: 16, 
            name: "Product 16", 
            price: 17, 
            image: "img16.jpg", 
            colors: ["Beige", "Black"], 
            sizes: ["36", "37"], 
            category: "heels",
            description: ""
        },
        { 
            id: 17, 
            name: "Product 17", 
            price: 17, 
            image: "img17.jpg", 
            colors: ["Brown", "Black"], 
            sizes: ["38", "39", "40"], 
            category: "sneakers",
            description: ""
        },
        { 
            id: 18, 
            name: "Product 18", 
            price: 17, 
            image: "img18.jpg", 
            colors: ["Red", "Black"], 
            sizes: ["36", "37"], 
            category: "heels",
            description: ""
        },
        { 
            id: 19, 
            name: "Product 19", 
            price: 24, 
            image: "img19.jpg", 
            colors: ["White", "Blue"], 
            sizes: ["37", "38"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 20, 
            name: "Product 20", 
            price: 20, 
            image: "img20.jpg", 
            colors: ["Black", "Brown"], 
            sizes: ["37", "38", "39"], 
            category: "boots",
            description: ""
        },
        { 
            id: 21, 
            name: "Product 21",
            price: 21, 
            image: "img21.jpg", 
            colors: ["Nude", "Black"], 
            sizes: ["36", "37"], 
            category: "heels",
            description: ""
        },
        { 
            id: 22, 
            name: "Product 22", 
            price: 21, 
            image: "img22.jpg", 
            colors: ["Brown", "Burgundy"], 
            sizes: ["38", "39", "40"], 
            category: "sneakers",
            description: ""
        },
        { 
            id: 23, 
            name: "Product 23", 
            price: 24, 
            image: "img23.jpg", 
            colors: ["Black", "Silver"], 
            sizes: ["36", "37"], 
            category: "heels",
            description: ""
        },
        { 
            id: 24, 
            name: "Product 24", 
            price: 17, 
            image: "img24.jpg", 
            colors: ["Black", "Brown"], 
            sizes: ["37", "38"], 
            category: "heels",
            description: ""
        },
        { 
            id: 25, 
            name: "Product 25",
            price: 17, 
            image: "img25.jpg", 
            colors: ["Nude", "Black"], 
            sizes: ["36", "37"], 
            category: "heels",
            description: ""
        },
        { 
            id: 26, 
            name: "Product 26", 
            price: 20, 
            image: "img26.jpg", 
            colors: ["Brown", "Black"], 
            sizes: ["38", "39", "40"], 
            category: "sneakers",
            description: ""
        },
        { 
            id: 27, 
            name: "Product 27",
            price: 17, 
            image: "img27.jpg", 
            colors: ["Black", "Red"], 
            sizes: ["36", "37"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 28, 
            name: "Product 28", 
            price: 21, 
            image: "img28.jpg", 
            colors: ["Brown", "Black"], 
            sizes: ["37", "38"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 29, 
            name: "Product 29", 
            price: 21, 
            image: "img29.jpg", 
            colors: ["Brown", "Tan"], 
            sizes: ["38", "39"], 
            category: "sneakers",
            description: ""
        },
        { 
            id: 30, 
            name: "Product 30", 
            price: 21, 
            image: "img30.jpg", 
            colors: ["Black", "Brown"], 
            sizes: ["37", "38"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 31, 
            name: "Product 31", 
            price: 24, 
            image: "img31.jpg", 
            colors: ["Black", "Brown"], 
            sizes: ["37", "38"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 32, 
            name: "Product 32", 
            price: 21, 
            image: "img32.jpg", 
            colors: ["Black", "Brown"], 
            sizes: ["37", "38"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 33, 
            name: "Product 33", 
            price: 21, 
            image: "img33.jpg", 
            colors: ["Black", "Brown"], 
            sizes: ["37", "38"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 34, 
            name: "Product 34", 
            price: 24, 
            image: "img34.jpg", 
            colors: ["Black", "Brown"], 
            sizes: ["37", "38"], 
            category: "sandals",
            description: ""
        },
        { 
            id: 35,
            name: "Product 35", 
            price: 21, 
            image: "img35.jpg", 
            colors: ["Black", "Brown"], 
            sizes: ["37", "38"], 
            category: "sandals",
            description: ""
        }

    ];
    
    // Add to cart function
    window.addToCart = function(productId, quantity = 1, color = null, size = null) {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            alert('Product not found!');
            return;
        }
        
        // Check if product already in cart with same variant
        const existingIndex = cart.findIndex(item => 
            item.id === productId && 
            item.selectedColor === (color || product.colors[0]) && 
            item.selectedSize === (size || product.sizes[0])
        );
        
        if (existingIndex > -1) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                selectedColor: color || product.colors[0],
                selectedSize: size || product.sizes[0],
                quantity: quantity
            });
        }
        
        localStorage.setItem('elvianaCart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    };
    
    // Show notification
    function showNotification(message) {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ffffff;
            color: #000000;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-weight: bold;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            border: 1px solid #333;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Open quick view - WITH EDITABLE TEXT AND DARK THEME
    window.openQuickView = function(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        // Create modal if it doesn't exist
        let modal = document.getElementById('quickViewModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'quickViewModal';
            modal.className = 'modal';
            modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 9999; justify-content: center; align-items: center;';
            modal.innerHTML = `
                <div class="modal-content" style="background: #1a1a1a; color: white; padding: 30px; border-radius: 15px; max-width: 900px; width: 95%; max-height: 90vh; overflow-y: auto; position: relative;">
                    <span class="close-modal" style="position: absolute; top: 15px; right: 20px; color: white; font-size: 30px; cursor: pointer; z-index: 10000; background: rgba(0,0,0,0.5); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s;">&times;</span>
                    <div id="quickViewContent"></div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // FIXED EVENT LISTENER: Use event delegation
            modal.addEventListener('click', function(e) {
                // Close when clicking the close button
                if (e.target.classList.contains('close-modal')) {
                    modal.style.display = 'none';
                }
                // Close when clicking outside the modal content
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        // Use product-specific description or default
        const description = product.description || quickViewTexts.defaultDescription;
        
        const modalContent = document.getElementById('quickViewContent');
        modalContent.innerHTML = `
            <div class="product-detail-view" style="display: flex; flex-wrap: wrap; gap: 30px;">
                <div class="product-images-side" style="flex: 1; min-width: 300px;">
                    <img src="${product.image}" alt="${product.name}" 
                         class="main-product-image" 
                         id="mainProductImage"
                         style="width: 100%; max-height: 400px; object-fit: contain; border-radius: 10px; background: #2a2a2a; padding: 15px; display: block;">
                </div>
                <div class="product-details-side" style="flex: 1; min-width: 300px; color: white;">
                    <h2 style="color: white; margin-top: 0; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${product.name}</h2>
                    <p class="product-price-large" style="font-size: 28px; color: #fff; font-weight: bold; margin: 15px 0; background: #000; display: inline-block; padding: 8px 20px; border-radius: 5px;">₦${product.price}k</p>
                    
                    <div class="product-description-container" style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <h3 style="color: #fff; margin-top: 0; margin-bottom: 10px; font-size: 16px; opacity: 0.9; text-transform: uppercase;">PRODUCT DESCRIPTION</h3>
                        <p class="product-description" style="color: #ccc; line-height: 1.6; font-size: 15px; margin: 0;">${description}</p>
                    </div>
                    
                    <div class="variant-selector" style="margin: 25px 0;">
                        <h4 class="variant-title" style="color: #fff; margin-bottom: 12px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">${quickViewTexts.colorTitle}</h4>
                        <div class="variant-options" id="colorOptions" style="display: flex; gap: 10px; flex-wrap: wrap;">
                            ${product.colors.map((color, index) => `
                                <button class="variant-option ${index === 0 ? 'active' : ''}" 
                                        data-color="${color}"
                                        onclick="selectVariant(this, 'color')"
                                        style="background: #333; color: white; border: 2px solid #555; padding: 10px 18px; border-radius: 5px; cursor: pointer; transition: all 0.3s; font-size: 14px; min-width: 80px;">
                                    ${color}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="variant-selector" style="margin: 25px 0;">
                        <h4 class="variant-title" style="color: #fff; margin-bottom: 12px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">${quickViewTexts.sizeTitle}</h4>
                        <div class="variant-options" id="sizeOptions" style="display: flex; gap: 10px; flex-wrap: wrap;">
                            ${product.sizes.map((size, index) => `
                                <button class="variant-option ${index === 0 ? 'active' : ''}" 
                                        data-size="${size}"
                                        onclick="selectVariant(this, 'size')"
                                        style="background: #333; color: white; border: 2px solid #555; padding: 10px 18px; border-radius: 5px; cursor: pointer; transition: all 0.3s; font-size: 14px; min-width: 60px;">
                                    ${size}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="quantity-selector" style="margin: 25px 0;">
                        <h4 class="variant-title" style="color: #fff; margin-bottom: 12px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">${quickViewTexts.quantityTitle}</h4>
                        <div class="qty-controls" style="display: flex; align-items: center; gap: 15px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                            <button class="qty-btn" onclick="changeQuantity(-1)" style="background: #333; color: white; border: 2px solid #555; width: 45px; height: 45px; border-radius: 5px; font-size: 22px; cursor: pointer; transition: all 0.3s;">-</button>
                            <input type="number" id="productQuantity" value="1" min="1" max="10" class="qty-input" style="width: 70px; height: 45px; text-align: center; background: #2a2a2a; color: white; border: 2px solid #555; border-radius: 5px; font-size: 18px; font-weight: bold;">
                            <button class="qty-btn" onclick="changeQuantity(1)" style="background: #333; color: white; border: 2px solid #555; width: 45px; height: 45px; border-radius: 5px; font-size: 22px; cursor: pointer; transition: all 0.3s;">+</button>
                            <span style="color: #aaa; margin-left: 10px; font-size: 14px;">(Max: 10)</span>
                        </div>
                    </div>
                    
                    <button class="btn-large" onclick="addFromQuickView(${product.id})" style="background: linear-gradient(45deg, #000, #333); color: white; border: 2px solid #fff; padding: 18px 30px; font-size: 18px; border-radius: 8px; cursor: pointer; width: 100%; margin-top: 20px; transition: all 0.3s; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                        <i class="fas fa-shopping-bag" style="margin-right: 10px;"></i> ${quickViewTexts.addToCartButton}
                    </button>
                    
                    <div class="product-features" style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #444;">
                        <h4 style="color: #fff; margin-bottom: 10px; font-size: 16px; text-transform: uppercase;">FEATURES:</h4>
                        <ul style="color: #ccc; padding-left: 20px; margin: 0; font-size: 14px; line-height: 1.8;">
                            <li>Premium quality materials</li>
                            <li>Handcrafted with attention to detail</li>
                            <li>Comfortable fit for all-day wear</li>
                            <li>Easy returns within 7 days</li>
                            <li>Free shipping on orders over ₦50k</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Set image fallback
        const mainImage = document.getElementById('mainProductImage');
        if (mainImage) {
            mainImage.addEventListener('error', function() {
                this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%232a2a2a"/><text x="50%" y="50%" fill="%23fff" font-family="Verdana" font-size="20" dominant-baseline="middle" text-anchor="middle">Image not available</text></svg>';
            });
        }
        
        // Show modal
        modal.style.display = 'flex';
        window.selectedColor = product.colors[0];
        window.selectedSize = product.sizes[0];
        window.selectedProductId = productId;
    };
    
    // Global functions for modal
    window.selectVariant = function(element, type) {
        element.parentElement.querySelectorAll('.variant-option').forEach(opt => {
            opt.style.background = '#333';
            opt.style.borderColor = '#555';
            opt.style.color = 'white';
            opt.classList.remove('active');
        });
        element.style.background = '#000';
        element.style.borderColor = '#fff';
        element.style.color = '#fff';
        element.classList.add('active');
        
        if (type === 'color') {
            window.selectedColor = element.dataset.color;
        } else if (type === 'size') {
            window.selectedSize = element.dataset.size;
        }
    };
    
    window.changeQuantity = function(change) {
        const input = document.getElementById('productQuantity');
        if (!input) return;
        
        let value = parseInt(input.value) + change;
        if (value < 1) value = 1;
        if (value > 10) value = 10;
        input.value = value;
    };
    
    window.addFromQuickView = function(productId) {
        const input = document.getElementById('productQuantity');
        const quantity = input ? parseInt(input.value) : 1;
        addToCart(productId, quantity, window.selectedColor, window.selectedSize);
        
        // Show custom success message
        showNotification(quickViewTexts.addedToCart);
        
        setTimeout(() => {
            const modal = document.getElementById('quickViewModal');
            if (modal) {
                modal.style.display = 'none';
            }
        }, 1500);
    };
    
    // === CHECKOUT FUNCTIONALITY ===
    
    // Open checkout modal
    window.openCheckoutModal = function() {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Create modal if it doesn't exist
        let checkoutModal = document.getElementById('checkoutModal');
        if (!checkoutModal) {
            checkoutModal = document.createElement('div');
            checkoutModal.id = 'checkoutModal';
            checkoutModal.className = 'modal';
            checkoutModal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 9999; justify-content: center; align-items: center;';
            checkoutModal.innerHTML = `
                <div class="modal-content" style="background: #1a1a1a; color: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative;">
                    <span class="close-checkout" style="position: absolute; top: 15px; right: 20px; color: white; font-size: 30px; cursor: pointer; background: rgba(0,0,0,0.5); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s;">&times;</span>
                    <h2 style="color: white; margin-top: 0; text-transform: uppercase; letter-spacing: 1px;">Complete Your Order</h2>
                    <form id="checkoutForm">
                        <div class="form-group">
                            <label for="customerName" style="display: block; margin-bottom: 5px; color: #ccc; font-size: 14px;">Full Name *</label>
                            <input type="text" id="customerName" required placeholder="Enter your full name" style="width: 100%; padding: 12px; background: #2a2a2a; color: white; border: 1px solid #555; border-radius: 5px; font-size: 14px;">
                        </div>
                        <div class="form-group">
                            <label for="customerEmail" style="display: block; margin-bottom: 5px; color: #ccc; font-size: 14px;">Email Address</label>
                            <input type="email" id="customerEmail" placeholder="Enter your email" style="width: 100%; padding: 12px; background: #2a2a2a; color: white; border: 1px solid #555; border-radius: 5px; font-size: 14px;">
                        </div>
                        <div class="form-group">
                            <label for="customerPhone" style="display: block; margin-bottom: 5px; color: #ccc; font-size: 14px;">Phone Number *</label>
                            <input type="tel" id="customerPhone" required placeholder="Enter your phone number" style="width: 100%; padding: 12px; background: #2a2a2a; color: white; border: 1px solid #555; border-radius: 5px; font-size: 14px;">
                        </div>
                        <div class="form-group">
                            <label for="customerAddress" style="display: block; margin-bottom: 5px; color: #ccc; font-size: 14px;">Shipping Address *</label>
                            <textarea id="customerAddress" required placeholder="Enter complete shipping address" rows="3" style="width: 100%; padding: 12px; background: #2a2a2a; color: white; border: 1px solid #555; border-radius: 5px; font-size: 14px;"></textarea>
                        </div>
                        <div class="order-summary" style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 25px 0;">
                            <h3 style="color: white; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Order Summary</h3>
                            <div id="modalOrderItems"></div>
                            <div class="order-total" style="text-align: right; margin-top: 15px; padding-top: 15px; border-top: 2px solid #555;">
                                <strong style="color: white; font-size: 20px;">Total: ₦<span id="modalOrderTotal">0</span>k</strong>
                            </div>
                        </div>
                        <button type="submit" class="btn-checkout" style="background: linear-gradient(45deg, #000, #333); color: white; border: 2px solid white; padding: 16px 30px; width: 100%; border-radius: 8px; font-size: 16px; cursor: pointer; transition: all 0.3s; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                            <i class="fas fa-paper-plane" style="margin-right: 10px;"></i> Place Order
                        </button>
                    </form>
                </div>
            `;
            document.body.appendChild(checkoutModal);
            
            // Add close event listener
            checkoutModal.querySelector('.close-checkout').addEventListener('click', function() {
                checkoutModal.style.display = 'none';
            });
            
            // Close when clicking outside
            checkoutModal.addEventListener('click', function(e) {
                if (e.target === checkoutModal) {
                    checkoutModal.style.display = 'none';
                }
            });
            
            // Setup form
            setupCheckoutForm();
        }
        
        // Update order summary
        const orderItems = document.getElementById('modalOrderItems');
        const orderTotal = document.getElementById('modalOrderTotal');
        
        let itemsHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemsHTML += `
                <div class="order-item" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #444;">
                    <span style="color: #ccc; font-size: 14px;">${item.name} (${item.selectedColor}, Size ${item.selectedSize})</span>
                    <span style="color: white; font-size: 14px;">${item.quantity} × ₦${item.price}k = ₦${itemTotal}k</span>
                </div>
            `;
        });
        
        if (orderItems) orderItems.innerHTML = itemsHTML;
        if (orderTotal) orderTotal.textContent = total;
        
        // Show modal
        checkoutModal.style.display = 'flex';
    };
    
    // Close checkout modal
    window.closeCheckoutModal = function() {
        const checkoutModal = document.getElementById('checkoutModal');
        if (checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    };
    
    // Checkout function - opens checkout or redirects to cart
    window.openCheckout = function() {
        // Check if we're on cart page or need to redirect
        if (window.location.pathname.includes('cart.html')) {
            openCheckoutModal();
        } else {
            // Redirect to cart page then open checkout
            window.location.href = 'cart.html';
            // Store flag to open modal after redirect
            localStorage.setItem('openCheckoutModal', 'true');
        }
    };
    
    // Save order to PHP backend with better error handling
    window.saveOrderToBackend = function(orderData) {
        // Try multiple endpoints
        const endpoints = [
            'php/save_order.php',
            '/php/save_order.php',
            'save_order.php'
        ];
        
        const tryEndpoint = (index) => {
            if (index >= endpoints.length) {
                return Promise.reject(new Error('All endpoints failed'));
            }
            
            return fetch(endpoints[index], {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.log(`Endpoint ${endpoints[index]} failed:`, error.message);
                return tryEndpoint(index + 1);
            });
        };
        
        return tryEndpoint(0);
    };
    
    // Handle checkout form submission
    function setupCheckoutForm() {
        const checkoutForm = document.getElementById('checkoutForm');
        if (!checkoutForm) return;
        
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            const orderData = {
                customer_name: document.getElementById('customerName').value,
                customer_email: document.getElementById('customerEmail').value,
                customer_phone: document.getElementById('customerPhone').value,
                customer_address: document.getElementById('customerAddress').value,
                cart_items: cart,
                total_amount: total
            };
            
            // Validate required fields
            if (!orderData.customer_name || !orderData.customer_phone || !orderData.customer_address) {
                alert('Please fill in all required fields (Name, Phone, Address)');
                return;
            }
            
            // Show loading state
            const submitBtn = checkoutForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Save order to PHP backend
            saveOrderToBackend(orderData)
                .then(data => {
                    if (data.success) {
                        alert(`✅ Order placed successfully!\nOrder ID: ${data.order_id}\nWe will contact you shortly.`);
                        localStorage.removeItem('elvianaCart'); // Clear cart
                        updateCartCount();
                        closeCheckoutModal();
                        
                        // Clear form
                        checkoutForm.reset();
                        
                        // Redirect to home after 2 seconds
                        setTimeout(() => {
                            if (!window.location.pathname.includes('index')) {
                                window.location.href = 'index.html';
                            }
                        }, 2000);
                    } else {
                        alert(`❌ Error: ${data.error || 'Failed to save order'}`);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to save order. Please use WhatsApp checkout instead.');
                })
                .finally(() => {
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Category filter
    function setupCategoryFilter() {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.dataset.category;
                const allProducts = document.querySelectorAll('.product-card');
                
                if (category === 'all') {
                    allProducts.forEach(product => {
                        product.style.display = 'block';
                    });
                } else {
                    allProducts.forEach(product => {
                        const productId = parseInt(product.dataset.productId);
                        const productData = products.find(p => p.id === productId);
                        
                        if (productData && productData.category === category) {
                            product.style.display = 'block';
                        } else {
                            product.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    // WhatsApp button - SENDS ORDER INQUIRY
    document.getElementById('whatsappPrimary')?.addEventListener('click', function(e) {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        
        if (cart.length > 0) {
            // Create order summary for WhatsApp
            let message = `🛍️ *NEW ORDER INQUIRY - ELVIANA LUXE*\n\n`;
            message += `_Customer is interested in these items:_\n\n`;
            
            cart.forEach((item, index) => {
                message += `*${index + 1}. ${item.name}*\n`;
                message += `🎨 Color: ${item.selectedColor}\n`;
                message += `📏 Size: ${item.selectedSize}\n`;
                message += `🔢 Quantity: ${item.quantity}\n`;
                message += `💵 Price: ₦${item.price}k each (₦${item.price * item.quantity}k total)\n\n`;
            });
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            message += `💰 *TOTAL: ₦${total}k*\n\n`;
            message += `_Please ask customer for shipping address and phone number._`;
            
            // Clean phone numbers
            const phone1 = "2347063327418";
            const phone2 = "2348130821583";
            
            const encodedMessage = encodeURIComponent(message);
            
            // Open FIRST WhatsApp in new tab
            window.open(`https://wa.me/${phone1}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
            
            // Open SECOND WhatsApp in new tab after delay
            setTimeout(() => {
                window.open(`https://wa.me/${phone2}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
            }, 500);
            
        } else {
            // If cart is empty, just open WhatsApp for general inquiry
            window.open('https://wa.me/2347063327418', '_blank');
        }
    });
    
    // View Cart button
    document.getElementById('viewCart')?.addEventListener('click', function() {
        window.location.href = 'cart.html';
    });
    
    // Image fallback
    document.querySelectorAll('.product-image').forEach(function(img) {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%230a0a0a"/><text x="50%" y="50%" fill="%239a9a9a" font-family="Verdana" font-size="20" dominant-baseline="middle" text-anchor="middle">Image not available</text></svg>';
        });
    });
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initializeCart();
        setupCategoryFilter();
        setupCheckoutForm();
        
        // Check if redirected to cart page with checkout flag
        if (window.location.pathname.includes('cart.html')) {
            if (localStorage.getItem('openCheckoutModal') === 'true') {
                setTimeout(() => {
                    openCheckoutModal();
                    localStorage.removeItem('openCheckoutModal');
                }, 500);
            }
        }
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        /* Quick View Modal Styles */
        #quickViewModal .modal-content {
            animation: fadeIn 0.3s ease;
        }
        #quickViewModal .close-modal:hover {
            background: rgba(255,255,255,0.2) !important;
        }
        #quickViewModal .variant-option.active {
            background: #000 !important;
            border-color: #fff !important;
            color: #fff !important;
        }
        #quickViewModal .variant-option:hover {
            background: #555 !important;
            border-color: #888 !important;
        }
        #quickViewModal .qty-btn:hover,
        #checkoutModal .btn-checkout:hover {
            background: #fff !important;
            color: #000 !important;
            border-color: #fff !important;
        }
        #quickViewModal .btn-large:hover {
            background: linear-gradient(45deg, #fff, #ddd) !important;
            color: #000 !important;
            border-color: #000 !important;
        }
        /* Checkout Modal Styles */
        #checkoutModal .modal-content {
            animation: fadeIn 0.3s ease;
        }
        #checkoutModal .close-checkout:hover {
            background: rgba(255,255,255,0.2) !important;
        }
        #checkoutModal input:focus,
        #checkoutModal textarea:focus {
            outline: none;
            border-color: #fff !important;
            box-shadow: 0 0 0 2px rgba(255,255,255,0.2);
        }
    `;
    document.head.appendChild(style);
    
    // === TEXT EDITING FUNCTIONS ===
    window.enableTextEditing = function() {
        const modal = document.createElement('div');
        modal.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #1a1a1a; color: white; padding: 30px; border-radius: 10px; z-index: 10000; max-width: 500px; width: 90%; border: 2px solid white; box-shadow: 0 10px 30px rgba(0,0,0,0.5);';
        modal.innerHTML = `
            <h3 style="margin-top: 0; color: white; text-align: center; text-transform: uppercase; letter-spacing: 1px;">Edit Quick View Text</h3>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #ccc; font-size: 14px;">Color Title:</label>
                <input type="text" id="editColorTitle" value="${quickViewTexts.colorTitle}" style="width: 100%; padding: 10px; background: #2a2a2a; color: white; border: 1px solid #555; border-radius: 5px; font-size: 14px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #ccc; font-size: 14px;">Size Title:</label>
                <input type="text" id="editSizeTitle" value="${quickViewTexts.sizeTitle}" style="width: 100%; padding: 10px; background: #2a2a2a; color: white; border: 1px solid #555; border-radius: 5px; font-size: 14px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #ccc; font-size: 14px;">Quantity Title:</label>
                <input type="text" id="editQuantityTitle" value="${quickViewTexts.quantityTitle}" style="width: 100%; padding: 10px; background: #2a2a2a; color: white; border: 1px solid #555; border-radius: 5px; font-size: 14px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #ccc; font-size: 14px;">Add to Cart Button:</label>
                <input type="text" id="editAddToCartButton" value="${quickViewTexts.addToCartButton}" style="width: 100%; padding: 10px; background: #2a2a2a; color: white; border: 1px solid #555; border-radius: 5px; font-size: 14px;">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; color: #ccc; font-size: 14px;">Default Description:</label>
                <textarea id="editDefaultDescription" rows="4" style="width: 100%; padding: 10px; background: #2a2a2a; color: white; border: 1px solid #555; border-radius: 5px; font-size: 14px;">${quickViewTexts.defaultDescription}</textarea>
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #ccc; font-size: 14px;">Added to Cart Message:</label>
                <input type="text" id="editAddedToCart" value="${quickViewTexts.addedToCart}" style="width: 100%; padding: 10px; background: #2a2a2a; color: white; border: 1px solid #555; border-radius: 5px; font-size: 14px;">
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="saveTextEdits()" style="flex: 1; padding: 12px; background: #000; color: white; border: 1px solid white; border-radius: 5px; cursor: pointer; font-weight: bold; transition: all 0.3s;">Save Changes</button>
                <button onclick="this.parentElement.parentElement.remove()" style="flex: 1; padding: 12px; background: #333; color: white; border: 1px solid #555; border-radius: 5px; cursor: pointer; transition: all 0.3s;">Cancel</button>
            </div>
        `;
        document.body.appendChild(modal);
    };
    
    window.saveTextEdits = function() {
        quickViewTexts.colorTitle = document.getElementById('editColorTitle').value;
        quickViewTexts.sizeTitle = document.getElementById('editSizeTitle').value;
        quickViewTexts.quantityTitle = document.getElementById('editQuantityTitle').value;
        quickViewTexts.addToCartButton = document.getElementById('editAddToCartButton').value;
        quickViewTexts.defaultDescription = document.getElementById('editDefaultDescription').value;
        quickViewTexts.addedToCart = document.getElementById('editAddedToCart').value;
        
        // Remove the editing modal
        document.querySelector('div:last-child').remove();
        
        // Save to localStorage so changes persist
        localStorage.setItem('elvianaQuickViewTexts', JSON.stringify(quickViewTexts));
        
        alert('✅ Quick view text updated successfully!');
    };
    
    // Load saved text edits on page load
    document.addEventListener('DOMContentLoaded', function() {
        const savedTexts = localStorage.getItem('elvianaQuickViewTexts');
        if (savedTexts) {
            const saved = JSON.parse(savedTexts);
            Object.assign(quickViewTexts, saved);
        }
    });
    
})();
