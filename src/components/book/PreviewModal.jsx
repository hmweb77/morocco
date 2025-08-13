"use client"
import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import {  Star, X, ChevronLeft, ChevronRight,  
} from 'lucide-react';


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
            className="bg-white rounded-xl sm:rounded-2xl w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
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
  
            {/* Image Viewer - Updated for full responsive display */}
            <div 
              className="relative flex-1 bg-gray-50 min-h-0 flex items-center justify-center p-4 sm:p-6"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={ebook.previewImages[currentSlide]}
                alt={`${ebook.title} preview page ${currentSlide + 1}`}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                style={{ 
                  maxHeight: 'calc(100vh - 200px)',
                  maxWidth: '100%',
                  height: 'auto',
                  width: 'auto'
                }}
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

  export default PreviewModal