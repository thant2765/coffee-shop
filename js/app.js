// cart button

const btn = document.createElement("button")
btn.classList.add("cart-btn")
btn.innerHTML = `
    <img src="/images/icons/cart.png" alt="icon" />
`

document.body.appendChild(btn)

// cart panel
const panel = document.createElement("div")
panel.classList.add("cart-items")
panel.innerHTML = `
    <button id="btn-close-panel" onclick="closePanel()">x</button>
    
    <h2>Items in your cart:</h2>
    

    <div id="cart-items">
        
    </div>
    <div id="total">Total: $<span id="total-price">0.00</span></div>
    <button onclick="clearCart()">Clear</button>
    <button onclick="checkout()">Checkout</button>`
document.body.appendChild(panel)

const panelBack = document.createElement("div")
panelBack.classList.add("cart-panel-back")
document.body.appendChild(panelBack)
panelBack.addEventListener("click", closePanel)

let collapsed = true

btn.addEventListener("click", () => {
  if (collapsed) {
    panel.style.right = "0"
  } else {
    panel.style.right = "-100%"
  }
  collapsed = !collapsed
})

function closePanel() {
  document.querySelector(".cart-items").style.right = "-100%"
  collapsed = false
}

// Shopping

function getCart() {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : []
  return cart
}

// Add to Cart Function
function addToCart(item) {
  const cart = getCart()
  const existingItem = cart.find((cartItem) => cartItem.name === item.name)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.push({ ...item, quantity: 1 })
  }
  updateCart(cart)
  alert(`${item.name} added to your cart!`)
}

function clearCart() {
  updateCart([])
}

function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartDisplay()
}

// Update Cart Display
function updateCartDisplay() {
  const cart = getCart()
  console.log(cart)
  const cartList = document.getElementById("cart-items")
  const totalDisplay = document.getElementById("total-price")
  console.log(cartList)

  let total = 0
  if (cart.length == 0) {
    cartList.innerHTML = `<li>No items yet</li>`
  } else {
    cartList.innerHTML = ``
    cart.forEach((item) => {
      total += item.price * item.quantity
      const li = document.createElement("li")
      li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${
        item.quantity
      }`
      cartList.appendChild(li)
    })
  }

  totalDisplay.textContent = `${total.toFixed(2)}`
}

// Simulate Payment
function checkout() {
  const cart = getCart()
  if (cart.length === 0) {
    alert("Your cart is empty!")
    return
  }

  alert("Thank you for your purchase!")
  cart.length = 0 // Clear the cart
  updateCartDisplay()
}

// const location_split = document.location.pathname.split("/")
// console.log(location_split[location_split.length - 1])
// if (location_split[location_split.length - 1] == "cart.html") {
//   updateCartDisplay()
// }
updateCartDisplay()
