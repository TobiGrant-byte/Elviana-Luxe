// Cart Page Functionality
(function() {
    // Load cart items
    function loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        const cartItemsEl = document.getElementById('cartItems');
        const emptyCartEl = document.getElementById('emptyCart');
        
        if (cart.length === 0) {
            emptyCartEl.style.display = 'block';
            updateSummary(0);
            return;
        }
        
        emptyCartEl.style.display = 'none';
        
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item" data-item-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-variant">${item.selectedColor} • Size ${item.selectedSize}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id}, '${item.selectedColor}', '${item.selectedSize}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        updateSummary(subtotal);
    }

    // Update cart quantity
    window.updateCartQuantity = function(productId, change) {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        const itemIndex = cart.findIndex(item => 
            item.id === productId
        );
        
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            
            // Remove if quantity reaches 0
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            localStorage.setItem('elvianaCart', JSON.stringify(cart));
            loadCartItems();
            
            // Update cart count in header
            const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cart-count').textContent = cartCount;
        }
    };

    // Remove from cart
    window.removeFromCart = function(productId, color, size) {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        const newCart = cart.filter(item => 
            !(item.id === productId && item.selectedColor === color && item.selectedSize === size)
        );
        
        localStorage.setItem('elvianaCart', JSON.stringify(newCart));
        loadCartItems();
        
        // Update cart count in header
        const cartCount = newCart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = cartCount;
    };

    // Update order summary
    function updateSummary(subtotal) {
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
    }

    // Checkout button
    document.getElementById('checkoutBtn')?.addEventListener('click', function() {
        alert('Checkout functionality would be implemented here. For now, use WhatsApp ordering.');
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