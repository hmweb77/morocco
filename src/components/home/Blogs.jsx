"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Eye, BookOpen, Hash, TrendingUp } from 'lucide-react';

const LatestBlogSection = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "10 Common Scams in Morocco — And How to Avoid Them",
      excerpt: "From fake guides to rigged taxi meters, we break down real stories and how to stay protected.",
      image: "/rabat.png",
      tag: "Travel Safety",
      tagColor: "#EF4444",
      publishDate: "Dec 15, 2024",
      readTime: "8 min read",
      views: "12.4K",
      isNew: false,
      isTrending: true,
      slug: "/blog/morocco-scams-avoid"
    },
    {
      id: 2,
      title: "What to Pack for Morocco (And What to Leave Behind)",
      excerpt: "Layer like a pro, stay cool in the desert, and avoid cultural faux-pas with our minimalist packing guide.",
      image: "/rabat.png",
      tag: "Travel Tips",
      tagColor: "#10B981",
      publishDate: "Dec 12, 2024",
      readTime: "6 min read",
      views: "8.9K",
      isNew: true,
      isTrending: false,
      slug: "/blog/morocco-packing-guide"
    },
    {
      id: 3,
      title: "Marrakech vs. Fes: Which City Should You Visit First?",
      excerpt: "We compare culture, shopping, food, and vibe to help you pick your first Moroccan city experience.",
      image: "/rabat.png",
      tag: "City Guide",
      tagColor: "#6366F1",
      publishDate: "Dec 8, 2024",
      readTime: "10 min read",
      views: "15.2K",
      isNew: false,
      isTrending: true,
      slug: "/blog/marrakech-vs-fes"
    },
    {
      id: 4,
      title: "Solo Female Travel in Morocco: Is It Safe?",
      excerpt: "Straight talk from experienced women travelers, plus tips on where to go, what to wear, and how to stay empowered.",
      image: "/rabat.png",
      tag: "Solo Travel",
      tagColor: "#F59E0B",
      publishDate: "Dec 5, 2024",
      readTime: "12 min read",
      views: "22.1K",
      isNew: false,
      isTrending: true,
      slug: "/blog/solo-female-morocco-safety"
    }
  ];

  const popularTags = [
    { name: "Budget", count: 23, color: "#F59E0B" },
    { name: "Culture", count: 31, color: "#6366F1" },
    { name: "Food", count: 18, color: "#EF4444" },
    { name: "Safety", count: 15, color: "#10B981" },
    { name: "Desert", count: 12, color: "#8B5CF6" },
    { name: "FemaleTravel", count: 19, color: "#EC4899" }
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              className="group relative cursor-pointer"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border-2"
                style={{ 
                  borderColor: hoveredPost === post.id ? post.tagColor : 'rgba(156, 163, 175, 0.2)',
                  boxShadow: hoveredPost === post.id 
                    ? `0 20px 25px -5px ${post.tagColor}20, 0 10px 10px -5px ${post.tagColor}10` 
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {post.isNew && (
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg animate-pulse"
                      style={{ backgroundColor: '#10B981' }}
                    >
                      NEW
                    </span>
                  )}
                  {post.isTrending && (
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1"
                      style={{ backgroundColor: '#EF4444' }}
                    >
                      <TrendingUp className="w-3 h-3" />
                      TRENDING
                    </span>
                  )}
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
                      background: `linear-gradient(135deg, ${post.tagColor}15 0%, transparent 40%, rgba(0, 0, 0, 0.1) 100%)`
                    }}
                  />
                  
                  {/* Post Stats */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div 
                      className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-lg" 
                      style={{ color: post.tagColor }}
                    >
                      <Eye className="w-3 h-3" />
                      <span>{post.views}</span>
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
                      style={{ backgroundColor: post.tagColor }}
                    >
                      {post.tag}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{post.publishDate}</span>
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
                  <motion.div
                    className="flex items-center gap-2 font-semibold transition-all duration-300 cursor-pointer"
                    style={{ color: post.tagColor }}
                    whileHover={{ x: 5 }}
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>

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
          </div>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative p-8 rounded-3xl shadow-2xl text-center overflow-hidden bg-white border-2"
          style={{ borderColor: 'rgba(99, 102, 241, 0.3)' }}
        >
          {/* Background Gradient */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)'
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
              }}
            >
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-gray-900">
              Never Miss Our Latest Travel Tips
            </h3>
            
            <p className="text-lg mb-6 text-gray-600">
              Get insider secrets, safety updates, and destination guides delivered straight to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your.email@example.com"
                className="flex-1 px-4 py-3 rounded-xl border-2 text-gray-900 placeholder-gray-500 focus:outline-none transition-all duration-300"
                style={{ borderColor: 'rgba(99, 102, 241, 0.3)' }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-white"
                style={{ 
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                }}
              >
                Subscribe
              </motion.button>
            </div>

            <p className="text-sm mt-4 text-gray-500">
              Join 2,847+ travelers. No spam, unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestBlogSection;