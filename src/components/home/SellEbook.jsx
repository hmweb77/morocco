"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Star, Eye, Download, MapPin, User, Heart, Clock, BookOpen, Check, Plus, Minus } from 'lucide-react';

const PremiumEbooksSection = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [hoveredBook, setHoveredBook] = useState(null);

  const ebooks = [
    {
      id: 'pocket-marrakesh',
      title: 'Pocket Marrakesh – Insider City Guide',
      subtitle: 'Your hyper-local guide to the Red City',
      description: 'A bold, hyper-local guide to Marrakesh\'s buzzing medina, food culture, rooftop hideouts, and secret gems.',
      price: 4.99,
      originalPrice: 9.99,
      currency: '€',
      image: '/books/marrakech1.png',
      badge: 'Most Popular',
      badgeColor: '#A34128',
      rating: 4.9,
      reviews: 1271,
      features: [
        'Local restaurant recommendations',
        'Interactive 10-day itinerary',
        'No-tourist-trap walks',
        'Hidden gems locations',
        'Cultural etiquette guide',
        'Safety tips for solo travelers'
      ],
      pages: 25,
      category: 'City Guide'
    },
    {
      id: 'solo-female-travel',
      title: 'Solo Female Travel in Morocco',
      subtitle: 'Travel with confidence and safety',
      description: 'Candid, empowering, and practical — this guide helps women navigate Morocco with confidence, safety, and soul.',
      price: 4.99,
      originalPrice: 9.99,
      currency: '€',
      image: '/books/female1.png',
      badge: 'New',
      badgeColor: '#70977B',
      rating: 4.9,
      reviews: 891,
      features: [
        'Dress guide for different regions',
        'Solo-friendly accommodations',
        'Cultural etiquette essentials',
        'Female-led experiences',
        'Safety protocols and tips',
        'Local women\'s perspectives',
        'Destination highlights',
        'Packing checklist for women'
      ],
      pages: 40,
      category: 'Safety & Culture'
    }
  ];
  

  const addToCart = (ebook) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === ebook.id);
      if (existing) {
        return prev.map(item => 
          item.id === ebook.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...ebook, quantity: 1 }];
    });
  };

  const removeFromCart = (ebookId) => {
    setCart(prev => prev.filter(item => item.id !== ebookId));
  };

  const updateQuantity = (ebookId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(ebookId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.id === ebookId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleBuyNow = (ebook) => {
    // Add to cart for visual feedback
    addToCart(ebook);
    // Navigate to guide page
    router.push('/guide');
  };

  const handlePreview = (ebook) => {
    router.push('/guide');
  };

  const handleBuyBundle = () => {
    router.push('/guide');
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const bundlePrice = 6.99;
  const totalPrice = ebooks.reduce((sum, book) => sum + book.price, 0);
  const savings = totalPrice - bundlePrice;

  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#FDFDFD' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1C3F60 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Cart */}
      <AnimatePresence>
        {cartItemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => router.push('/guide')}
              className="p-4 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#A34128', color: '#FDFDFD' }}
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="font-bold">{cartItemCount}</span>
              <span className="font-bold">€{cartTotal.toFixed(2)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ 
              backgroundColor: 'rgba(62, 141, 193, 0.1)',
              color: '#3E8DC1'
            }}
          >
            <BookOpen className="w-4 h-4" style={{ color: '#F9C75E' }} />
            <span>Premium Travel Guides</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-serif"
            style={{ color: '#1C3F60' }}
          >
            Ready to Go Deeper?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed"
            style={{ color: '#2C2C2C' }}
          >
            Our beautifully crafted digital guides help you travel smarter, safer, and more intentionally — whether you're planning a quick escape or a full Moroccan adventure. Loved by solo travelers, couples, and first-timers alike.
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {ebooks.map((ebook, index) => (
            <motion.div
              key={ebook.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredBook(ebook.id)}
              onMouseLeave={() => setHoveredBook(null)}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2"
                style={{ 
                  backgroundColor: '#FDFDFD',
                  borderColor: hoveredBook === ebook.id ? ebook.badgeColor : 'rgba(28, 63, 96, 0.1)'
                }}
              >
                {/* Badge */}
                <div 
                  className="absolute top-6 right-6 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg z-10 transform rotate-12"
                  style={{ backgroundColor: ebook.badgeColor }}
                >
                  {ebook.badge}
                </div>

                {/* Cover Image - Updated to show full image */}
                <div className="relative w-full overflow-hidden rounded-t-xl">
                  <motion.img
                    src={ebook.image}
                    alt={ebook.title}
                    className="w-full h-auto object-contain"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      maxHeight: '400px',
                      objectFit: 'contain'
                    }}
                  />
                  
                  {/* Gradient Overlay - Positioned at bottom */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-20"
                    style={{
                      background: `linear-gradient(to top, ${ebook.badgeColor}20, transparent)`
                    }}
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm shadow-md">
                    <Star className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
                    <span className="text-sm font-bold" style={{ color: '#1C3F60' }}>
                      {ebook.rating}
                    </span>
                    <span className="text-xs" style={{ color: '#70977B' }}>
                      ({ebook.reviews})
                    </span>
                  </div>

                  {/* Preview Hover Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredBook === ebook.id ? 1 : 0,
                      scale: hoveredBook === ebook.id ? 1 : 0.8
                    }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  >
                    <button 
                      onClick={() => handlePreview(ebook)}
                      className="px-6 py-3 rounded-full font-bold text-white shadow-xl transform hover:scale-105 transition-all duration-300"
                      style={{ backgroundColor: ebook.badgeColor }}
                    >
                      <Eye className="w-5 h-5 inline mr-2" />
                      Quick Preview
                    </button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Category & Pages */}
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                      style={{ 
                        backgroundColor: `${ebook.badgeColor}15`, 
                        color: ebook.badgeColor 
                      }}
                    >
                      {ebook.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm" style={{ color: '#70977B' }}>
                      <BookOpen className="w-4 h-4" />
                      <span>{ebook.pages}p</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 font-serif leading-tight" style={{ color: '#1C3F60' }}>
                      {ebook.title}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: '#70977B' }}>
                      {ebook.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: '#2C2C2C' }}>
                    {ebook.description}
                  </p>

                  {/* Key Features - Condensed */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      {ebook.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs" style={{ color: '#2C2C2C' }}>
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: ebook.badgeColor }}
                          />
                          <span className="truncate">{feature.split(' ')[0]} {feature.split(' ')[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="mb-6 p-4 rounded-2xl" style={{ backgroundColor: 'rgba(243, 231, 210, 0.5)' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold" style={{ color: '#1C3F60' }}>
                            {ebook.currency}{ebook.price}
                          </span>
                          <span className="text-sm line-through" style={{ color: '#70977B' }}>
                            {ebook.currency}{ebook.originalPrice}
                          </span>
                        </div>
                        <div className="text-sm font-medium" style={{ color: ebook.badgeColor }}>
                          Save {ebook.currency}{(ebook.originalPrice - ebook.price).toFixed(2)}
                        </div>
                      </div>
                      <div 
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ 
                          backgroundColor: '#70977B',
                          color: '#FDFDFD'
                        }}
                      >
                        23% OFF
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {/* Primary CTA - Buy Now */}
                    <motion.button
                      onClick={() => handleBuyNow(ebook)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                      style={{ 
                        backgroundColor: ebook.badgeColor,
                        color: '#FDFDFD'
                      }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Buy Now
                    </motion.button>

                    {/* Secondary CTA - Preview */}
                    <motion.button
                      onClick={() => handlePreview(ebook)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-300 border-2 flex items-center justify-center gap-2 hover:shadow-md"
                      style={{ 
                        backgroundColor: 'transparent',
                        color: ebook.badgeColor,
                        borderColor: ebook.badgeColor
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = `${ebook.badgeColor}10`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Eye className="w-5 h-5" />
                      Preview & Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bundle Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative p-8 rounded-2xl shadow-xl text-center"
          style={{ 
            background: 'linear-gradient(135deg, #1C3F60 0%, #3E8DC1 100%)',
            color: '#FDFDFD'
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(249, 199, 94, 0.3) 0%, transparent 50%)`,
            }} />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: 'rgba(249, 199, 94, 0.2)' }}>
              <Star className="w-4 h-4" style={{ color: '#F9C75E' }} />
              <span style={{ color: '#F9C75E' }}>Bundle & Save!</span>
            </div>

            <h3 className="text-3xl font-bold mb-4 font-serif">
              Get Both Guides
            </h3>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div>
                <span className="text-4xl font-bold">€{bundlePrice.toFixed(2)}</span>
              </div>
              <div className="text-left">
                <div className="text-sm line-through opacity-75">€{totalPrice.toFixed(2)}</div>
                <div className="text-sm font-bold" style={{ color: '#F9C75E' }}>
                  Save €{savings.toFixed(2)} (20%)
                </div>
              </div>
            </div>

            <p className="text-lg mb-6 opacity-90">
              Everything you need for the perfect Morocco adventure
            </p>
            
            <motion.button
              onClick={handleBuyBundle}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ 
                backgroundColor: '#F9C75E',
                color: '#1C3F60'
              }}
            >
              Buy the Travel Bundle
            </motion.button>
            
            <p className="text-sm mt-4 opacity-75">
              Instant download. Yours forever.
            </p>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex items-center justify-center gap-8 text-sm" style={{ color: '#70977B' }}>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>30-Day Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Lifetime Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumEbooksSection;