/* ==========================================================================
   1. CONFIGURATION & UTILITIES
   ========================================================================== */
const APP_CONFIG = {
    currencySymbol: '₹',
    deliveryFee: 40,
    freeDeliveryThreshold: 500,
    taxes: 0.05, // 5% GST
    animationDuration: 300,
    storageKeys: {
        cart: 'zesty_cart_v1',
        fav: 'zesty_fav_v1',
        orders: 'zesty_orders_v1',
        user: 'zesty_user_v1'
    }
};

// Utility: Format Currency
const formatMoney = (amount) => {
    return `${APP_CONFIG.currencySymbol}${amount.toFixed(2)}`;
};

// Utility: Generate Random ID
const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

// Utility: Local Storage Wrapper
const Storage = {
    get: (key, defaultVal = []) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultVal;
        } catch (e) {
            console.error('Storage Access Error:', e);
            return defaultVal;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage Save Error:', e);
        }
    }
};

/* ==========================================================================
   2. EXTENDED DATABASE (50+ Items)
   ========================================================================== */
const foodData = [
    // --- BURGERS ---
    {
        id: 101,
        name: "Maharaja Veg Burger",
        category: "burger",
        rating: 4.5,
        price: 149,
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60",
        desc: "Double aloo tikki patty with spicy sauce, onions, tomatoes and cheese slice.",
        calories: 450,
        prepTime: "15 min",
        isVeg: true
    },
    {
        id: 102,
        name: "Crispy Chicken Zinger",
        category: "burger",
        rating: 4.7,
        price: 189,
        img: "https://images.unsplash.com/photo-1615297928064-24977384d0f9?auto=format&fit=crop&w=500&q=60",
        desc: "Juicy fried chicken fillet topped with spicy mayo and lettuce.",
        calories: 520,
        prepTime: "20 min",
        isVeg: false
    },
    {
        id: 103,
        name: "Mushroom Swiss Burger",
        category: "burger",
        rating: 4.3,
        price: 210,
        img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=500&q=60",
        desc: "Grilled mushroom patty with melted Swiss cheese and truffle mayo.",
        calories: 410,
        prepTime: "18 min",
        isVeg: true
    },
    {
        id: 104,
        name: "Spicy Paneer Wrap Burger",
        category: "burger",
        rating: 4.4,
        price: 169,
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=60",
        desc: "Paneer slab marinated in tandoori sauce, fried to perfection.",
        calories: 480,
        prepTime: "15 min",
        isVeg: true
    },
    {
        id: 105,
        name: "Ultimate Lamb Burger",
        category: "burger",
        rating: 4.8,
        price: 349,
        img: "https://images.unsplash.com/photo-1551615578-7b84a92ae1f5?auto=format&fit=crop&w=500&q=60",
        desc: "Succulent lamb patty with caramelized onions and bbq sauce.",
        calories: 600,
        prepTime: "25 min",
        isVeg: false
    },

    // --- PIZZA ---
    {
        id: 201,
        name: "Paneer Makhani Pizza",
        category: "pizza",
        rating: 4.7,
        price: 399,
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60",
        desc: "Tandoori paneer, capsicum, red paprika with makhani sauce base.",
        calories: 280,
        prepTime: "25 min",
        isVeg: true
    },
    {
        id: 202,
        name: "Farmhouse Special",
        category: "pizza",
        rating: 4.4,
        price: 359,
        img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60",
        desc: "Overload of crunchy vegetables - onion, capsicum, tomato & mushroom.",
        calories: 250,
        prepTime: "20 min",
        isVeg: true
    },
    {
        id: 203,
        name: "Chicken Pepperoni",
        category: "pizza",
        rating: 4.6,
        price: 449,
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=60",
        desc: "American classic with spicy chicken pepperoni slices.",
        calories: 320,
        prepTime: "20 min",
        isVeg: false
    },
    {
        id: 204,
        name: "BBQ Chicken Pizza",
        category: "pizza",
        rating: 4.5,
        price: 429,
        img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60",
        desc: "Smoky BBQ chicken chunks with onions and paprika.",
        calories: 310,
        prepTime: "22 min",
        isVeg: false
    },
    {
        id: 205,
        name: "Margherita Cheese Burst",
        category: "pizza",
        rating: 4.2,
        price: 299,
        img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60",
        desc: "Classic cheese pizza with extra liquid cheese layer.",
        calories: 350,
        prepTime: "18 min",
        isVeg: true
    },

    // --- INDIAN MAIN COURSE ---
    {
        id: 301,
        name: "Hyderabadi Chicken Biryani",
        category: "indian",
        rating: 4.9,
        price: 299,
        img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=60",
        desc: "Aromatic basmati rice cooked with tender chicken and authentic spices.",
        calories: 650,
        prepTime: "30 min",
        isVeg: false
    },
    {
        id: 302,
        name: "Butter Naan & Paneer Combo",
        category: "indian",
        rating: 4.8,
        price: 249,
        img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=60",
        desc: "Creamy Paneer Butter Masala served with 2 fresh Butter Naans.",
        calories: 700,
        prepTime: "20 min",
        isVeg: true
    },
    {
        id: 303,
        name: "Masala Dosa",
        category: "indian",
        rating: 4.6,
        price: 120,
        img: "https://images.unsplash.com/photo-1589301760014-d9296483191d?auto=format&fit=crop&w=500&q=60",
        desc: "Crispy rice crepe filled with spiced potato masala, served with chutney.",
        calories: 300,
        prepTime: "15 min",
        isVeg: true
    },
    {
        id: 304,
        name: "Dal Makhani & Jeera Rice",
        category: "indian",
        rating: 4.7,
        price: 220,
        img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60",
        desc: "Slow cooked black lentils with cream and butter, served with cumin rice.",
        calories: 550,
        prepTime: "20 min",
        isVeg: true
    },
    {
        id: 305,
        name: "Rajma Chawal Bowl",
        category: "indian",
        rating: 4.5,
        price: 180,
        img: "https://images.unsplash.com/photo-1574484284008-81d0c46f1aa4?auto=format&fit=crop&w=500&q=60",
        desc: "Comfort food. Kidney beans curry served over steamed rice.",
        calories: 400,
        prepTime: "10 min",
        isVeg: true
    },

    // --- ASIAN / CHINESE ---
    {
        id: 401,
        name: "Schezwan Noodles",
        category: "asian",
        rating: 4.3,
        price: 180,
        img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60",
        desc: "Spicy stir-fried noodles with crunchy vegetables.",
        calories: 350,
        prepTime: "15 min",
        isVeg: true
    },
    {
        id: 402,
        name: "Veg Momos (8pcs)",
        category: "asian",
        rating: 4.5,
        price: 110,
        img: "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?auto=format&fit=crop&w=500&q=60",
        desc: "Steamed dumplings filled with minced vegetables, served with spicy chutney.",
        calories: 200,
        prepTime: "15 min",
        isVeg: true
    },
    {
        id: 403,
        name: "Chicken Manchurian",
        category: "asian",
        rating: 4.6,
        price: 240,
        img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=500&q=60",
        desc: "Fried chicken balls in spicy, sweet and tangy sauce.",
        calories: 400,
        prepTime: "25 min",
        isVeg: false
    },
    {
        id: 404,
        name: "Sushi Platter",
        category: "asian",
        rating: 4.9,
        price: 899,
        img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=60",
        desc: "Assorted nigiri and maki rolls with fresh salmon and tuna.",
        calories: 300,
        prepTime: "30 min",
        isVeg: false
    },
    {
        id: 405,
        name: "Spring Rolls",
        category: "asian",
        rating: 4.2,
        price: 150,
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60",
        desc: "Crispy fried rolls filled with shredded vegetables.",
        calories: 180,
        prepTime: "15 min",
        isVeg: true
    },

    // --- DESSERTS ---
    {
        id: 501,
        name: "Choco Lava Cake",
        category: "dessert",
        rating: 4.8,
        price: 99,
        img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=500&q=60",
        desc: "Warm chocolate cake with a gooey molten chocolate center.",
        calories: 450,
        prepTime: "15 min",
        isVeg: true
    },
    {
        id: 502,
        name: "Gulab Jamun (2pcs)",
        category: "dessert",
        rating: 4.6,
        price: 60,
        img: "https://images.unsplash.com/photo-1593701478530-bf8b9586aa09?auto=format&fit=crop&w=500&q=60",
        desc: "Soft milk solids dumplings dipped in rose flavored sugar syrup.",
        calories: 300,
        prepTime: "5 min",
        isVeg: true
    },
    {
        id: 503,
        name: "New York Cheesecake",
        category: "dessert",
        rating: 4.9,
        price: 250,
        img: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=500&q=60",
        desc: "Classic creamy cheesecake with a graham cracker crust.",
        calories: 500,
        prepTime: "5 min",
        isVeg: false
    },
    {
        id: 504,
        name: "Ice Cream Sundae",
        category: "dessert",
        rating: 4.5,
        price: 180,
        img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60",
        desc: "Vanilla, chocolate and strawberry scoops with nuts and syrup.",
        calories: 350,
        prepTime: "10 min",
        isVeg: true
    },
    
    // --- DRINKS ---
    {
        id: 601,
        name: "Cold Coffee",
        category: "drinks",
        rating: 4.4,
        price: 89,
        img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60",
        desc: "Chilled creamy coffee topped with chocolate syrup.",
        calories: 200,
        prepTime: "5 min",
        isVeg: true
    },
    {
        id: 602,
        name: "Mango Lassi",
        category: "drinks",
        rating: 4.8,
        price: 70,
        img: "https://images.unsplash.com/photo-1543362906-ac1b452601d8?auto=format&fit=crop&w=500&q=60",
        desc: "Thick yogurt drink blended with fresh mango pulp.",
        calories: 250,
        prepTime: "5 min",
        isVeg: true
    },
    {
        id: 603,
        name: "Masala Chai",
        category: "drinks",
        rating: 4.9,
        price: 40,
        img: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=500&q=60",
        desc: "Traditional Indian tea brewed with ginger, cardamom and spices.",
        calories: 80,
        prepTime: "10 min",
        isVeg: true
    }
];

