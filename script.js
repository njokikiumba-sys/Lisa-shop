const products = [
  { name: "Samsung Galaxy A14 Phone", price: 18999, oldPrice: 24999, image: "📱", keywords: "phone samsung galaxy" },
  { name: "Stylish Sneakers Shoes", price: 2499, oldPrice: 3999, image: "👟", keywords: "shoe shoes sneakers" },
  { name: "Beautiful Handbag", price: 1499, oldPrice: 2500, image: "👜", keywords: "bag handbag" },
  { name: "Wireless Earbuds", price: 1299, oldPrice: 1999, image: "🎧", keywords: "earbuds music" },
  { name: "Smart Watch", price: 3499, oldPrice: 4999, image: "⌚", keywords: "watch smart" },
  { name: "Makeup Set", price: 999, oldPrice: 1799, image: "💄", keywords: "makeup beauty" },
];

let cart = [];
const productsDiv = document.getElementById('products');
const cartBtn = document.getElementById('cartBtn');
const searchInput = document.getElementById('search');
const cartModal = document.getElementById('cartModal');
const cartItemsDiv = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

products.forEach(p => {
  const discount = Math.round((1 - p.price / p.oldPrice) * 100);
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-img">${p.image}</div>
    <h3>${p.name}</h3>
    <p class="price">KSh ${p.price.toLocaleString()}</p>
    <p class="old-price">KSh ${p.oldPrice.toLocaleString()} <span>-${discount}%</span></p>
    <button class="add-btn">Add to Cart</button>
  `;
  card.querySelector('.add-btn').addEventListener('click', () => {
    cart.push(p);
    cartBtn.textContent = `Cart 🛒 (${cart.length})`;
    updateCart();
    alert(p.name + ' added to cart!');
  });
  productsDiv.appendChild(card);
});

function updateCart() {
  cartItemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.style = "display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee;";
    div.innerHTML = `<span>${item.image} ${item.name}</span> <b>KSh ${item.price.toLocaleString()}</b>`;
    cartItemsDiv.appendChild(div);
  });
  cartTotal.textContent = `Total: KSh ${total.toLocaleString()}`;
  if(cart.length === 0) cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
}

cartBtn.addEventListener('click', () => {
  cartModal.style.display = 'block';
  updateCart();
});

document.getElementById('closeCart').addEventListener('click', () => {
  cartModal.style.display = 'none';
});

searchInput.addEventListener('input', () => {
  const searchWord = searchInput.value.toLowerCase().trim();
  const allCards = document.querySelectorAll('.product-card');
  allCards.forEach((card, index) => {
    const fullText = (products[index].name + " " + products[index].keywords).toLowerCase();
    card.style.display = fullText.includes(searchWord) ? 'block' : 'none';
  });
});