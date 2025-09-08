"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star, Download, MessageCircle } from 'lucide-react';

const EnhancedMoroccoHeroSection = () => {
  return (
    <div className="relative py-6 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-x-0 top-0 -z-10 h-full w-full stroke-amber-200/40 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="morocco-pattern"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#morocco-pattern)" />
        </svg>
        
        {/* Gradient Overlay */}
        <div
          className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          aria-hidden="true"
        >
          <div
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-orange-400/30 to-blue-500/30 opacity-40"
            style={{
              clipPath:
                'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
            }}
          />
        </div>
      </div>

      {/* Animated Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-2 rotate-45 border-orange-300/30"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-16 w-24 h-24 border-2 rounded-full border-blue-400/30"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-16 h-16 rotate-12 bg-gradient-to-br from-amber-200/20 to-orange-300/20 rounded-lg"
          animate={{ rotate: [12, 372] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-20 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
          
          {/* Left Content */}
          <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200 text-sm font-medium mb-6 shadow-lg"
            >
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="text-gray-700">Authentic Moroccan Experiences</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-4xl font-bold text-gray-900 sm:text-6xl lg:text-7xl leading-tight"
            >
              Discover Morocco Authentically with{' '}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Moroccan Advisor
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 text-lg leading-8 text-gray-700 sm:max-w-md lg:max-w-none"
            >
              Discover the true Morocco with our comprehensive guide! Get insider tips to avoid tourist traps, 
              find hidden gems, taste authentic local cuisine, and experience genuine Moroccan culture. 
              Start with our free version or get the complete experience with real-time WhatsApp support 
              from local experts.
            </motion.p>
            {/* Search Bar */}
{/* <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1 }}
  className="mt-8 w-full max-w-md"
>
  <div className="relative">
    <input
      type="text"
      placeholder="Search cities, experiences, or tips..."
      className="w-full rounded-full border border-orange-300 bg-white/90 px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-orange-500 text-white rounded-full font-semibold shadow-md hover:bg-orange-600 transition">
      Search
    </button>
  </div>
</motion.div> */}


            {/* CTA Buttons */}
            <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1.2 }}
  className="mt-10 flex flex-col sm:flex-row items-center gap-4"
>
  <motion.a
   
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative flex items-center gap-2">
      <Download className="w-5 h-5" />
      <span>Plan Your Trip with Our Free Guide</span>
    </div>
  </motion.a>
  <motion.a
  href="https://wa.me/+212708140617?text=Hello%2C%20I%27d%20like%20to%20chat%20with%20a%20local%20expert"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.98 }}
  className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-full border-2 border-gray-300 hover:border-green-600 hover:bg-green-50 transition-all duration-300 shadow-lg"
>
  <div className="flex items-center gap-2">
    <MessageCircle className="w-5 h-5 text-green-600" />
    <span>Chat with a Local Expert</span>
  </div>
</motion.a>
</motion.div>


            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="mt-8 flex items-center gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="font-medium">50+ Destinations</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 text-center text-green-600 font-bold">✓</span>
                <span className="font-medium">Local Expert Support</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
          >
            {/* Column 1 */}
            <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-xl shadow-2xl"
              >
                <div
                  className="aspect-[2/3] w-full bg-gradient-to-br from-blue-400 to-blue-600 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/chaoun.png')"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
              </motion.div>
            </div>

            {/* Column 2 */}
            <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-xl shadow-2xl"
              >
                <div
                  className="aspect-[2/3] w-full bg-gradient-to-br from-orange-400 to-red-500 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/marrakech.png')"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-xl shadow-2xl"
              >
                <div
                  className="aspect-[2/3] w-full bg-gradient-to-br from-amber-400 to-orange-500 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/casablanca.png')"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
              </motion.div>
            </div>

            {/* Column 3 */}
            <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-xl shadow-2xl"
              >
                <div
                  className="aspect-[2/3] w-full bg-gradient-to-br from-teal-400 to-blue-500 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/rabat.png')"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-xl shadow-2xl"
              >
                <div
                  className="aspect-[2/3] w-full bg-gradient-to-br from-pink-400 to-red-500 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/merzouga.png')"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMoroccoHeroSection;