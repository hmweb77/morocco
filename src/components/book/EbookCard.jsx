"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, Eye, ShoppingCart, CheckCircle, Heart, ExternalLink, CreditCard
} from 'lucide-react';

// Individual eBook Card Component with Stripe Integration
const EbookCard = ({ ebook, index, onPreview, onPurchase }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Add this function at the top of your EbookCard component
const createCheckoutSession = async (priceId) => {
  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: priceId,
        quantity: 1,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }

    return data;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};
const handlePurchase = async () => {
  setIsProcessing(true);
  try {
    // Create checkout session via your API
    const { url } = await createCheckoutSession(ebook.stripePriceId);
    
    // Redirect to Stripe Checkout
    window.location.href = url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    alert('Failed to start checkout. Please try again.');
    setIsProcessing(false);
  }
};
  // const handlePurchase = async () => {
  //   setIsProcessing(true);
  //   try {
  //     // Redirect to Stripe payment link
  //     window.location.href = ebook.stripePaymentLink;
  //   } catch (error) {
  //     console.error('Error redirecting to payment:', error);
  //     setIsProcessing(false);
  //   }
  // };

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
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#A34128', color: '#FDFDFD' }}
            onMouseEnter={(e) => {
              if (!isProcessing) e.target.style.backgroundColor = '#D38E63';
            }}
            onMouseLeave={(e) => {
              if (!isProcessing) e.target.style.backgroundColor = '#A34128';
            }}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Buy Now
                <ExternalLink className="w-4 h-4" />
              </>
            )}
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

        {/* Security Badge */}
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
            <span>Secure payment by Stripe</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EbookCard;