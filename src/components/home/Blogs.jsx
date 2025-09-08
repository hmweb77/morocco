"use client"
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Eye, BookOpen, Hash, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogsData.js'; // Import from the centralized data

const LatestBlogSection = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

  // Get 6 random blog posts
  const randomBlogPosts = useMemo(() => {
    const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, []);

  const popularTags = [
    { name: "Budget", count: 23, color: "#F59E0B" },
    { name: "Culture", count: 31, color: "#6366F1" },
    { name: "Food", count: 18, color: "#EF4444" },
    { name: "Safety", count: 15, color: "#10B981" },
    { name: "Desert", count: 12, color: "#8B5CF6" },
    { name: "FemaleTravel", count: 19, color: "#EC4899" }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTagColor = (tag) => {
    const colors = {
      'Travel Safety': '#EF4444',
      'Travel Tips': '#10B981',
      'City Guides': '#6366F1',
      'Food & Drink': '#F59E0B',
      'Adventure Travel': '#8B5CF6',
      'Culture & Festivals': '#EC4899',
      'Luxury Travel': '#1F2937',
      'Culture & Wellness': '#70977B',
      'Family Travel': '#D97706',
      'Shopping & Souks': '#059669'
    };
    return colors[tag] || '#6B7280';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              linear-gradient(45deg, transparent 40%, rgba(245, 101, 101, 0.05) 50%, transparent 60%)
            `
          }} 
        />
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
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              color: '#6366F1'
            }}
          >
            <BookOpen className="w-4 h-4" style={{ color: '#10B981' }} />
            <span>Expert Travel Insights</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-serif"
            style={{ color: '#1F2937' }}
          >
            Travel Smarter with Local Secrets & Real Advice
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed"
            style={{ color: '#4B5563' }}
          >
            Whether you're planning your first Moroccan adventure or looking for off-the-beaten-path gems, our expert blog posts are here to guide you — one click at a time.
          </motion.p>
        </div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {randomBlogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              className="group relative cursor-pointer"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border-2"
                style={{ 
                  borderColor: hoveredPost === post.id ? getTagColor(post.category) : 'rgba(156, 163, 175, 0.2)',
                  boxShadow: hoveredPost === post.id 
                    ? `0 20px 25px -5px ${getTagColor(post.category)}20, 0 10px 10px -5px ${getTagColor(post.category)}10` 
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {post.featured && (
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg animate-pulse"
                      style={{ backgroundColor: '#10B981' }}
                    >
                      FEATURED
                    </span>
                  )}
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1"
                    style={{ backgroundColor: '#EF4444' }}
                  >
                    <TrendingUp className="w-3 h-3" />
                    HOT
                  </span>
                </div>

                {/* Featured Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7 }}
                  />
                  
                  {/* Modern Overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${getTagColor(post.category)}15 0%, transparent 40%, rgba(0, 0, 0, 0.1) 100%)`
                    }}
                  />
                  
                  {/* Post Stats */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div 
                      className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-lg" 
                      style={{ color: getTagColor(post.category) }}
                    >
                      <Eye className="w-3 h-3" />
                      <span>{(post.views / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-lg text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Tag & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-lg"
                      style={{ backgroundColor: getTagColor(post.category) }}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishDate)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold mb-4 font-serif leading-tight text-gray-900 group-hover:text-opacity-90 transition-all duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm md:text-base leading-relaxed mb-6 text-gray-600">
                    {post.excerpt}
                  </p>

                  {/* CTA */}
                  <Link href={`/blogs/${post.slug}`}>
                    <motion.div
                      className="flex items-center gap-2 font-semibold transition-all duration-300 cursor-pointer"
                      style={{ color: getTagColor(post.category) }}
                      whileHover={{ x: 5 }}
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        {/* Popular Tags Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="p-8 rounded-3xl bg-white shadow-xl border" style={{ borderColor: 'rgba(156, 163, 175, 0.2)' }}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Hash className="w-5 h-5" style={{ color: '#6366F1' }} />
              <h3 className="text-xl font-bold font-serif text-gray-900">
                Explore Topics by Tag
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {popularTags.map((tag, index) => (
                <motion.button
                  key={tag.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    backgroundColor: `${tag.color}15`,
                    color: tag.color,
                    border: `2px solid ${tag.color}30`
                  }}
                >
                  #{tag.name} ({tag.count})
                </motion.button>
              ))}
            </div>
           <Link href="/blogs">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl text-white"
              style={{ 
                background: 'linear-gradient(135deg, #34D399 0%, #10B981 50%, #059669 100%)'
              }}
            >
              Browse All Blog Posts
            </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestBlogSection;