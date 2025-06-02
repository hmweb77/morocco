"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Star, Download, Eye, ShoppingCart, Users, MapPin, Clock, 
  CheckCircle, X, ChevronLeft, ChevronRight, Zap, Shield, Heart,
  FileText, Navigation, Camera, Coffee, Utensils, Car, Compass,
  Award, Globe, Calendar, Gift, ArrowRight, Play, Bookmark
} from 'lucide-react';

// eBooks data
const ebooksData = [
  {
    id: 1,
    title: "Pocket Marrakesh – Insider City Guide",
    subtitle: "Your hyper-local guide to the Red City",
    category: "CITY GUIDE",
    description: "A bold, hyper-local guide to Marrakesh's buzzing medina, food culture, rooftop hideouts, and secret gems.",
    fullDescription: "Discover Marrakesh like never before with our comprehensive insider guide. From hidden riads and secret gardens to the best street food vendors and traditional hammams, this guide reveals the authentic soul of the Red City. Perfect for travelers who want to experience Marrakesh beyond the tourist trail.",
    image: "/experiences/11.jpg",
    originalPrice: 12.99,
    salePrice: 9.99,
    discount: 23,
    rating: 4.9,
    reviews: 1271,
    pages: "45p",
    badge: "Most Popular",
    badgeColor: "#A34128",
    features: [
      "Local restaurant recommendations",
      "Interactive 1-day itinerary", 
      "No-tourist-trap walks",
      "Hidden gems locations",
      "Cultural etiquette guide",
      "Safety tips for solo travelers"
    ],
    highlights: [
      "Over 50 insider recommendations",
      "Detailed neighborhood maps",
      "Budget-friendly options",
      "Photography hotspots",
      "Local transport guide",
      "Emergency contact information"
    ],
    previewImages: [
      "/experiences/1.jpg",
      "/experiences/2.jpg",
      "/experiences/3.jpg",
      "/experiences/4.jpg",
    ],
    author: "Sarah Mitchell",
    lastUpdated: "2024",
    languages: ["English", "French"],
    format: "PDF + Interactive Map"
  },
  {
    id: 2,
    title: "The Morocco Planner – 7-Day & 10-Day Itineraries",
    subtitle: "Complete trip planning made simple",
    category: "TRIP PLANNING",
    description: "Struggling to plan your route? We've done the work for you. This visual travel planner gives you road-tested routes through Morocco's most iconic and offbeat locations.",
    fullDescription: "Take the guesswork out of planning your Moroccan adventure with our meticulously crafted itineraries. Whether you have a week or ten days, these tested routes ensure you experience the best of Morocco while avoiding common travel mistakes. Includes detailed daily schedules, accommodation recommendations, and backup plans for weather delays.",
    image: "/experiences/11.jpg",
    originalPrice: 18.99,
    salePrice: 14.99,
    discount: 21,
    rating: 4.8,
    reviews: 2033,
    pages: "68p",
    badge: "Editor's Pick",
    badgeColor: "#3E8DC1",
    features: [
      "7 & 10-day complete itineraries",
      "Built-in budget calculator",
      "Daily maps and directions",
      "Transportation & logistics",
      "Accommodation recommendations",
      "Weather contingency plans"
    ],
    highlights: [
      "Flexible day-by-day schedules",
      "Cost breakdown per activity",
      "Alternative route options",
      "Seasonal travel tips",
      "Local contact information",
      "Packing checklists included"
    ],
    previewImages: [
      "/experiences/1.jpg",
      "/experiences/2.jpg",
      "/experiences/3.jpg",
      "/experiences/4.jpg",
    ],
    author: "Ahmed El-Fassi",
    lastUpdated: "2024",
    languages: ["English", "French", "Spanish"],
    format: "PDF + Excel Budget Tracker"
  },
  {
    id: 3,
    title: "Solo Female Travel in Morocco",
    subtitle: "Travel with confidence and safety",
    category: "SAFETY & CULTURE",
    description: "Candid, empowering, and practical — this guide helps women navigate Morocco with confidence, safety, and soul.",
    fullDescription: "Written by experienced female travelers, this comprehensive guide addresses the unique considerations for women traveling solo in Morocco. From cultural sensitivities and appropriate dress codes to safety strategies and empowering experiences, this guide ensures you can explore Morocco with confidence while respecting local customs.",
    image: "/experiences/11.jpg",
    originalPrice: 16.99,
    salePrice: 12.99,
    discount: 24,
    rating: 4.9,
    reviews: 891,
    pages: "52p",
    badge: "New",
    badgeColor: "#70977B",
    features: [
      "Dress guide for different regions",
      "Solo-friendly accommodations",
      "Cultural etiquette essentials",
      "Female-led experiences",
      "Safety protocols and tips",
      "Local women's perspectives"
    ],
    highlights: [
      "Confidence-building strategies",
      "Cultural respect guidelines",
      "Emergency preparation guide",
      "Female-only spaces and activities",
      "Local women's recommendations",
      "Real traveler testimonials"
    ],
    previewImages: [
      "/experiences/10.jpg",
      "/experiences/12.jpg",
      "/experiences/11.jpg",
      "/experiences/11.jpg",
    ],
    author: "Fatima Zahra & Lisa Thompson",
    lastUpdated: "2024",
    languages: ["English", "French"],
    format: "PDF + Audio Guide"
  }
];


// Preview Modal Component
const PreviewModal = ({ ebook, isOpen, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % ebook.previewImages.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + ebook.previewImages.length) % ebook.previewImages.length);
    };
  
    // Handle touch/swipe gestures for mobile
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
  
    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };
  
    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };
  
    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;
  
      if (isLeftSwipe) {
        nextSlide();
      }
      if (isRightSwipe) {
        prevSlide();
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl sm:rounded-2xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-6 border-b flex-shrink-0" style={{ borderColor: '#E8DCC6' }}>
              <div className="min-w-0 flex-1 mr-4">
                <h3 className="text-base sm:text-xl font-bold truncate" style={{ color: '#1C3F60' }}>
                  {ebook.title} - Preview
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: '#70977B' }}>
                  Page {currentSlide + 1} of {ebook.previewImages.length}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="Close preview"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#1C3F60' }} />
              </button>
            </div>
  
            {/* Image Viewer */}
            <div 
              className="relative flex-1 bg-gray-50 min-h-0"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={ebook.previewImages[currentSlide]}
                alt={`${ebook.title} preview page ${currentSlide + 1}`}
                className="w-full h-full object-contain"
                style={{ maxHeight: '100%' }}
              />
              
              {/* Navigation Arrows - Hidden on very small screens */}
              <button
                onClick={prevSlide}
                className="hidden sm:block absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="hidden sm:block absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
  
              {/* Mobile Navigation Arrows */}
              <div className="sm:hidden absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4 pointer-events-none">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-black/30 backdrop-blur-sm transition-colors pointer-events-auto"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-black/30 backdrop-blur-sm transition-colors pointer-events-auto"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
  
              {/* Slide Indicators */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                {ebook.previewImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
  
              {/* Swipe indicator for mobile */}
              <div className="sm:hidden absolute top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                <p className="text-white text-xs">Swipe to navigate</p>
              </div>
            </div>
  
            {/* Footer */}
            <div className="p-3 sm:p-6 bg-gray-50 flex-shrink-0">
              {/* Mobile Layout */}
              <div className="sm:hidden space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
                    <span className="font-medium" style={{ color: '#1C3F60' }}>
                      {ebook.rating} ({ebook.reviews.toLocaleString()})
                    </span>
                  </div>
                  <div className="text-sm" style={{ color: '#70977B' }}>
                    {ebook.pages}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="py-2 px-3 rounded-lg border-2 transition-all duration-300 text-sm font-medium"
                    style={{
                      borderColor: '#3E8DC1',
                      color: '#3E8DC1',
                      backgroundColor: 'transparent'
                    }}
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-2 px-3 rounded-lg transition-all duration-300 text-sm font-medium"
                    style={{ backgroundColor: '#A34128', color: '#FDFDFD' }}
                  >
                    Buy €{ebook.salePrice}
                  </motion.button>
                </div>
              </div>
  
              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
                    <span className="font-medium" style={{ color: '#1C3F60' }}>
                      {ebook.rating} ({ebook.reviews.toLocaleString()})
                    </span>
                  </div>
                  <div className="text-sm" style={{ color: '#70977B' }}>
                    {ebook.pages} • {ebook.format}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg border-2 transition-all duration-300"
                    style={{
                      borderColor: '#3E8DC1',
                      color: '#3E8DC1',
                      backgroundColor: 'transparent'
                    }}
                  >
                    Close Preview
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg transition-all duration-300"
                    style={{ backgroundColor: '#A34128', color: '#FDFDFD' }}
                  >
                    Buy Now - €{ebook.salePrice}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

// Individual eBook Card Component
const EbookCard = ({ ebook, index, onPreview, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      style={{ backgroundColor: '#F3E7D2' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={ebook.image}
          alt={ebook.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div 
            className="px-3 py-1 rounded-full text-white text-sm font-medium shadow-lg"
            style={{ backgroundColor: ebook.badgeColor }}
          >
            {ebook.badge}
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
            >
              <Heart 
                className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} 
              />
            </motion.button>
          </div>
        </div>

        {/* Quick Preview Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPreview(ebook)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white"
            style={{ color: '#1C3F60' }}
          >
            <Eye className="w-5 h-5" />
            <span className="font-semibold">Quick Preview</span>
          </motion.button>
        </motion.div>

        {/* Rating */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm">
          <Star className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
          <span className="text-white text-sm font-medium">{ebook.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-2">
          <span className="text-xs font-bold tracking-wider" style={{ color: '#70977B' }}>
            {ebook.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 font-serif line-clamp-2" style={{ color: '#1C3F60' }}>
          {ebook.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm mb-3 font-medium" style={{ color: '#A34128' }}>
          {ebook.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm mb-4 leading-relaxed line-clamp-3" style={{ color: '#2C2C2C' }}>
          {ebook.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-1 text-xs">
            {ebook.features.slice(0, 4).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" style={{ color: '#70977B' }} />
                <span style={{ color: '#2C2C2C' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews & Info */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
              <span className="font-medium" style={{ color: '#1C3F60' }}>{ebook.rating}</span>
            </div>
            <span style={{ color: '#70977B' }}>
              ({ebook.reviews.toLocaleString()})
            </span>
          </div>
          <div style={{ color: '#70977B' }}>
            {ebook.pages}
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold" style={{ color: '#A34128' }}>
              €{ebook.salePrice}
            </span>
            <span className="text-lg line-through" style={{ color: '#70977B' }}>
              €{ebook.originalPrice}
            </span>
          </div>
          <div 
            className="px-2 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: '#70977B' }}
          >
            {ebook.discount}% OFF
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddToCart(ebook)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            style={{ backgroundColor: '#A34128', color: '#FDFDFD' }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#D38E63';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#A34128';
            }}
          >
            <ShoppingCart className="w-5 h-5" />
            Buy Now
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPreview(ebook)}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium border-2 transition-all duration-300 shadow-md hover:shadow-lg"
            style={{
              backgroundColor: 'transparent',
              color: '#3E8DC1',
              borderColor: '#3E8DC1'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(62, 141, 193, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <Eye className="w-4 h-4" />
            Preview & Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Bundle Card Component
const BundleCard = ({ ebooks, onBuyBundle }) => {
  const totalOriginalPrice = ebooks.reduce((sum, ebook) => sum + ebook.originalPrice, 0);
  const bundlePrice = totalOriginalPrice * 0.5; // 50% discount
  const savings = totalOriginalPrice - bundlePrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative rounded-2xl p-8 shadow-2xl overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #1C3F60 0%, #3E8DC1 100%)',
        color: '#FDFDFD'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FDFDFD 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Badge */}
        <div className="flex items-center justify-between mb-6">
          <div 
            className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"
            style={{ backgroundColor: '#F9C75E', color: '#1C3F60' }}
          >
            <Zap className="w-4 h-4" />
            BEST VALUE
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">50% OFF</div>
            <div className="text-sm opacity-80">Limited Time</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-4 font-serif">
          Complete Morocco Travel Bundle
        </h3>

        {/* Description */}
        <p className="text-lg mb-6 opacity-90 leading-relaxed">
          Get all three digital guides and save €{savings.toFixed(2)}! Everything you need for the perfect Moroccan adventure — from city exploration to trip planning and solo travel safety.
        </p>

        {/* Bundle Contents */}
        <div className="space-y-3 mb-6">
          {ebooks.map((ebook, index) => (
            <div key={ebook.id} className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5" style={{ color: '#F9C75E' }} />
              <span className="flex-1">{ebook.title}</span>
              <span className="line-through opacity-60">€{ebook.originalPrice}</span>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" style={{ color: '#F9C75E' }} />
            <span>Instant Download</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" style={{ color: '#F9C75E' }} />
            <span>Lifetime Access</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" style={{ color: '#F9C75E' }} />
            <span>Multiple Languages</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" style={{ color: '#F9C75E' }} />
            <span>Expert Authors</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-3xl line-through opacity-60">
              €{totalOriginalPrice.toFixed(2)}
            </span>
            <ArrowRight className="w-6 h-6" style={{ color: '#F9C75E' }} />
            <span className="text-4xl font-bold" style={{ color: '#F9C75E' }}>
              €{bundlePrice.toFixed(2)}
            </span>
          </div>
          <p className="text-sm opacity-80">
            Save €{savings.toFixed(2)} with the complete bundle
          </p>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBuyBundle}
          className="w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
          style={{ 
            backgroundColor: '#F9C75E',
            color: '#1C3F60'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#FDFDFD';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#F9C75E';
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <ShoppingCart className="w-6 h-6" />
            <span>Get Complete Bundle Now</span>
          </div>
        </motion.button>

        {/* Trust Elements */}
        <div className="flex items-center justify-center gap-6 mt-6 text-xs opacity-80">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            <span>Instant Access</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main eBooks Page Component
const EbooksPage = () => {
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [cart, setCart] = useState([]);

  const handlePreview = (ebook) => {
    setSelectedEbook(ebook);
  };

  const handleClosePreview = () => {
    setSelectedEbook(null);
  };

  const handleAddToCart = (ebook) => {
    setCart(prev => [...prev, ebook]);
    // Here you would typically integrate with your cart system
    console.log(`Added ${ebook.title} to cart`);
  };

  const handleBuyBundle = () => {
    // Handle bundle purchase
    console.log('Purchasing complete bundle');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDFDFD' }}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#1C3F60' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FDFDFD 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ 
                backgroundColor: 'rgba(243, 231, 210, 0.2)',
                color: '#F3E7D2'
              }}
            >
              <BookOpen className="w-4 h-4" />
              <span>Premium Travel Guides</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-serif text-white"
            >
              Ready to Go Deeper?
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed mb-8"
              style={{ color: '#F3E7D2' }}
            >
              Our beautifully crafted digital guides help you travel smarter, safer, and more intentionally — whether you're planning a quick escape or a full Moroccan adventure. Loved by solo travelers, couples, and first-timers alike.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 text-white"
            >
              <div className="text-center">
                <div className="text-3xl font-bold">24,473</div>
                <div className="text-sm opacity-80">Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-sm opacity-80">★ Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">Instant</div>
                <div className="text-sm opacity-80">Download</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">Lifetime</div>
                <div className="text-sm opacity-80">Access</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Individual eBooks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {ebooksData.map((ebook, index) => (
              <EbookCard
                key={ebook.id}
                ebook={ebook}
                index={index}
                onPreview={handlePreview}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* Bundle Section */}
          <div className="max-w-4xl mx-auto">
            <BundleCard 
              ebooks={ebooksData}
              onBuyBundle={handleBuyBundle}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-serif" style={{ color: '#1C3F60' }}>
              Why Choose Our Digital Guides?
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: '#2C2C2C' }}>
              Crafted by local experts and seasoned travelers, our guides go beyond typical tourist recommendations to give you authentic, insider access to Morocco's hidden gems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Compass,
                title: "Expert Insights",
                description: "Written by Morocco specialists and local insiders with years of experience."
              },
              {
                icon: Download,
                title: "Instant Access",
                description: "Download immediately after purchase. Take your guides offline anywhere."
              },
              {
                icon: Shield,
                title: "Tested Routes",
                description: "Every recommendation is personally tested and regularly updated."
              },
              {
                icon: Globe,
                title: "Multiple Formats",
                description: "PDF, interactive maps, and audio guides for every travel style."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl"
                style={{ backgroundColor: '#FDFDFD' }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(62, 141, 193, 0.1)' }}
                >
                  <feature.icon className="w-8 h-8" style={{ color: '#3E8DC1' }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1C3F60' }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#2C2C2C' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-serif" style={{ color: '#1C3F60' }}>
              What Travelers Are Saying
            </h2>
            <p className="text-lg" style={{ color: '#70977B' }}>
              Trusted by 24,473+ Travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Anna K.",
                location: "Germany",
                rating: 5,
                text: "The free guide helped me avoid three scams in one day! Morocco was my dream trip, but I was nervous. The ebook explained everything — from bargaining tricks to safe taxi tips. I felt 100% more prepared.",
                guide: "Solo Female Travel"
              },
              {
                name: "Dylan & Marcus",
                location: "Canada",
                rating: 5,
                text: "The itinerary saved us HOURS of planning! We had just 7 days and no idea how to navigate our route. The Morocco Planner was clear, detailed, and honest about timing and costs. Worth every cent.",
                guide: "Morocco Planner"
              },
              {
                name: "Julia M.",
                location: "Australia",
                rating: 5,
                text: "I explored Marrakesh like a local thanks to your Pocket Guide! This wasn't some generic travel content. The rooftop café recommendations and hidden riad suggestions were absolutely spot on. Found a secret hammam!",
                guide: "Pocket Marrakesh"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl shadow-lg"
                style={{ backgroundColor: '#F3E7D2' }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
                  ))}
                </div>
                
                <p className="text-sm mb-4 leading-relaxed" style={{ color: '#1C3F60' }}>
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#1C3F60' }}>
                      {testimonial.name}
                    </div>
                    <div className="text-xs" style={{ color: '#70977B' }}>
                      {testimonial.location}
                    </div>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 rounded-full" style={{ 
                    backgroundColor: 'rgba(62, 141, 193, 0.1)',
                    color: '#3E8DC1'
                  }}>
                    {testimonial.guide}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 font-serif" style={{ color: '#1C3F60' }}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How do I access my guides after purchase?",
                answer: "You'll receive instant download links via email immediately after purchase. All guides are in PDF format and can be saved to any device for offline access."
              },
              {
                question: "Are the guides updated regularly?",
                answer: "Yes! We update our guides every 6 months with new recommendations, price changes, and seasonal information. You'll receive free updates for life."
              },
              {
                question: "Can I use these guides offline?",
                answer: "Absolutely! All our guides are designed for offline use. Download them to your phone, tablet, or print them out for reference during your trip."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, contact us for a full refund."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl"
                style={{ backgroundColor: '#FDFDFD' }}
              >
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1C3F60' }}>
                  {faq.question}
                </h3>
                <p className="leading-relaxed" style={{ color: '#2C2C2C' }}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#1C3F60' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-serif text-white">
              Want to travel Morocco with confidence too?
            </h2>
            
            <p className="text-lg mb-8 leading-relaxed" style={{ color: '#F3E7D2' }}>
              Join thousands of travelers who have transformed their Morocco experience with our insider guides. 
              Download instantly and start planning your perfect adventure today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyBundle}
                className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#F9C75E', color: '#1C3F60' }}
              >
                Get the Complete Bundle - 50% OFF
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#FDFDFD',
                  borderColor: '#FDFDFD'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FDFDFD';
                  e.target.style.color = '#1C3F60';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#FDFDFD';
                }}
              >
                Browse Individual Guides
              </motion.button>
            </div>

            <div className="flex items-center justify-center gap-8 mt-8 text-sm opacity-80 text-white">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Expert Authors</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preview Modal */}
      <PreviewModal
        ebook={selectedEbook}
        isOpen={!!selectedEbook}
        onClose={handleClosePreview}
      />
    </div>
  );
};

export default EbooksPage;