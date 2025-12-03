// ELVIANA LUXE E-COMMERCE SYSTEM - FIXED VERSION
(function() {
    // === FIX: ALERT BOX ON FIRST VISIT ===
    // Show welcome alert on first visit
    window.addEventListener('load', function() {
        if (!localStorage.getItem('elvianaWelcomeShown')) {
            setTimeout(() => {
                const overlay = document.getElementById('overlay');
                if (overlay) {
                    overlay.style.display = 'flex';
                    localStorage.setItem('elvianaWelcomeShown', 'true');
                }
            }, 1000);
        }
    });

    // Close alert function
    window.closeAlert = function() {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    };
    
    // Rest of your script.js code continues here...
    // (your existing initializeCart, addToCart, etc.)

// ELVIANA LUXE E-COMMERCE SYSTEM - FIXED VERSION
(function() {
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
    
    // Product database - Updated for all 31 items
    const products = [
        { id: 1, name: "Gold Elegance Heels", price: 349.99, image: "img 1.jpg", colors: ["Gold", "Rose Gold"], sizes: ["36", "37", "38"], category: "heels" },
        { id: 2, name: "Black Leather Boots", price: 289.99, image: "img 2.jpg", colors: ["Black", "Brown"], sizes: ["37", "38", "39"], category: "boots" },
        { id: 3, name: "Crystal Embellished Pumps", price: 425.50, image: "img 3.jpg", colors: ["Clear", "Gold"], sizes: ["36", "37", "38"], category: "heels" },
        { id: 4, name: "Designer Sneakers", price: 275.00, image: "img 4.jpg", colors: ["White", "Black"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 5, name: "Evening Heels", price: 399.99, image: "img 5.jpg", colors: ["Black", "Silver"], sizes: ["37", "38"], category: "heels" },
        { id: 6, name: "Luxury Sandals", price: 325.00, image: "img 6.jpg", colors: ["Gold", "Silver"], sizes: ["36", "37", "38"], category: "sandals" },
        { id: 7, name: "Casual Loafers", price: 245.00, image: "img7.jpg", colors: ["Brown", "Black"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 8, name: "Designer Flats", price: 210.00, image: "img8.jpg", colors: ["Black", "Navy"], sizes: ["36", "37"], category: "sandals" },
        { id: 9, name: "Ankle Boots", price: 265.00, image: "img9.jpg", colors: ["Black", "Brown"], sizes: ["37", "38", "39"], category: "boots" },
        { id: 10, name: "Platform Heels", price: 315.00, image: "img10.jpg", colors: ["Black", "Gold"], sizes: ["36", "37"], category: "heels" },
        { id: 11, name: "Evening Pumps", price: 375.00, image: "img11.jpg", colors: ["Black", "Red"], sizes: ["37", "38"], category: "heels" },
        { id: 12, name: "Leather Sandals", price: 195.00, image: "img12.jpg", colors: ["Brown", "Black"], sizes: ["36", "37", "38"], category: "sandals" },
        { id: 13, name: "Designer Mules", price: 225.00, image: "img13.jpg", colors: ["White", "Black"], sizes: ["37", "38"], category: "sandals" },
        { id: 14, name: "Casual Sneakers", price: 250.00, image: "img14.jpg", colors: ["White", "Gray"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 15, name: "Boots with Fur", price: 335.00, image: "img15.jpg", colors: ["Brown", "Black"], sizes: ["37", "38", "39"], category: "boots" },
        { id: 16, name: "Designer Wedges", price: 290.00, image: "img16.jpg", colors: ["Beige", "Black"], sizes: ["36", "37"], category: "heels" },
        { id: 17, name: "Oxford Shoes", price: 275.00, image: "img17.jpg", colors: ["Brown", "Black"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 18, name: "High Heels", price: 365.00, image: "img18.jpg", colors: ["Red", "Black"], sizes: ["36", "37"], category: "heels" },
        { id: 19, name: "Espadrilles", price: 195.00, image: "img19.jpg", colors: ["White", "Blue"], sizes: ["37", "38"], category: "sandals" },
        { id: 20, name: "Platform Boots", price: 345.00, image: "img20.jpg", colors: ["Black", "Brown"], sizes: ["37", "38", "39"], category: "boots" },
        { id: 21, name: "Slingback Heels", price: 310.00, image: "img21.jpg", colors: ["Nude", "Black"], sizes: ["36", "37"], category: "heels" },
        { id: 22, name: "Premium Loafers", price: 255.00, image: "img22.jpg", colors: ["Brown", "Burgundy"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 23, name: "Ankle Strap Heels", price: 295.00, image: "img23.jpg", colors: ["Black", "Silver"], sizes: ["36", "37"], category: "heels" },
        { id: 24, name: "Mary Janes", price: 265.00, image: "img24.jpg", colors: ["Black", "Brown"], sizes: ["37", "38"], category: "heels" },
        { id: 25, name: "Kitten Heels", price: 245.00, image: "img25.jpg", colors: ["Nude", "Black"], sizes: ["36", "37"], category: "heels" },
        { id: 26, name: "Brogues", price: 275.00, image: "img26.jpg", colors: ["Brown", "Black"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 27, name: "Ballet Flats", price: 185.00, image: "img27.jpg", colors: ["Black", "Red"], sizes: ["36", "37"], category: "sandals" },
        { id: 28, name: "Gladiator Sandals", price: 225.00, image: "img28.jpg", colors: ["Brown", "Black"], sizes: ["37", "38"], category: "sandals" },
        { id: 29, name: "Moccasins", price: 215.00, image: "img29.jpg", colors: ["Brown", "Tan"], sizes: ["38", "39"], category: "sneakers" },
        { id: 30, name: "Designer Clogs", price: 235.00, image: "img30.jpg", colors: ["Black", "Brown"], sizes: ["37", "38"], category: "sandals" }
    ];
    
    // Add to cart function - FIXED
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
    
    // Open quick view
    window.openQuickView = function(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const modalContent = document.getElementById('quickViewContent');
        modalContent.innerHTML = `
            <div class="product-detail-view">
                <div class="product-images-side">
                    <img src="${product.image}" alt="${product.name}" class="main-product-image" id="mainProductImage">
                </div>
                <div class="product-details-side">
                    <h2>${product.name}</h2>
                    <p class="product-price-large">$${product.price.toFixed(2)}</p>
                    <p class="product-description">Premium luxury footwear with exquisite craftsmanship and attention to detail. Handcrafted using the finest materials.</p>
                    
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
                    
                    <div class="quantity-selector">
                        <h4 class="variant-title">Quantity:</h4>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="changeQuantity(-1)">-</button>
                            <input type="number" id="productQuantity" value="1" min="1" max="10" class="qty-input">
                            <button class="qty-btn" onclick="changeQuantity(1)">+</button>
                        </div>
                    </div>
                    
                    <button class="btn-large" onclick="addFromQuickView(${product.id})">
                        <i class="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        // Show modal
        document.getElementById('quickViewModal').style.display = 'flex';
        window.selectedColor = product.colors[0];
        window.selectedSize = product.sizes[0];
        window.selectedProductId = productId;
    };
    
    // Global functions for modal
    window.selectVariant = function(element, type) {
        element.parentElement.querySelectorAll('.variant-option').forEach(opt => {
            opt.classList.remove('active');
        });
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
        
        setTimeout(() => {
            document.getElementById('quickViewModal').style.display = 'none';
        }, 1000);
    };
    
    // Close alert
    window.closeAlert = function() {
        document.getElementById('overlay').style.display = 'none';
    };
    
    // Category filter - FIXED
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
    
    // === EVENT LISTENERS ===
    
    // WhatsApp button
    document.getElementById('whatsappPrimary')?.addEventListener('click', function(e) {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        if (cart.length > 0) {
            e.preventDefault();
            let message = "Hello! I'd like to order from Elviana Luxe:\n\n";
            cart.forEach((item, index) => {
                message += `${index + 1}. ${item.name} (${item.selectedColor}, Size ${item.selectedSize}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
            });
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            message += `\nTotal: $${total.toFixed(2)}\n\nPlease provide:\nName: \nAddress: \nPhone: `;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/2347063327418?text=${encodedMessage}`, '_blank');
        } else {
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
    
    // Modal close
    document.querySelector('.close-modal')?.addEventListener('click', function() {
        document.getElementById('quickViewModal').style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('quickViewModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initializeCart();
        setupCategoryFilter();
        
        // Show welcome alert on first visit
        if (!localStorage.getItem('elvianaWelcomeShown')) {
            setTimeout(() => {
                const overlay = document.getElementById('overlay');
                if (overlay) {
                    overlay.style.display = 'flex';
                    localStorage.setItem('elvianaWelcomeShown', 'true');
                }
            }, 1000);
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
    `;
    document.head.appendChild(style);
    
})();

