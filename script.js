// ELVIANA LUXE - SIMPLE WORKING VERSION
(function() {
    // === 1. WELCOME ALERT (SHOWS ON EVERY LOAD) ===
    window.addEventListener('load', function() {
        setTimeout(() => {
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
        }, 500);
    });

    window.closeAlert = function() {
        document.getElementById('overlay').style.display = 'none';
    };
    
    // === 2. CART SYSTEM ===
    function initializeCart() {
        if (!localStorage.getItem('elvianaCart')) {
            localStorage.setItem('elvianaCart', JSON.stringify([]));
        }
        updateCartCount();
    }
    
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = cartCount;
        });
    }
    
    // === 3. ADD TO CART ===
    window.addToCart = function(productId, quantity = 1) {
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        const products = [
            { id: 1, name: "Gold Elegance Heels", price: 349.99 },
            { id: 2, name: "Black Leather Boots", price: 289.99 },
            // Add all your products here...
        ];
        
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity
            });
        }
        
        localStorage.setItem('elvianaCart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
    };
    
    // === 4. WHATSAPP BUTTON - GUARANTEED WORKING ===
    document.getElementById('whatsappPrimary')?.addEventListener('click', function(e) {
        e.preventDefault();
        
        const cart = JSON.parse(localStorage.getItem('elvianaCart') || '[]');
        
        if (cart.length === 0) {
            // If cart is empty, just open WhatsApp
            window.location.href = "https://wa.me/2347063327418";
            return;
        }
        
        // Create SIMPLE WhatsApp message
        let message = "Hello! I want to order from Elviana Luxe:\n\n";
        
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\nTotal: $${total.toFixed(2)}\n\n`;
        message += "Please contact me for shipping details.";
        
        // ENCODE the message PROPERLY
        const encodedMessage = encodeURIComponent(message);
        
        // DIRECT WhatsApp URL (NO popup blocking)
        const whatsappURL = `https://wa.me/2347063327418?text=${encodedMessage}`;
        
        // Create a link and click it (bypasses popup blockers)
        const link = document.createElement('a');
        link.href = whatsappURL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // After 2 seconds, send to second number
        setTimeout(() => {
            const link2 = document.createElement('a');
            link2.href = `https://wa.me/2349118175497?text=${encodedMessage}`;
            link2.target = '_blank';
            link2.rel = 'noopener noreferrer';
            document.body.appendChild(link2);
            link2.click();
            document.body.removeChild(link2);
        }, 2000);
    });
    
    // === 5. INITIALIZE ===
    document.addEventListener('DOMContentLoaded', function() {
        initializeCart();
    });
    
})();
