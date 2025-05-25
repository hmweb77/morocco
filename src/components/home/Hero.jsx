"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star } from 'lucide-react';

const MoroccoHeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#1C3F60' }}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-75c0c6d73c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(28, 63, 96, 0.7)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Animated Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-2 rotate-45"
          style={{ borderColor: '#F9C75E40' }}
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-16 w-24 h-24 border-2 rounded-full"
          style={{ borderColor: '#3E8DC140' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-16 h-16 rotate-12"
          style={{ 
            background: `linear-gradient(135deg, rgba(211, 142, 99, 0.1), rgba(163, 65, 40, 0.1))` 
          }}
          animate={{ rotate: [12, 372] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full border text-sm font-medium mb-8"
            style={{ 
              backgroundColor: 'rgba(243, 231, 210, 0.15)',
              borderColor: 'rgba(243, 231, 210, 0.3)',
              color: '#F3E7D2'
            }}
          >
            <Star className="w-4 h-4" style={{ color: '#F9C75E' }} />
            <span>Authentic Moroccan Experiences</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="block font-serif" style={{ color: '#FDFDFD' }}>
              Discover the
            </span>
            <span 
              className="block font-serif bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(90deg, #3E8DC1, #F9C75E, #D38E63)` 
              }}
            >
              Magic of Morocco
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl sm:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            style={{ color: '#F3E7D2' }}
          >
            Your ultimate resource for exploring Morocco's vibrant culture, 
            stunning landscapes, and unforgettable adventures.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 font-semibold rounded-full shadow-2xl transition-all duration-300 overflow-hidden"
              style={{ 
                backgroundColor: '#A34128',
                color: '#FDFDFD',
                boxShadow: '0 20px 25px -5px rgba(163, 65, 40, 0.3), 0 10px 10px -5px rgba(163, 65, 40, 0.2)'
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: '#D38E63' }}
              />
              <div className="relative flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">Plan Your Trip</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 font-semibold rounded-full border-2 transition-all duration-300"
              style={{ 
                backgroundColor: 'rgba(62, 141, 193, 0.1)',
                color: '#3E8DC1',
                borderColor: '#3E8DC1'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(62, 141, 193, 0.2)';
                e.target.style.borderColor = '#F9C75E';
                e.target.style.color = '#FDFDFD';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(62, 141, 193, 0.1)';
                e.target.style.borderColor = '#3E8DC1';
                e.target.style.color = '#3E8DC1';
              }}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">Explore Destinations</span>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>

     
     
    </div>
  );
};

export default MoroccoHeroSection;