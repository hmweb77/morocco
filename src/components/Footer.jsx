"use client"
import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Mail, 
  BookOpen,
  Compass,
  Heart,
  Shield,
  Download
} from 'lucide-react';

const EnhancedMoroccoFooter = () => {
  const footerLinks = {
    destinations: [
      { name: 'Marrakech', href: '/experiences' },
      { name: 'Fes', href: '/experiences' },
      { name: 'Chefchaouen', href: '/experiences' },
      { name: 'Casablanca', href: '/experiences' },
      { name: 'Essaouira', href: '/experiences' },
      { name: 'Merzouga (Sahara)', href: '/experiences' }
    ],
    resources: [
      { name: 'Travel Guides', href: '/guide' },
      { name: 'Experiences', href: '/experiences' },
      { name: 'Blog', href: '/blogs' },
      { name: 'About Us', href: '/about' },
      { name: 'Privacy & Terms', href: '/privacy' }
    ]
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
            <h1 className="text-lg md:text-xl font-bold font-serif leading-tight">
      <span className="text-green-600">Moroccan</span>{" "}
      <span className="text-red-700">Advisor</span>
    </h1>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Discover the magic of Morocco with confidence. We provide authentic travel guides, 
              safety tips, and insider secrets to help you explore Morocco like a local.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              Popular Destinations
            </h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-400" />
              Resources
            </h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-4">
              <h5 className="font-semibold text-white">Get in Touch</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href="mailto:contact@moroccanadvisor.com" className="text-gray-300 hover:text-white transition-colors">
                  contact@moroccanadvisor.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4 text-purple-400" />
                  <Link href="/guide" className="text-gray-300 hover:text-white transition-colors">
                    Free Travel Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center ">
            <div className="text-sm text-gray-400 flex items-center gap-2">
              © 2024 Moroccan Advisor. All rights reserved. Made with <Heart className="w-4 h-4 text-red-400" /> for travelers by travelers.
            </div>
          </div>
        </div>

       
      </div>
    </footer>
  );
};

export default EnhancedMoroccoFooter;
