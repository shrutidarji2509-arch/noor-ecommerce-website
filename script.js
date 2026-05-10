// ==================== GLOBAL VARIABLES ====================
let currentRotation = 0;
let autoRotateInterval = null;
let selectedRating = 0;
let currentUser = null;

// ==================== PRODUCT DATABASE WITH GENDER TAGS ====================
const productsDatabase = [
    // WOMEN PRODUCTS (makeup, kajal, lipsticks, beauty)
    { id: 1, name: "Classic Kajal", price: 199, category: "kajal", gender: "women", rating: 4.5, reviews: 128, image: "images/classic kajal.png", badge: "Best Seller", isNew: false, sales: 500 },
    { id: 2, name: "Smudge Proof Kajal", price: 249, category: "kajal", gender: "women", rating: 4.7, reviews: 95, image: "images/smudgeproof kajal.png", badge: "New", isNew: true, sales: 300 },
    { id: 3, name: "Waterproof Kajal", price: 299, category: "kajal", gender: "women", rating: 4.6, reviews: 203, image: "images/waterproof kajal.jpeg", badge: "", isNew: false, sales: 450 },
    { id: 10, name: "Matte Lipstick - Ruby Red", price: 399, category: "makeup", gender: "women", rating: 4.9, reviews: 512, image: "images/Matte Lipstick - Ruby Red.png", badge: "Bestseller", isNew: false, sales: 1200 },
    { id: 11, name: "Nude Lipstick", price: 299, category: "makeup", gender: "women", rating: 4.6, reviews: 234, image: "images/Nude Lipstick .png", badge: "", isNew: true, sales: 300 },
    { id: 13, name: "Liquid Lipstick - Pink", price: 349, category: "makeup", gender: "women", rating: 4.7, reviews: 178, image: "images/Liquid Lipstick - Pink.png", badge: "New", isNew: true, sales: 250 },
    { id: 14, name: "Eyeliner Pen", price: 199, category: "makeup", gender: "women", rating: 4.4, reviews: 98, image: "images/mascara.jpeg", badge: "", isNew: false, sales: 320 },
    { id: 15, name: "Mascara - Volumizing", price: 299, category: "makeup", gender: "women", rating: 4.8, reviews: 245, image: "images/mascara.jpeg", badge: "Top Rated", isNew: false, sales: 680 },
    { id: 16, name: "Compact Powder", price: 449, category: "makeup", gender: "women", rating: 4.5, reviews: 189, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300", badge: "", isNew: false, sales: 420 },
    
    // UNISEX PRODUCTS (skincare, hair care - for everyone)
    { id: 4, name: "Argan Hair Serum", price: 399, category: "hair", gender: "unisex", rating: 4.8, reviews: 312, image: "images/Argan Hair Serum.png", badge: "Top Rated", isNew: false, sales: 800 },
    { id: 5, name: "Keratin Smooth Serum", price: 349, category: "hair", gender: "unisex", rating: 4.4, reviews: 167, image: "images/Keratin Smooth Serum.png", badge: "", isNew: true, sales: 200 },
    { id: 6, name: "Anti-Frizz Serum", price: 299, category: "hair", gender: "unisex", rating: 4.3, reviews: 89, image: "images/Anti-Frizz Serum.png", badge: "", isNew: false, sales: 350 },
    { id: 7, name: "Ayurvedic Face Cream", price: 349, category: "skincare", gender: "unisex", rating: 4.6, reviews: 278, image: "images/Ayurvedic Face Cream.png", badge: "Organic", isNew: false, sales: 600 },
    { id: 8, name: "Hydrating Moisturizer", price: 299, category: "skincare", gender: "unisex", rating: 4.5, reviews: 198, image: "images/Hydrating Moisturizer.png", badge: "", isNew: true, sales: 400 },
    { id: 9, name: "Vitamin C Moisturizer", price: 349, category: "skincare", gender: "unisex", rating: 4.7, reviews: 245, image: "images/Vitamin C Moisturizer.png", badge: "Best Seller", isNew: false, sales: 550 },
    
    // MEN PRODUCTS (grooming, beard,男士专用)
    { id: 17, name: "Beard Oil - Classic", price: 399, category: "grooming", gender: "men", rating: 4.7, reviews: 156, image: "images/Beard Oil - Classic.png", badge: "Men's Choice", isNew: false, sales: 450 },
    { id: 18, name: "Beard Wash", price: 299, category: "grooming", gender: "men", rating: 4.5, reviews: 98, image: "images/Beard wash.png", badge: "", isNew: true, sales: 230 },
    { id: 19, name: "Beard Comb Set", price: 199, category: "grooming", gender: "men", rating: 4.3, reviews: 67, image: "https://images.unsplash.com/photo-1621607512022-6aecc4ced814?w=300", badge: "", isNew: false, sales: 180 },
    { id: 20, name: "Men's Face Wash", price: 249, category: "skincare", gender: "men", rating: 4.6, reviews: 212, image: "images/Men's Face Wash.png", badge: "Best for Men", isNew: false, sales: 580 },
    { id: 21, name: "Men's Moisturizer", price: 299, category: "skincare", gender: "men", rating: 4.5, reviews: 145, image: "images/Men's Moisturizer.png", badge: "", isNew: true, sales: 310 },
    { id: 22, name: "After Shave Balm", price: 349, category: "grooming", gender: "men", rating: 4.4, reviews: 89, image: "https://images.unsplash.com/photo-1621607512022-6aecc4ced814?w=300", badge: "", isNew: false, sales: 275 },
    { id: 23, name: "Hair Wax - Strong Hold", price: 299, category: "hair", gender: "men", rating: 4.6, reviews: 134, image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=300", badge: "", isNew: false, sales: 390 },
    { id: 24, name: "Men's Deodorant", price: 399, category: "luxury", gender: "men", rating: 4.8, reviews: 178, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300", badge: "Premium", isNew: false, sales: 520 },
    
    // LUXURY (premium for both, but some men-specific)
    { id: 12, name: "Luxury Perfume", price: 4999, category: "luxury", gender: "unisex", rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300", badge: "Premium", isNew: false, sales: 150 }
];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Load current user
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Update cart count on all pages
    updateCartCount();
    
    // Check if gender was already selected (only once)
    const genderSelected = localStorage.getItem('genderSelected');
    const genderModal = document.getElementById('genderModal');
    
    if (!genderSelected && genderModal) {
        genderModal.style.display = 'flex';
    } else if (genderModal) {
        genderModal.style.display = 'none';
    }
    
    // Apply saved gender theme and filter products
    if (genderSelected && genderSelected !== 'null') {
        applyGenderTheme(genderSelected);
        applyGenderFilter(genderSelected);
    }
    
    // Load products if on homepage
    if (document.getElementById('productGrid')) {
        loadFeaturedProducts();
        loadNewArrivals();
        loadBestSellers();
    }
    
    // Load reviews
    if (document.getElementById('reviewsGrid')) {
        loadReviews();
    }
    
    // Initialize chat if on homepage
    if (document.getElementById('chatbot')) {
        initChatbot();
    }
    
    // Add scroll to top button
    addScrollToTop();
    
    // Initialize hamburger menu
    initHamburgerMenu();
    
    // Initialize star rating
    initStarRating();
    
    // Update user info in navbar if logged in
    updateNavbarUser();

const savedGender = localStorage.getItem('genderSelected');
    if (savedGender && savedGender !== 'null') {
        updateHeroForGender(savedGender);
    } else {
        updateHeroForGender('women');
    }

});

// ==================== APPLY GENDER FILTER ====================
function applyGenderFilter(gender) {
    // Store current gender filter
    localStorage.setItem('currentGenderFilter', gender);
    
    // Refresh product displays
    if (document.getElementById('productGrid')) {
        loadFeaturedProducts();
        loadNewArrivals();
        loadBestSellers();
    }
}

// Get products based on selected gender
function getFilteredProducts() {
    const selectedGender = localStorage.getItem('genderSelected');
    if (!selectedGender || selectedGender === 'null') {
        return productsDatabase;
    }
    
    if (selectedGender === 'women') {
        // Women see: women products + unisex products
        return productsDatabase.filter(p => p.gender === 'women' || p.gender === 'unisex');
    } else if (selectedGender === 'men') {
        // Men see: men products + unisex products
        return productsDatabase.filter(p => p.gender === 'men' || p.gender === 'unisex');
    }
    
    return productsDatabase;
}

// ==================== APPLY GENDER THEME ====================
function applyGenderTheme(gender) {
    if (gender === 'women') {
        document.body.style.background = 'linear-gradient(135deg, #fff0f5, #ffe4ec)';
        document.body.setAttribute('data-gender', 'women');
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.background = 'rgba(255,255,255,0.95)';
    } else if (gender === 'men') {
        document.body.style.background = '#f5f6f8';
        document.body.setAttribute('data-gender', 'men');
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.background = 'rgba(255,255,255,0.98)';
    }
}

// ==================== UPDATE NAVBAR USER ====================
function updateNavbarUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userIcon = document.querySelector('.nav-icons .fa-user');
    
    if (currentUser && currentUser.isLoggedIn && userIcon) {
        userIcon.classList.remove('fa-user');
        userIcon.classList.add('fa-user-check');
        userIcon.style.color = '#4caf50';
        
        // Add logout option on click
        userIcon.onclick = function(e) {
            e.stopPropagation();
            showUserMenu();
        };
    } else if (userIcon) {
        userIcon.classList.remove('fa-user-check');
        userIcon.classList.add('fa-user');
        userIcon.style.color = '';
        userIcon.onclick = function() {
            window.location.href = 'login.html';
        };
    }
}

// ==================== SHOW USER MENU ====================
function showUserMenu() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.innerHTML = `
        <div class="user-menu-content">
            <div class="user-info">
                <strong>${currentUser.name}</strong>
                <small>${currentUser.email}</small>
            </div>
            <div class="user-menu-divider"></div>
            <div class="user-menu-item" onclick="window.location.href='track-order.html'">
                <i class="fas fa-truck"></i> Track Orders
            </div>
            <div class="user-menu-item" onclick="window.location.href='wishlist.html'">
                <i class="fas fa-heart"></i> Wishlist
            </div>
            <div class="user-menu-divider"></div>
            <div class="user-menu-item logout" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i> Logout
            </div>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && !e.target.classList.contains('fa-user-check')) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

// ==================== LOGOUT FUNCTION ====================
function logout() {
    localStorage.removeItem('currentUser');
    updateCartCount();
    updateNavbarUser();
    showNotification('Logged out successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ==================== TOGGLE GENDER MODAL ====================
function toggleGenderModal() {
    const modal = document.getElementById('genderModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '1';
    }
}

// ==================== HAMBURGER MENU ====================
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    }
});

// ==================== SCROLL TO TOP ====================
function addScrollToTop() {
    const scrollBtn = document.createElement('div');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
}

// ==================== CART FUNCTIONS ====================
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('#cart-count, #cart-count-nav');
    cartCountElements.forEach(el => {
        if (el) el.innerText = cart.length;
    });
}

function addToCart(name, price, image, description) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({
            id: Date.now(),
            name: name,
            price: price,
            image: image,
            description: description || 'Premium quality product',
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show animation feedback
    showAddToCartAnimation();
    showNotification(`${name} added to cart! 🛒`, 'success');
    
    return true;
}

function showAddToCartAnimation() {
    const floatingCart = document.querySelector('.floating-cart');
    if (floatingCart) {
        floatingCart.style.transform = 'scale(1.2)';
        setTimeout(() => {
            floatingCart.style.transform = 'scale(1)';
        }, 300);
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const removedItem = cart[index];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Refresh cart page if on cart page
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
    
    if (removedItem) {
        showNotification(`${removedItem.name} removed from cart`, 'info');
    }
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        const newQuantity = (cart[index].quantity || 1) + change;
        if (newQuantity >= 1) {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            if (window.location.pathname.includes('cart.html')) {
                renderCartPage();
            }
        }
    }
}

// ==================== WISHLIST FUNCTIONS ====================
function addToWishlistFromDetail(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.some(item => item.id === product.id);
    
    if (!exists) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification('Added to wishlist! ❤️', 'success');
    } else {
        showNotification('Already in wishlist!', 'info');
    }
}

function removeFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    if (window.location.pathname.includes('wishlist.html')) {
        renderWishlist();
    }
    showNotification('Removed from wishlist', 'info');
}

// ==================== PRODUCT DISPLAY FUNCTIONS ====================
function loadFeaturedProducts() {
    const container = document.getElementById('productGrid');
    if (!container) return;
    
    const filteredProducts = getFilteredProducts();
    const featured = filteredProducts.slice(0, 8);
    container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

function loadNewArrivals() {
    const container = document.getElementById('newArrivalsGrid');
    if (!container) return;
    
    const filteredProducts = getFilteredProducts();
    const newArrivals = filteredProducts.filter(p => p.isNew).slice(0, 4);
    container.innerHTML = newArrivals.map(product => createProductCard(product)).join('');
}

function loadBestSellers() {
    const container = document.getElementById('bestSellersGrid');
    if (!container) return;
    
    const filteredProducts = getFilteredProducts();
    const bestSellers = filteredProducts.sort((a, b) => b.sales - a.sales).slice(0, 4);
    container.innerHTML = bestSellers.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    let wishlist = [];
    try {
        wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch(e) {
        wishlist = [];
    }
    const isWishlisted = wishlist.some(item => item && item.id === product.id);
    
    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
            </div>
            <img src="${product.image}" alt="${product.name}" onclick="viewProduct(${product.id})">
            <div class="product-info">
                <h3 onclick="viewProduct(${product.id})">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">₹${product.price}</div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart('${product.name}', ${product.price}, '${product.image}', '${product.name}')">
                    Add to Cart 🛒
                </button>
            </div>
            <div class="share-btn" onclick="event.stopPropagation(); shareProduct('${product.name}', ${product.id})">
                <i class="fas fa-share-alt"></i>
            </div>
        </div>
    `;
}


// ==================== TOGGLE WISHLIST (IMPROVED) ====================
function toggleWishlist(productId) {
    // Convert to number in case it comes as string
    const id = parseInt(productId);
    const product = productsDatabase.find(p => p.id === id);
    
    if (!product) {
        console.log("Product not found:", id);
        showNotification('Product not found', 'error');
        return;
    }
    
    let wishlist = [];
    try {
        wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch(e) {
        wishlist = [];
    }
    
    const exists = wishlist.some(item => item && item.id === id);
    
    if (exists) {
        wishlist = wishlist.filter(item => item && item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification(`${product.name} removed from wishlist`, 'info');
    } else {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            gender: product.gender || 'unisex'
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification(`${product.name} added to wishlist! ❤️`, 'success');
    }
    
    // Update ALL wishlist buttons on the page (not just the clicked one)
    updateAllWishlistButtons();
}

// ==================== UPDATE ALL WISHLIST BUTTONS (NEW FUNCTION) ====================
function updateAllWishlistButtons() {
    let wishlist = [];
    try {
        wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch(e) {
        wishlist = [];
    }
    
    // Get all wishlist buttons across all product grids
    const allWishlistBtns = document.querySelectorAll('.product-card .wishlist-btn');
    
    allWishlistBtns.forEach(btn => {
        const productCard = btn.closest('.product-card');
        if (productCard) {
            const productId = parseInt(productCard.getAttribute('data-id'));
            const isWishlisted = wishlist.some(item => item && item.id === productId);
            
            if (isWishlisted) {
                btn.classList.add('active');
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
            } else {
                btn.classList.remove('active');
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
            }
        }
    });
}
function viewProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

function shareProduct(productName, productId) {
    const url = `${window.location.origin}${window.location.pathname}?id=${productId}`;
    const text = `Check out ${productName} on Noor! ✨`;
    
    if (navigator.share) {
        navigator.share({
            title: productName,
            text: text,
            url: url
        }).catch(() => {
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    showNotification('Link copied to clipboard!', 'success');
}

// ==================== GENDER SELECTION (UPDATED) ====================
function selectGender(gender) {
    localStorage.setItem('genderSelected', gender);
    document.body.setAttribute('data-gender', gender);
    applyGenderTheme(gender);
    applyGenderFilter(gender);

    updateHeroForGender(gender);

    closeGenderModal();
    
    // Refresh all product displays
    refreshAllProducts();
    
    const genderName = gender === 'women' ? '🌸 Women' : '💪 Men';
    showNotification(`${genderName} mode activated! Showing ${gender === 'women' ? 'beauty & makeup' : 'grooming & skincare'} products.`, 'success');
}


function closeGenderModal() {
    const modal = document.getElementById('genderModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// ==================== 360° PRODUCT VIEW ====================
const rotationImageUrls = [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300'
];

function rotateLeft() {
    const img = document.getElementById('rotatingImage');
    if (!img) return;
    
    currentRotation = (currentRotation - 1 + rotationImageUrls.length) % rotationImageUrls.length;
    img.src = rotationImageUrls[currentRotation];
}

function rotateRight() {
    const img = document.getElementById('rotatingImage');
    if (!img) return;
    
    currentRotation = (currentRotation + 1) % rotationImageUrls.length;
    img.src = rotationImageUrls[currentRotation];
}

// ==================== REVIEWS SYSTEM ====================
function loadReviews() {
    const container = document.getElementById('reviewsGrid');
    if (!container) return;
    
    let reviews = [];
    try {
        reviews = JSON.parse(localStorage.getItem('noorReviews')) || [];
    } catch(e) {
        reviews = [];
    }
    
    // Default reviews if empty
    if (reviews.length === 0) {
        reviews = [
            { name: "Priya Sharma", rating: 5, text: "Absolutely love the kajal! It's so smooth and long-lasting. Best purchase ever!", date: "2024-01-15", avatar: "P" },
            { name: "Aditya Mehta", rating: 4, text: "Great quality products. The hair serum worked wonders for my damaged hair.", date: "2024-01-10", avatar: "A" },
            { name: "Neha Gupta", rating: 5, text: "Best beauty website ever! The packaging is luxurious and delivery was super fast.", date: "2024-01-05", avatar: "N" }
        ];
        localStorage.setItem('noorReviews', JSON.stringify(reviews));
    }
    
    container.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">${review.avatar || (review.name ? review.name.charAt(0) : 'U')}</div>
                <div class="review-info">
                    <h4>${review.name || 'Anonymous'}</h4>
                    <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                </div>
            </div>
            <p class="review-text">"${review.text || ''}"</p>
            <small style="color: #999;">${review.date || new Date().toLocaleDateString()}</small>
        </div>
    `).join('');
}

function submitReview() {
    const reviewText = document.getElementById('reviewText')?.value.trim();
    const reviewerName = document.getElementById('reviewerName')?.value.trim();
    
    if (!reviewText || !reviewerName) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (selectedRating === 0) {
        showNotification('Please select a rating', 'error');
        return;
    }
    
    const review = {
        name: reviewerName,
        rating: selectedRating,
        text: reviewText,
        date: new Date().toLocaleDateString('en-IN'),
        avatar: reviewerName.charAt(0).toUpperCase()
    };
    
    let reviews = [];
    try {
        reviews = JSON.parse(localStorage.getItem('noorReviews')) || [];
    } catch(e) {
        reviews = [];
    }
    reviews.unshift(review);
    localStorage.setItem('noorReviews', JSON.stringify(reviews));
    
    // Clear form
    if (document.getElementById('reviewText')) document.getElementById('reviewText').value = '';
    if (document.getElementById('reviewerName')) document.getElementById('reviewerName').value = '';
    selectedRating = 0;
    
    // Reset star rating UI
    const stars = document.querySelectorAll('#starRating i');
    stars.forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
        star.style.color = '#ddd';
    });
    
    showNotification('Thank you for your review! ✨', 'success');
    loadReviews();
}

function initStarRating() {
    const starContainer = document.getElementById('starRating');
    if (!starContainer) return;
    
    const stars = starContainer.querySelectorAll('i');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            stars.forEach((s, i) => {
                if (i < selectedRating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                    s.style.color = '#ffc107';
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                    s.style.color = '#ddd';
                }
            });
        });
    });
}

// ==================== AI CHATBOT ====================
function initChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (!chatbot) return;
    chatbot.classList.remove('active');
}

function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    const icon = document.getElementById('chatToggleIcon');
    
    if (chatbot) {
        chatbot.classList.toggle('active');
        if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;
    
    // Add user message
    messagesContainer.innerHTML += `<div class="user-message">${escapeHtml(message)}</div>`;
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Get bot response
    setTimeout(() => {
        const response = getBotResponse(message.toLowerCase());
        messagesContainer.innerHTML += `<div class="bot-message">${response}</div>`;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
}

function getBotResponse(message) {
    if (message.includes('kajal')) {
        return "🖤 Our Kajal collection features smudge-proof, waterproof formulas. Prices start from ₹199.";
    }
    if (message.includes('serum')) {
        return "💆‍♀️ Our Hair Serums help reduce frizz and add shine. Prices start from ₹299.";
    }
    if (message.includes('beard')) {
        return "🧔 Our men's grooming collection includes beard oils, washes, and combs. Prices start from ₹199.";
    }
    if (message.includes('hello') || message.includes('hi')) {
        return "✨ Hello! Welcome to Noor. How can I help you today?";
    }
    if (message.includes('shipping')) {
        return "📦 Free shipping on orders above ₹999. Delivery takes 3-5 business days.";
    }
    if (message.includes('return')) {
        return "🔄 We have a 7-day easy return and exchange policy.";
    }
    if (message.includes('discount')) {
        return "🎉 Use code 'NOOR10' for 10% off!";
    }
    return "✨ I can help with products, shipping, returns, and offers. What would you like to know?";
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Allow Enter key to send message
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && document.activeElement && document.activeElement.id === 'chatInput') {
        sendMessage();
    }
});

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle')}"></i>
            <span>${message}</span>
        </div>
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 15px 25px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                border-left: 4px solid;
            }
            .notification-success { border-left-color: #4caf50; }
            .notification-error { border-left-color: #ff4444; }
            .notification-info { border-left-color: #2196f3; }
            .notification-content { display: flex; align-items: center; gap: 10px; }
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideOutRight {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== PRODUCT FILTER ====================
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== ENHANCED SEARCH FUNCTIONALITY ====================

// Store recent searches in localStorage
function getRecentSearches() {
    let recent = localStorage.getItem('recentSearches');
    return recent ? JSON.parse(recent) : [];
}

function saveRecentSearch(term) {
    if (!term || term.trim() === '') return;
    let recent = getRecentSearches();
    // Remove if exists
    recent = recent.filter(item => item !== term);
    // Add to beginning
    recent.unshift(term);
    // Keep only last 5
    recent = recent.slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(recent));
}

function clearRecentSearches() {
    localStorage.removeItem('recentSearches');
    renderRecentSearches();
}

function renderRecentSearches() {
    const container = document.getElementById('recentSearchesList');
    if (!container) return;
    
    const recent = getRecentSearches();
    if (recent.length === 0) {
        container.innerHTML = '<p style="color: #999; font-size: 12px;">No recent searches</p>';
        return;
    }
    
    container.innerHTML = recent.map(term => `
        <div class="recent-item" onclick="searchQuick('${term}')">
            <i class="fas fa-history"></i>
            <span>${escapeHtml(term)}</span>
            <i class="fas fa-times-circle" onclick="event.stopPropagation(); removeRecentSearch('${term}')"></i>
        </div>
    `).join('');
}

function removeRecentSearch(term) {
    let recent = getRecentSearches();
    recent = recent.filter(item => item !== term);
    localStorage.setItem('recentSearches', JSON.stringify(recent));
    renderRecentSearches();
    performSearch(); // Refresh search results
}

// Voice Search
function startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showNotification('Voice search not supported in your browser', 'error');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = function() {
        const voiceBtn = document.getElementById('voiceSearchBtn');
        if (voiceBtn) {
            voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            voiceBtn.style.background = '#e91e63';
            voiceBtn.style.animation = 'pulse 1s infinite';
        }
        showNotification('Listening... Speak now 🎤', 'info');
    };
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = transcript;
            performSearch();
            saveRecentSearch(transcript);
        }
        showNotification(`Searched: "${transcript}"`, 'success');
    };
    
    recognition.onerror = function(event) {
        showNotification('Voice recognition error. Please try again.', 'error');
    };
    
    recognition.onend = function() {
        const voiceBtn = document.getElementById('voiceSearchBtn');
        if (voiceBtn) {
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.style.background = '';
            voiceBtn.style.animation = '';
        }
    };
    
    recognition.start();
}

// Filter by price range
let currentPriceRange = { min: 0, max: Infinity };
let currentSortBy = 'relevance';

function filterByPrice() {
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
    
    currentPriceRange = { min: minPrice, max: maxPrice };
    performSearch(); // Re-run search with price filter
}

function resetPriceFilter() {
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    currentPriceRange = { min: 0, max: Infinity };
    performSearch();
}

function sortProducts(products, sortBy) {
    currentSortBy = sortBy;
    const sorted = [...products];
    
    switch(sortBy) {
        case 'price_low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price_high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'relevance':
        default:
            return sorted;
    }
}

// Enhanced openSearch function
function openSearch() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-modal-content">
            <div class="search-modal-header">
                <i class="fas fa-search"></i>
                <input type="text" id="searchInput" placeholder="Search for products... (e.g., Kajal, Serum, Lipstick)" autocomplete="off">
                <button id="voiceSearchBtn" class="voice-search-btn" onclick="startVoiceSearch()">
                    <i class="fas fa-microphone"></i>
                </button>
                <button class="search-close-btn" onclick="closeSearchModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="search-suggestions">
                <div class="search-sidebar">
                    <!-- Filters Section -->
                    <div class="search-filters">
                        <h4><i class="fas fa-filter"></i> Filters</h4>
                        <div class="price-filter">
                            <label>Price Range</label>
                            <div class="price-inputs">
                                <input type="number" id="minPrice" placeholder="Min ₹" oninput="filterByPrice()">
                                <span>-</span>
                                <input type="number" id="maxPrice" placeholder="Max ₹" oninput="filterByPrice()">
                            </div>
                            <button class="reset-filter-btn" onclick="resetPriceFilter()">Reset</button>
                        </div>
                        <div class="sort-filter">
                            <label>Sort By</label>
                            <select id="sortBy" onchange="sortProductsBySelect(this.value)">
                                <option value="relevance">Relevance</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                                <option value="name">Name A-Z</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Recent Searches -->
                    <div class="search-recent">
                        <div class="recent-header">
                            <h4><i class="fas fa-history"></i> Recent Searches</h4>
                            <button class="clear-recent-btn" onclick="clearRecentSearches()">Clear</button>
                        </div>
                        <div id="recentSearchesList" class="recent-list"></div>
                    </div>
                    
                    <!-- Trending Searches -->
                    <div class="search-trending">
                        <h4><i class="fas fa-fire"></i> Trending</h4>
                        <div class="trending-tags">
                            <span onclick="searchQuick('kajal')">Kajal</span>
                            <span onclick="searchQuick('lipstick')">Lipstick</span>
                            <span onclick="searchQuick('serum')">Hair Serum</span>
                            <span onclick="searchQuick('moisturizer')">Moisturizer</span>
                            <span onclick="searchQuick('beard')">Beard Oil</span>
                            <span onclick="searchQuick('perfume')">Perfume</span>
                        </div>
                    </div>
                </div>
                
                <!-- Results Section -->
                <div class="search-results-area">
                    <div class="search-results-header">
                        <span>Products</span>
                        <span id="searchResultCount"></span>
                    </div>
                    <div id="searchResultsList" class="search-results-list"></div>
                </div>
            </div>
        </div>
    `;
    
    // Add enhanced styles
    if (!document.querySelector('#search-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'search-modal-styles';
        style.textContent = `
            .search-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                backdrop-filter: blur(10px);
                z-index: 10000;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .search-modal-content {
                width: 90%;
                max-width: 1100px;
                background: white;
                border-radius: 30px;
                margin-top: 60px;
                overflow: hidden;
                animation: slideDown 0.3s ease;
                box-shadow: 0 30px 50px rgba(0,0,0,0.3);
            }
            .search-modal-header {
                display: flex;
                align-items: center;
                padding: 20px 25px;
                background: linear-gradient(135deg, #e91e63, #ff6b9d);
                gap: 15px;
            }
            .search-modal-header i {
                font-size: 22px;
                color: white;
            }
            .search-modal-header input {
                flex: 1;
                padding: 12px 0;
                background: transparent;
                border: none;
                color: white;
                font-size: 18px;
                font-family: 'Poppins', sans-serif;
                outline: none;
            }
            .search-modal-header input::placeholder {
                color: rgba(255,255,255,0.7);
            }
            .voice-search-btn {
                background: rgba(255,255,255,0.2);
                border: none;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                cursor: pointer;
                color: white;
                font-size: 18px;
                transition: all 0.3s;
            }
            .voice-search-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: scale(1.05);
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            .search-close-btn {
                background: rgba(255,255,255,0.2);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                color: white;
                font-size: 18px;
                transition: all 0.3s;
            }
            .search-close-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: rotate(90deg);
            }
            .search-suggestions {
                display: flex;
                max-height: 550px;
                overflow: hidden;
            }
            .search-sidebar {
                width: 280px;
                padding: 20px;
                background: #fafafa;
                border-right: 1px solid #eee;
                overflow-y: auto;
            }
            .search-results-area {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
            }
            .search-filters, .search-recent, .search-trending {
                margin-bottom: 25px;
            }
            .search-filters h4, .search-recent h4, .search-trending h4 {
                font-size: 14px;
                color: #333;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .price-filter label, .sort-filter label {
                font-size: 12px;
                color: #666;
                display: block;
                margin-bottom: 8px;
            }
            .price-inputs {
                display: flex;
                gap: 10px;
                align-items: center;
                margin-bottom: 10px;
            }
            .price-inputs input {
                flex: 1;
                padding: 8px 10px;
                border: 1px solid #ddd;
                border-radius: 10px;
                font-size: 12px;
            }
            .reset-filter-btn {
                width: 100%;
                padding: 8px;
                background: #f0f0f0;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-size: 12px;
            }
            .sort-filter select {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 10px;
                font-family: 'Poppins', sans-serif;
                cursor: pointer;
            }
            .recent-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            .clear-recent-btn {
                background: none;
                border: none;
                color: #e91e63;
                font-size: 11px;
                cursor: pointer;
            }
            .recent-list {
                max-height: 150px;
                overflow-y: auto;
            }
            .recent-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 10px;
                border-radius: 10px;
                cursor: pointer;
                transition: background 0.2s;
                font-size: 13px;
            }
            .recent-item:hover {
                background: #f0f0f0;
            }
            .recent-item i:first-child {
                color: #999;
                font-size: 12px;
            }
            .recent-item span {
                flex: 1;
            }
            .recent-item i:last-child {
                color: #ccc;
                font-size: 12px;
                opacity: 0;
                transition: opacity 0.2s;
            }
            .recent-item:hover i:last-child {
                opacity: 1;
            }
            .trending-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            .trending-tags span {
                padding: 6px 14px;
                background: white;
                border-radius: 50px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.3s;
                border: 1px solid #eee;
            }
            .trending-tags span:hover {
                background: #e91e63;
                color: white;
                transform: translateY(-2px);
            }
            .search-results-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
                font-size: 14px;
                color: #666;
            }
            .search-results-list {
                max-height: 450px;
                overflow-y: auto;
            }
            .search-result-item {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 12px;
                border-radius: 15px;
                cursor: pointer;
                transition: all 0.3s;
                margin-bottom: 8px;
            }
            .search-result-item:hover {
                background: #f9f9f9;
                transform: translateX(5px);
            }
            .search-result-item img {
                width: 60px;
                height: 60px;
                object-fit: cover;
                border-radius: 12px;
            }
            .search-result-info {
                flex: 1;
            }
            .search-result-info h4 {
                font-size: 15px;
                margin-bottom: 5px;
            }
            .search-result-info p {
                font-size: 11px;
                color: #999;
            }
            .search-result-price {
                font-weight: 600;
                color: #e91e63;
            }
            .product-category {
                font-size: 10px;
                color: #e91e63;
                background: #fff0f5;
                padding: 2px 8px;
                border-radius: 10px;
                display: inline-block;
                margin-top: 5px;
            }
            .no-results {
                text-align: center;
                padding: 40px;
                color: #999;
            }
            .no-results i {
                font-size: 50px;
                margin-bottom: 15px;
                color: #ddd;
            }
            .highlight {
                background: #ffebf0;
                color: #e91e63;
                font-weight: 600;
                padding: 0 2px;
                border-radius: 3px;
            }
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @media (max-width: 768px) {
                .search-suggestions {
                    flex-direction: column;
                }
                .search-sidebar {
                    width: 100%;
                    border-right: none;
                    border-bottom: 1px solid #eee;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // Focus on input and render recent searches
    setTimeout(() => {
        const input = document.getElementById('searchInput');
        if (input) {
            input.focus();
            input.addEventListener('input', performSearch);
        }
        renderRecentSearches();
    }, 100);
}

function sortProductsBySelect(value) {
    currentSortBy = value;
    performSearch();
}

function closeSearchModal() {
    const modal = document.querySelector('.search-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => modal.remove(), 200);
    }
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResultsList');
    const resultCountSpan = document.getElementById('searchResultCount');
    
    if (!resultsContainer) return;
    
    // Save to recent searches if term is not empty
    if (searchTerm !== '') {
        saveRecentSearch(searchTerm);
        renderRecentSearches();
    }
    
    // Get filtered products based on gender and price range
    let productsToSearch = getFilteredProducts();
    
    // Apply price filter
    productsToSearch = productsToSearch.filter(product => {
        return product.price >= currentPriceRange.min && product.price <= currentPriceRange.max;
    });
    
    if (searchTerm === '') {
        // Show all products when search is empty
        const sorted = sortProducts(productsToSearch, currentSortBy);
        if (resultCountSpan) resultCountSpan.textContent = `(${sorted.length} products)`;
        
        resultsContainer.innerHTML = sorted.map(product => {
            return `
                <div class="search-result-item" onclick="selectSearchProduct(${product.id})">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="search-result-info">
                        <h4>${escapeHtml(product.name)}</h4>
                        <p>${product.description ? product.description.substring(0, 60) : ''}...</p>
                        <span class="product-category">${product.category.toUpperCase()}</span>
                    </div>
                    <div class="search-result-price">₹${product.price}</div>
                </div>
            `;
        }).join('');
        return;
    }
    
    // Filter products by search term
    let filtered = productsToSearch.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) ||
               product.category.toLowerCase().includes(searchTerm) ||
               (product.description && product.description.toLowerCase().includes(searchTerm));
    });
    
    // Apply sorting
    filtered = sortProducts(filtered, currentSortBy);
    
    if (resultCountSpan) {
        resultCountSpan.textContent = `(${filtered.length} products found)`;
    }
    
    if (filtered.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-box-open"></i>
                <p>No products found for "<strong>${escapeHtml(searchTerm)}</strong>"</p>
                <p style="font-size: 12px; margin-top: 10px;">Try searching for: Kajal, Lipstick, Serum, Moisturizer, Beard Oil</p>
            </div>
        `;
        return;
    }
    
    // Display results with highlighting
    resultsContainer.innerHTML = filtered.map(product => {
        let highlightedName = highlightText(product.name, searchTerm);
        let highlightedDesc = product.description ? highlightText(product.description.substring(0, 60), searchTerm) : '';
        
        return `
            <div class="search-result-item" onclick="selectSearchProduct(${product.id})">
                <img src="${product.image}" alt="${product.name}">
                <div class="search-result-info">
                    <h4>${highlightedName}</h4>
                    <p>${highlightedDesc}...</p>
                    <span class="product-category">${product.category.toUpperCase()}</span>
                </div>
                <div class="search-result-price">₹${product.price}</div>
            </div>
        `;
    }).join('');
}

function highlightText(text, searchTerm) {
    if (!text || !searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function searchQuick(term) {
    const input = document.getElementById('searchInput');
    if (input) {
        input.value = term;
        performSearch();
        saveRecentSearch(term);
    }
}

function selectSearchProduct(productId) {
    closeSearchModal();
    window.location.href = `product-detail.html?id=${productId}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearchModal();
    }
});
// ==================== CART PAGE RENDERING ====================
function renderCartPage() {
    const container = document.getElementById('cartItemsContainer');
    const summaryContainer = document.getElementById('cartSummary');
    if (!container) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-bag"></i><h2>Your cart is empty</h2><button class="hero-btn" onclick="window.location.href='index.html'">Continue Shopping</button></div>`;
        if (summaryContainer) summaryContainer.innerHTML = '';
        return;
    }
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const quantity = item.quantity || 1;
        const total = item.price * quantity;
        subtotal += total;
        
        html += `
            <div class="cart-item">
                <div class="cart-product">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-product-info">
                        <h4>${item.name}</h4>
                        <p>${item.description || 'Premium quality product'}</p>
                    </div>
                </div>
                <div class="cart-price">₹${item.price}</div>
                <div class="cart-quantity">
                    <div class="quantity-control">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-total">₹${total}</div>
                <div class="cart-remove">
                    <button class="remove-btn" onclick="removeFromCart(${index})"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `;
    });
    
    const shipping = subtotal > 999 ? 0 : 50;
    const total = subtotal + shipping;
    
    container.innerHTML = html;
    
    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <h3>Order Summary</h3>
            <div class="summary-row"><span>Subtotal</span><span>₹${subtotal}</span></div>
            <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '₹' + shipping}</span></div>
            <div class="summary-row summary-total"><span>Total</span><span>₹${total}</span></div>
            <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout →</button>
        `;
    }
}

function proceedToCheckout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        window.location.href = 'checkout.html';
    } else {
        showNotification('Your cart is empty', 'error');
    }
}

// ==================== WISHLIST PAGE RENDERING ====================
function renderWishlist() {
    const container = document.getElementById('wishlistGrid');
    if (!container) return;
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (wishlist.length === 0) {
        container.innerHTML = `<div class="empty-wishlist"><i class="far fa-heart"></i><h2>Your wishlist is empty</h2><button class="hero-btn" onclick="window.location.href='index.html'">Explore Products</button></div>`;
        return;
    }
    
    container.innerHTML = wishlist.map((item, index) => `
        <div class="wishlist-card">
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-info">
                <h3>${item.name}</h3>
                <p class="price">₹${item.price}</p>
                <div class="wishlist-buttons">
                    <button class="add-to-cart-wishlist" onclick="addToCartFromWishlist(${index})">Add to Cart</button>
                    <button class="remove-wishlist" onclick="removeFromWishlist(${index})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCartFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (wishlist[index]) {
        const item = { ...wishlist[index], quantity: 1 };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${item.name} added to cart!`, 'success');
    }
}

// Export functions for global use
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleWishlist = toggleWishlist;
window.viewProduct = viewProduct;
window.shareProduct = shareProduct;
window.selectGender = selectGender;
window.closeGenderModal = closeGenderModal;
window.toggleGenderModal = toggleGenderModal;
window.rotateLeft = rotateLeft;
window.rotateRight = rotateRight;
window.submitReview = submitReview;
window.sendMessage = sendMessage;
window.toggleChat = toggleChat;
window.filterProducts = filterProducts;
window.scrollToProducts = scrollToProducts;
window.openSearch = openSearch;
window.proceedToCheckout = proceedToCheckout;
window.renderCartPage = renderCartPage;
window.renderWishlist = renderWishlist;
window.addToCartFromWishlist = addToCartFromWishlist;
window.removeFromWishlist = removeFromWishlist;
window.logout = logout;
// ==================== GENDER-BASED HERO ANIMATIONS ====================
function updateHeroForGender(gender) {
    const heroBadge = document.getElementById('heroBadge');
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const floatingContainer = document.getElementById('floatingElements');
    
    if (!heroBadge) return;
    
    if (gender === 'women') {
        heroBadge.innerHTML = '🌸 LUXURY BEAUTY DESTINATION 🌸';
        heroTitle.innerHTML = 'Discover Your <span>True Glow</span>';
        heroSubtitle.innerHTML = 'Experience the finest luxury beauty essentials crafted with love.<br>For every you, for every moment.';
        
        if (floatingContainer) {
            floatingContainer.innerHTML = `
                <div class="floating-element" style="top: 10%; left: 5%; animation-duration: 18s;"><i class="fas fa-heart"></i></div>
                <div class="floating-element" style="top: 20%; right: 8%; animation-duration: 22s;"><i class="fas fa-star"></i></div>
                <div class="floating-element" style="bottom: 15%; left: 10%; animation-duration: 20s;"><i class="fas fa-flower"></i></div>
                <div class="floating-element" style="bottom: 25%; right: 15%; animation-duration: 24s;"><i class="fas fa-gem"></i></div>
                <div class="floating-element" style="top: 40%; left: 15%; animation-duration: 16s;"><i class="fas fa-magic"></i></div>
                <div class="floating-element" style="bottom: 40%; right: 20%; animation-duration: 19s;"><i class="fas fa-feather-alt"></i></div>
            `;
        }
    } else {
        heroBadge.innerHTML = '✦ PREMIUM GROOMING ✦';
        heroTitle.innerHTML = 'Elevate Your <span>Everyday Ritual</span>';
        heroSubtitle.innerHTML = 'Thoughtfully crafted grooming essentials for the modern gentleman.<br>Refined. Effective. Effortless.';
        
        if (floatingContainer) {
            floatingContainer.innerHTML = `
                <div class="floating-element" style="top: 10%; left: 5%; animation-duration: 18s;"><i class="fas fa-compass"></i></div>
                <div class="floating-element" style="top: 20%; right: 8%; animation-duration: 22s;"><i class="fas fa-clock"></i></div>
                <div class="floating-element" style="bottom: 15%; left: 10%; animation-duration: 20s;"><i class="fas fa-leaf"></i></div>
                <div class="floating-element" style="bottom: 25%; right: 15%; animation-duration: 24s;"><i class="fas fa-gem"></i></div>
                <div class="floating-element" style="top: 40%; left: 15%; animation-duration: 16s;"><i class="fas fa-feather"></i></div>
                <div class="floating-element" style="bottom: 40%; right: 20%; animation-duration: 19s;"><i class="fas fa-moon"></i></div>
            `;
        }
    }
}
// ==================== GENDER-BASED HERO ANIMATIONS ====================
function updateHeroForGender(gender) {
    const hero = document.getElementById('home');
    const heroBadge = document.getElementById('heroBadge');
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const floatingContainer = document.getElementById('floatingElements');
    
    if (!hero) return;
    
    hero.setAttribute('data-gender', gender);
    
    if (gender === 'women') {
        heroBadge.innerHTML = '🌸 LUXURY BEAUTY DESTINATION 🌸';
        heroTitle.innerHTML = 'Discover Your <span>True Glow</span>';
        heroSubtitle.innerHTML = 'Experience the finest luxury beauty essentials crafted with love.<br>For every you, for every moment.';
        
        floatingContainer.innerHTML = `
            <div class="floating-element large" style="top: 8%; left: 3%; animation-duration: 18s;">
                <i class="fas fa-heart"></i>
            </div>
            <div class="floating-element slow" style="top: 15%; right: 5%; animation-duration: 22s; animation-delay: 2s;">
                <i class="fas fa-star"></i>
            </div>
            <div class="floating-element" style="bottom: 10%; left: 8%; animation-duration: 20s; animation-delay: 1s;">
                <i class="fas fa-flower"></i>
            </div>
            <div class="floating-element large slow" style="bottom: 20%; right: 10%; animation-duration: 25s; animation-delay: 3s;">
                <i class="fas fa-gem"></i>
            </div>
            <div class="floating-element fast" style="top: 35%; left: 12%; animation-duration: 14s; animation-delay: 0.5s;">
                <i class="fas fa-magic"></i>
            </div>
            <div class="floating-element" style="bottom: 35%; right: 15%; animation-duration: 19s; animation-delay: 1.5s;">
                <i class="fas fa-feather-alt"></i>
            </div>
            <div class="floating-element large" style="top: 55%; left: 20%; animation-duration: 23s; animation-delay: 2.5s;">
                <i class="fas fa-crown"></i>
            </div>
            <div class="floating-element slow" style="top: 70%; right: 25%; animation-duration: 24s; animation-delay: 1s;">
                <i class="fas fa-sparkle"></i>
            </div>
        `;
    } else {
        heroBadge.innerHTML = '💪 PREMIUM GROOMING DESTINATION 💪';
        heroTitle.innerHTML = 'Unleash Your <span>Best Self</span>';
        heroSubtitle.innerHTML = 'Premium grooming essentials for the modern man.<br>Style, confidence, and excellence.';
        
        floatingContainer.innerHTML = `
            <div class="floating-element large" style="top: 8%; left: 3%; animation-duration: 17s;">
                <i class="fas fa-bolt"></i>
            </div>
            <div class="floating-element slow" style="top: 15%; right: 5%; animation-duration: 21s; animation-delay: 2s;">
                <i class="fas fa-cube"></i>
            </div>
            <div class="floating-element" style="bottom: 10%; left: 8%; animation-duration: 19s; animation-delay: 1s;">
                <i class="fas fa-shield-alt"></i>
            </div>
            <div class="floating-element large fast" style="bottom: 20%; right: 10%; animation-duration: 13s; animation-delay: 3s;">
                <i class="fas fa-diamond"></i>
            </div>
            <div class="floating-element" style="top: 35%; left: 12%; animation-duration: 18s; animation-delay: 0.5s;">
                <i class="fas fa-fire"></i>
            </div>
            <div class="floating-element large slow" style="bottom: 35%; right: 15%; animation-duration: 26s; animation-delay: 1.5s;">
                <i class="fas fa-crown"></i>
            </div>
            <div class="floating-element" style="top: 55%; left: 20%; animation-duration: 20s; animation-delay: 2.5s;">
                <i class="fas fa-gem"></i>
            </div>
            <div class="floating-element fast" style="top: 70%; right: 25%; animation-duration: 15s; animation-delay: 1s;">
                <i class="fas fa-star-of-life"></i>
            </div>
            <div class="floating-element slow" style="top: 12%; left: 80%; animation-duration: 23s; animation-delay: 4s;">
                <i class="fas fa-crosshairs"></i>
            </div>
        `;
    }
}