// Coupons Database
const COUPONS = {
    'WELCOME50': { discount: 0.50, maxDiscount: 100, desc: '50% OFF up to ₹100' },
    'TASTY20': { discount: 0.20, maxDiscount: 150, desc: '20% OFF up to ₹150' },
    'FREEDEL': { discount: 0, maxDiscount: 0, freeDelivery: true, desc: 'Free Delivery' }
};

/* ==========================================================================
   3. STATE MANAGEMENT CLASS
   ========================================================================== */
class AppState {
    constructor() {
        this.cart = Storage.get(APP_CONFIG.storageKeys.cart, []);
        this.favorites = Storage.get(APP_CONFIG.storageKeys.fav, []);
        this.orders = Storage.get(APP_CONFIG.storageKeys.orders, []);
        this.activeCoupon = null;
        this.currentCategory = 'all';
        this.currentSort = 'default';
        this.searchQuery = '';
    }

    // Cart Methods
    addToCart(item) {
        const existing = this.cart.find(c => c.id === item.id);
        if (existing) {
            existing.qty++;
        } else {
            this.cart.push({ ...item, qty: 1 });
        }
        this.saveCart();
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(c => c.id !== id);
        this.saveCart();
    }

    updateQty(id, delta) {
        const item = this.cart.find(c => c.id === id);
        if (!item) return;

        item.qty += delta;
        if (item.qty <= 0) {
            this.removeFromCart(id);
        } else {
            this.saveCart();
        }
    }

