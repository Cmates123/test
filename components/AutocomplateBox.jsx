"use client";
import React, { useState } from 'react';
import { MapPin, Search, ShoppingCart, Heart, User, Home, Compass, Plus, Minus, X, CreditCard, Wallet, Banknote, ChevronRight, ArrowLeft, Share2, ChevronDown, Star } from 'lucide-react';

export default function AutocomplateBox() {
  const [currentPage, setCurrentPage] = useState('shop');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState({});
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState(null);
  const [favorites, setFavorites] = useState({});

  const products = [
    { 
      id: 1, 
      name: 'Organic Bananas', 
      quantity: '7pcs, Priceg', 
      price: 4.99, 
      image: '🍌', 
      weight: '12kg, Price',
      description: 'Bananas are nutritious. Bananas may be good for weight loss. Bananas may be good for your heart. As part of a healthy and varied diet.',
      nutrition: '100gr',
      rating: 4.5,
      reviews: 28
    },
    { 
      id: 2, 
      name: 'Red Apple', 
      quantity: '1kg, Priceg', 
      price: 4.99, 
      image: '🍎', 
      weight: '1kg, Price',
      description: 'Apples are nutritious. Apples may be good for weight loss. Apples may be good for your heart. As part of a healthy and varied diet.',
      nutrition: '100gr',
      rating: 5,
      reviews: 45
    },
    { 
      id: 3, 
      name: 'Fresh Tomatoes', 
      quantity: '1kg', 
      price: 3.99, 
      image: '🍅', 
      weight: '1kg, Price',
      description: 'Tomatoes are nutritious. Tomatoes may be good for weight loss. Rich in vitamins and antioxidants.',
      nutrition: '100gr',
      rating: 4,
      reviews: 32
    },
    { 
      id: 4, 
      name: 'Cauliflower', 
      quantity: '1pc', 
      price: 2.99, 
      image: '🥬', 
      weight: '1pc, Price',
      description: 'Fresh cauliflower is a great source of fiber and vitamins. Perfect for healthy cooking.',
      nutrition: '100gr',
      rating: 4.5,
      reviews: 18
    },
    { 
      id: 5, 
      name: 'Bell Pepper Red', 
      quantity: '1kg, Price', 
      price: 4.99, 
      image: '🫑', 
      weight: '1kg, Price',
      description: 'Red bell peppers are sweet and crunchy. High in vitamin C and antioxidants.',
      nutrition: '100gr',
      rating: 4.8,
      reviews: 52
    },
    { 
      id: 6, 
      name: 'Egg Chicken Red', 
      quantity: '4pcs, Price', 
      price: 1.99, 
      image: '🥚', 
      weight: '4pcs, Price',
      description: 'Fresh farm eggs. High in protein and essential nutrients. Perfect for breakfast.',
      nutrition: '100gr',
      rating: 4.7,
      reviews: 89
    },
    { 
      id: 7, 
      name: 'Ginger', 
      quantity: '250gm, Price', 
      price: 2.99, 
      image: '🫚', 
      weight: '250gm, Price',
      description: 'Fresh ginger root. Great for cooking and health benefits. Anti-inflammatory properties.',
      nutrition: '100gr',
      rating: 4.3,
      reviews: 24
    },
    { 
      id: 8, 
      name: 'Fresh Carrots', 
      quantity: '1kg', 
      price: 2.49, 
      image: '🥕', 
      weight: '1kg, Price',
      description: 'Crispy fresh carrots. Rich in beta carotene and fiber. Great for snacking.',
      nutrition: '100gr',
      rating: 4.6,
      reviews: 41
    },
    { 
      id: 9, 
      name: 'Green Lettuce', 
      quantity: '1pc', 
      price: 1.99, 
      image: '🥬', 
      weight: '1pc, Price',
      description: 'Fresh green lettuce. Perfect for salads. Low in calories and high in nutrients.',
      nutrition: '100gr',
      rating: 4.2,
      reviews: 15
    },
    { 
      id: 10, 
      name: 'Orange Juice', 
      quantity: '1L', 
      price: 3.49, 
      image: '🍊', 
      weight: '1L, Price',
      description: 'Fresh squeezed orange juice. Rich in vitamin C. No added sugar.',
      nutrition: '100ml',
      rating: 4.9,
      reviews: 67
    },
  ];

  const addToCart = (itemId, qty = 1) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + qty
    }));
  };

  const updateCartQuantity = (itemId, delta) => {
    setCartItems(prev => {
      const newQty = (prev[itemId] || 0) + delta;
      if (newQty <= 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const { [itemId]: removed, ...rest } = prev;
      return rest;
    });
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find(p => p.id === parseInt(id));
      return total + (product?.price || 0) * qty;
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setProductQuantity(1);
    setExpandedSection(null);
    setCurrentPage('product-detail');
  };

  const ProductCard = ({ item }) => (
    <div 
      onClick={() => openProductDetail(item)}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col h-full cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl mb-3 text-center">{item.image}</div>
      <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">{item.name}</h3>
      <p className="text-gray-400 text-xs sm:text-sm mb-4">{item.quantity}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-base sm:text-lg font-bold text-gray-800">${item.price}</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item.id);
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-2 transition-colors"
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );

  const ProductDetailPage = () => {
    if (!selectedProduct) return null;

    const renderStars = (rating) => {
      return Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          className={`${i < Math.floor(rating) ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`}
        />
      ));
    };

    return (
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Header */}
        <div className="bg-white px-4 sm:px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => {
              setCurrentPage('shop');
              setSelectedProduct(null);
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 size={24} />
          </button>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 mb-6 flex items-center justify-center">
            <div className="text-[120px] sm:text-[160px]">{selectedProduct.image}</div>
          </div>

          {/* Image Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-6 h-1 bg-emerald-500 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Product Info */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                  {selectedProduct.name}
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">{selectedProduct.weight}</p>
              </div>
              <button 
                onClick={() => toggleFavorite(selectedProduct.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart 
                  size={24} 
                  className={favorites[selectedProduct.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                />
              </button>
            </div>

            {/* Quantity and Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setProductQuantity(Math.max(1, productQuantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                >
                  <Minus size={18} />
                </button>
                <span className="font-semibold text-gray-800 text-lg w-8 text-center">{productQuantity}</span>
                <button
                  onClick={() => setProductQuantity(productQuantity + 1)}
                  className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-600"
                >
                  <Plus size={18} />
                </button>
              </div>
              <span className="text-2xl font-bold text-gray-800">${selectedProduct.price}</span>
            </div>
          </div>

          {/* Product Detail */}
          <div className="mb-4">
            <button
              onClick={() => setExpandedSection(expandedSection === 'detail' ? null : 'detail')}
              className="w-full flex items-center justify-between py-4 border-b border-gray-200"
            >
              <span className="font-semibold text-gray-800">Product Detail</span>
              <ChevronDown 
                size={20} 
                className={`text-gray-400 transition-transform ${expandedSection === 'detail' ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedSection === 'detail' && (
              <div className="py-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                {selectedProduct.description}
              </div>
            )}
          </div>

          {/* Nutritions */}
          <button
            onClick={() => setExpandedSection(expandedSection === 'nutrition' ? null : 'nutrition')}
            className="w-full flex items-center justify-between py-4 border-b border-gray-200"
          >
            <span className="font-semibold text-gray-800">Nutritions</span>
            <div className="flex items-center gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm text-gray-600">
                {selectedProduct.nutrition}
              </span>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </button>

          {/* Review */}
          <button
            onClick={() => setExpandedSection(expandedSection === 'review' ? null : 'review')}
            className="w-full flex items-center justify-between py-4 border-b border-gray-200 mb-8"
          >
            <span className="font-semibold text-gray-800">Review</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(selectedProduct.rating)}
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </button>

          {/* Add to Basket Button */}
          <button 
            onClick={() => {
              addToCart(selectedProduct.id, productQuantity);
              setCurrentPage('shop');
              setSelectedProduct(null);
            }}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl py-4 font-semibold text-lg shadow-lg transition-colors"
          >
            Add To Basket
          </button>
        </div>
      </div>
    );
  };

  const CartPage = () => {
    const cartProducts = Object.entries(cartItems).map(([id, qty]) => ({
      ...products.find(p => p.id === parseInt(id)),
      quantity: qty
    }));

    const paymentMethods = [
      { id: 'card', name: 'Credit Card', icon: CreditCard },
      { id: 'wallet', name: 'E-Wallet', icon: Wallet },
      { id: 'cash', name: 'Cash', icon: Banknote },
    ];

    return (
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div className="bg-white px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100">
          <h1 className="text-lg sm:text-xl font-bold text-center">My Cart</h1>
        </div>

        {cartProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingCart size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-400 text-base sm:text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-4xl mx-auto">
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartProducts.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
                  <div className="text-4xl sm:text-5xl">{item.image}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 truncate">{item.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">{item.weight}</p>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <Minus size={14} className="sm:w-4 sm:h-4" />
                      </button>
                      <span className="font-semibold text-gray-800 w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-600"
                      >
                        <Plus size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={18} className="sm:w-5 sm:h-5" />
                    </button>
                    <span className="font-bold text-gray-800 text-base sm:text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all ${
                      selectedPayment === method.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedPayment === method.id ? 'bg-emerald-100' : 'bg-gray-100'
                      }`}>
                        <method.icon 
                          size={20} 
                          className={`sm:w-6 sm:h-6 ${selectedPayment === method.id ? 'text-emerald-600' : 'text-gray-600'}`}
                        />
                      </div>
                      <span className={`font-medium text-sm sm:text-base ${
                        selectedPayment === method.id ? 'text-emerald-700' : 'text-gray-700'
                      }`}>
                        {method.name}
                      </span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === method.id
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedPayment === method.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add Card Button */}
            <button className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors mb-6">
              <span className="text-gray-600 font-medium text-sm sm:text-base">Add Payment Card</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        )}

        {/* Checkout Button */}
        {cartProducts.length > 0 && (
          <div className="fixed bottom-16 sm:bottom-20 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl py-3 sm:py-4 font-semibold text-base sm:text-lg shadow-lg flex items-center justify-between px-4 sm:px-6 transition-colors">
              <span>Go to Checkout</span>
              <span className="bg-emerald-600 px-3 sm:px-4 py-1 rounded-lg text-sm sm:text-base">${getTotalPrice().toFixed(2)}</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  const ShopPage = () => {
    const exclusiveOffers = products.slice(0, 2);
    const bestSelling = products.slice(2, 4);

    return (
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white px-4 sm:px-6 lg:px-8 pt-3 pb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs sm:text-sm font-medium">9:41</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            </div>
          </div>
          
          <div className="text-center mb-4">
            <span className="text-2xl sm:text-3xl">🥕</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
            <span className="text-gray-800 font-medium text-sm sm:text-base">Dhaka, Banassre</span>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Store"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 rounded-xl py-2.5 sm:py-3 pl-11 sm:pl-12 pr-4 text-sm sm:text-base text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Search Results */}
          {searchQuery ? (
            <div className="py-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                Search Results for "{searchQuery}"
              </h2>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {filteredProducts.map(item => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-base sm:text-lg">No products found</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Banner */}
              <div className="py-4">
                <div className="bg-gradient-to-r from-green-50 to-orange-50 rounded-2xl p-5 sm:p-6 lg:p-8 relative overflow-hidden max-w-4xl mx-auto">
                  <div className="absolute left-4 top-4 text-3xl sm:text-4xl">🥬</div>
                  <div className="absolute right-4 bottom-4 text-3xl sm:text-4xl">🥗</div>
                  <div className="text-center relative z-10">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">Fresh Vegetables</h2>
                    <p className="text-emerald-600 font-medium text-sm sm:text-base lg:text-lg">Get Up To 40% OFF</p>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    <div className="w-6 h-1 bg-emerald-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Exclusive Offer */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Exclusive Offer</h2>
                  <button className="text-emerald-600 font-medium text-xs sm:text-sm">See all</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {exclusiveOffers.map(item => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Best Selling */}
              <div className="mb-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Best Selling</h2>
                  <button className="text-emerald-600 font-medium text-xs sm:text-sm">See all</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {bestSelling.map(item => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto bg-gray-50 min-h-screen flex flex-col">
      {/* Main Content */}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'product-detail' && <ProductDetailPage />}

      {/* Bottom Navigation */}
      {currentPage !== 'product-detail' && (
        <div className="fixed bottom-0 left-0 right-0 max-w-[1920px] mx-auto bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between max-w-md mx-auto lg:max-w-2xl">
            <button 
              onClick={() => setCurrentPage('shop')}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 ${currentPage === 'shop' ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              <Home size={22} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-medium">Shop</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 sm:gap-1 text-gray-400">
              <Compass size={22} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs">Explore</span>
            </button>
            <button 
              onClick={() => setCurrentPage('cart')}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 relative ${currentPage === 'cart' ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              <ShoppingCart size={22} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs">Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button className="flex flex-col items-center gap-0.5 sm:gap-1 text-gray-400">
              <Heart size={22} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs">Favourite</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 sm:gap-1 text-gray-400">
              <User size={22} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs">Account</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

