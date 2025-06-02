"use client"
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, DollarSign, Users, Camera, Mountain, Utensils, Star, Info, ArrowLeft, Car, 
  Ticket, UtensilsCrossed, CreditCard, Lightbulb, Droplets, Calendar, CheckCircle, XCircle, 
  Backpack, AlertCircle, Search, Filter, Grid, List, ChevronDown, SlidersHorizontal,
  Heart, Share2, ChevronLeft, ChevronRight, X, Compass, Map, TreePine, Waves, Building2
} from 'lucide-react';

// Experience data (using your existing data structure)
const experiencesData = [
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
      

// Filter categories
const categories = [
  { id: 'all', name: 'All Experiences', icon: Compass },
  { id: 'Desert', name: 'Desert Adventures', icon: Mountain },
  { id: 'Waterfalls', name: 'Nature & Waterfalls', icon: Droplets },
  { id: 'Coastal', name: 'Coastal Escapes', icon: Waves },
  { id: 'Religious', name: 'Cultural & Religious', icon: Building2 },
  { id: 'Mountain', name: 'Mountain Towns', icon: TreePine }
];

const tags = ['All', 'Adventure', 'Nature', 'Cultural', 'Coastal'];
const durations = ['All', 'Under 1 hour', '1-5 hours', '5-10 hours', '10+ hours'];
const difficulties = ['All', 'Easy', 'Moderate', 'Challenging'];
const priceRanges = ['All', 'Under €20', '€20-€50', '€50-€100', '€100+'];

// Reusable components from your original code
const FlipCard = ({ experience, index, onHover, isHovered }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const IconComponent = experience.icon;

  const getTagColor = (tag) => {
    const colors = {
      Cultural: '#3E8DC1',
      Adventure: '#A34128',
      Coastal: '#D38E63',
      Nature: '#70977B'
    };
    return colors[tag] || '#3E8DC1';
  };

  const toggleFlip = () => setIsFlipped(!isFlipped);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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
            
            {/* Top Actions */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div 
                className="px-3 py-1 rounded-full text-white text-sm font-medium shadow-lg"
                style={{ backgroundColor: getTagColor(experience.tag) }}
              >
                {experience.tag}
              </div>
              
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Rating */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm">
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

            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: '#70977B' }}>Difficulty:</span>
                <span style={{ color: '#2C2C2C' }}>{experience.difficulty}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: '#70977B' }}>Group Size:</span>
                <span style={{ color: '#2C2C2C' }}>{experience.groupSize}</span>
              </div>
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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(experience.ctaLink, '_blank')}
                className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                style={{ 
                  backgroundColor: '#A34128',
                  color: '#FDFDFD'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#D38E63';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#A34128';
                }}
              >
                {experience.cta}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleFlip}
                className="w-full py-2 px-4 rounded-lg font-medium border-2 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'transparent',
                  color: '#3E8DC1',
                  borderColor: '#3E8DC1'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(62, 141, 193, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <Info className="w-4 h-4" />
                More Details
              </motion.button>
            </div>
          </div>
        </div>

        {/* Back Side - Same as your original but simplified for space */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
          style={{ 
            backgroundColor: '#F3E7D2',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
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

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4" style={{ color: '#F9C75E' }} />
                    <h4 className="font-semibold text-sm" style={{ color: '#1C3F60' }}>Highlights</h4>
                  </div>
                  <ul className="text-xs space-y-1 ml-6" style={{ color: '#2C2C2C' }}>
                    {experience.highlights.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-4 border-t" style={{ borderColor: '#E8DCC6' }}>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(experience.ctaLink, '_blank')}
                  className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  style={{ 
                    backgroundColor: '#A34128',
                    color: '#FDFDFD'
                  }}
                >
                  {experience.cta}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleFlip}
                  className="w-full py-2 px-4 rounded-lg font-medium border-2 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#3E8DC1',
                    borderColor: '#3E8DC1'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(62, 141, 193, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Overview
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Experiences Page Component
const ExperiencesPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high', 'rating', 'duration'
  
  const itemsPerPage = 9;

  // Filter and search logic
  const filteredExperiences = useMemo(() => {
    let filtered = experiencesData.filter(exp => {
      // Search filter
      const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exp.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
      
      // Tag filter
      const matchesTag = selectedTag === 'All' || exp.tag === selectedTag;
      
      // Duration filter
      const matchesDuration = selectedDuration === 'All' || checkDurationMatch(exp.duration, selectedDuration);
      
      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'All' || exp.difficulty === selectedDifficulty;
      
      // Price filter
      const matchesPrice = selectedPriceRange === 'All' || checkPriceMatch(exp.price, selectedPriceRange);
      
      return matchesSearch && matchesCategory && matchesTag && matchesDuration && matchesDifficulty && matchesPrice;
    });

    // Sort logic
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => parseFloat(a.price.replace('€', '')) - parseFloat(b.price.replace('€', '')));
      case 'price-high':
        return filtered.sort((a, b) => parseFloat(b.price.replace('€', '')) - parseFloat(a.price.replace('€', '')));
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'duration':
        return filtered.sort((a, b) => getDurationHours(a.duration) - getDurationHours(b.duration));
      case 'popular':
      default:
        return filtered.sort((a, b) => b.reviews - a.reviews);
    }
  }, [searchTerm, selectedCategory, selectedTag, selectedDuration, selectedDifficulty, selectedPriceRange, sortBy]);

  // Helper functions
  const checkDurationMatch = (duration, filter) => {
    const hours = getDurationHours(duration);
    switch (filter) {
      case 'Under 1 hour': return hours < 1;
      case '1-5 hours': return hours >= 1 && hours <= 5;
      case '5-10 hours': return hours > 5 && hours <= 10;
      case '10+ hours': return hours > 10;
      default: return true;
    }
  };

  const checkPriceMatch = (price, filter) => {
    const amount = parseFloat(price.replace('€', ''));
    switch (filter) {
      case 'Under €20': return amount < 20;
      case '€20-€50': return amount >= 20 && amount <= 50;
      case '€50-€100': return amount > 50 && amount <= 100;
      case '€100+': return amount > 100;
      default: return true;
    }
  };

  const getDurationHours = (duration) => {
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Pagination
  const totalPages = Math.ceil(filteredExperiences.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExperiences = filteredExperiences.slice(startIndex, startIndex + itemsPerPage);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTag('All');
    setSelectedDuration('All');
    setSelectedDifficulty('All');
    setSelectedPriceRange('All');
    setCurrentPage(1);
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-serif text-white"
            >
              Discover Morocco's Best Experiences
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-8"
              style={{ color: '#F3E7D2' }}
            >
              From ancient medinas to desert sunsets, explore handpicked adventures that showcase the very best of Morocco's culture, nature, and hospitality.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-8 text-white"
            >
              <div className="text-center">
                <div className="text-3xl font-bold">{experiencesData.length}+</div>
                <div className="text-sm opacity-80">Unique Experiences</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.6</div>
                <div className="text-sm opacity-80">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm opacity-80">Happy Travelers</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="py-8 border-b" style={{ backgroundColor: '#F8F9FA', borderColor: '#E8DCC6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#70977B' }} />
              <input
                type="text"
                placeholder="Search experiences, locations, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-lg"
                style={{ 
                  borderColor: '#E8DCC6',
                  backgroundColor: '#FDFDFD',
                  color: '#1C3F60'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3E8DC1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(62, 141, 193, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E8DCC6';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Quick Category Filters */}
          {/* <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = selectedCategory === category.id;
                
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border-2 ${
                      isActive ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
                    }`}
                    style={{
                      backgroundColor: isActive ? '#3E8DC1' : '#FDFDFD',
                      color: isActive ? '#FDFDFD' : '#1C3F60',
                      borderColor: isActive ? '#3E8DC1' : '#E8DCC6'
                    }}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div> */}

          {/* Advanced Filters Toggle */}
          {/* <div className="flex flex-wrap items-center justify-between gap-4"> */}
            {/* <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300"
              style={{
                backgroundColor: showFilters ? '#3E8DC1' : '#FDFDFD',
                color: showFilters ? '#FDFDFD' : '#1C3F60',
                borderColor: '#E8DCC6'
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Advanced Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button> */}

            {/* <div className="flex items-center gap-4"> */}
              {/* View Mode Toggle */}
              {/* <div className="flex bg-white rounded-lg border" style={{ borderColor: '#E8DCC6' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600'
                  }`}
                  style={{
                    backgroundColor: viewMode === 'grid' ? '#3E8DC1' : 'transparent',
                    color: viewMode === 'grid' ? '#FDFDFD' : '#70977B'
                  }}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600'
                  }`}
                  style={{
                    backgroundColor: viewMode === 'list' ? '#3E8DC1' : 'transparent',
                    color: viewMode === 'list' ? '#FDFDFD' : '#70977B'
                  }}
                >
                  <List className="w-4 h-4" />
                </button>
              </div> */}

              {/* Sort Dropdown */}
              {/* <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border transition-all duration-300"
                style={{
                  backgroundColor: '#FDFDFD',
                  borderColor: '#E8DCC6',
                  color: '#1C3F60'
                }}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select> */}
            {/* </div>
          </div> */}

          {/* Advanced Filters Panel */}
          {/* <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 rounded-2xl"
                style={{ backgroundColor: '#FDFDFD', border: '2px solid #E8DCC6' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1C3F60' }}>
                      Experience Type
                    </label>
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: '#F8F9FA',
                        borderColor: '#E8DCC6',
                        color: '#1C3F60'
                      }}
                    >
                      {tags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>

         
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1C3F60' }}>
                      Duration
                    </label>
                    <select
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: '#F8F9FA',
                        borderColor: '#E8DCC6',
                        color: '#1C3F60'
                      }}
                    >
                      {durations.map(duration => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </select>
                  </div>

            
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1C3F60' }}>
                      Difficulty Level
                    </label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: '#F8F9FA',
                        borderColor: '#E8DCC6',
                        color: '#1C3F60'
                      }}
                    >
                      {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty}>{difficulty}</option>
                      ))}
                    </select>
                  </div>

            
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1C3F60' }}>
                      Price Range
                    </label>
                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: '#F8F9FA',
                        borderColor: '#E8DCC6',
                        color: '#1C3F60'
                      }}
                    >
                      {priceRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

           
                <div className="mt-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearAllFilters}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg border transition-all duration-300"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#A34128',
                      borderColor: '#A34128'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#A34128';
                      e.target.style.color = '#FDFDFD';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#A34128';
                    }}
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence> */}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#1C3F60' }}>
                  {filteredExperiences.length === 0 ? 'No experiences found' : 
                   `${filteredExperiences.length} Experience${filteredExperiences.length !== 1 ? 's' : ''} Found`}
                </h2>
                {searchTerm && (
                  <p className="text-sm mt-1" style={{ color: '#70977B' }}>
                    Showing results for "{searchTerm}"
                  </p>
                )}
              </div>
              
              {filteredExperiences.length > 0 && (
                <div className="text-sm" style={{ color: '#70977B' }}>
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </div>
          </div>

          {/* Experiences Grid/List */}
          {filteredExperiences.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="mb-6">
                <Search className="w-16 h-16 mx-auto" style={{ color: '#E8DCC6' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#1C3F60' }}>
                No experiences match your criteria
              </h3>
              <p className="text-lg mb-6" style={{ color: '#70977B' }}>
                Try adjusting your filters or search terms to find more options.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearAllFilters}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                style={{ backgroundColor: '#3E8DC1', color: '#FDFDFD' }}
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  <AnimatePresence mode="popLayout">
                    {currentExperiences.map((experience, index) => (
                      <FlipCard
                        key={experience.id}
                        experience={experience}
                        index={index}
                        onHover={setHoveredCard}
                        isHovered={hoveredCard === experience.id}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="space-y-6 mb-12">
                  <AnimatePresence mode="popLayout">
                    {currentExperiences.map((experience, index) => (
                      <motion.div
                        key={experience.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        style={{ backgroundColor: '#F3E7D2' }}
                      >
                        {/* Image */}
                        <div className="md:w-1/3">
                          <div className="relative h-64 md:h-48 rounded-xl overflow-hidden">
                            <img
                              src={experience.image}
                              alt={experience.title}
                              className="w-full h-full object-cover"
                            />
                            <div 
                              className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium"
                              style={{ backgroundColor: '#3E8DC1' }}
                            >
                              {experience.tag}
                            </div>
                            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                              <Star className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
                              <span className="text-white text-sm">{experience.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="md:w-2/3 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-2 font-serif" style={{ color: '#1C3F60' }}>
                              {experience.title}
                            </h3>
                            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#2C2C2C' }}>
                              {experience.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 mb-4 text-sm">
                              <div className="flex items-center gap-1" style={{ color: '#70977B' }}>
                                <MapPin className="w-4 h-4" />
                                <span>{experience.location}</span>
                              </div>
                              <div className="flex items-center gap-1" style={{ color: '#70977B' }}>
                                <Clock className="w-4 h-4" />
                                <span>{experience.duration}</span>
                              </div>
                              <div className="flex items-center gap-1" style={{ color: '#70977B' }}>
                                <Users className="w-4 h-4" />
                                <span>{experience.groupSize}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-2xl font-bold" style={{ color: '#A34128' }}>
                                {experience.price}
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-current" style={{ color: '#F9C75E' }} />
                                <span className="text-sm font-medium" style={{ color: '#1C3F60' }}>
                                  {experience.rating} ({experience.reviews.toLocaleString()})
                                </span>
                              </div>
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => window.open(experience.ctaLink, '_blank')}
                              className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                              style={{ backgroundColor: '#A34128', color: '#FDFDFD' }}
                            >
                              Book Now
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ 
                      backgroundColor: currentPage === 1 ? '#E8DCC6' : '#3E8DC1',
                      color: currentPage === 1 ? '#70977B' : '#FDFDFD'
                    }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(page)}
                      className="w-10 h-10 rounded-lg font-medium transition-all duration-300"
                      style={{
                        backgroundColor: currentPage === page ? '#3E8DC1' : '#F8F9FA',
                        color: currentPage === page ? '#FDFDFD' : '#1C3F60',
                        border: currentPage === page ? 'none' : '1px solid #E8DCC6'
                      }}
                    >
                      {page}
                    </motion.button>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ 
                      backgroundColor: currentPage === totalPages ? '#E8DCC6' : '#3E8DC1',
                      color: currentPage === totalPages ? '#70977B' : '#FDFDFD'
                    }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#1C3F60' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-serif text-white">
              Ready to Start Your Moroccan Adventure?
            </h2>
            
            <p className="text-lg sm:text-xl mb-8 leading-relaxed" style={{ color: '#F3E7D2' }}>
              Join thousands of travelers who have discovered the magic of Morocco through our carefully curated experiences. 
              Your perfect adventure is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#A34128', color: '#FDFDFD' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#D38E63';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#A34128';
                }}
              >
                Plan My Trip
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
                Get Travel Guide
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencesPage;