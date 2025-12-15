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
    
    // ========== CHECKOUT FUNCTIONALITY ==========
    
    // Open checkout modal
    window.openCheckoutModal = function() {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Update order summary in modal
        const orderItems = document.getElementById('modalOrderItems');
        const orderTotal = document.getElementById('modalOrderTotal');
        
        let itemsHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemsHTML += `
                <div class="order-item">
                    <span>${item.name} (${item.selectedColor}, Size ${item.selectedSize})</span>
                    <span>${item.quantity} × ₦${item.price}k = ₦${itemTotal}k</span>
                </div>
            `;
        });
        
        if (orderItems) orderItems.innerHTML = itemsHTML;
        if (orderTotal) orderTotal.textContent = total;
        
        // Show modal
        const checkoutModal = document.getElementById('checkoutModal');
        if (checkoutModal) {
            checkoutModal.style.display = 'flex';
        } else {
            console.warn('Checkout modal not found. Make sure to add the modal HTML to your page.');
        }
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
    
    // Save order to PHP backend
    window.saveOrderToBackend = function(orderData) {
        return fetch('php/save_order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json());
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
                    alert('Failed to save order. Please try again or use WhatsApp checkout.');
                })
                .finally(() => {
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // ========== END CHECKOUT FUNCTIONALITY ==========
    
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
        
        const checkoutModal = document.getElementById('checkoutModal');
        if (checkoutModal && event.target === checkoutModal) {
            closeCheckoutModal();
        }
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
        /* Checkout modal styles */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            justify-content: center;
            align-items: center;
        }
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
        }
        .modal-content h2 {
            margin-top: 0;
            color: #333;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
        }
        .order-summary {
            margin: 20px 0;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 5px;
        }
        .order-item {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            border-bottom: 1px solid #eee;
        }
        .order-total {
            text-align: right;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 2px solid #333;
            font-size: 18px;
        }
        .btn-checkout {
            background: #000;
            color: white;
            border: none;
            padding: 15px 30px;
            width: 100%;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .btn-checkout:hover {
            background: #333;
        }
        .close {
            float: right;
            font-size: 28px;
            cursor: pointer;
            color: #999;
        }
        .close:hover {
            color: #333;
        }
        .checkout-btn {
            background: #000;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 18px;
            border-radius: 5px;
            cursor: pointer;
            display: block;
            width: 100%;
            margin: 20px 0;
            transition: background 0.3s;
        }
        .checkout-btn:hover {
            background: #333;
        }
    `;
    document.head.appendChild(style);
    
})();
