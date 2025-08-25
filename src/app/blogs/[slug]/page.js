// src/app/blogs/[slug]/page.js
"use client";
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Eye, 
  Heart, 
  Share2, 
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import MoroccoResponsiveNavbar from '@/components/Navbar';
import EnhancedMoroccoFooter from '@/components/Footer';
import { blogPosts } from '@/lib/blogsData.js';

// Markdown-style content renderer (simple version)
const renderMarkdownContent = (content) => {
  const lines = content.split('\n');
  const elements = [];

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('# ')) {
      elements.push(
        <h1 key={index} className="text-4xl font-bold mb-6 text-gray-900 font-serif">
          {trimmedLine.substring(2)}
        </h1>
      );
    } else if (trimmedLine.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="text-3xl font-bold mt-8 mb-4 text-gray-900 font-serif">
          {trimmedLine.substring(3)}
        </h2>
      );
    } else if (trimmedLine.startsWith('### ')) {
      elements.push(
        <h3 key={index} className="text-2xl font-bold mt-6 mb-3 text-gray-900">
          {trimmedLine.substring(4)}
        </h3>
      );
    } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      elements.push(
        <p key={index} className="text-lg font-bold mb-4 text-gray-800">
          {trimmedLine.substring(2, trimmedLine.length - 2)}
        </p>
      );
    } else if (trimmedLine.startsWith('- ')) {
      elements.push(
        <li key={index} className="mb-2 text-gray-700 leading-relaxed list-disc ml-6">
          {trimmedLine.substring(2)}
        </li>
      );
    } else if (trimmedLine === '') {
      // Skip empty lines
    } else {
      elements.push(
        <p key={index} className="mb-4 text-gray-700 leading-relaxed text-lg">
          {trimmedLine}
        </p>
      );
    }
  });

  return elements;
};

export default function BlogPostPage() {
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  // Find the blog post by slug
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts = blogPosts.filter(p => 
    post.relatedPosts?.includes(p.id) || 
    (p.category === post.category && p.id !== post.id)
  ).slice(0, 3);

  const handleShare = (platform) => {
    const url = encodeURIComponent(shareUrl);
    const title = encodeURIComponent(post.title);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank');
    }
    setShowShareMenu(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTagColor = (tag) => {
    const colors = {
      Safety: '#EF4444',
      'Travel Tips': '#10B981',
      Culture: '#6366F1',
      Food: '#F59E0B',
      Adventure: '#8B5CF6',
      Budget: '#EC4899',
      Morocco: '#1F2937'
    };
    return colors[tag] || '#6B7280';
  };

  return (
    <>
      <MoroccoResponsiveNavbar />
      
      <article className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-800 overflow-hidden">
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 h-full flex flex-col justify-end pb-12">
            {/* Breadcrumb */}
            <motion.nav 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/blogs" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">{post.category}</span>
              </div>
            </motion.nav>

            {/* Category Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <span 
                className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: getTagColor(post.category) }}
              >
                {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-white/90"
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Article Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="prose prose-lg max-w-none"
              >
                {/* Article Actions */}
                <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm border">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isLiked 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                    
                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                      
                      {showShareMenu && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border p-4 min-w-48 z-10"
                        >
                          <div className="space-y-2">
                            <button
                              onClick={() => handleShare('facebook')}
                              className="flex items-center gap-3 w-full p-2 rounded hover:bg-gray-50 transition-colors"
                            >
                              <Facebook className="w-5 h-5 text-blue-600" />
                              <span>Facebook</span>
                            </button>
                            <button
                              onClick={() => handleShare('twitter')}
                              className="flex items-center gap-3 w-full p-2 rounded hover:bg-gray-50 transition-colors"
                            >
                              <Twitter className="w-5 h-5 text-blue-400" />
                              <span>Twitter</span>
                            </button>
                            <button
                              onClick={() => handleShare('linkedin')}
                              className="flex items-center gap-3 w-full p-2 rounded hover:bg-gray-50 transition-colors"
                            >
                              <Linkedin className="w-5 h-5 text-blue-700" />
                              <span>LinkedIn</span>
                            </button>
                            <button
                              onClick={() => handleShare('copy')}
                              className="flex items-center gap-3 w-full p-2 rounded hover:bg-gray-50 transition-colors"
                            >
                              <LinkIcon className="w-5 h-5 text-gray-600" />
                              <span>Copy Link</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  <Link 
                    href="/blogs"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Blog</span>
                  </Link>
                </div>

                {/* Article Content */}
                <div className="bg-white rounded-lg p-8 shadow-sm border">
                  {renderMarkdownContent(post.content)}
                </div>

                {/* Tags */}
                <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                        style={{ 
                          backgroundColor: `${getTagColor(tag)}20`,
                          color: getTagColor(tag)
                        }}
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* Author Info */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white p-6 rounded-lg shadow-sm border"
                >
                  <h3 className="font-bold text-gray-900 mb-4">About the Author</h3>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{post.author}</h4>
                    <p className="text-sm text-gray-600">
                      Travel writer and Morocco expert with over 10 years of experience exploring North Africa.
                    </p>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white p-6 rounded-lg shadow-sm border"
                >
                  <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reading Time:</span>
                      <span className="font-medium">{post.readTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-medium">{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Published:</span>
                      <span className="font-medium">{formatDate(post.publishDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{post.category}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-center mb-12 text-gray-900"
              >
                Related Articles
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {relatedPost.image && (
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <span 
                        className="text-xs font-medium text-white px-2 py-1 rounded"
                        style={{ backgroundColor: getTagColor(relatedPost.category) }}
                      >
                        {relatedPost.category}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-3 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <Link 
                        href={`/blogs/${relatedPost.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
      
      <EnhancedMoroccoFooter />
    </>
  );
}