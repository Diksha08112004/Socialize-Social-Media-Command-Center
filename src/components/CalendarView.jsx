import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Instagram, Twitter, Facebook, Linkedin, Youtube, Trash2, X, Clock, Filter, Search, Eye, Edit } from 'lucide-react';
import { PlatformBadge } from './PlatformBadge';

const platformIcons = {
  Instagram: Instagram,
  'Twitter/X': Twitter,
  Facebook: Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube
};

const platformColors = {
  Instagram: 'bg-gradient-to-r from-pink-500 to-purple-600',
  'Twitter/X': 'bg-gradient-to-r from-blue-400 to-blue-600',
  Facebook: 'bg-gradient-to-r from-blue-600 to-blue-800',
  LinkedIn: 'bg-gradient-to-r from-blue-700 to-blue-900',
  YouTube: 'bg-gradient-to-r from-red-500 to-red-700'
};

const CalendarView = ({ posts, onDeletePost }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesPlatform = filterPlatform === 'All' || post.platform === filterPlatform;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPlatform && matchesSearch;
  });

  // Group posts by date
  const postsByDate = filteredPosts.reduce((acc, post) => {
    if (!acc[post.date]) {
      acc[post.date] = [];
    }
    acc[post.date].push(post);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(postsByDate).sort((a, b) => new Date(a) - new Date(b));

  const platforms = ['All', 'Instagram', 'Twitter/X', 'Facebook', 'LinkedIn', 'YouTube'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
    if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
    return null;
  };

  const PlatformIcon = ({ platform }) => {
    const Icon = platformIcons[platform];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Calendar className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Timeline</h2>
            <p className="text-sm text-gray-500">{filteredPosts.length} scheduled posts</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200"
          />
        </div>

        {/* Platform Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          {platforms.map((platform) => (
            <motion.button
              key={platform}
              onClick={() => setFilterPlatform(platform)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                filterPlatform === platform
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {platform}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Timeline View */}
      <div className="relative max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {sortedDates.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-purple-600" />
            </div>
            <p className="text-gray-600 text-lg font-semibold mb-2">No posts found</p>
            <p className="text-gray-400 text-sm">Try adjusting your filters or create a new post!</p>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-pink-200 to-transparent" />
            
            <div className="space-y-6">
              {sortedDates.map((date, dateIndex) => {
                const relativeDate = getRelativeDate(date);
                const isToday = relativeDate === 'Today';
                const isPast = new Date(date) < new Date();
                
                return (
                  <motion.div
                    key={date}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dateIndex * 0.1 }}
                    className="relative"
                  >
                    {/* Date Badge */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`relative z-10 p-3 rounded-xl shadow-lg ${
                        isToday ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                        isPast ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                        'bg-gradient-to-br from-purple-500 to-pink-600'
                      }`}>
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{formatDate(date)}</h3>
                        {relativeDate && (
                          <p className={`text-sm font-medium ${
                            isToday ? 'text-green-600' :
                            isPast ? 'text-gray-500' :
                            'text-purple-600'
                          }`}>
                            {relativeDate}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Posts for this date */}
                    <div className="ml-16 space-y-3">
                      {postsByDate[date].map((post, postIndex) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: dateIndex * 0.1 + postIndex * 0.05 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          onClick={() => setSelectedPost(post)}
                          className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-lg"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <PlatformBadge platform={post.platform} size="sm" showLabel={false} />
                                <span className="text-xs font-semibold text-gray-500">{post.platform}</span>
                                {post.time && (
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    {post.time}
                                  </div>
                                )}
                              </div>
                              <h4 className="font-bold text-gray-800 mb-1 line-clamp-2">{post.title}</h4>
                              {post.content && (
                                <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                              )}
                            </div>
                            
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPost(post);
                                }}
                                className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeletePost(post.id);
                                }}
                                className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Post Details Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Post Details</h3>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Title
                  </label>
                  <p className="text-lg font-medium text-gray-800 mt-1">{selectedPost.title}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Date
                  </label>
                  <p className="text-lg font-medium text-gray-800 mt-1">
                    {formatDate(selectedPost.date)}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Platform
                  </label>
                  <div className="flex items-center gap-3 mt-2">
                    <div className={`p-3 rounded-xl ${platformColors[selectedPost.platform]} text-white`}>
                      <PlatformIcon platform={selectedPost.platform} />
                    </div>
                    <p className="text-lg font-medium text-gray-800">{selectedPost.platform}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onDeletePost(selectedPost.id);
                    setSelectedPost(null);
                  }}
                  className="flex-1 bg-red-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Post
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPost(null)}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors duration-200"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarView;
