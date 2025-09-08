"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Calendar, 
  Bell, 
  ArrowLeft, 
  Compass, 
  Mountain, 
  Waves, 
  TreePine,
  Mail,
  CheckCircle
} from 'lucide-react';
import MoroccoResponsiveNavbar from '@/components/Navbar';
import EnhancedMoroccoFooter from '@/components/Footer';

const DestinationsComingSoon = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const destinations = [
    {
      name: 'Marrakech',
      icon: Mountain,
      description: 'The Red City of Morocco',
      color: '#A34128'
    },
    {
      name: 'Chefchaouen',
      icon: TreePine,
      description: 'The Blue Pearl',
      color: '#3E8DC1'
    },
    {
      name: 'Essaouira',
      icon: Waves,
      description: 'Coastal Windy City',
      color: '#70977B'
    },
    {
      name: 'Fes',
      icon: Compass,
      description: 'Imperial City',
      color: '#D38E63'
    }
  ];

  return (
    <>
      <MoroccoResponsiveNavbar />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #1C3F60 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </motion.button>

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div 
                className="w-24 h-24 rounded-full mx-auto flex items-center justify-center shadow-lg"
                style={{ backgroundColor: '#3E8DC1' }}
              >
                <MapPin className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-serif"
              style={{ color: '#1C3F60' }}
            >
              Destinations Coming Soon
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-8"
              style={{ color: '#2C2C2C' }}
            >
              We're crafting detailed destination guides for Morocco's most enchanting cities. 
              Get ready to explore authentic experiences, hidden gems, and local secrets.
            </motion.p>

            {/* Coming Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              {[
                'Detailed City Guides',
                'Local Experiences',
                'Hidden Gems',
                'Cultural Tips',
                'Safety Advice'
              ].map((feature, index) => (
                <div 
                  key={feature}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ backgroundColor: 'rgba(62, 141, 193, 0.1)' }}
                >
                  <CheckCircle className="w-4 h-4" style={{ color: '#3E8DC1' }} />
                  <span className="text-sm font-medium" style={{ color: '#1C3F60' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Preview Destinations */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12 font-serif"
              style={{ color: '#1C3F60' }}
            >
              Preview: Destinations We're Working On
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((destination, index) => {
                const IconComponent = destination.icon;
                return (
                  <motion.div
                    key={destination.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    style={{ backgroundColor: '#FDFDFD' }}
                  >
                    {/* Background Accent */}
                    <div 
                      className="absolute top-0 right-0 w-20 h-20 opacity-5 transform rotate-12"
                      style={{ backgroundColor: destination.color }}
                    />

                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${destination.color}15` }}
                    >
                      <IconComponent 
                        className="w-6 h-6" 
                        style={{ color: destination.color }} 
                      />
                    </div>

                    <h3 className="text-lg font-bold mb-2" style={{ color: '#1C3F60' }}>
                      {destination.name}
                    </h3>
                    
                    <p className="text-sm" style={{ color: '#70977B' }}>
                      {destination.description}
                    </p>

                    <div className="mt-4 text-xs font-medium" style={{ color: destination.color }}>
                      Guide in progress...
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Email Subscription */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl shadow-xl text-center"
              style={{ backgroundColor: '#1C3F60' }}
            >
              {!isSubscribed ? (
                <>
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(249, 199, 94, 0.2)' }}
                  >
                    <Bell className="w-8 h-8" style={{ color: '#F9C75E' }} />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 font-serif text-white">
                    Get Notified When We Launch
                  </h3>
                  
                  <p className="text-lg mb-6" style={{ color: '#F3E7D2' }}>
                    Be the first to explore our comprehensive destination guides when they're ready.
                  </p>

                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="flex-1 px-4 py-3 rounded-lg border-2 border-transparent focus:outline-none focus:border-orange-400 transition-colors"
                        style={{ backgroundColor: '#FDFDFD', color: '#1C3F60' }}
                      />
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{ backgroundColor: '#F9C75E', color: '#1C3F60' }}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Mail className="w-5 h-5" />
                            Notify Me
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>

                  <p className="text-sm mt-4 opacity-80" style={{ color: '#F3E7D2' }}>
                    No spam, just travel inspiration. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ backgroundColor: '#70977B' }}
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 font-serif text-white">
                    You're All Set! 🎉
                  </h3>
                  
                  <p className="text-lg" style={{ color: '#F3E7D2' }}>
                    We'll notify you as soon as our destination guides are ready. 
                    Get ready for an amazing Moroccan adventure!
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Launch Timeline */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12 font-serif"
              style={{ color: '#1C3F60' }}
            >
              What to Expect
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Detailed Research',
                  description: 'We\'re gathering insider tips and hidden gems from local experts.',
                  color: '#3E8DC1'
                },
                {
                  step: '02',
                  title: 'Content Creation',
                  description: 'Creating comprehensive guides with practical tips and cultural insights.',
                  color: '#70977B'
                },
                {
                  step: '03',
                  title: 'Launch Ready',
                  description: 'Complete destination guides with maps, recommendations, and travel tips.',
                  color: '#A34128'
                }
              ].map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: phase.color }}
                  >
                    {phase.step}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#1C3F60' }}>
                    {phase.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: '#2C2C2C' }}>
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 font-serif" style={{ color: '#1C3F60' }}>
                Can't Wait? Start Exploring Now
              </h3>
              
              <p className="text-lg mb-8" style={{ color: '#2C2C2C' }}>
                While we work on detailed destination guides, check out our experiences and travel tips.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/experiences')}
                  className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#3E8DC1', color: '#FDFDFD' }}
                >
                  Browse Experiences
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/guide')}
                  className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2"
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: '#1C3F60',
                    borderColor: '#1C3F60'
                  }}
                >
                  Get Travel Guide
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <EnhancedMoroccoFooter />
    </>
  );
};

export default DestinationsComingSoon;