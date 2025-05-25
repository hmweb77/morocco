"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Users, Camera, Mountain, Utensils, Star, Info, ArrowLeft, Car, Ticket, MapPin as LocationIcon, UtensilsCrossed, CreditCard, Lightbulb } from 'lucide-react';

// Reusable FlipCard Component
const FlipCard = ({ experience, index, onHover, isHovered }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const IconComponent = experience.icon;

  const getTagColor = (tag) => {
    const colors = {
      Cultural: '#3E8DC1',
      Romantic: '#A34128',
      Adventure: '#D38E63',
      Culinary: '#70977B',
      Active: '#F9C75E'
    };
    return colors[tag] || '#3E8DC1';
  };

  const toggleFlip = () => setIsFlipped(!isFlipped);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-[620px]"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => onHover(experience.id)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <CardFront 
          experience={experience}
          IconComponent={IconComponent}
          getTagColor={getTagColor}
          isHovered={isHovered}
          onFlip={toggleFlip}
        />

        {/* Back Side */}
        <CardBack 
          experience={experience}
          IconComponent={IconComponent}
          onFlip={toggleFlip}
        />
      </motion.div>
    </motion.div>
  );
};

// Front Card Component
const CardFront = ({ experience, IconComponent, getTagColor, isHovered, onFlip }) => (
  <div 
    className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    style={{ 
      backgroundColor: '#F3E7D2',
      backfaceVisibility: 'hidden'
    }}
  >
    {/* Image Section */}
    <div className="relative h-64 overflow-hidden">
      <motion.img
        src={experience.image}
        alt={experience.title}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Tag Badge */}
      <div 
        className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium shadow-lg"
        style={{ backgroundColor: getTagColor(experience.tag) }}
      >
        {experience.tag}
      </div>

      {/* Rating */}
      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm">
        <Star className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
        <span className="text-white text-sm font-medium">{experience.rating}</span>
      </div>

      {/* Hover Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6"
      >
        <div className="text-white space-y-2">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{experience.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{experience.price}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Content Section */}
    <div className="p-6">
      <div className="flex items-start gap-3 mb-3">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'rgba(62, 141, 193, 0.1)' }}
        >
          <IconComponent className="w-5 h-5" style={{ color: '#3E8DC1' }} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 font-serif" style={{ color: '#1C3F60' }}>
            {experience.title}
          </h3>
        </div>
      </div>

      <p className="text-sm mb-4 leading-relaxed" style={{ color: '#2C2C2C' }}>
        {experience.description}
      </p>

      <div className="mb-6">
        <p className="text-sm font-medium mb-1" style={{ color: '#70977B' }}>
          Best For:
        </p>
        <p className="text-sm" style={{ color: '#2C2C2C' }}>
          {experience.bestFor}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <ActionButton
          primary
          onClick={() => {}}
          text={experience.cta}
        />
        <ActionButton
          onClick={onFlip}
          text="More Details"
          icon={Info}
        />
      </div>
    </div>
  </div>
);

// Back Card Component
const CardBack = ({ experience, IconComponent, onFlip }) => (
  <div 
    className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg p-6 overflow-y-auto"
    style={{ 
      backgroundColor: '#F3E7D2',
      backfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)'
    }}
  >
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'rgba(62, 141, 193, 0.1)' }}
        >
          <IconComponent className="w-5 h-5" style={{ color: '#3E8DC1' }} />
        </div>
        <h3 className="text-lg font-bold font-serif" style={{ color: '#1C3F60' }}>
          {experience.title}
        </h3>
      </div>

      {/* Details Content */}
      <div className="flex-1 space-y-4">
        <DetailSection
          icon={Car}
          title="Getting There"
          content={experience.details.gettingThere}
        />
        
        <DetailSection
          icon={Ticket}
          title="Entry Info"
          content={experience.details.entryInfo}
        />
        
        <DetailSection
          icon={LocationIcon}
          title="Highlights"
          content={experience.details.topSpots}
          isList
        />
        
        <DetailSection
          icon={UtensilsCrossed}
          title="Where to Eat"
          content={experience.details.dining}
        />
        
        <DetailSection
          icon={CreditCard}
          title="Price Guide"
          content={experience.details.priceGuide}
        />
        
        <DetailSection
          icon={Lightbulb}
          title="Travel Tips"
          content={experience.details.tips}
          isList
          isHighlight
        />
      </div>

      {/* Back Buttons */}
      <div className="space-y-3 mt-6">
        <ActionButton
          primary
          onClick={() => {}}
          text={experience.cta}
        />
        <ActionButton
          onClick={onFlip}
          text="Back to Overview"
          icon={ArrowLeft}
        />
      </div>
    </div>
  </div>
);

