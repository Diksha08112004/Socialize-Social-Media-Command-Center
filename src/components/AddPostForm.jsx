import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Instagram, Twitter, Facebook, Linkedin, Youtube, Clock, Calendar as CalendarIcon, FileText, CheckCircle2 } from 'lucide-react';
import { PlatformIcon } from './PlatformBadge';

const platformIcons = {
  Instagram: Instagram,
  'Twitter/X': Twitter,
  Facebook: Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube
};

const platformColors = {
  Instagram: 'from-pink-500 to-purple-600',
  'Twitter/X': 'from-blue-400 to-blue-600',
  Facebook: 'from-blue-600 to-blue-800',
  LinkedIn: 'from-blue-700 to-blue-900',
  YouTube: 'from-red-500 to-red-700'
};

const AddPostForm = ({ onAddPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    time: '',
    platform: 'Instagram'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && formData.date && formData.platform) {
      setIsSubmitting(true);
      await onAddPost(formData);
      setFormData({ title: '', content: '', date: '', time: '', platform: 'Instagram' });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const SelectedPlatformIcon = platformIcons[formData.platform];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Plus className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800">Create Post</h2>
        </div>
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200"
            >
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Posted!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Post Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <FileText className="w-4 h-4" />
            Post Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What's your post about?"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 font-medium"
            required
          />
        </motion.div>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label htmlFor="content" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <FileText className="w-4 h-4" />
            Post Content (Optional)
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post content here..."
            rows="3"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 resize-none"
          />
        </motion.div>

        {/* Date and Time Row */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <CalendarIcon className="w-4 h-4" />
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label htmlFor="time" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Clock className="w-4 h-4" />
              Time (Optional)
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
            />
          </motion.div>
        </div>

        {/* Platform Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Platform
          </label>
          <div className="grid grid-cols-5 gap-3">
            {Object.keys(platformIcons).map((platform) => {
              const Icon = platformIcons[platform];
              const isSelected = formData.platform === platform;
              return (
                <motion.button
                  key={platform}
                  type="button"
                  onClick={() => setFormData({ ...formData, platform })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? `border-${platform === 'Instagram' ? 'pink' : platform === 'YouTube' ? 'red' : 'blue'}-500 bg-gradient-to-br ${platformColors[platform]} shadow-lg`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 mx-auto ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                  {isSelected && (
                    <motion.div
                      layoutId="selected"
                      className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Selected: <span className="font-semibold">{formData.platform}</span></p>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 mt-6 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Plus className="w-5 h-5" />
              </motion.div>
              Scheduling...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Schedule Post
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default AddPostForm;
