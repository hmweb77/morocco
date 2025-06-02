"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid,
  List,
  Eye,
  Heart,
  Share2,
  ArrowRight
} from 'lucide-react';

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const blogsPerPage = 6;

  // Sample blog data - replace with your actual data
  const blogs = [
    {
      id: 1,
      title: "Hidden Gems of Marrakech: Beyond the Main Square",
      excerpt: "Discover the secret corners of Marrakech that most tourists never see. From hidden riads to local artisan workshops...",
      content: "Full blog content here...",
      author: "Youssef El Mansouri",
      publishDate: "2024-05-15",
      readTime: "8 min read",
      category: "Travel Tips",
      tags: ["Marrakech", "Hidden Gems", "Local Culture"],
      image: "/experiences/11.jpg",
      views: 1240,
      likes: 89,
      featured: true
    },
    {
      id: 2,
      title: "The Art of Moroccan Hospitality: Tea Culture Explained",
      excerpt: "Understanding the deep-rooted traditions of Moroccan mint tea and the rituals that bring families together...",
      content: "Full blog content here...",
      author: "Aicha Benali",
      publishDate: "2024-05-12",
      readTime: "6 min read",
      category: "Culture",
      tags: ["Tea Culture", "Traditions", "Hospitality"],
      image: "/experiences/11.jpg",
      views: 980,
      likes: 67,
      featured: false
    },
    {
      id: 3,
      title: "Sahara Desert Adventures: What to Pack and Expect",
      excerpt: "Your complete guide to desert camping, camel trekking, and stargazing in the magnificent Sahara...",
      content: "Full blog content here...",
      author: "Omar Tahiri",
      publishDate: "2024-05-10",
      readTime: "12 min read",
      category: "Adventure",
      tags: ["Sahara", "Desert", "Adventure", "Packing"],
      image: "/experiences/11.jpg",
      views: 1560,
      likes: 124,
      featured: true
    },
    {
      id: 4,
      title: "Atlas Mountains Hiking: Best Trails for Every Level",
      excerpt: "From gentle walks to challenging peaks, explore the diverse hiking opportunities in Morocco's Atlas Mountains...",
      content: "Full blog content here...",
      author: "Omar Tahiri",
      publishDate: "2024-05-08",
      readTime: "10 min read",
      category: "Adventure",
      tags: ["Atlas Mountains", "Hiking", "Trekking"],
      image: "/experiences/11.jpg",
      views: 892,
      likes: 76,
      featured: false
    },
    {
      id: 5,
      title: "Moroccan Cuisine: A Journey Through Regional Flavors",
      excerpt: "Explore the diverse culinary landscape of Morocco, from coastal seafood to mountain tagines...",
      content: "Full blog content here...",
      author: "Aicha Benali",
      publishDate: "2024-05-05",
      readTime: "9 min read",
      category: "Food & Cuisine",
      tags: ["Cuisine", "Food", "Regional", "Cooking"],
      image: "/experiences/11.jpg",
      views: 1120,
      likes: 95,
      featured: false
    },
    {
      id: 6,
      title: "Fez Medina: Navigating the World's Largest Car-Free Urban Area",
      excerpt: "Master the art of exploring Fez's ancient medina with insider tips and cultural insights...",
      content: "Full blog content here...",
      author: "Youssef El Mansouri",
      publishDate: "2024-05-03",
      readTime: "7 min read",
      category: "Travel Tips",
      tags: ["Fez", "Medina", "Navigation", "Culture"],
      image: "/experiences/11.jpg",
      views: 756,
      likes: 54,
      featured: false
    },
    {
      id: 7,
      title: "Moroccan Festivals: When Culture Comes Alive",
      excerpt: "Experience Morocco's vibrant festival calendar and learn when to visit for the most authentic celebrations...",
      content: "Full blog content here...",
      author: "Aicha Benali",
      publishDate: "2024-05-01",
      readTime: "11 min read",
      category: "Culture",
      tags: ["Festivals", "Celebrations", "Culture", "Events"],
      image: "/experiences/11.jpg",
      views: 654,
      likes: 48,
      featured: false
    },
    {
      id: 8,
      title: "Sustainable Tourism in Morocco: Travel Responsibly",
      excerpt: "How to minimize your environmental impact while maximizing your cultural experience in Morocco...",
      content: "Full blog content here...",
      author: "Omar Tahiri",
      publishDate: "2024-04-28",
      readTime: "8 min read",
      category: "Sustainable Travel",
      tags: ["Sustainability", "Responsible Travel", "Environment"],
      image: "/experiences/11.jpg",
      views: 445,
      likes: 39,
      featured: false
    }
  ];

  const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

  // Filter blogs based on search and category
  useEffect(() => {
    let filtered = blogs;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#1C3F5F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Story-Driven & Immersive
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Discover Morocco Through Local Eyes
From hidden medina secrets to Sahara stargazing, explore authentic stories and insider guides that transform travelers into storytellers of Morocco's timeless magic.
            </p>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">25+</div>
                <div className="text-gray-400 text-lg">Authentic Stories</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">4.8</div>
                <div className="text-gray-400 text-lg">Reader Rating</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">100K+</div>
                <div className="text-gray-400 text-lg">Monthly Readers</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-6 text-gray-600">
            Showing {currentBlogs.length} of {filteredBlogs.length} articles
            {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </div>
      </section>

      {/* Blog Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPage}-${viewMode}-${selectedCategory}-${searchTerm}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={viewMode === 'grid' 
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
                : "space-y-8"
              }
            >
              {currentBlogs.map((blog) => (
                <motion.article
                  key={blog.id}
                  variants={itemVariants}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  }`}
                  whileHover={{ y: -5 }}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'md:w-1/3' : 'w-full h-48'
                  }`}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {blog.featured && (
                      <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      {blog.readTime}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${viewMode === 'list' ? 'md:w-2/3 flex flex-col justify-between' : ''}`}>
                    <div>
                      {/* Category Tag */}
                      <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                        {blog.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {blog.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(blog.publishDate)}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {blog.views}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {blog.likes}
                        </div>
                      </div>
                      
                      <button className="flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredBlogs.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse different categories.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex space-x-1">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  const isCurrentPage = page === currentPage;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                        isCurrentPage
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            {/* Page Info */}
            <div className="text-center text-gray-500 mt-4">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPage;