"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, DollarSign, Star, Camera, Mountain, Waves, Compass, X, Heart, Calendar, Users, Shield } from 'lucide-react';
import MapGlobal from '../Map/MapComponent';
import { useRouter } from 'next/navigation';

const InteractiveMoroccoMap = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/experiences');
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [savedCities, setSavedCities] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState('All');

  const cities = [
    {
      id: 'marrakech',
      name: 'Marrakech',
      position: { x: 35, y: 65 },
      category: 'Culture',
      icon: '🏺',
      topPick: 'Jemaa el-Fnaa Square',
      description: 'The vibrant heart of Morocco with bustling souks and ancient palaces',
      image: '/marrakech.png',
      bestTime: 'Oct-Apr',
      budget: '$40-80/day',
      highlights: ['Jemaa el-Fnaa', 'Medinas', 'Rooftop dining', 'Atlas day trips'],
      experiences: ['Medina Food Tour', 'Traditional Hammam', 'Atlas Mountains Hike'],
      safety: 'Generally safe, watch for pickpockets in crowded areas',
      rating: 4.8,
      lat: 31.6295,
      lng: -8.0087
    },
    {
      id: 'fes',
      name: 'Fes',
      position: { x: 48, y: 48 },
      category: 'Culture',
      icon: '🕌',
      topPick: 'Al-Qarawiyyin University',
      description: 'Ancient imperial city with the world\'s oldest university',
      image: '/fes.png',
      bestTime: 'Mar-May, Sep-Nov',
      budget: '$35-70/day',
      highlights: ['Tanneries', 'World\'s oldest university', 'Spiritual atmosphere', 'Pottery workshops'],
      experiences: ['Leather Tannery Tour', 'Pottery Making Class', 'Sufi Music Experience'],
      safety: 'Very safe, local guides recommended for medina navigation',
      rating: 4.7,
      lat: 34.0181,
      lng: -5.0078
    },
    {
      id: 'chefchaouen',
      name: 'Chefchaouen',
      position: { x: 42, y: 35 },
      category: 'Hidden Gems',
      icon: '🔵',
      topPick: 'Blue Streets Photography',
      description: 'Magical blue-washed mountain town perfect for photography',
      image: '/chaoun.png',
      bestTime: 'Apr-Jun, Sep-Oct',
      budget: '$25-50/day',
      highlights: ['Blue-washed buildings', 'Mountain hikes', 'Peaceful vibes', 'Artisan shops'],
      experiences: ['Blue Streets Photo Walk', 'Rif Mountains Hike', 'Traditional Weaving Tour'],
      safety: 'Very safe and relaxed, mountain weather can change quickly',
      rating: 4.9,
      lat: 35.1716,
      lng: -5.2696
    },
    {
      id: 'essaouira',
      name: 'Essaouira',
      position: { x: 25, y: 58 },
      category: 'Beach',
      icon: '🌊',
      topPick: 'Coastal Windsurfing',
      description: 'Charming coastal town with Portuguese fortresses and fresh seafood',
      image: '/essaouira.png',
      bestTime: 'Apr-Oct',
      budget: '$30-65/day',
      highlights: ['Coastal charm', 'Surfing & windsurfing', 'Fresh seafood', 'Portuguese fortresses'],
      experiences: ['Windsurfing Lessons', 'Seafood Tasting Tour', 'Fortress History Walk'],
      safety: 'Very safe coastal town, strong winds perfect for water sports',
      rating: 4.6,
      lat: 31.5145,
      lng: -9.7696
    },
    {
      id: 'merzouga',
      name: 'Merzouga',
      position: { x: 72, y: 58 },
      category: 'Adventure',
      icon: '🐪',
      topPick: 'Sahara Camel Trek',
      description: 'Gateway to the Sahara Desert with unforgettable stargazing',
      image: '/merzouga.png',
      bestTime: 'Oct-Apr',
      budget: '$50-120/day',
      highlights: ['Desert adventures', 'Camel rides', 'Stargazing', 'Erg Chebbi dunes'],
      experiences: ['Camel Trek & Desert Camp', 'Sandboarding', 'Berber Music Night'],
      safety: 'Safe with guides, bring sun protection and warm clothes for nights',
      rating: 4.9,
      lat: 31.1209,
      lng: -4.0083
    },
    {
      id: 'casablanca',
      name: 'Casablanca',
      position: { x: 38, y: 52 },
      category: 'Culture',
      icon: '🏛️',
      topPick: 'Hassan II Mosque',
      description: 'Modern Morocco\'s economic heart with stunning architecture',
      image: '/casablanca.png',
      bestTime: 'Apr-Jun, Sep-Nov',
      budget: '$45-90/day',
      highlights: ['Hassan II Mosque', 'Modern architecture', 'Corniche waterfront', 'Art Deco buildings'],
      experiences: ['Mosque Architecture Tour', 'Art Deco Walking Tour', 'Modern Moroccan Cooking'],
      safety: 'Safe major city, standard urban precautions recommended',
      rating: 4.5,
      lat: 33.5731,
      lng: -7.5898
    },
    {
      id: 'rabat',
      name: 'Rabat',
      position: { x: 40, y: 45 },
      category: 'Culture',
      icon: '👑',
      topPick: 'Royal Palace',
      description: 'Morocco\'s capital city with royal palaces and gardens',
      image: '/rabat.png',
      bestTime: 'Mar-May, Sep-Nov',
      budget: '$35-75/day',
      highlights: ['Royal Palace', 'Kasbah of the Udayas', 'Modern tram system', 'Hassan Tower'],
      experiences: ['Royal Gardens Tour', 'Kasbah Walking Tour', 'Traditional Arts Workshop'],
      safety: 'Very safe capital city, well-maintained and modern',
      rating: 4.4,
      lat: 34.0209,
      lng: -6.8416
    },
    {
      id: 'tangier',
      name: 'Tangier',
      position: { x: 42, y: 28 },
      category: ['Culture',"Family-Friendly"],
      icon: '🌍',
      topPick: 'Caves of Hercules',
      description: 'Gateway between Africa and Europe with rich cultural fusion',
      image: '/tangier.png',
      bestTime: 'May-Oct',
      budget: '$30-60/day',
      highlights: ['Caves of Hercules', 'Medina', 'Cap Spartel', 'International atmosphere'],
      experiences: ['Cultural Fusion Tour', 'Hercules Caves Visit', 'Medina Art Walk'],
      safety: 'Safe port city, busy international gateway',
      rating: 4.3,
      lat: 35.7595,
      lng: -5.8340
    }
  ];

  const filters = ['All', 'Culture', 'Beach', 'Adventure', 'Hidden Gems', 'Family-Friendly'];

  const filteredCities = cities.filter(city => 
    activeFilter === 'All' || city.category === activeFilter
  );

  const toggleSaveCity = (cityId) => {
    setSavedCities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cityId)) {
        newSet.delete(cityId);
      } else {
        newSet.add(cityId);
      }
      return newSet;
    });
  };

  // Handler for when a city is selected from the map
  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };



  
  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#FDFDFD' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1C3F60 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
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
            <Compass className="w-4 h-4" style={{ color: '#F9C75E' }} />
            <span>Interactive Journey Planner</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-serif"
            style={{ color: '#1C3F60' }}
          >
            Where Will Morocco Take You?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-8"
            style={{ color: '#2C2C2C' }}
          >
            Explore the country by clicking on a city — uncover hidden gems, best times to visit, cultural highlights, and local experiences tailored for you.
          </motion.p>

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter ? 'shadow-lg' : 'hover:shadow-md'
                }`}
                style={{
                  backgroundColor: activeFilter === filter ? '#3E8DC1' : 'rgba(62, 141, 193, 0.1)',
                  color: activeFilter === filter ? '#FDFDFD' : '#3E8DC1',
                  border: `1px solid ${activeFilter === filter ? '#3E8DC1' : 'rgba(62, 141, 193, 0.3)'}`
                }}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Map and Sidebar Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              {/* Pass the required props to MapContainer */}
              <MapGlobal 
                cities={filteredCities}
                onCitySelect={handleCitySelect}
                selectedCity={selectedCity}
              />
            </div>
          </motion.div>

          {/* City Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div 
              className="sticky top-8 p-6 rounded-2xl shadow-xl"
              style={{ backgroundColor: '#F3E7D2' }}
            >
              {selectedCity ? (
                <CityDetailPanel 
                  city={selectedCity} 
                  onClose={() => setSelectedCity(null)}
                  onSave={() => toggleSaveCity(selectedCity.id)}
                  isSaved={savedCities.has(selectedCity.id)}
                  onStartAdventure={handleClick}
                />
              ) : (
                <CitySelectPrompt />
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick City Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 font-serif" style={{ color: '#1C3F60' }}>
            Quick City Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {cities.map((city) => (
              <motion.div
                key={city.id}
                className="text-center p-4 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: 'rgba(62, 141, 193, 0.05)' }}
                onClick={() => setSelectedCity(city)}
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl mb-2">{city.icon}</div>
                <h4 className="font-semibold mb-1 text-sm" style={{ color: '#1C3F60' }}>{city.name}</h4>
                <p className="text-xs" style={{ color: '#70977B' }}>{city.highlights[0]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 rounded-2xl"
          style={{ backgroundColor: 'rgba(28, 63, 96, 0.05)' }}
        >
          <h3 className="text-2xl font-bold mb-4 font-serif" style={{ color: '#1C3F60' }}>
            Ready to Plan Your Moroccan Adventure?
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: '#2C2C2C' }}>
            {savedCities.size > 0 
              ? `You've saved ${savedCities.size} ${savedCities.size === 1 ? 'destination' : 'destinations'}! Let's create your perfect itinerary.`
              : 'Explore the map above and save your favorite destinations to get started.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ 
                backgroundColor: '#A34128',
                color: '#FDFDFD'
              }}
            >
              Customize My Trip
            </motion.button>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

// City Detail Panel Component
const CityDetailPanel = ({ city, onClose, onSave, isSaved,onStartAdventure }) => (
  <div className="space-y-4">
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{city.icon}</div>
        <div>
          <h3 className="text-xl font-bold font-serif" style={{ color: '#1C3F60' }}>
            {city.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
            <span className="text-sm font-medium" style={{ color: '#70977B' }}>
              {city.rating}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <X className="w-5 h-5" style={{ color: '#2C2C2C' }} />
      </button>
    </div>

    {/* Image */}
    <div className="w-full h-32 rounded-lg overflow-hidden">
      <img 
        src={city.image} 
        alt={city.name}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Description */}
    <p className="text-sm leading-relaxed" style={{ color: '#2C2C2C' }}>
      {city.description}
    </p>

    {/* Quick Facts */}
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" style={{ color: '#3E8DC1' }} />
        <span className="text-sm font-medium" style={{ color: '#1C3F60' }}>Best Time:</span>
        <span className="text-sm" style={{ color: '#2C2C2C' }}>{city.bestTime}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4" style={{ color: '#3E8DC1' }} />
        <span className="text-sm font-medium" style={{ color: '#1C3F60' }}>Budget:</span>
        <span className="text-sm" style={{ color: '#2C2C2C' }}>{city.budget}</span>
      </div>

      <div className="flex items-start gap-2">
        <Shield className="w-4 h-4 mt-0.5" style={{ color: '#70977B' }} />
        <div>
          <span className="text-sm font-medium" style={{ color: '#1C3F60' }}>Safety:</span>
          <p className="text-sm mt-1" style={{ color: '#2C2C2C' }}>{city.safety}</p>
        </div>
      </div>
    </div>

    {/* Top Attractions */}
    <div>
      <h4 className="font-semibold mb-2" style={{ color: '#1C3F60' }}>Top Attractions</h4>
      <ul className="text-sm space-y-1" style={{ color: '#2C2C2C' }}>
        {city.highlights.map((highlight, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F9C75E' }} />
            {highlight}
          </li>
        ))}
      </ul>
    </div>

    {/* Suggested Experiences */}
    <div>
      <h4 className="font-semibold mb-2" style={{ color: '#1C3F60' }}>Suggested Experiences</h4>
      <div className="space-y-2">
        {city.experiences.map((experience, idx) => (
          <div key={idx} className="text-sm p-2 rounded-lg" style={{ backgroundColor: 'rgba(62, 141, 193, 0.1)', color: '#2C2C2C' }}>
            {experience}
          </div>
        ))}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="space-y-3 pt-4">
      <button
         onClick={onStartAdventure}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
          isSaved ? 'opacity-75' : ''
        }`}
        style={{ 
          backgroundColor: isSaved ? '#70977B' : '#A34128',
          color: '#FDFDFD'
        }}
      >
        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        Start the adventure
      </button>
      
      {/* <button
        className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 border-2 flex items-center justify-center gap-2"
        style={{ 
          backgroundColor: 'transparent',
          color: '#3E8DC1',
          borderColor: '#3E8DC1'
        }}
      >
        <Camera className="w-4 h-4" />
        Learn More
      </button> */}
    </div>
  </div>
);

// City Select Prompt Component
const CitySelectPrompt = () => (
  <div className="text-center py-8">
    <div 
      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(62, 141, 193, 0.1)' }}
    >
      <MapPin className="w-8 h-8" style={{ color: '#3E8DC1' }} />
    </div>
    <h3 className="text-lg font-bold mb-2 font-serif" style={{ color: '#1C3F60' }}>
      Select a City
    </h3>
    <p className="text-sm leading-relaxed" style={{ color: '#2C2C2C' }}>
      Click on any city pin on the map to discover its unique attractions, best travel times, and local experiences.
    </p>
  </div>
);

export default InteractiveMoroccoMap;