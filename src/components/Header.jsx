import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Sparkles, TrendingUp, Zap } from 'lucide-react';

const Header = () => {
  return (
    <div className="relative">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative"
      >
        {/* Logo and Icons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="relative"
          >
            <div className="p-5 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl shadow-2xl">
              <Share2 className="w-10 h-10 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-xl -z-10"
            />
          </motion.div>
        </div>
        
        {/* Main Title with Animated Gradient */}
        <motion.h1 
          className="text-6xl md:text-7xl font-black mb-4 relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            Socialize
          </span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className="text-2xl text-gray-700 font-semibold mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Social Media Command Center
        </motion.p>
        
        {/* Feature Tags */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-3 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Lightning Fast</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full border border-purple-200">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Boost Engagement</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full border border-pink-200">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-700">AI Powered</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;
