// Shopping
function getCart () {
    const cart = localStorage.getItem('cart') ?
    JSON.parse(localStorage.getItem('cart')) : [];
    return cart;
}

// Add to Cart Function
function addToCart(item) {
    const cart = getCart();
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart(cart);
    alert(`${item.name} added to your cart!`);
}

function updateCart (cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Display
function updateCartDisplay() {

        const cart = getCart();
        console.log(cart);
        const cartList = document.getElementById("cart-items");
        const totalDisplay = document.getElementById("total");
        console.log(cartList);
        
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartList.appendChild(li);
        });
        
        
        totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

// Simulate Payment
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for your purchase!");
    cart.length = 0; // Clear the cart
    updateCartDisplay();
}




const location_split = document.location.pathname.split('/');
console.log(location_split[location_split.length - 1]);
if (location_split[location_split.length - 1] ==  "cart.html") {
    updateCartDisplay();
}