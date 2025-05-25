"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Download, CheckCircle, AlertTriangle, DollarSign, Map, Backpack, Mail, User, ArrowRight, Star, BookOpen, Eye, MessageCircle, Navigation, Package } from 'lucide-react';

const MoroccoEbookSection = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  const guideFeatures = [
    {
      icon: Shield,
      title: "How to Spot Common Tourist Scams",
      description: "Learn the 7 sneaky tricks used in markets, taxis, and even restaurants — and how to confidently say no.",
      color: '#A34128'
    },
    {
      icon: MessageCircle,
      title: "The Art of Bargaining – Moroccan Style",
      description: "Step-by-step scripts for negotiating in the souks (without being rude). Plus: when to walk away and when you're getting a fair deal.",
      color: '#3E8DC1'
    },
    {
      icon: DollarSign,
      title: "Real Prices You Should Expect",
      description: "What to pay for souvenirs, food, tours, hammams, taxis, and more — no more guessing or overpaying.",
      color: '#70977B'
    },
    {
      icon: Navigation,
      title: "Local-Approved Itineraries",
      description: "Avoid overpriced tour packages by following routes recommended by Moroccan locals and seasoned travelers.",
      color: '#D38E63'
    },
    {
      icon: Package,
      title: "Bonus: Packing & Safety Checklist",
      description: "Travel light, dress smart, and avoid rookie mistakes that cost you time and money.",
      color: '#F9C75E'
    }
  ];

  if (isSubmitted) {
    return (
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#FDFDFD' }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1C3F60 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-2xl shadow-2xl"
            style={{ backgroundColor: '#F3E7D2' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: '#70977B' }}
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-3xl font-bold mb-4 font-serif" style={{ color: '#1C3F60' }}>
              Check Your Email! 📧
            </h2>
            
            <p className="text-lg mb-6" style={{ color: '#2C2C2C' }}>
              Your free <strong>Morocco Travel Survival Guide</strong> is on its way to <strong>{email}</strong>
            </p>

            <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'rgba(62, 141, 193, 0.1)' }}>
              <p className="text-sm" style={{ color: '#1C3F60' }}>
                <strong>What's next?</strong> Check your inbox (and spam folder) for your download link. 
                The guide will help you save money and travel like a local!
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm" style={{ color: '#70977B' }}>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>Insider tips included</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#1C3F60' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(249, 199, 94, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(211, 142, 99, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(112, 151, 123, 0.2) 0%, transparent 50%)
          `
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Warning Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ 
                backgroundColor: 'rgba(163, 65, 40, 0.2)',
                color: '#F9C75E',
                border: '1px solid rgba(249, 199, 94, 0.3)'
              }}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Free Travel Safety Guide</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight"
              style={{ color: '#FDFDFD' }}
            >
              Don't Get Scammed in Morocco –{' '}
              <span style={{ color: '#F9C75E' }}>Read This First</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl mb-8 leading-relaxed"
              style={{ color: '#F3E7D2' }}
            >
              From the souks of Marrakech to taxi rides and tour deals — Morocco is full of magic{' '}
              <em>and</em> surprises. Download our free travel guide and learn how to travel smart, 
              save money, and shop like a local (without getting ripped off).
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-8"
            >
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5" style={{ color: '#70977B' }} />
                <span className="text-sm font-medium" style={{ color: '#F3E7D2' }}>2,847+ Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" style={{ color: '#F9C75E' }} />
                <span className="text-sm font-medium" style={{ color: '#F3E7D2' }}>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" style={{ color: '#3E8DC1' }} />
                <span className="text-sm font-medium" style={{ color: '#F3E7D2' }}>32 Pages</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Email Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div 
              className="p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
              style={{ backgroundColor: '#F3E7D2' }}
            >
              {/* Form Header */}
              <div className="text-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(62, 141, 193, 0.1)' }}
                >
                  <Shield className="w-8 h-8" style={{ color: '#3E8DC1' }} />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-serif" style={{ color: '#1C3F60' }}>
                  Get Your Free Guide
                </h3>
                <p className="text-sm" style={{ color: '#2C2C2C' }}>
                  No spam. Just smart travel tips you won't find on Google.
                </p>
              </div>

              {/* Email Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1C3F60' }}>
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#70977B' }} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: '#D38E63',
                        backgroundColor: '#FDFDFD',
                        color: '#2C2C2C'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3E8DC1';
                        e.target.style.boxShadow = '0 0 0 3px rgba(62, 141, 193, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#D38E63';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1C3F60' }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#70977B' }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: '#D38E63',
                        backgroundColor: '#FDFDFD',
                        color: '#2C2C2C'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3E8DC1';
                        e.target.style.boxShadow = '0 0 0 3px rgba(62, 141, 193, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#D38E63';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={isLoading || !email || !name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: '#A34128',
                    color: '#FDFDFD'
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Guide...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Download Free Guide</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(28, 63, 96, 0.1)' }}>
                <div className="flex items-center justify-center gap-4 text-xs" style={{ color: '#70977B' }}>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>100% Free</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>No Spam</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>Instant Access</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* What You'll Get Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif" style={{ color: '#FDFDFD' }}>
              What You'll Get Inside
            </h2>
            <p className="text-lg" style={{ color: '#F3E7D2' }}>
              Everything you need to travel Morocco like a savvy local
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl backdrop-blur-sm"
                  style={{ backgroundColor: 'rgba(243, 231, 210, 0.1)' }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: feature.color }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#FDFDFD' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#F3E7D2' }}>
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto p-6 rounded-xl" style={{ backgroundColor: 'rgba(243, 231, 210, 0.1)' }}>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#F9C75E' }} />
              ))}
            </div>
            <blockquote className="text-lg italic mb-4" style={{ color: '#F3E7D2' }}>
              "This guide saved me hundreds of dollars in Marrakech! The bargaining scripts actually work, 
              and I felt so much more confident navigating the souks."
            </blockquote>
            <cite className="text-sm font-medium" style={{ color: '#D38E63' }}>
              — Eliza M., Solo Traveler
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MoroccoEbookSection;