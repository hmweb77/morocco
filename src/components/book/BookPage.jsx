"use client"
import React, { useState } from 'react';
import EbookCard from './EbookCard';
import BundleCard from './BundleCard';
import PreviewModal from './PreviewModal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Star, Download, X, ChevronLeft, ChevronRight,  Shield,  Compass, Award, Globe, 
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
    image: "/books/stripe-image-1.jpeg",
    originalPrice: 9.99,
    salePrice: 4.90,
    discount: 50,
    rating: 4.9,
    reviews: 1271,
    pages: "25p",
    badge: "Most Popular",
    badgeColor: "#A34128",
    features: [
      "Local restaurant recommendations",
      "Interactive 10-day itinerary",
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
      "/books/marrakech1.png",
      "/books/marrakech2.png",
      "/books/marrakech3.png",
      "/books/marrakech4.png"
    ],
    languages: ["English"],
    format: "PDFr",
     // Stripe Integration
     stripePriceId: "price_1RvcFhHV3EX6m1vfBFokvpeW", // Replace with your actual Stripe Price ID
     stripePaymentLink: "https://buy.stripe.com/6oU3cvgWl04EeOq2ZK6J201", // Replace with your actual Stripe payment link
     supabaseBucket: "marrakech-trip",
     supabaseFilePath: "travel book marrakech.pdf"
  },
  {
    id: 2,
    title: "Solo Female Travel in Morocco",
    subtitle: "Travel with confidence and safety",
    category: "SAFETY & CULTURE",
    description: "Candid, empowering, and practical — this guide helps women navigate Morocco with confidence, safety, and soul.",
    fullDescription: "Written by experienced female travelers, this comprehensive guide addresses the unique considerations for women traveling solo in Morocco. From cultural sensitivities and appropriate dress codes to safety strategies and empowering experiences, this guide ensures you can explore Morocco with confidence while respecting local customs. Inside, you'll find destination highlights, female-friendly accommodations, solo dining tips, scams to avoid, cultural etiquette, and empowering real-life stories.",
    image: "/books/stripe-image-2.jpeg",
    originalPrice: 9.99,
    salePrice: 4.90,
    discount: 50,
    rating: 4.9,
    reviews: 891,
    pages: "40p",
    badge: "New",
    badgeColor: "#70977B",
    features: [
      "Dress guide for different regions",
      "Solo-friendly accommodations",
      "Cultural etiquette essentials",
      "Female-led experiences",
      "Safety protocols and tips",
      "Local women's perspectives",
      "Destination highlights",
      "Packing checklist for women"
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
      "/books/female1.png",
      "/books/female2.png",
      "/books/female3.png",
      "/books/female4.png"
    ],
    author: "Fatima Zahra & Lisa Thompson",
    lastUpdated: "2024",
    languages: ["English", "French"],
    format: "PDF + Audio Guide",
    // Stripe Integration
    stripePriceId: "price_1RvjApHV3EX6m1vfWLbCl21B", // Replace with your actual Stripe Price ID
    stripePaymentLink: "https://buy.stripe.com/aFa00j21r18I5dQ0RC6J202", // Replace with your actual Stripe payment link
    supabaseBucket: "female-traveler",
    supabaseFilePath: "female traveler.pdf"
  }
];





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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
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
          {/* <div className="max-w-4xl mx-auto">
            <BundleCard 
              ebooks={ebooksData}
              onBuyBundle={handleBuyBundle}
            />
          </div> */}
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
                answer: "No we don't offer refund but we offer a 30-day Support. If you need more informations, contact us"
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
      {/* <section className="py-20" style={{ backgroundColor: '#1C3F60' }}>
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
                <span>30-Day Support</span>
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
      </section> */}

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