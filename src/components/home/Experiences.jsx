"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { MapPin, Clock, DollarSign, Users, Camera, Mountain, Utensils, Star, Info, ArrowLeft, Car, Ticket, UtensilsCrossed, CreditCard, Lightbulb, Droplets, Calendar, CheckCircle, XCircle, Backpack, AlertCircle } from 'lucide-react';

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
      Active: '#F9C75E',
      Nature: '#70977B'
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
      className="group relative h-[680px]"
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
        {/* <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'rgba(62, 141, 193, 0.1)' }}
        >
          <IconComponent className="w-5 h-5" style={{ color: '#3E8DC1' }} />
        </div> */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 font-serif line-clamp-2" style={{ color: '#1C3F60' }}>
            {experience.title}
          </h3>
        </div>
      </div>

      <p className="text-sm mb-4 leading-relaxed line-clamp-3" style={{ color: '#2C2C2C' }}>
        {experience.description}
      </p>

      <div className="mb-4">
        <p className="text-sm font-medium mb-1" style={{ color: '#70977B' }}>
          Best For:
        </p>
        <p className="text-sm" style={{ color: '#2C2C2C' }}>
          {experience.bestFor}
        </p>
      </div>

      {/* Reviews */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
          <span className="text-sm font-medium" style={{ color: '#1C3F60' }}>{experience.rating}</span>
        </div>
        <span className="text-sm" style={{ color: '#70977B' }}>
          ({experience.reviews.toLocaleString()} reviews)
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <ActionButton
          primary
          onClick={() => window.open(experience.ctaLink, '_blank')}
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
    className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
    style={{ 
      backgroundColor: '#F3E7D2',
      backfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)'
    }}
  >
    <div className="h-full flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'rgba(62, 141, 193, 0.1)' }}
          >
            <IconComponent className="w-5 h-5" style={{ color: '#3E8DC1' }} />
          </div>
          <h3 className="text-lg font-bold font-serif line-clamp-2" style={{ color: '#1C3F60' }}>
            {experience.title}
          </h3>
        </div>

        {/* Details Content */}
        <div className="space-y-4">
          {/* Highlights */}
          <DetailSection
            icon={Star}
            title="Highlights"
            content={experience.highlights}
            isList
            isHighlight
          />
          
          {/* Itinerary */}
          <DetailSection
            icon={Calendar}
            title="Itinerary"
            content={experience.itinerary}
            isList
          />
          
          {/* What's Included */}
          <DetailSection
            icon={CheckCircle}
            title="What's Included"
            content={experience.includes}
            isList
            iconColor="#70977B"
          />
          
          {/* Not Included */}
          <DetailSection
            icon={XCircle}
            title="Not Included"
            content={experience.notIncluded}
            isList
            iconColor="#A34128"
          />
          
          {/* Not Suitable For */}
          {experience.notSuitableFor && (
            <DetailSection
              icon={AlertCircle}
              title="Not Suitable For"
              content={experience.notSuitableFor}
              isList
              iconColor="#D38E63"
            />
          )}
          
          {/* What to Bring */}
          <DetailSection
            icon={Backpack}
            title="What to Bring"
            content={experience.whatToBring}
            isList
          />
          
          {/* Good to Know */}
          <DetailSection
            icon={Lightbulb}
            title="Good to Know"
            content={experience.goodToKnow}
            isList
            isHighlight
          />
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="p-6 pt-4 border-t" style={{ borderColor: '#E8DCC6' }}>
        <div className="space-y-3">
          <ActionButton
            primary
            onClick={() => window.open(experience.ctaLink, '_blank')}
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
  </div>
);

// Reusable Detail Section Component
const DetailSection = ({ icon: Icon, title, content, isList = false, isHighlight = false, iconColor }) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <Icon 
        className="w-4 h-4" 
        style={{ color: iconColor || (isHighlight ? '#F9C75E' : '#3E8DC1') }} 
      />
      <h4 className="font-semibold text-sm" style={{ color: '#1C3F60' }}>
        {title}
      </h4>
    </div>
    {isList ? (
      <ul className="text-xs space-y-1 ml-6" style={{ color: '#2C2C2C' }}>
        {content.map((item, idx) => (
          <li key={idx} className="leading-relaxed">• {item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-xs leading-relaxed ml-6" style={{ color: '#2C2C2C' }}>
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
  const router = useRouter();

  const experiences = [
    {
      id: 1,
      title: "Marrakesh: Agafay Desert Sunset, Camel Ride, and Dinner Show",
      description:
        "Explore the stunning landscapes of the Agafay Desert during a camel ride from Marrakech. Learn how argan oil is produced, sip tea at a Berber camp, enjoy live music and fire shows, and indulge in a traditional Moroccan dinner under the stars.",
        image: "/experiences/1.jpg",
      icon: Mountain,
      tag: "Adventure",
      bestFor: "Couples, sunset seekers, first-time visitors",
      location: "Agafay Desert (from Marrakech)",
      duration: "6 Hours",
      price: "€21.98",
      rating: 4.6,
      reviews: 24809,
      cta: "Book Desert Experience",
      ctaLink:
        "https://www.getyourguide.com/marrakesh-l208/dinner-under-the-stars-of-agafay-desert-sunset-camel-ride-t477070/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
  
      highlights: [
        "Live like a local with a Moroccan dinner at a desert camp",
        "Take in a colorful sunset over the Agafay Desert dunes",
        "Ride a camel through the golden landscapes",
        "Enjoy Berber tea and traditional argan oil visit",
        "Relax with fire shows and live music under the stars"
      ],
  
      itinerary: [
        "Pickup from Marrakech hotel or riad",
        "Short stop at local argan oil cooperative",
        "Camel ride through desert at sunset",
        "Dinner served at Berber camp",
        "Fire show and live traditional music",
        "Return to Marrakech in the evening"
      ],
  
      includes: [
        "Hotel pickup and drop-off",
        "Camel ride",
        "Traditional Moroccan dinner",
        "Tea at Berber camp",
        "Music and fire show",
        "Air-conditioned transportation"
      ],
  
      notIncluded: ["Water", "Soda", "Tips"],
  
      notSuitableFor: [
        "Pregnant women",
        "People with back problems",
        "People with reduced mobility (camel ride and terrain)"
      ],
  
      whatToBring: [
        "Warm jacket for the evening",
        "Camera",
        "Comfortable closed shoes",
        "Cash for drinks or extras"
      ],
  
      goodToKnow: [
        "Kids can ride camels with an adult",
        "Vegetarian and gluten-free meal options available",
        "Pickup details sent via WhatsApp the day before the tour"
      ]
    },
    {
      id: 2,
      title: "From Marrakech: Ouzoud Waterfalls Guided Hike and Boat Trip",
      description:
        "Embark on a full-day journey to the breathtaking Ouzoud Waterfalls. Hike through lush olive groves, discover Berber villages, enjoy a boat ride to the base of the falls, and see wild monkeys in their natural habitat.",
        image: "/experiences/2.jpg",
      icon: Droplets,
      tag: "Nature",
      bestFor: "Nature lovers, hikers, photographers",
      location: "Ouzoud (from Marrakech)",
      duration: "10 Hours",
      price: "€19.00",
      rating: 4.7,
      reviews: 25294,
      cta: "Book Ouzoud Trip",
      ctaLink:
        "https://www.getyourguide.com/marrakesh-l208/from-marrakech-ouzoud-waterfalls-guided-hike-and-boat-trip-t388884/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
  
      highlights: [
        "Admire the spectacular Ouzoud waterfalls",
        "Join a scenic hike with a local guide",
        "Get close to the falls with a boat ride",
        "Spot wild monkeys along the way",
        "Relax with round-trip transport and guide"
      ],
  
      itinerary: [
        "Pickup from Marrakech (7:40 AM)",
        "2h drive to rest stop and coffee break",
        "1h more to Ouzoud Waterfalls",
        "4h hike, lunch break, and boat cruise",
        "3h return journey to Marrakech"
      ],
  
      includes: [
        "Hotel/riad pickup and drop-off",
        "Round-trip transportation by air-conditioned van",
        "Bilingual driver",
        "Live guide in Ouzoud",
        "Boat ride at the falls"
      ],
  
      notIncluded: [
        "Lunch (approx. €10, paid locally in cash)"
      ],
  
      notSuitableFor: [
        "People with mobility impairments",
        "Wheelchair users"
      ],
  
      whatToBring: [
        "Comfortable walking shoes",
        "Sunglasses and hat",
        "Snacks and bottled water",
        "Sunscreen"
      ],
  
      goodToKnow: [
        "Choose between a shared or private tour",
        "Expect moderate-level hiking with uneven terrain",
        "Lunch is not included but guide will recommend options"
      ]
    },
    {
      id: 3,
      title: "Marrakech: Agafay Desert Quad & Camel Rides with Dinner Show",
      description:
        "Enjoy an action-packed day trip from Marrakech featuring quad biking, camel rides, and a Berber dinner show in the Agafay Desert. Ride through arid terrain and relax at a desert camp with music, food, and local culture.",
        image: "/experiences/3.jpg",
      icon: Car,
      tag: "Adventure",
      bestFor: "Thrill seekers, groups, active travelers",
      location: "Agafay Desert (from Marrakech)",
      duration: "6 Hours",
      price: "€17.50",
      rating: 4.6,
      reviews: 13042,
      cta: "Book Quad & Camel Tour",
      ctaLink:
        "https://www.getyourguide.com/marrakesh-l208/marrakech-agafay-desert-quad-camel-rides-with-dinner-show-t713703/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
    
      highlights: [
        "Ride a thrilling desert quad bike",
        "Take a camel ride at sunset",
        "Enjoy a 3-course dinner at a Berber camp",
        "Watch live traditional entertainment",
        "Explore the rocky terrain of the Agafay Desert"
      ],
    
      itinerary: [
        "Pickup from Marrakech hotel/riad",
        "Drive to Lalla Takerkoust (quad base)",
        "Briefing and safety equipment fitting",
        "1-hour guided quad ride",
        "Transfer to Agafay Desert",
        "20-minute camel ride at sunset",
        "Dinner, fire show, and Berber music",
        "Return to Marrakech"
      ],
    
      includes: [
        "Hotel pickup and drop-off",
        "Helmet and goggles for quad riding",
        "Guided quad ride (1 hour)",
        "Camel ride (20 minutes)",
        "3-course Moroccan dinner",
        "Live traditional show",
        "Tea and water"
      ],
    
      notIncluded: [
        "Alcoholic beverages",
        "Tips and gratuities"
      ],
    
      notSuitableFor: [
        "Pregnant women"
      ],
    
      whatToBring: [
        "Comfortable warm clothing",
        "Sunglasses",
        "Closed shoes",
        "Valid ID (for quad insurance)"
      ],
    
      goodToKnow: [
        "Drivers must be at least 16 years old for quads",
        "One quad per person; no switching drivers",
        "You’ll be grouped with other travelers unless private option selected",
        "Weather may affect quad routes — itinerary may adjust accordingly"
      ]
    },
    {
      id: 4,
      title: "Marrakesh Menara Airport (RAK): One-Way Private Transfer",
      description:
        "Enjoy a hassle-free, comfortable transfer between Marrakesh city and Menara Airport (RAK). Travel in an air-conditioned vehicle with a professional driver who will assist with luggage and ensure a smooth ride.",
        image: "/experiences/4.jpg",
      icon: Car,
      tag: "Transport",
      bestFor: "Solo travelers, families, business visitors",
      location: "Marrakech Menara Airport or City Center",
      duration: "20–30 Minutes",
      price: "€14.22",
      rating: 4.7,
      reviews: 662,
      cta: "Book Airport Transfer",
      ctaLink:
        "https://www.getyourguide.com/marrakesh-l208/marrakesh-menara-airport-rak-one-way-private-transfer-t613597/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
    
      highlights: [
        "Reliable private transfer between Marrakech airport and city",
        "Avoid stress with professional pickup and drop-off",
        "Travel in air-conditioned comfort with luggage help",
        "Multilingual drivers and flexible scheduling",
        "Wheelchair accessible and family friendly"
      ],
    
      itinerary: [
        "Pickup from airport arrivals or hotel/riad",
        "Private drive to your destination (20–30 mins)",
        "Drop-off with luggage assistance"
      ],
    
      includes: [
        "Private air-conditioned vehicle",
        "Driver assistance with luggage",
        "Multilingual driver (English, French, Arabic)",
        "Flexible pickup/drop-off times"
      ],
    
      notIncluded: [],
    
      notSuitableFor: [],
    
      whatToBring: [
        "Flight information (for airport pickups)",
        "Hotel name or address (for drop-offs)"
      ],
    
      goodToKnow: [
        "Book at least 4 hours before scheduled pickup",
        "If your riad is inside the medina, pickup/drop-off may be at the closest accessible point",
        "Free cancellation up to 24 hours in advance"
      ]
    },
    {
      id: 5,
      title: "From Marrakech: Essaouira Full-Day Trip",
      description:
        "Escape Marrakech for a full-day coastal adventure in Essaouira. Discover the charming medina, stroll along the windy beach, explore the port, and see how local argan oil is made. A relaxing and cultural day trip perfect for all travelers.",
        image: "/experiences/5.jpg",
      icon: Car,
      tag: "Coastal",
      bestFor: "Culture seekers, solo travelers, relaxed explorers",
      location: "Essaouira (from Marrakech)",
      duration: "10 Hours",
      price: "€29.00",
      rating: 4.4,
      reviews: 4165,
      cta: "Book Essaouira Day Trip",
      ctaLink:
        "https://www.getyourguide.com/marrakesh-l208/marrakech-to-essaouira-full-day-escape-t56046/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
    
      highlights: [
        "Discover the Atlantic coastal city of Essaouira",
        "Admire the souks, port, beach, and blue-and-white architecture",
        "Explore the medina at your own pace or with local guidance",
        "Visit an argan oil cooperative on the way",
        "Relax on a scenic drive through Morocco’s countryside"
      ],
    
      itinerary: [
        "Pickup from Marrakech accommodations",
        "Scenic drive to Essaouira (approx. 3 hours)",
        "Stop at café and argan oil cooperative",
        "Free time to explore Essaouira's medina, ramparts, and beach",
        "Lunch on your own (guide gives recommendations)",
        "Drive back to Marrakech, arrive late afternoon"
      ],
    
      includes: [
        "Hotel pickup and drop-off",
        "Air-conditioned transportation",
        "Bilingual driver/guide (English/French)",
        "Stop at argan oil cooperative"
      ],
    
      notIncluded: [
        "Meals and drinks",
        "Personal expenses"
      ],
    
      notSuitableFor: [
        "People with mobility impairments",
        "Wheelchair users"
      ],
    
      whatToBring: [
        "Comfortable walking shoes",
        "Sun protection (hat/sunscreen)",
        "Water and snacks",
        "Windbreaker (Essaouira is breezy year-round)"
      ],
    
      goodToKnow: [
        "Pickup starts at 8:00 AM; exact time sent the day before",
        "Expect a moderate walk in Essaouira’s medina",
        "Lunch is not included — multiple cafés near the beach and port"
      ]
    },
    {
      id: 6,
      title: "Agadir/Tamraght/Taghazout: Paradise Valley Atlas Tour",
      description:
        "Discover the lush oasis of Paradise Valley on this scenic tour from Agadir, Tamraght, or Taghazout. Enjoy a guided hike through the High Atlas Mountains, swim in natural pools, and unwind in a breathtaking natural setting.",
        image: "/experiences/6.jpg",
      icon: Car,
      tag: "Nature",
      bestFor: "Hikers, swimmers, nature lovers",
      location: "Paradise Valley (from Agadir, Tamraght, Taghazout)",
      duration: "5 Hours",
      price: "€18.31",
      rating: 4.3,
      reviews: 266,
      cta: "Book Paradise Valley Tour",
      ctaLink:
        "https://www.getyourguide.com/agadir-l1413/agadirtamraghttaghazout-paradise-valley-atlas-tour-t678479/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
    
      highlights: [
        "Stop at panoramic spots in the Atlas foothills",
        "Explore Paradise Valley with a knowledgeable local guide",
        "Swim in crystal-clear natural rock pools",
        "Relax under the palm trees in a stunning mountain gorge",
        "Enjoy hassle-free round-trip transport from your accommodation"
      ],
    
      itinerary: [
        "Pickup from Agadir, Tamraght, or Taghazout",
        "Drive through the Atlas Mountains",
        "Stop at scenic viewpoints and argan trees",
        "Hike through Paradise Valley (30–40 mins)",
        "Free time to swim, relax, and explore",
        "Return drive to your original location"
      ],
    
      includes: [
        "Hotel pickup and drop-off",
        "Air-conditioned transport",
        "Local hiking guide",
        "Time for swimming and relaxing"
      ],
    
      notIncluded: [],
    
      notSuitableFor: [
        "People with mobility impairments",
        "Wheelchair users"
      ],
    
      whatToBring: [
        "Swimsuit and towel",
        "Good walking shoes",
        "Water bottle",
        "Snacks or lunch",
        "Sunscreen"
      ],
    
      goodToKnow: [
        "Pickup from Agadir: 8:15 AM, Tamraght: 8:45 AM, Taghazout: 9:00 AM",
        "Tour may be canceled in poor weather conditions",
        "Wear water-safe shoes for riverbank walking and rocky terrain"
      ]
    },
    {
      id: 7,
      title: "Agadir/Taghazout: Quad Bike and Sandboarding Tour",
      description:
        "Embark on a thrilling half-day tour from Agadir or Taghazout that combines quad biking across desert trails with sandboarding on golden dunes. Experience the landscapes of Morocco’s southern coast in a unique and active way.",
        image: "/experiences/7.jpg",
      icon: Car,
      tag: "Adventure",
      bestFor: "Adventure seekers, friends, teens and adults",
      location: "Agadir & Taghazout",
      duration: "4 Hours",
      price: "€38.11",
      rating: 4.8,
      reviews: 423,
      cta: "Book Quad & Sandboarding",
      ctaLink:
        "https://www.getyourguide.com/agadir-l1413/agadirtaghazout-quad-bike-and-sandboarding-desert-beach-t586206/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
    
      highlights: [
        "Ride a quad bike along the dunes and coastline",
        "Experience fun sandboarding with ocean views",
        "Capture stunning photos in a Moroccan desert setting",
        "Explore the Sahara-like terrain near Tamri and Agadir",
        "Perfect mix of adrenaline, nature, and culture"
      ],
    
      itinerary: [
        "Pickup from Agadir, Tamraght, or Taghazout hotel",
        "Drive to Tamri sand dunes (approx. 40 min)",
        "Safety briefing and helmet fitting",
        "Quad bike ride through dunes and beach trails",
        "Stop for sandboarding on the dunes",
        "Photo and tea break",
        "Return ride and transfer back to hotel"
      ],
    
      includes: [
        "Hotel pickup and drop-off",
        "Quad bike rental",
        "Helmet and goggles",
        "Sandboard",
        "Tea break"
      ],
    
      notIncluded: [],
    
      notSuitableFor: [
        "Pregnant women",
        "Children under 6 (children 6–11 can ride as passenger)"
      ],
    
      whatToBring: [
        "Closed shoes",
        "Comfortable clothing that can get dusty",
        "Sunglasses",
        "Water and sunscreen"
      ],
    
      goodToKnow: [
        "Children 6–11 can join as passengers behind adults",
        "Quad bike is automatic and easy to drive",
        "Experience operates daily, but may adjust for weather",
        "Not recommended for people with spinal conditions"
      ]
    },
    {
      id: 8,
      title: "Casablanca: Hassan II Mosque Premium Tour with Entry Ticket",
      description:
        "Explore Morocco’s most iconic religious landmark on a premium guided tour of the Hassan II Mosque in Casablanca. Admire intricate architecture, learn about Islamic art, and gain insight into Moroccan history.",
        image: "/experiences/8.jpg",
      icon: Car,
      tag: "Cultural",
      bestFor: "Architecture lovers, cultural travelers, first-time visitors",
      location: "Casablanca",
      duration: "45 Minutes",
      price: "€17.00",
      rating: 4.6,
      reviews: 1336,
      cta: "Book Mosque Tour",
      ctaLink:
        "https://www.getyourguide.com/casablanca-l244/casablanca-hassan-ii-mosque-premium-tour-with-entry-ticket-t343456/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
    
      highlights: [
        "Visit one of Morocco’s most iconic religious landmarks",
        "Skip the ticket line and enjoy an official guided mosque tour",
        "Marvel at intricate mosaics, carvings, and architecture",
        "Learn about Moroccan culture and Islamic tradition",
        "Choose hotel pickup or meet directly at the mosque"
      ],
    
      itinerary: [
        "Optional pickup from hotel or meet at Hassan II Mosque",
        "Skip-the-line mosque entry",
        "45-minute guided tour",
        "Q&A with your certified local guide",
        "Return to hotel or free time in the area"
      ],
    
      includes: [
        "Guided tour with licensed local guide",
        "Entry ticket to Hassan II Mosque",
        "Hotel pickup and drop-off (if selected)"
      ],
    
      notIncluded: [
        "Food and drinks",
        "Personal expenses"
      ],
    
      notSuitableFor: [],
    
      whatToBring: [
        "Comfortable shoes",
        "Modest clothing (arms and legs covered)",
        "Headscarf for women (recommended)"
      ],
    
      goodToKnow: [
        "Photography is allowed inside the mosque",
        "Tour is available in multiple languages (English, French, Spanish)",
        "Shoes must be removed inside — plastic bags are provided"
      ]
    },
    {
      id: 9,
      title: "Chefchaouen Day Trip from Fez (Shared Group Tour)",
      description:
        "Visit the stunning blue city of Chefchaouen on a full-day trip from Fez. Wander through vibrant alleys, take incredible photos, and explore the charm of Morocco’s most photogenic town in the Rif Mountains.",
      image: "/experiences/9.png",
      icon: Car,
      tag: "Cultural",
      bestFor: "Photographers, explorers, solo travelers",
      location: "Chefchaouen (from Fez)",
      duration: "12 Hours",
      price: "€17.22",
      rating: 4.7,
      reviews: 412,
      cta: "Book Chefchaouen Trip",
      ctaLink:
        "https://www.getyourguide.com/fes-l829/chefchaouen-day-trip-from-fez-shared-group-tour-t495614/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
    
      highlights: [
        "Discover 'The Blue City of Morocco' with a local guide",
        "Capture breathtaking photos in narrow cobalt streets",
        "Learn about the culture and history of Chefchaouen",
        "Relax with round-trip transport from Fez",
        "Comfortable shared air-conditioned vehicle"
      ],
    
      itinerary: [
        "Pickup from hotel/riad in Fez",
        "Drive through scenic Rif Mountains (3.5–4 hours)",
        "Guided tour of Chefchaouen",
        "Free time for exploration, shopping, and lunch",
        "Return trip to Fez in late afternoon"
      ],
    
      includes: [
        "Round-trip transportation Fez ⇄ Chefchaouen",
        "English/French-speaking driver",
        "Air-conditioned vehicle",
        "Local city guide",
        "Entrance fees"
      ],
    
      notIncluded: [
        "Meals and drinks",
        "Tips for guide or driver"
      ],
    
      notSuitableFor: [
        "People prone to motion sickness (long drive)"
      ],
    
      whatToBring: [
        "Walking shoes",
        "Camera",
        "Hat and sunscreen",
        "Water and snacks"
      ],
    
      goodToKnow: [
        "Travel time each way is approx. 4 hours",
        "Guide will give a short orientation, then you’ll have free time",
        "Chefchaouen is a pedestrian city — expect lots of walking"
      ]
    },
    {
      id: 10,
      title: "Fes: Volubilis Roman Ruins, Moulay Idriss, & Meknes Day Trip",
      description:
        "Step back in time with a full-day tour from Fez to explore Morocco’s Roman ruins of Volubilis, the holy town of Moulay Idriss, and the imperial city of Meknes. Discover ancient architecture, history, and culture all in one scenic day.",
        image: "/experiences/10.jpg",
      icon: Car,
      tag: "Cultural",
      bestFor: "History buffs, architecture lovers, day trippers",
      location: "Volubilis, Moulay Idriss, Meknes (from Fez)",
      duration: "8 Hours",
      price: "€14.85",
      rating: 4.6,
      reviews: 146,
      cta: "Book History Day Trip",
      ctaLink:
        "https://www.getyourguide.com/fes-l829/fes-volubilis-roman-ruins-mouly-idriss-meknes-day-trip-t497285/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
    
      highlights: [
        "Explore the stunning Roman ruins of Volubilis",
        "Visit the spiritual hilltop town of Moulay Idriss",
        "Discover the gates, palaces, and souks of Meknes",
        "Enjoy round-trip transport in a comfortable vehicle",
        "Perfect full-day cultural experience from Fez"
      ],
    
      itinerary: [
        "Pickup from your hotel or riad in Fez",
        "Drive to Volubilis (UNESCO Roman site)",
        "Stop in Moulay Idriss for panoramic views",
        "Explore Meknes: Bab Mansour, Lahdim Square, local medina",
        "Return to Fez in the late afternoon"
      ],
    
      includes: [
        "Hotel/riad pickup and drop-off in Fez",
        "Air-conditioned transport",
        "English or French-speaking driver",
        "Stop at Volubilis, Moulay Idriss, and Meknes"
      ],
    
      notIncluded: [
        "Volubilis entry fee (€7)",
        "Meals and personal expenses"
      ],
    
      notSuitableFor: [
        "Wheelchair users",
        "People with walking difficulties (Volubilis is uneven terrain)"
      ],
    
      whatToBring: [
        "Comfortable walking shoes",
        "Sunscreen and hat",
        "Water and snacks",
        "Camera"
      ],
    
      goodToKnow: [
        "Volubilis ruins are not shaded — bring sun protection",
        "Tour runs with a small group in a shared vehicle",
        "Optional local guide at Volubilis (paid on-site)"
      ]
    },
    {
      id: 11,
      title: "Round-Trip Transportation from Tangier to Chefchaouen",
      description:
        "Enjoy a stress-free day trip from Tangier to the magical Blue City of Chefchaouen. Travel through the Rif Mountains in a comfortable vehicle and enjoy free time to explore at your own pace.",
        image: "/experiences/11.jpg",
      icon: Car,
      tag: "Transport",
      bestFor: "Independent travelers, photographers, couples",
      location: "Chefchaouen (from Tangier)",
      duration: "10 Hours",
      price: "€37.62",
      rating: 4.6,
      reviews: 28,
      cta: "Book Tangier Transfer",
      ctaLink:
        "https://www.getyourguide.com/tangier-l835/round-trip-transportation-from-tangier-to-chefchaouen-t838404/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
    
      highlights: [
        "Discover the enchanting Blue City of Chefchaouen",
        "Travel through the scenic Rif Mountains",
        "Enjoy flexible free time to explore and take photos",
        "Relax with round-trip transportation from Tangier",
        "Perfect for independent travelers"
      ],
    
      itinerary: [
        "Pickup from your hotel or port in Tangier",
        "Drive through Rif Mountain scenery (approx. 2.5 hours)",
        "Free time to explore Chefchaouen (3–4 hours)",
        "Optional lunch or guided visit (not included)",
        "Return transfer to Tangier"
      ],
    
      includes: [
        "Round-trip transportation Tangier ⇄ Chefchaouen",
        "Air-conditioned vehicle",
        "Multilingual driver (English, French, Spanish, Arabic)"
      ],
    
      notIncluded: [
        "Meals and drinks",
        "Guided tour in Chefchaouen",
        "Entrance fees (if any)"
      ],
    
      notSuitableFor: [
        "Wheelchair users"
      ],
    
      whatToBring: [
        "Comfortable shoes",
        "Camera",
        "Snacks and water",
        "Cash for souvenirs or meals"
      ],
    
      goodToKnow: [
        "Free cancellation up to 24 hours before departure",
        "Duration may vary slightly due to traffic or group timing",
        "Tour is transportation only — explore Chefchaouen independently"
      ]
    },
    {
      id: 12,
      title: "Tangier: Sunset, Tea, Camel Ride, Cape Spartel and Caves",
      description:
        "Experience the magic of Tangier Beach at sunset with a camel ride, local mint tea, and visits to iconic Cape Spartel and the Caves of Hercules. A perfect half-day adventure combining nature, history, and fun.",
        image: "/experiences/12.jpg",
      icon: Car,
      tag: "Adventure",
      bestFor: "Couples, families, sunset lovers",
      location: "Tangier",
      duration: "3 Hours",
      price: "€64.65",
      rating: 4.9,
      reviews: 211,
      cta: "Book Camel Sunset Tour",
      ctaLink:
        "https://www.getyourguide.com/tangier-l835/tangier-sunset-tea-camel-ride-cape-spartel-and-caves-t837962/?partner_id=G4BBMBG&currency=EUR&travel_agent=1&cmp=share_to_earn",
    
      highlights: [
        "Ride camels along the Atlantic beach at golden hour",
        "Sip traditional Moroccan mint tea in the open air",
        "Visit the mythic Hercules Caves",
        "See panoramic views from Cape Spartel",
        "Small-group experience with hotel pickup included"
      ],
    
      itinerary: [
        "Pickup from hotel or port in Tangier",
        "Visit Cape Spartel (photo stop)",
        "Explore Hercules Caves",
        "Camel ride on Achakar Beach at sunset",
        "Mint tea and break with ocean view",
        "Return to original pickup point"
      ],
    
      includes: [
        "Hotel pickup and drop-off",
        "Camel ride at sunset",
        "Mint tea",
        "Hercules Caves and Cape Spartel visit",
        "Professional driver/guide",
        "All taxes and service charges"
      ],
    
      notIncluded: [
        "Personal expenses",
        "Gratuities"
      ],
    
      notSuitableFor: [
        "Wheelchair users"
      ],
    
      whatToBring: [
        "Comfortable walking shoes",
        "Warm layers for sunset breeze",
        "Camera or smartphone",
        "Cash for tips or souvenirs"
      ],
    
      goodToKnow: [
        "Camels are well-treated and ride lasts ~15–20 minutes",
        "Tour is weather dependent; sunset visibility may vary",
        "Modest clothing recommended when visiting caves"
      ]
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
           onClick={() => router.push('/experiences')}
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