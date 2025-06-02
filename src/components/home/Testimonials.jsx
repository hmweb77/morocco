"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Star, Quote, ChevronLeft, ChevronRight, Heart, MapPin, User, Shield } from 'lucide-react';

const TravelersTestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Anna K.',
      location: 'Germany',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      quote: 'The free guide helped me avoid three scams in one day!',
      content: 'Morocco was my dream trip, but I was nervous. The ebook explained everything — from bargaining tricks to safe taxi tips. I felt 100× more prepared.',
      tag: 'Solo Female Traveler',
      tagColor: '#70977B',
      productUsed: 'Free Safety Guide'
    },
    {
      id: 2,
      name: 'Dylan & Marcus',
      location: 'USA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      quote: 'The itinerary ebook saved us HOURS of planning.',
      content: 'We had just 7 days and no idea how to organize our route. The Morocco Planner was clear, detailed, and honest about timing and costs. Worth every cent.',
      tag: 'Couple',
      tagColor: '#A34128',
      productUsed: 'Morocco Planner'
    },
    {
      id: 3,
      name: 'Julia M.',
      location: 'UK',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      quote: 'I explored Marrakesh like a local thanks to your Pocket Guide.',
      content: 'This wasn\'t some generic travel content. The rooftop cafés, walkable routes, and food recs were all on point. I even found a secret hammam!',
      tag: 'Digital Guide Buyer',
      tagColor: '#3E8DC1',
      productUsed: 'Pocket Marrakesh'
    },
    {
      id: 4,
      name: 'Sofia R.',
      location: 'Brazil',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      quote: 'Your solo female guide felt like traveling with a big sister.',
      content: 'The tone was so warm and real. I knew how to dress, where to stay, and even how to say no with confidence. I felt safe and strong every step.',
      tag: 'Solo Female',
      tagColor: '#D38E63',
      productUsed: 'Solo Female Guide'
    },
    {
      id: 5,
      name: 'Ahmed T.',
      location: 'Canada',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      quote: 'Finally, honest advice about Morocco travel costs.',
      content: 'No sugar-coating, no hidden surprises. The budget breakdowns were spot-on and helped me plan exactly what I could afford. Saved me from overspending!',
      tag: 'Budget Traveler',
      tagColor: '#F9C75E',
      productUsed: 'Morocco Planner'
    },
    {
      id: 6,
      name: 'Emma & Lily',
      location: 'Australia',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      quote: 'The cultural tips made all the difference.',
      content: 'We felt respectful and confident navigating local customs. The guide helped us connect with people authentically rather than just being tourists.',
      tag: 'Cultural Explorers',
      tagColor: '#1C3F60',
      productUsed: 'Complete Bundle'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#F3E7D2' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(62, 141, 193, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(163, 65, 40, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(112, 151, 123, 0.1) 0%, transparent 50%)
          `
        }} />
      </div>

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
            <Heart className="w-4 h-4" style={{ color: '#A34128' }} />
            <span>Trusted by 2,847+ Travelers</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-serif"
            style={{ color: '#1C3F60' }}
          >
            What Travelers Are Saying
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed"
            style={{ color: '#2C2C2C' }}
          >
            From first-time visitors to solo adventurers — discover how <em style={{ color: '#A34128' }}>Moroccan Advisor</em> helped travelers explore Morocco with confidence, clarity, and unforgettable memories.
          </motion.p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative mb-16">
          <div className="flex items-center justify-center">
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 z-10 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
              style={{ backgroundColor: '#FDFDFD', color: '#1C3F60' }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 z-10 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
              style={{ backgroundColor: '#FDFDFD', color: '#1C3F60' }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Testimonial Card */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full max-w-4xl mx-auto px-12"
            >
              <div 
                className="relative p-8 md:p-12 rounded-3xl shadow-2xl"
                style={{ backgroundColor: '#FDFDFD' }}
              >
                {/* Quote Icon */}
                <div 
                  className="absolute -top-6 left-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: testimonials[currentIndex].tagColor }}
                >
                  <Quote className="w-6 h-6 text-white" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Avatar & Info */}
                  <div className="text-center md:text-left">
                    <div className="relative inline-block mb-4">
                      <img
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        className="w-20 h-20 rounded-full object-cover shadow-lg"
                      />
                      <div 
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: testimonials[currentIndex].tagColor }}
                      >
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold mb-1" style={{ color: '#1C3F60' }}>
                      {testimonials[currentIndex].name}
                    </h4>
                    
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                      <MapPin className="w-4 h-4" style={{ color: '#70977B' }} />
                      <span className="text-sm" style={{ color: '#70977B' }}>
                        {testimonials[currentIndex].location}
                      </span>
                    </div>

                    <div 
                      className="inline-flex px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: testimonials[currentIndex].tagColor }}
                    >
                      {testimonials[currentIndex].tag}
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="md:col-span-2">
                    {/* Rating */}
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#F9C75E' }} />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl font-bold mb-4 leading-tight font-serif" style={{ color: '#1C3F60' }}>
                      "{testimonials[currentIndex].quote}"
                    </blockquote>

                    {/* Content */}
                    <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: '#2C2C2C' }}>
                      {testimonials[currentIndex].content}
                    </p>

                    {/* Product Used */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: '#70977B' }}>
                        Used:
                      </span>
                      <span 
                        className="px-2 py-1 rounded-md text-xs font-medium"
                        style={{ 
                          backgroundColor: `${testimonials[currentIndex].tagColor}15`,
                          color: testimonials[currentIndex].tagColor
                        }}
                      >
                        {testimonials[currentIndex].productUsed}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8' : ''
                }`}
                style={{
                  backgroundColor: index === currentIndex 
                    ? testimonials[currentIndex].tagColor 
                    : 'rgba(28, 63, 96, 0.3)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Grid - Secondary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={`grid-${testimonial.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: '#FDFDFD' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm" style={{ color: '#1C3F60' }}>
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#F9C75E' }} />
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="text-sm font-semibold mb-3" style={{ color: '#1C3F60' }}>
                "{testimonial.quote}"
              </blockquote>

              <p className="text-xs leading-relaxed" style={{ color: '#2C2C2C' }}>
                {testimonial.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center p-8 rounded-2xl"
          style={{ backgroundColor: 'rgba(28, 63, 96, 0.05)' }}
        >
          <div className="mb-4">
            <span className="text-2xl">💌</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif" style={{ color: '#1C3F60' }}>
            Want to travel Morocco with confidence too?
          </h3>
          
          <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: '#2C2C2C' }}>
            Join thousands of travelers who've explored Morocco safely and authentically with our trusted guides.
          </p>
          <Link href="/guide">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ 
              backgroundColor: '#A34128',
              color: '#FDFDFD'
            }}
          >
            Get Your Travel Guide Now
          </motion.button>
          </Link>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm" style={{ color: '#70977B' }}>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Trusted by 2,847+</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
              <span>4.9/5 Average Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelersTestimonialsSection;