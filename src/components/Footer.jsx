"use client"
import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ArrowRight,
  BookOpen,
  Compass,
  Star,
  Heart,
  Shield,
  Download,
  ExternalLink,
  Globe,
  Award,
  Users,
  Clock
} from 'lucide-react';

const EnhancedMoroccoFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    destinations: [
      { name: 'Marrakech', href: '/destinations/marrakech', popular: true },
      { name: 'Fes', href: '/destinations/fes', popular: true },
      { name: 'Chefchaouen', href: '/destinations/chefchaouen', popular: true },
      { name: 'Casablanca', href: '/destinations/casablanca' },
      { name: 'Essaouira', href: '/destinations/essaouira' },
      { name: 'Merzouga (Sahara)', href: '/destinations/merzouga', popular: true }
    ],
    resources: [
      { name: 'Travel Guides', href: '/guides', icon: BookOpen },
      { name: 'Safety Tips', href: '/safety', icon: Shield },
      { name: 'Packing Lists', href: '/packing' },
      { name: 'Cultural Guide', href: '/culture' },
      { name: 'Budget Planning', href: '/budget' },
      { name: 'Solo Female Travel', href: '/solo-female' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/story' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Affiliate Disclosure', href: '/affiliate' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Trip Planning', href: '/planning' },
      { name: 'Book a Consultation', href: '/consultation', highlight: true },
      { name: 'Travel Insurance', href: '/insurance' },
      { name: 'Emergency Contacts', href: '/emergency' },
      { name: 'Refund Policy', href: '/refunds' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/moroccanadvisor', color: '#1877F2', followers: '12.5K' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/moroccanadvisor', color: '#E4405F', followers: '28.3K' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/moroccanadvisor', color: '#1DA1F2', followers: '8.2K' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/moroccanadvisor', color: '#FF0000', followers: '15.7K' }
  ];

  const stats = [
    { number: '2,847+', label: 'Happy Travelers', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { number: '50+', label: 'Destinations Covered', icon: Globe, color: 'from-green-500 to-emerald-500' },
    { number: '4.9/5', label: 'Average Rating', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { number: '15+', label: 'Travel Guides', icon: BookOpen, color: 'from-purple-500 to-pink-500' }
  ];

  const awards = [
    { title: 'Best Travel Blog 2024', org: 'Travel Awards' },
    { title: 'Top Morocco Guide', org: 'Wanderlust Magazine' },
    { title: 'Trusted by Travelers', org: 'TripAdvisor' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
              url('data:image/svg+xml,<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.03"><path d="M40 40c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm30 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/></g></svg>')
            `
          }}
        />
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Awards Banner */}
        <div className="border-b border-white/10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              {awards.map((award, index) => (
                <div key={index} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="font-medium">{award.title}</span>
                  <span className="text-gray-400">— {award.org}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Enhanced Brand Section */}
            <div className="lg:col-span-4">
              <div className="space-y-6">
                {/* Logo with Animation */}
                <div className="flex items-center gap-3 mb-6 group">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    style={{ 
                      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                      boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)'
                    }}
                  >
                    <Compass className="w-7 h-7 text-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold font-serif bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Moroccan Advisor
                    </h3>
                    <p className="text-sm text-blue-400 font-medium">Your Trusted Travel Guide</p>
                  </div>
                </div>

                {/* Enhanced Description */}
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    Discover the magic of Morocco with confidence. We provide authentic travel guides, 
                    safety tips, and insider secrets to help you explore Morocco like a local.
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-emerald-400">
                    <Clock className="w-4 h-4" />
                    <span>24/7 Travel Support Available</span>
                  </div>
                </div>

                {/* Enhanced Stats with Hover Effects */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="relative group cursor-pointer"
                        onMouseEnter={() => setHoveredStat(index)}
                        onMouseLeave={() => setHoveredStat(null)}
                      >
                        <div className={`
                          p-4 rounded-xl bg-gradient-to-br ${stat.color} 
                          transform transition-all duration-300 
                          ${hoveredStat === index ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'}
                          backdrop-blur-sm border border-white/10
                        `}>
                          <div className="flex items-center justify-between mb-2">
                            <Icon className="w-5 h-5 text-white" />
                            <div className="text-xl font-bold text-white">{stat.number}</div>
                          </div>
                          <div className="text-xs text-white/90 font-medium">{stat.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Enhanced Social Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Follow Our Journey</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${social.color}20` }}>
                            <Icon className="w-4 h-4" style={{ color: social.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                              {social.name}
                            </div>
                            <div className="text-xs text-gray-400">{social.followers} followers</div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Links Sections */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Destinations with Popular Tags */}
              <div>
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Destinations
                </h4>
                <ul className="space-y-3">
                  {footerLinks.destinations.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="flex-1">{link.name}</span>
                        {link.popular && (
                          <span className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full font-medium">
                            Popular
                          </span>
                        )}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources with Icons */}
              <div>
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-400" />
                  Resources
                </h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.name}>
                        <a 
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                        >
                          {Icon && <Icon className="w-4 h-4 text-gray-500 group-hover:text-green-400 transition-colors" />}
                          <span className="flex-1">{link.name}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="flex-1">{link.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support with Highlights */}
              <div>
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Support
                </h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className={`
                          transition-colors duration-300 flex items-center gap-2 group
                          ${link.highlight 
                            ? 'text-blue-400 hover:text-blue-300 font-medium' 
                            : 'text-gray-300 hover:text-white'
                          }
                        `}
                      >
                        <span className="flex-1">{link.name}</span>
                        {link.highlight && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                            Recommended
                          </span>
                        )}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Enhanced Newsletter Section */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-white/10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
            
            <div className="relative max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Join Our Travel Community
                </h3>
              </div>
              
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                Get exclusive travel insights, hidden gems, and special offers delivered to your inbox. 
                Join 50,000+ passionate travelers exploring Morocco!
              </p>

              {!isSubscribed ? (
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                  <button
                    onClick={handleNewsletterSubmit}
                    className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
                    style={{
                      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)'
                    }}
                  >
                    Subscribe Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 text-green-400 mb-6">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-xl">Welcome to the community!</span>
                </div>
              )}

              <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Unsubscribe anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>50K+ subscribers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Info */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-blue-400/30">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email us</p>
                    <a href="mailto:hello@moroccanadvisor.com" className="text-white hover:text-blue-400 transition-colors font-medium">
                      hello@moroccanadvisor.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-green-400/30">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">WhatsApp Support</p>
                    <a href="tel:+212123456789" className="text-white hover:text-green-400 transition-colors font-medium">
                      +212 123 456 789
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-400/30">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Download className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Free Travel Guide</p>
                    <a href="/free-guide" className="text-white hover:text-purple-400 transition-colors font-medium">
                      Download Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                © 2024 Moroccan Advisor. All rights reserved. Made with{' '}
                <Heart className="w-4 h-4 text-red-400 animate-pulse" /> for travelers by travelers.
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors hover:underline">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors hover:underline">
                  Terms of Service
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-white transition-colors hover:underline">
                  Cookie Policy
                </a>
                <a href="/sitemap" className="text-gray-400 hover:text-white transition-colors hover:underline">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedMoroccoFooter;