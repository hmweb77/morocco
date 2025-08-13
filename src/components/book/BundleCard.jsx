
"use client"

import { motion } from 'framer-motion';
import { 
   Download,  ShoppingCart, CheckCircle, Zap, Shield, Award, Globe,  ArrowRight, 
} from 'lucide-react';



// Bundle Card Component
const BundleCard = ({ ebooks, onBuyBundle }) => {
    const totalOriginalPrice = ebooks.reduce((sum, ebook) => sum + ebook.originalPrice, 0);
    const bundlePrice = totalOriginalPrice * 0.35; // 50% discount
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
            Get both guides and save €{savings.toFixed(2)}! Everything you need for the perfect Moroccan adventure — from city exploration to trip planning and solo travel safety.
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

  export default BundleCard