    clearCart() {
        this.cart = [];
        this.activeCoupon = null;
        this.saveCart();
    }

    saveCart() {
        Storage.set(APP_CONFIG.storageKeys.cart, this.cart);
        UIManager.updateCart();
    }

    getCartTotals() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        let discount = 0;
        let delivery = subtotal > APP_CONFIG.freeDeliveryThreshold ? 0 : APP_CONFIG.deliveryFee;

        // Apply Coupon
        if (this.activeCoupon) {
            const coupon = COUPONS[this.activeCoupon];
            if (coupon.freeDelivery) {
                delivery = 0;
            } else {
                let calcDisc = subtotal * coupon.discount;
                discount = Math.min(calcDisc, coupon.maxDiscount);
            }
        }

        const taxes = (subtotal - discount) * APP_CONFIG.taxes;
        const total = subtotal - discount + delivery + taxes;

        return { subtotal, discount, delivery, taxes, total };
    }

    // Favorites Methods
    toggleFavorite(id) {
        if (this.favorites.includes(id)) {
            this.favorites = this.favorites.filter(fid => fid !== id);
            UIManager.showToast('Removed from favorites', 'info');
        } else {
            this.favorites.push(id);
            UIManager.showToast('Added to favorites', 'success');
        }
        Storage.set(APP_CONFIG.storageKeys.fav, this.favorites);
        UIManager.renderMenu(); // Re-render to show heart state
    }

    // Order Methods
    placeOrder(orderDetails) {
        const newOrder = {
            id: generateId(),
            date: new Date().toISOString(),
            items: [...this.cart],
            totals: this.getCartTotals(),
            status: 'Processing',
            deliveryAddress: orderDetails.address
        };
        this.orders.unshift(newOrder); // Add to top
        Storage.set(APP_CONFIG.storageKeys.orders, this.orders);
        this.clearCart();
        return newOrder;
    }
}

// Initialize State
const appState = new AppState();

/* ==========================================================================
   4. UI MANAGER
   ========================================================================== */
const UIManager = {
    elements: {
        menuContainer: document.getElementById('menu-container'),
        cartBody: document.getElementById('cart-body'),
        cartBadge: document.getElementById('cart-badge'),
        subtotal: document.getElementById('subtotal'),
        deliveryFee: document.getElementById('delivery-fee'), // Ensure this exists in HTML or handle error
        totalPrice: document.getElementById('total-price'),
        searchInput: document.getElementById('main-search'),
        toast: document.getElementById('toast'),
        toastMsg: document.getElementById('toast-msg'),
        cartSidebar: document.getElementById('cart-sidebar'),
        cartOverlay: document.getElementById('cart-overlay')
    },

    init() {
        this.renderMenu();
        this.updateCart();
        this.setupEventListeners();
        
        // Add Sort Dropdown dynamically if not in HTML
        this.injectSortControls();
    },

    injectSortControls() {
        const header = document.querySelector('.section-header') || document.querySelector('.filters').parentNode;
        if (!document.getElementById('sort-select')) {
            const sortDiv = document.createElement('div');
            sortDiv.className = 'sort-controls';
            sortDiv.style.marginBottom = '20px';
            sortDiv.innerHTML = `
                <select id="sort-select" style="padding: 8px; border-radius: 5px; border: 1px solid #ddd;">
                    <option value="default">Sort By: Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            `;
            // Insert before filters
            const filters = document.querySelector('.filters');
            if(filters) filters.parentNode.insertBefore(sortDiv, filters);
            
            document.getElementById('sort-select').addEventListener('change', (e) => {
                appState.currentSort = e.target.value;
                this.renderMenu();
            });
        }
    },

    getFilteredAndSortedData() {
        let data = [...foodData];

        // 1. Filter by Category
        if (appState.currentCategory !== 'all') {
            data = data.filter(item => item.category === appState.currentCategory);
        }

        // 2. Search
        if (appState.searchQuery) {
            const q = appState.searchQuery.toLowerCase();
            data = data.filter(item => 
                item.name.toLowerCase().includes(q) || 
                item.desc.toLowerCase().includes(q)
            );
        }

        // 3. Sort
        switch (appState.currentSort) {
            case 'price-low':
                data.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                data.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                data.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Default sorting (by ID or custom logic)
                break;
        }

        return data;
    },

    renderMenu() {
        const items = this.getFilteredAndSortedData();
        const container = this.elements.menuContainer;
        container.innerHTML = '';

        if (items.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                    <i class="fas fa-search" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
                    <h3>No items found</h3>
                    <p style="color: #888;">Try changing your filters or search query.</p>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const isFav = appState.favorites.includes(item.id) ? 'active' : '';
            const vegIcon = item.isVeg 
                ? '<span style="color: green; border: 1px solid green; padding: 2px 4px; border-radius: 4px; font-size: 10px;">VEG</span>' 
                : '<span style="color: red; border: 1px solid red; padding: 2px 4px; border-radius: 4px; font-size: 10px;">NON-VEG</span>';

            const card = document.createElement('div');
            card.className = 'food-card';
            // Animation class for fading in
            card.style.animation = 'fadeIn 0.5s ease';
            
            card.innerHTML = `
                <div class="card-img-container">
                    <img src="${item.img}" alt="${item.name}" class="card-img" loading="lazy">
                    <div class="fav-btn ${isFav}" onclick="appState.toggleFavorite(${item.id})">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div style="position: absolute; bottom: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">
                        ${item.prepTime}
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-header">
                        <div style="display:flex; justify-content:space-between; width:100%; align-items:flex-start;">
                            <h3 class="food-title" style="margin-right: 10px;">${item.name}</h3>
                            <span class="food-rating"><i class="fas fa-star"></i> ${item.rating}</span>
                        </div>
                    </div>
                    <div style="margin-bottom: 8px;">${vegIcon} <span style="font-size: 0.8rem; color: #888;">• ${item.calories} kcal</span></div>
                    <p class="food-desc">${item.desc}</p>
                    <div class="card-footer">
                        <span class="price">${formatMoney(item.price)}</span>
                        <button class="btn btn-primary add-btn" onclick="UIManager.handleAddToCart(${item.id})">
                            ADD <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    },

    handleAddToCart(id) {
        const item = foodData.find(i => i.id === id);
        if (item) {
            appState.addToCart(item);
            this.showToast(`Added ${item.name} to cart`, 'success');
            // Animate Cart Icon
            const badge = document.querySelector('.icon-btn .badge');
            badge.style.transform = 'scale(1.5)';
            setTimeout(() => badge.style.transform = 'scale(1)', 200);
        }
    },

    updateCart() {
        // Update Badge
        const totalQty = appState.cart.reduce((acc, item) => acc + item.qty, 0);
        this.elements.cartBadge.innerText = totalQty;

        // Render Cart Items
        const container = this.elements.cartBody;
        container.innerHTML = '';

        if (appState.cart.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-basket"></i>
                    <p>Your cart is empty!</p>
                    <button class="btn btn-primary" style="margin-top: 20px;" onclick="UIManager.toggleCart()">Browse Food</button>
                </div>`;
            this.updateCartTotals();
            return;
        }

        appState.cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <img src="${item.img}" class="cart-item-img" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-bottom">
                        <span class="cart-item-price">${formatMoney(itemTotal)}</span>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="appState.updateQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="appState.updateQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <div class="remove-item" onclick="appState.removeFromCart(${item.id})">Remove</div>
                </div>
            `;
            container.appendChild(el);
        });

        // Add Coupon Input Section
        const couponHTML = `
            <div class="coupon-section" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="coupon-input" placeholder="Promo Code" 
                        style="flex:1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; text-transform: uppercase;">
                    <button class="btn btn-primary" onclick="UIManager.applyCoupon()" style="padding: 8px 15px; font-size: 0.8rem;">APPLY</button>
                </div>
                <div id="coupon-msg" style="font-size: 0.8rem; margin-top: 5px;"></div>
            </div>
        `;
        const div = document.createElement('div');
        div.innerHTML = couponHTML;
        container.appendChild(div);

        this.updateCartTotals();
    },

    updateCartTotals() {
        const { subtotal, discount, delivery, total } = appState.getCartTotals();
        
        // Safety check for elements
        if(this.elements.subtotal) this.elements.subtotal.innerText = formatMoney(subtotal);
        
        // Handle delivery fee element manually since it might be in text
        const delFeeEl = document.getElementById('delivery-fee') || document.querySelector('.bill-row:nth-child(2) span:last-child');
        if (delFeeEl) {
            delFeeEl.innerText = delivery === 0 ? 'FREE' : formatMoney(delivery);
            delFeeEl.style.color = delivery === 0 ? 'green' : 'inherit';
        }

        // Add Discount Row if applicable
        let discountRow = document.getElementById('discount-row');
        if (discount > 0) {
            if (!discountRow) {
                // Insert before total
                const totalRow = document.querySelector('.bill-row.total');
                discountRow = document.createElement('div');
                discountRow.id = 'discount-row';
                discountRow.className = 'bill-row';
                discountRow.style.color = 'green';
                totalRow.parentNode.insertBefore(discountRow, totalRow);
            }
            discountRow.innerHTML = `<span>Discount</span><span>-${formatMoney(discount)}</span>`;
        } else if (discountRow) {
            discountRow.remove();
        }

        if(this.elements.totalPrice) this.elements.totalPrice.innerText = formatMoney(total);
    },

    applyCoupon() {
        const input = document.getElementById('coupon-input');
        const msg = document.getElementById('coupon-msg');
        const code = input.value.trim().toUpperCase();

        if (!code) return;

        if (COUPONS[code]) {
            appState.activeCoupon = code;
            msg.style.color = 'green';
            msg.innerText = `Coupon ${code} applied! ${COUPONS[code].desc}`;
            this.updateCartTotals();
            this.showToast('Coupon Applied!', 'success');
        } else {
            msg.style.color = 'red';
            msg.innerText = 'Invalid Coupon Code';
            appState.activeCoupon = null;
            this.updateCartTotals();
        }
    },

    toggleCart(forceOpen = null) {
        const sidebar = this.elements.cartSidebar;
        const overlay = this.elements.cartOverlay;
        
        if (forceOpen === true) {
            sidebar.classList.add('open');
            overlay.classList.add('open');
        } else if (forceOpen === false) {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        } else {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        }
    },

    showToast(msg, type = 'info') {
        const toast = this.elements.toast;
        const msgEl = this.elements.toastMsg;
        const icon = toast.querySelector('i');

        msgEl.innerText = msg;
        
        // Change color based on type
        if (type === 'success') {
            toast.style.background = '#2ecc71';
            icon.className = 'fas fa-check-circle';
        } else if (type === 'error') {
            toast.style.background = '#e74c3c';
            icon.className = 'fas fa-exclamation-circle';
        } else {
            toast.style.background = '#2f3542';
            icon.className = 'fas fa-info-circle';
        }

        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    },

    setupEventListeners() {
        // Search Input
        this.elements.searchInput.addEventListener('input', (e) => {
            appState.searchQuery = e.target.value;
            this.renderMenu();
        });

        // Filter Buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.onclick = (e) => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Get category from onclick attribute text content or custom handling
                // Hacky way to extract category from text since we don't have data attributes in the provided HTML
                const text = e.target.innerText.toLowerCase();
                let cat = 'all';
                if (text.includes('burger')) cat = 'burger';
                else if (text.includes('pizza')) cat = 'pizza';
                else if (text.includes('asian')) cat = 'asian';
                else if (text.includes('mexican')) cat = 'indian'; // Mapping Mexican to Indian for this data set
                else if (text.includes('dessert')) cat = 'dessert';
                else if (text.includes('drink')) cat = 'drinks';
                
                appState.currentCategory = cat;
                this.renderMenu();
            };
        });
    },

    async handleCheckout() {
        if (appState.cart.length === 0) {
            this.showToast('Cart is empty', 'error');
            return;
        }

        const btn = document.querySelector('.checkout-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Placing Order...';
        btn.disabled = true;

        // Simulate API Call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Order Success
        const order = appState.placeOrder({ address: 'Default Saved Address' });
        
        // Reset UI
        btn.innerHTML = originalText;
        btn.disabled = false;
        this.toggleCart(false);
        
        // Show Success Modal (Dynamic creation)
        this.showOrderSuccessModal(order);
    },

    showOrderSuccessModal(order) {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.zIndex = '5000';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        
        modal.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 12px; text-align: center; max-width: 400px; width: 90%;">
                <div style="width: 80px; height: 80px; background: #e3ffe3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                    <i class="fas fa-check" style="font-size: 40px; color: #2ecc71;"></i>
                </div>
                <h2 style="margin-bottom: 10px;">Order Placed!</h2>
                <p style="color: #666; margin-bottom: 20px;">Order ID: <span style="font-family: monospace; font-weight: bold;">${order.id}</span></p>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin-bottom: 5px;">Estimated Delivery</p>
                    <strong style="font-size: 1.2rem;">35 - 45 mins</strong>
                </div>
                <button onclick="this.closest('div').parentNode.remove()" class="btn btn-primary" style="width: 100%;">Continue Shopping</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

/* ==========================================================================
   5. GLOBAL EXPORTS (For HTML access)
   ========================================================================== */
// Expose methods to window so HTML onclick attributes work
window.addToCart = (id) => UIManager.handleAddToCart(id);
window.removeFromCart = (id) => appState.removeFromCart(id);
window.updateQty = (id, delta) => appState.updateQty(id, delta);
window.toggleCart = (force) => UIManager.toggleCart(force);
window.toggleFav = (id, btn) => appState.toggleFavorite(id); // Handle btn logic inside
window.filterMenu = (cat, btn) => {
    // Legacy support for HTML onclicks
    appState.currentCategory = cat;
    UIManager.renderMenu();
    // Update active class
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
};
window.handleSearch = () => { /* Handled by input event listener */ };
window.checkout = () => UIManager.handleCheckout();

// Init App
document.addEventListener('DOMContentLoaded', () => {
    UIManager.init();
});

// CSS Injection for Animations (Optional but nice)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);
