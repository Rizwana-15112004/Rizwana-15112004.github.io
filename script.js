// Sample products data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 999,
    image: "https://via.placeholder.com/200x150?text=Headphones"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1499,
    image: "https://via.placeholder.com/200x150?text=Smart+Watch"
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 499,
    image: "https://via.placeholder.com/200x150?text=Gaming+Mouse"
  }
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartSection = document.getElementById("cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountSpan = document.getElementById("cart-count");
const totalPriceSpan = document.getElementById("total-price");

function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsContainer.appendChild(productCard);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }
  updateCart();
}

function updateCart() {
  cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  renderCartItems();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceSpan.textContent = "0";
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const cartItemDiv = document.createElement("div");
    cartItemDiv.innerHTML = `
      <strong>${item.name}</strong> - ₹${item.price} x ${item.quantity}
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
  });
  totalPriceSpan.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Show / Hide cart
document.getElementById("show-cart-btn").addEventListener("click", () => {
  cartSection.classList.toggle("hidden");
});

document.getElementById("close-cart-btn").addEventListener("click", () => {
  cartSection.classList.add("hidden");
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Thank you for your purchase! (This is just a demo.)");
  cart = [];
  updateCart();
  cartSection.classList.add("hidden");
});

// Initial render
renderProducts();
updateCart();
