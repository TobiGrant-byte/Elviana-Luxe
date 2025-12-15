// ELVIANA LUXE E-COMMERCE SYSTEM - COMPLETE FIXED VERSION
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
    
    // Product database - FIXED: Removed 'k' from prices, made them numbers
    const products = [
        { id: 1, name: "Designer Gold Heels", price: 40, image: "img 1.jpg", colors: ["Gold", "Rose Gold"], sizes: ["36", "37", "38"], category: "heels" },
        { id: 2, name: "Luxury Leather Boots", price: 40, image: "img 2.jpg", colors: ["Black", "Brown"], sizes: ["37", "38", "39"], category: "boots" },
        { id: 3, name: "Crystal Clear Heels", price: 20, image: "img 3.jpg", colors: ["Clear", "Gold"], sizes: ["36", "37", "38"], category: "heels" },
        { id: 4, name: "Premium White Sneakers", price: 30, image: "img 4.jpg", colors: ["White", "Black"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 5, name: "Elegant Black Heels", price: 20, image: "img 5.jpg", colors: ["Black", "Silver"], sizes: ["37", "38"], category: "heels" },
        { id: 6, name: "Golden Sandals", price: 17, image: "img 6.jpg", colors: ["Gold", "Silver"], sizes: ["36", "37", "38"], category: "sandals" },
        { id: 7, name: "Casual Brown Sneakers", price: 24, image: "img7.jpg", colors: ["Brown", "Black"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 8, name: "Navy Blue Sandals", price: 24, image: "img8.jpg", colors: ["Black", "Navy"], sizes: ["36", "37"], category: "sandals" },
        { id: 9, name: "Classic Ankle Boots", price: 17, image: "img9.jpg", colors: ["Black", "Brown"], sizes: ["37", "38", "39"], category: "boots" },
        { id: 10, name: "Luxury Gold Heels", price: 24, image: "img10.jpg", colors: ["Black", "Gold"], sizes: ["36", "37"], category: "heels" },
        { id: 11, name: "Red Accent Heels", price: 24, image: "img11.jpg", colors: ["Black", "Red"], sizes: ["37", "38"], category: "heels" },
        { id: 12, name: "Brown Leather Sandals", price: 17, image: "img12.jpg", colors: ["Brown", "Black"], sizes: ["36", "37", "38"], category: "sandals" },
        { id: 13, name: "White Summer Sandals", price: 24, image: "img13.jpg", colors: ["White", "Black"], sizes: ["37", "38"], category: "sandals" },
        { id: 14, name: "Sport White Sneakers", price: 30, image: "img14.jpg", colors: ["White", "Gray"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 15, name: "Leather Riding Boots", price: 17, image: "img15.jpg", colors: ["Brown", "Black"], sizes: ["37", "38", "39"], category: "boots" },
        { id: 16, name: "Nude Evening Heels", price: 17, image: "img16.jpg", colors: ["Beige", "Black"], sizes: ["36", "37"], category: "heels" },
        { id: 17, name: "Casual Brown Sneakers", price: 17, image: "img17.jpg", colors: ["Brown", "Black"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 18, name: "Red Party Heels", price: 17, image: "img18.jpg", colors: ["Red", "Black"], sizes: ["36", "37"], category: "heels" },
        { id: 19, name: "Blue Beach Sandals", price: 24, image: "img19.jpg", colors: ["White", "Blue"], sizes: ["37", "38"], category: "sandals" },
        { id: 20, name: "Classic Leather Boots", price: 20, image: "img20.jpg", colors: ["Black", "Brown"], sizes: ["37", "38", "39"], category: "boots" },
        { id: 21, name: "Nude Office Heels", price: 21, image: "img21.jpg", colors: ["Nude", "Black"], sizes: ["36", "37"], category: "heels" },
        { id: 22, name: "Burgundy Casual Sneakers", price: 21, image: "img22.jpg", colors: ["Brown", "Burgundy"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 23, name: "Silver Night Heels", price: 24, image: "img23.jpg", colors: ["Black", "Silver"], sizes: ["36", "37"], category: "heels" },
        { id: 24, name: "Classic Black Heels", price: 17, image: "img24.jpg", colors: ["Black", "Brown"], sizes: ["37", "38"], category: "heels" },
        { id: 25, name: "Elegant Nude Heels", price: 17, image: "img25.jpg", colors: ["Nude", "Black"], sizes: ["36", "37"], category: "heels" },
        { id: 26, name: "Urban Brown Sneakers", price: 20, image: "img26.jpg", colors: ["Brown", "Black"], sizes: ["38", "39", "40"], category: "sneakers" },
        { id: 27, name: "Red Summer Sandals", price: 17, image: "img27.jpg", colors: ["Black", "Red"], sizes: ["36", "37"], category: "sandals" },
        { id: 28, name: "Brown Casual Sandals", price: 21, image: "img28.jpg", colors: ["Brown", "Black"], sizes: ["37", "38"], category: "sandals" },
        { id: 29, name: "Tan Casual Sneakers", price: 21, image: "img29.jpg", colors: ["Brown", "Tan"], sizes: ["38", "39"], category: "sneakers" },
        { id: 30, name: "Black Leather Sandals", price: 21, image: "img30.jpg", colors: ["Black", "Brown"], sizes: ["37", "38"], category: "sandals" }
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
                    <p class="product-price-large">₦${product.price}k</p>
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
            
            // Clean phone numbers (remove any spaces or special characters)
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
    `;
    document.head.appendChild(style);
    
})();