// Reusable Detail Section Component
const DetailSection = ({ icon: Icon, title, content, isList = false, isHighlight = false }) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <Icon 
        className="w-4 h-4" 
        style={{ color: isHighlight ? '#F9C75E' : '#3E8DC1' }} 
      />
      <h4 className="font-semibold text-sm" style={{ color: '#1C3F60' }}>
        {title}
      </h4>
    </div>
    {isList ? (
      <ul className="text-xs space-y-1" style={{ color: '#2C2C2C' }}>
        {content.map((item, idx) => (
          <li key={idx} className="leading-relaxed">• {item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-xs leading-relaxed" style={{ color: '#2C2C2C' }}>
        {content}
      </p>
    )}
  </div>
);

// Reusable Action Button Component
const ActionButton = ({ primary = false, onClick, text, icon: Icon }) => {
  const baseClasses = "w-full px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg";
  const primaryClasses = "py-3 font-semibold";
  const secondaryClasses = "py-2 font-medium border-2";
  const iconClasses = Icon ? "flex items-center justify-center gap-2" : "";
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${iconClasses}`}
      style={primary ? { 
        backgroundColor: '#A34128',
        color: '#FDFDFD'
      } : {
        backgroundColor: 'transparent',
        color: '#3E8DC1',
        borderColor: '#3E8DC1'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = primary ? '#D38E63' : 'rgba(62, 141, 193, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = primary ? '#A34128' : 'transparent';
      }}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </motion.button>
  );
};

// Main Component
const TopExperiencesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const experiences = [
    {
      id: 1,
      title: "Explore Ancient Medinas",
      description: "Step into history as you wander Morocco's centuries-old medinas. Lose yourself in maze-like alleys, colorful souks, and the scent of fresh spices.",
      image: "/medina.png",
      tag: "Cultural",
      bestFor: "Culture lovers, photographers, history buffs",
      location: "Marrakech & Fez",
      duration: "Half Day",
      price: "$25",
      rating: 4.8,
      cta: "Explore Medinas",
      icon: Camera,
      details: {
        gettingThere: "Found in cities like Marrakech, Fes, and Tetouan. Easily walkable, often near the old city center",
        entryInfo: "Free to enter the medinas. Guided walking tours: €15–€30 per person. Customize your route with a local guide",
        topSpots: ["Marrakech: Jemaa el-Fnaa, Bahia Palace, spice souks", "Fes: Tanneries, Al-Qarawiyyin library", "Tetouan: UNESCO-listed medina architecture"],
        dining: "Nomad or Café des Épices (Marrakech), Ruined Garden (Fes)",
        priceGuide: "Guided tours: €20–€30, Meals: €8–€20, Souvenir shopping: negotiable",
        tips: ["Hire a guide to avoid getting lost", "Bring cash for markets", "Ask before taking photos of people", "Wear comfortable walking shoes"]
      }
    },
    {
      id: 2,
      title: "Visit Enchanting Gardens",
      description: "Uncover Morocco's quieter side in its secret gardens and royal courtyards. Enjoy moments of peace surrounded by fountains, mosaics, and blooming orange trees.",
      image: "/majorele.png",
      tag: "Romantic",
      bestFor: "Couples, solo travelers, nature seekers",
      location: "Marrakech",
      duration: "2-3 Hours",
      price: "$15",
      rating: 4.7,
      cta: "See Gardens",
      icon: Star,
      details: {
        gettingThere: "Located within major cities like Marrakech and Rabat. Walk or short taxi from city center",
        entryInfo: "Majorelle Garden (Marrakech): €12–€15, Andalusian Gardens (Rabat): Free, Menara Gardens: €5–€10",
        topSpots: ["Exotic plants, fountains, tiled walkways", "Majorelle: vibrant blue & yellow hues", "Birds, turtles, and shaded benches"],
        dining: "Jardin Majorelle Café (on-site), Café Clock (near Andalusian Gardens)",
        priceGuide: "Entry: €0–€15, Café treats: €5–€10",
        tips: ["Visit early for the best lighting", "Buy tickets online in advance", "Go in spring for peak blooms", "Combine with museum visit"]
      }
    },
    {
      id: 3,
      title: "Sunset Camel Ride Sahara",
      description: "Watch the sun melt into the dunes on a camel trek through the golden desert. A once-in-a-lifetime experience under the stars.",
      image: "/camelRide.png",
      tag: "Adventure",
      bestFor: "Adventure seekers, first-time visitors",
      location: "Merzouga",
      duration: "Full Day",
      price: "$120",
      rating: 4.9,
      cta: "Book Camel Trek",
      icon: Mountain,
      details: {
        gettingThere: "Depart from Merzouga (Erg Chebbi) or Zagora. Reach via 4x4 or organized tour from Marrakech",
        entryInfo: "Group camel ride: €35–€50, Overnight with tent & dinner: €80–€120 per person",
        topSpots: ["1–2 hour camel trek at sunset", "Berber dinner & campfire music", "Stargazing in the desert"],
        dining: "Tagine, mint tea, and bread baked in the sand",
        priceGuide: "Day trip: from €35, Overnight luxury: up to €250",
        tips: ["Bring a scarf for wind/dust", "Easy walking shoes or sandals", "Prepare for no Wi-Fi", "Pack light and warm clothes"]
      }
    },
    {
      id: 4,
      title: "Cook a Traditional Tagine",
      description: "Get hands-on with Moroccan cuisine in a local kitchen. Shop at the souk, then cook with authentic spices and techniques.",
      image: "/tajine.png",
      tag: "Culinary",
      bestFor: "Foodies, families, experiential travelers",
      location: "Marrakech",
      duration: "4 Hours",
      price: "$45",
      rating: 4.6,
      cta: "Join Cooking Class",
      icon: Utensils,
      details: {
        gettingThere: "Available in Marrakech, Fes, and rural villages. Short walk from riads or pick-up from accommodation",
        entryInfo: "Half-day class: €35–€60. Includes souk visit, ingredients, and guided prep",
        topSpots: ["Spice combinations and cultural significance", "How to make preserved lemons & mint tea", "Tagine techniques from local chefs"],
        dining: "Starter, main (tagine), and dessert. Communal meal with hosts",
        priceGuide: "Classes: €35–€60, Optional upgrades: private chef, wine pairing",
        tips: ["Ask for a recipe handout", "Bring your phone to document", "Come hungry - it's a full meal", "Great chance to learn about culture"]
      }
    },
    {
      id: 5,
      title: "Hike the Atlas Mountains",
      description: "Escape the city and breathe in the clean air of the High Atlas. Pass Berber villages and rivers as you trek to panoramic views.",
      image: "/atlas.png",
      tag: "Active",
      bestFor: "Hikers, photographers, nature lovers",
      location: "High Atlas",
      duration: "Full Day",
      price: "$80",
      rating: 4.8,
      cta: "Plan a Hike",
      icon: Mountain,
      details: {
        gettingThere: "Common base towns: Imlil, Tacheddirt, Oukaimeden. 1.5–2 hours by car from Marrakech",
        entryInfo: "Day hike: free or €30–€60 with guide. Multi-day treks available for Mount Toubkal",
        topSpots: ["Jbel Toubkal (4,167 m): North Africa's highest peak", "Waterfalls, walnut groves, Berber villages", "Unmatched panoramic views"],
        dining: "Imlil guesthouses, Berber bread, tagine, local honey",
        priceGuide: "Guided hike: €30–€90, Meals: €5–€15, Overnight refuge: €15–€40",
        tips: ["Bring layers - temperature drops quickly", "Wear sun protection and hydrate", "Hiking poles recommended", "Be respectful of village customs"]
      }
    }
  ];

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
            <Star className="w-4 h-4" style={{ color: '#F9C75E' }} />
            <span>Handpicked Experiences</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-serif"
            style={{ color: '#1C3F60' }}
          >
            Top Experiences in Morocco
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#2C2C2C' }}
          >
            Your essential list of unmissable adventures, handpicked to make your journey unforgettable.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-base max-w-4xl mx-auto mt-4"
            style={{ color: '#70977B' }}
          >
            From ancient medinas and lush gardens to desert sunsets and local cuisine — discover the very best Morocco has to offer, tailored for curious travelers and cultural explorers.
          </motion.p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {experiences.map((experience, index) => (
            <FlipCard
              key={experience.id}
              experience={experience}
              index={index}
              onHover={setHoveredCard}
              isHovered={hoveredCard === experience.id}
            />
          ))}
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center p-8 rounded-2xl"
          style={{ backgroundColor: 'rgba(28, 63, 96, 0.05)' }}
        >
          <h3 className="text-2xl font-bold mb-4 font-serif" style={{ color: '#1C3F60' }}>
            Looking for something unique?
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: '#2C2C2C' }}>
            Explore a curated collection of unforgettable Moroccan moments tailored to your style.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ 
              backgroundColor: '#3E8DC1',
              color: '#FDFDFD'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1C3F60';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#3E8DC1';
            }}
          >
            See All Experiences
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TopExperiencesSection;