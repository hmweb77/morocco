"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Compass, 
  MapPin, 
  BookOpen, 
  Star, 
  Download, 
  Mail,
  ChevronDown,
  ExternalLink,
  Shield,
  Heart,
  Camera,
  Mountain,
  Utensils,
  Users,
  ArrowRight
} from 'lucide-react';

const MoroccoResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
      setActiveDropdown(null);
    };
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const navigationItems = [
    {
      label: 'About',
      icon: Heart,
      href: '/about'
    },
    {
      label: 'Destinations',
      icon: MapPin,
      href: '/',
      dropdown: [
        { name: 'Marrakech', href: '/', icon: Camera, color: '#EF4444' },
        { name: 'Fes', href: '/', icon: Star, color: '#6366F1' },
        { name: 'Chefchaouen', href: '/', icon: Mountain, color: '#10B981' },
        { name: 'Casablanca', href: '/', icon: Star, color: '#8B5CF6' },
        { name: 'Essaouira', href: '/', icon: Heart, color: '#F59E0B' },
        { name: 'Merzouga (Sahara)', href: '/', icon: Mountain, color: '#EC4899' }
      ]
    },
    {
      label: 'Travel Guides',
      icon: BookOpen,
      href: '/guide',
      dropdown: [
        { name: 'Free Safety Guide', href: '/guide', icon: Shield, color: '#10B981' },
        { name: 'Pocket Marrakesh', href: '/guide', icon: Camera, color: '#EF4444' },
        { name: 'Morocco Planner', href: '/guide', icon: MapPin, color: '#6366F1' },
        { name: 'Solo Female Travel', href: '/guide', icon: Users, color: '#EC4899' },
      ]
    },
    {
      label: 'Experiences',
      icon: Star,
      href: '/experiences',
      badge: 'Popular'
    },
    {
      label: 'Blogs',
      icon: BookOpen,
      href: '/blogs'
    },
   
  ];

  const toggleDropdown = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/20' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => window.location.href = '/'}
            >
              <div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}
              >
                <Compass className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold font-serif text-gray-900">
                  Moroccan Advisor
                </h1>
                <p className="text-xs text-gray-600 -mt-1">Your Trusted Travel Guide</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="relative">
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-300 font-medium relative"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => item.dropdown ? toggleDropdown(item.label) : window.location.href = item.href}
                    >
                      {/* <Icon className="w-4 h-4" /> */}
                      <span>{item.label}</span>
                      {item.dropdown && (
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                      {/* {item.badge && (
                        <span 
                          className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold text-white rounded-full shadow-lg"
                          style={{ backgroundColor: '#EF4444' }}
                        >
                          {item.badge}
                        </span>
                      )} */}
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.dropdown && activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 py-2 z-50"
                        >
                          {item.dropdown.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon;
                            return (
                              <motion.a
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-300"
                                whileHover={{ x: 5 }}
                              >
                                {/* <div 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: `${dropdownItem.color}15` }}
                                >
                                  <DropdownIcon 
                                    className="w-4 h-4" 
                                    style={{ color: dropdownItem.color }} 
                                  />
                                </div> */}
                                <div>
                                  <div className="font-medium">{dropdownItem.name}</div>
                                  {dropdownItem.name === 'Free Safety Guide' && (
                                    <div className="text-xs text-green-600 font-medium">FREE</div>
                                  )}
                                </div>
                              </motion.a>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-300 flex items-center gap-2"
                onClick={() => window.location.href = '/guide'}
              >
                <Download className="w-4 h-4" />
                <span className="hidden lg:inline">Free Guide</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                style={{ 
                  background: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)' 
                }}
                onClick={() => window.location.href = '/guide'}
              >
                <Star className="w-4 h-4" />
                Plan My Trip
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-7xl mx-aut o px-4 sm:px-6 py-4 space-y-2">
                
                {/* Mobile CTA */}
                <div className="flex gap-2 mb-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-3 rounded-xl font-medium text-gray-700 bg-gray-100/80 transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => window.location.href = '/free-guide'}
                  >
                    <Download className="w-4 h-4" />
                    Free Guide
                  </motion.button>
                  
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ 
                      background: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)' 
                    }}
                    onClick={() => window.location.href = '/plan-trip'}
                  >
                    <Star className="w-4 h-4" />
                    Plan Trip
                  </motion.button>
                </div>

                {/* Mobile Navigation Items */}
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}>
                      <motion.button
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-300 font-medium"
                        onClick={() => item.dropdown ? toggleDropdown(item.label) : window.location.href = item.href}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          {/* <Icon className="w-5 h-5" /> */}
                          <span>{item.label}</span>
                          {item.badge && (
                            <span 
                              className="px-2 py-0.5 text-xs font-bold text-white rounded-full"
                              style={{ backgroundColor: '#EF4444' }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.dropdown && (
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-300 ${
                              activeDropdown === item.label ? 'rotate-180' : ''
                            }`} 
                          />
                        )}
                      </motion.button>

                      {/* Mobile Dropdown */}
                      <AnimatePresence>
                        {item.dropdown && activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-1"
                          >
                            {item.dropdown.map((dropdownItem) => {
                              const DropdownIcon = dropdownItem.icon;
                              return (
                                <motion.a
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-all duration-300"
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div 
                                    className="w-6 h-6 rounded-md flex items-center justify-center"
                                    style={{ backgroundColor: `${dropdownItem.color}15` }}
                                  >
                                    <DropdownIcon 
                                      className="w-3 h-3" 
                                      style={{ color: dropdownItem.color }} 
                                    />
                                  </div>
                                  <span className="text-sm">{dropdownItem.name}</span>
                                  {dropdownItem.name === 'Free Safety Guide' && (
                                    <span className="text-xs text-green-600 font-bold">FREE</span>
                                  )}
                                </motion.a>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Mobile Contact */}
                <div className="pt-4 mt-4 border-t border-gray-200/50">
                  <motion.a
                    href="mailto:hello@moroccanadvisor.com"
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-300"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="w-5 h-5" />
                    <span>Contact Us</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default MoroccoResponsiveNavbar;