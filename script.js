// Product Data
const products = [
    { id: 1, name: "Premium Wireless Headphones", price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80", category: "Electronics", desc: "High-fidelity sound with noise cancellation technology." },
    { id: 2, name: "Minimalist Smart Watch", price: 199.50, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80", category: "Electronics", desc: "Sleek design with 24/7 heart rate monitoring." },
    { id: 3, name: "Leather Travel Bag", price: 120.00, image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=500&q=80", category: "Accessories", desc: "Handcrafted genuine leather bag for your adventures." },
    { id: 4, name: "Mechanical Keyboard", price: 85.00, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=500&q=80", category: "Electronics", desc: "Tactile switches with customizable RGB lighting." },
    { id: 5, name: "Ceramic Coffee Set", price: 45.00, image: "https://images.unsplash.com/photo-1517254456976-ee8682099819?auto=format&fit=crop&w=500&q=80", category: "Home", desc: "Minimalist ceramic set for the perfect morning brew." },
    { id: 6, name: "Urban Sneakers", price: 95.00, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80", category: "Fashion", desc: "Comfortable and stylish sneakers for city life." }
];

let cart = [];
let isDarkMode = false;

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const themeToggle = document.getElementById('themeToggle');
const authModal = document.getElementById('authModal');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupTheme();
});

// Render Products
function renderProducts(items) {
    productGrid.innerHTML = items.map(product => `
        <div class="product-card" onclick="showProductDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <p style="color: var(--text-muted); font-size: 0.8rem;">${product.category}</p>
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="btn-add" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Search Logic
function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    showSection('home');
    renderProducts(filtered);
}

// Navigation Logic
function showSection(sectionId) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    window.scrollTo(0,0);
}

function scrollToProducts() {
    document.getElementById('productGrid').scrollIntoView({ behavior: 'smooth' });
}

// Product Details
function showProductDetail(id) {
    const product = products.find(p => p.id === id);
    const detailContainer = document.getElementById('detailContainer');
    
    detailContainer.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="detail-image">
        <div class="detail-info">
            <h1>${product.name}</h1>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p style="margin: 1.5rem 0; color: var(--text-muted);">${product.desc}</p>
            <div style="margin-bottom: 2rem;">
                <strong>Category:</strong> ${product.category}
            </div>
            <button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
    showSection('productDetail');
}

// Cart Logic
function toggleCart() {
    cartSidebar.classList.toggle('active');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div style="flex: 1">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" style="color: #ef4444; border:none; background:none; cursor:pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.innerText = total.toFixed(2);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) return alert("Cart is empty!");
    alert("Order placed successfully! Thank you for shopping at BuyHurt.");
    cart = [];
    updateCartUI();
    toggleCart();
}

// Theme Logic
themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('easyBuyTheme', isDarkMode ? 'dark' : 'light');
});

function setupTheme() {
    const savedTheme = localStorage.getItem('easyBuyTheme');
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Auth Modal Logic
function openAuthModal() { authModal.style.display = 'block'; }
function closeAuthModal() { authModal.style.display = 'none'; }

function toggleTab(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.tab-btn');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        tabs[1].classList.add('active');
        tabs[0].classList.remove('active');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == authModal) closeAuthModal();
}
document.getElementById("sellForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Product Successfully Published on BuyHurt!");
});

document.getElementById("resellForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Resell Product Successfully Listed on BuyHurt!");
});
function addSellerProduct() {

    const name = document.getElementById("sellerName").value;
    const price = parseFloat(document.getElementById("sellerPrice").value);
    const category = document.getElementById("sellerCategory").value;
    const desc = document.getElementById("sellerDesc").value;

    const file = document.getElementById("sellerImage").files[0];

    if (!name || !price || !category || !desc || !file) {
        alert("Please fill all fields");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {

        const newProduct = {
            id: Date.now(),
            name,
            price,
            category,
            desc,
            image: e.target.result
        };

        products.push(newProduct);

        localStorage.setItem("buyhurtProducts", JSON.stringify(products));

        renderProducts(products);

        alert("Product Added Successfully");

        showSection("home");
    };

    reader.readAsDataURL(file);
}
const savedProducts = localStorage.getItem("buyhurtProducts");

if (savedProducts) {
    products.length = 0;
    products.push(...JSON.parse(savedProducts));
}

renderProducts(products);
