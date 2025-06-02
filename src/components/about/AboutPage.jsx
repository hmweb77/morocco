"use client"
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  Star, 
  Heart, 
  Compass,
  Camera,
  Mountain,
  Sun,
  Moon,
  Wind,
  ArrowDown,
  Quote
} from 'lucide-react';

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const [currentChapter, setCurrentChapter] = useState(0);
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0]);

  const chapters = [
    {
      id: 1,
      title: "The Beginning",
      subtitle: "2009 - A Dream Takes Shape",
      icon: Sun,
      story: "In the bustling souks of Marrakech, where the scent of spices mingles with ancient stories, our founder Youssef discovered his calling. Watching tourists struggle to connect with the real Morocco, he envisioned something different.",
      image: "/experiences/11.jpg",
      color: "from-orange-400 to-red-500"
    },
    {
      id: 2,
      title: "The Journey",
      subtitle: "Building Bridges",
      icon: Compass,
      story: "What started as one passionate guide sharing hidden gems became a movement. We gathered storytellers, artisans, and cultural guardians who believed in authentic connection over tourist attractions.",
      image: "/experiences/11.jpg",
      color: "from-blue-400 to-purple-500"
    },
    {
      id: 3,
      title: "The Growth",
      subtitle: "Trust Through Experience",
      icon: Mountain,
      story: "From the Atlas Mountains to the Sahara dunes, we've guided thousands on transformative journeys. Each traveler's story became part of our legacy, each smile a testament to genuine cultural exchange.",
      image: "/experiences/11.jpg",
      color: "from-green-400 to-teal-500"
    },
    {
      id: 4,
      title: "Today",
      subtitle: "Your Story Awaits",
      icon: Star,
      story: "Today, we're not just a travel company – we're cultural ambassadors, memory makers, and bridge builders. Your Moroccan adventure isn't just a trip; it's a chapter in both our stories.",
      image: "/experiences/11.jpg",
      color: "from-purple-400 to-pink-500"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Authentic Soul",
      description: "We don't just show you Morocco – we let you feel its heartbeat."
    },
    {
      icon: Users,
      title: "Local Wisdom",
      description: "Our guides aren't just experts; they're storytellers of their homeland."
    },
    {
      icon: Compass,
      title: "Purposeful Travel",
      description: "Every journey creates positive impact for communities we visit."
    }
  ];

  const journeySteps = [
    { step: "Discovery", description: "We listen to your travel dreams" },
    { step: "Design", description: "We craft your perfect Moroccan story" },
    { step: "Journey", description: "You experience Morocco authentically" },
    { step: "Memory", description: "You carry Morocco in your heart forever" }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section - Immersive Landing */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <motion.div 
          className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"
          style={{ y }}
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              Our Story
            </h1>
            <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
              A journey of passion, purpose, and authentic connections
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="animate-bounce"
          >
            <ArrowDown className="h-8 w-8 text-orange-500 mx-auto" />
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 text-orange-300"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Camera className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-32 text-red-300"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Compass className="h-16 w-16" />
        </motion.div>
      </section>

      {/* Timeline Story Chapters */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-5xl font-bold text-center mb-20 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Chapters of Our Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 to-red-500 rounded-full" />

            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                className={`relative mb-32 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex items-center`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                  <motion.div 
                    className={`bg-gradient-to-br ${chapter.color} p-8 rounded-2xl shadow-2xl text-white`}
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <chapter.icon className="h-8 w-8 mr-3" />
                      <span className="text-sm font-semibold opacity-90">{chapter.subtitle}</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{chapter.title}</h3>
                    <p className="text-lg leading-relaxed opacity-95">{chapter.story}</p>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-orange-400 z-10 lg:relative lg:left-auto lg:transform-none lg:w-16 lg:h-16 lg:flex lg:items-center lg:justify-center">
                  <span className="hidden lg:block text-orange-600 font-bold text-xl">{chapter.id}</span>
                </div>

                {/* Image */}
                <div className={`lg:w-5/12 mt-8 lg:mt-0 ${index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16'}`}>
                  <motion.img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Journey Map */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Your Journey With Us
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {index + 1}
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-orange-400 to-transparent" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-orange-300">{step.step}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values as Story Elements */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-5xl font-bold text-center mb-16 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Drives Us
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group perspective-1000"
                initial={{ opacity: 0, rotateY: 45 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl transform-gpu transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2">
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial as Story Conclusion */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <div className="w-full h-full bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Quote className="h-16 w-16 mx-auto mb-8 opacity-50" />
            <blockquote className="text-3xl font-light leading-relaxed mb-8 italic">
              "Morocco changed me in ways I never expected. Moroccan Advisor didn't just show me places – they showed me how travel can transform your soul."
            </blockquote>
            <cite className="text-xl opacity-90">— Sarah, Canada</cite>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - The Next Chapter */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Ready to Write Your Chapter?</h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Every great story needs its next chapter. Let Morocco be yours.
            </p>
            
            <motion.button
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-6 rounded-full text-xl font-semibold shadow-2xl hover:shadow-3xl transform transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;