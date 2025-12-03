// Cart Page Functionality - FIXED
(function() {
    // Load cart items
    function loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        const cartItemsEl = document.getElementById('cartItems');
        const emptyCartEl = document.getElementById('emptyCart');
        
        if (cart.length === 0) {
            emptyCartEl.style.display = 'block';
            updateSummary(0);
            updateCartCount();
            return;
        }
        
        emptyCartEl.style.display = 'none';
        
        cartItemsEl.innerHTML = cart.map((item, index) => `
            <div class="cart-item" data-item-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-variant">${item.selectedColor} • Size ${item.selectedSize}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        updateSummary(subtotal);
        updateCartCount();
    }

    // Update cart quantity - FIXED
    window.updateCartQuantity = function(itemIndex, change) {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        
        if (cart[itemIndex]) {
            cart[itemIndex].quantity += change;
            
            // Remove if quantity reaches 0
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            localStorage.setItem('elvianaCart', JSON.stringify(cart));
            loadCartItems();
        }
    };

    // Remove from cart - FIXED
    window.removeFromCart = function(itemIndex) {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        
        if (cart[itemIndex]) {
            cart.splice(itemIndex, 1);
            localStorage.setItem('elvianaCart', JSON.stringify(cart));
            loadCartItems();
        }
    };

    // Update order summary
    function updateSummary(subtotal) {
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
    }

    // Update cart count in header
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = cartCount;
    }

    // Checkout button - Shows order form
    document.getElementById('checkoutBtn')?.addEventListener('click', function() {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        if (cart.length === 0) {
            alert('Your cart is empty. Add items before checkout.');
            return;
        }
        
        // Create simple checkout form
        const name = prompt('Enter your full name:');
        if (!name) return;
        
        const address = prompt('Enter your shipping address:');
        if (!address) return;
        
        const phone = prompt('Enter your phone number:');
        if (!phone) return;
        
        // Create order summary for WhatsApp
        let message = `NEW ORDER - ${new Date().toLocaleDateString()}\n`;
        message += `Name: ${name}\n`;
        message += `Address: ${address}\n`;
        message += `Phone: ${phone}\n\n`;
        message += "Order Details:\n";
        
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} (${item.selectedColor}, Size ${item.selectedSize}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\nTotal: $${total.toFixed(2)}`;
        
        // Save order to localStorage (simple order history)
        const orders = JSON.parse(localStorage.getItem('elvianaOrders') || '[]');
        orders.push({
            id: Date.now(),
            date: new Date().toISOString(),
            customer: { name, address, phone },
            items: cart,
            total: total,
            status: 'pending'
        });
        localStorage.setItem('elvianaOrders', JSON.stringify(orders));
        
        // Clear cart after order
        localStorage.removeItem('elvianaCart');
        
        // Send via WhatsApp
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/2347063327418?text=${encodedMessage}`, '_blank');
        
        // Show confirmation
        alert('Order placed successfully! You will be redirected to WhatsApp to confirm.');
        
        // Reload page to show empty cart
        setTimeout(() => {
            loadCartItems();
        }, 1000);
    });

    // WhatsApp checkout button
    document.getElementById('whatsappCheckout')?.addEventListener('click', function() {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        if (cart.length === 0) {
            window.open('https://wa.me/2347063327418', '_blank');
        } else {
            // Create order summary
            let message = "Hello! I'd like to order from Elviana Luxe:\n\n";
            cart.forEach((item, index) => {
                message += `${index + 1}. ${item.name} (${item.selectedColor}, Size ${item.selectedSize}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
            });
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            message += `\nTotal: $${total.toFixed(2)}\n\nPlease provide:\nName: \nAddress: \nPhone: `;
            
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/2347063327418?text=${encodedMessage}`, '_blank');
        }
    });

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        loadCartItems();
    });

})();
