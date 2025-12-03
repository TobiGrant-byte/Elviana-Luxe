// ELVIANA LUXE E-COMMERCE SYSTEM
// Combines your original code with new e-commerce features

(function() {
    // === YOUR ORIGINAL CODE (with minor updates) ===
    
    // WhatsApp primary button opens chat with the first number
    var btn = document.getElementById('whatsappPrimary');
    btn && btn.addEventListener('click', function() {
        // opens the first WhatsApp contact in a new tab
        window.open('https://wa.me/2347063327418', '_blank');
    });

    // Lightweight image placeholder fallback
    document.querySelectorAll('.card img, .product-image').forEach(function(img) {
        img.addEventListener('error', function() {
            img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%230a0a0a"/><text x="50%" y="50%" fill="%239a9a9a" font-family="Verdana" font-size="20" dominant-baseline="middle" text-anchor="middle">Image not available</text></svg>';
        });
    });

    // Show the custom alert when page loads
    window.addEventListener('load', function() {
        // Only show if first visit OR if on homepage
        if (!localStorage.getItem('elvianaWelcomeShown') || window.location.pathname.includes('index')) {
            setTimeout(() => {
                document.getElementById('overlay').style.display = 'flex';
                localStorage.setItem('elvianaWelcomeShown', 'true');
            }, 1000);
        }
    });

    // Close the alert
    window.closeAlert = function() {
        document.getElementById('overlay').style.display = 'none';
    };

    // === NEW E-COMMERCE FUNCTIONALITY ===

    // Initialize cart if not exists
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
        
        // Also update mobile view if exists
        const mobileCart = document.getElementById('mobile-cart-count');
        if (mobileCart) {
            mobileCart.textContent = cartCount;
        }
    }

    // Add product to cart
    function addToCart(productId, quantity = 1, color = null, size = null) {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        
        // For demo - using product data from our JSON
        // In real implementation, you'd fetch from products.json
        const products = getDemoProducts();
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            alert('Product not found!');
            return;
        }
        
        // Check if product already in cart with same variant
        const existingIndex = cart.findIndex(item => 
            item.id === productId && 
            item.selectedColor === color && 
            item.selectedSize === size
        );
        
        if (existingIndex > -1) {
            // Update quantity
            cart[existingIndex].quantity += quantity;
        } else {
            // Add new item
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                selectedColor: color || (product.colors ? product.colors[0] : 'Default'),
                selectedSize: size || (product.sizes ? product.sizes[0] : 'One Size'),
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        localStorage.setItem('elvianaCart', JSON.stringify(cart));
        updateCartCount();
        
        // Show success notification
        showNotification(`${product.name} added to cart!`);
    }

    // Demo product data (replace with actual products.json fetch)
    function getDemoProducts() {
        return [
            {
                id: 1,
                name: "Gold Heeled Sandals",
                description: "Handcrafted luxury sandals with 24k gold accents.",
                price: 349.99,
                images: ["img1.jpg", "img2.jpg", "img3.jpg"],
                colors: ["Gold", "Rose Gold", "Silver"],
                sizes: ["36", "37", "38", "39", "40"],
                category: "heels"
            },
            {
                id: 2,
                name: "Black Leather Boots",
                description: "Premium Italian leather boots with custom stitching.",
                price: 289.99,
                images: ["img4.jpg", "img5.jpg"],
                colors: ["Black", "Brown", "Navy"],
                sizes: ["36", "37", "38", "39", "40"],
                category: "boots"
            }
            // Add more products as needed
        ];
    }

    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #D4AF37;
            color: #000;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Load products for the gallery
    function loadProducts(category = 'all') {
        const grid = document.getElementById('product-grid');
        if (!grid) return; // Not on homepage
        
        const products = getDemoProducts();
        displayProducts(products, category);
    }

    // Display products in grid
    function displayProducts(products, category) {
        const grid = document.getElementById('product-grid');
        
        // Filter by category if not 'all'
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(p => p.category === category);
        
        if (filteredProducts.length === 0) {
            grid.innerHTML = '<p class="no-products">No products found in this category.</p>';
            return;
        }
        
        grid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="btn-quickview" onclick="openQuickView(${product.id})">
                            <i class="fas fa-eye"></i> Quick View
                        </button>
                        <button class="btn-addcart" onclick="addToCart(${product.id}, 1)">
                            <i class="fas fa-shopping-bag"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Open quick view modal (only on product pages)
    window.openQuickView = function(productId) {
        const modal = document.getElementById('quickViewModal');
        if (!modal) return;
        
        const products = getDemoProducts();
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const modalContent = document.getElementById('quickViewContent');
        modalContent.innerHTML = `
            <div class="product-detail-view">
                <div class="product-images-side">
                    <img src="${product.images[0]}" alt="${product.name}" class="main-product-image" id="mainProductImage">
                    <div class="thumbnail-images">
                        ${product.images.map((img, index) => `
                            <img src="${img}" alt="Thumbnail ${index + 1}" 
                                 class="thumbnail ${index === 0 ? 'active' : ''}" 
                                 onclick="changeMainImage('${img}', this)">
                        `).join('')}
                    </div>
                </div>
                <div class="product-details-side">
                    <h2>${product.name}</h2>
                    <p class="product-price-large">$${product.price.toFixed(2)}</p>
                    <p class="product-description">${product.description}</p>
                    
                    ${product.colors ? `
                    <div class="variant-selector">
                        <h4 class="variant-title">Color:</h4>
                        <div class="variant-options" id="colorOptions">
                            ${product.colors.map((color, index) => `
                                <button class="variant-option ${index === 0 ? 'active' : ''}" 
                                        data-color="${color}"
                                        onclick="selectVariant(this, 'color')">
                                    ${color}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    ${product.sizes ? `
                    <div class="variant-selector">
                        <h4 class="variant-title">Size:</h4>
                        <div class="variant-options" id="sizeOptions">
                            ${product.sizes.map((size, index) => `
                                <button class="variant-option ${index === 0 ? 'active' : ''}" 
                                        data-size="${size}"
                                        onclick="selectVariant(this, 'size')">
                                    ${size}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="quantity-selector">
                        <h4 class="variant-title">Quantity:</h4>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="changeQuantity(-1)">-</button>
                            <input type="number" id="productQuantity" value="1" min="1" max="10" class="qty-input">
                            <button class="qty-btn" onclick="changeQuantity(1)">+</button>
                        </div>
                    </div>
                    
                    <button class="btn-addcart btn-large" onclick="addFromQuickView(${product.id})">
                        <i class="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        // Show modal
        modal.style.display = 'flex';
        
        // Store selected variants
        window.selectedColor = product.colors ? product.colors[0] : 'Default';
        window.selectedSize = product.sizes ? product.sizes[0] : 'One Size';
        window.selectedProductId = productId;
    };

    // Global functions for modal
    window.changeMainImage = function(src, element) {
        const mainImg = document.getElementById('mainProductImage');
        if (mainImg) mainImg.src = src;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        element.classList.add('active');
    };

    window.selectVariant = function(element, type) {
        // Remove active class from all options of this type
        element.parentElement.querySelectorAll('.variant-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Add active class to clicked option
        element.classList.add('active');
        
        // Store selection
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
        
        // Close modal after adding
        setTimeout(() => {
            const modal = document.getElementById('quickViewModal');
            if (modal) modal.style.display = 'none';
        }, 1000);
    };

    // Filter products by category
    window.filterProducts = function(category) {
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Load products for category
        loadProducts(category);
    };

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize cart
        initializeCart();
        
        // Load products if on homepage
        if (document.getElementById('product-grid')) {
            loadProducts();
            
            // Setup category filter buttons
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    filterProducts(this.dataset.category);
                });
            });
        }
        
        // Setup modal close button
        const closeModalBtn = document.querySelector('.close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                document.getElementById('quickViewModal').style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('quickViewModal');
            if (event.target === modal && modal) {
                modal.style.display = 'none';
            }
        });
        
        // Enhanced WhatsApp button for checkout
        const whatsappBtn = document.getElementById('whatsappPrimary');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function(e) {
                // If there are items in cart, send order summary
                const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
                if (cart.length > 0) {
                    e.preventDefault();
                    
                    // Create order summary
                    let message = "Hello! I'd like to order from Elviana Luxe:\n\n";
                    cart.forEach((item, index) => {
                        message += `${index + 1}. ${item.name} (${item.selectedColor}, Size ${item.selectedSize}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
                    });
                    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    message += `\nTotal: $${total.toFixed(2)}\n\nName: \nAddress: \nPhone: `;
                    
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/2347063327418?text=${encodedMessage}`, '_blank');
                }
            });
        }
        
        // View Cart button
        const viewCartBtn = document.getElementById('viewCart');
        if (viewCartBtn) {
            viewCartBtn.addEventListener('click', function() {
                window.location.href = 'cart.html';
            });
        }
    });

    // Add CSS animations for notifications
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
        .no-products { 
            text-align: center; 
            color: #aaa; 
            padding: 40px; 
            grid-column: 1 / -1;
        }
        .btn-large { 
            padding: 15px 30px; 
            font-size: 16px; 
            width: 100%; 
            margin-top: 20px; 
        }
        .product-price-large { 
            font-size: 24px; 
            color: #D4AF37; 
            margin: 10px 0; 
        }
    `;
    document.head.appendChild(style);

})();
