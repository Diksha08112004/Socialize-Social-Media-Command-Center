import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Loader2, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import AddPostForm from './components/AddPostForm';
import CalendarView from './components/CalendarView';
import Header from './components/Header';
import { addPost as addPostToFirebase, getPosts, deletePost as deletePostFromFirebase } from './services/postService';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load posts from Firebase on mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to connect to Firebase. Check console for details.');
      const savedPosts = localStorage.getItem('socialPosts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
    } finally {
      setLoading(false);
    }
  };

  // Backup to localStorage
  useEffect(() => {
    if (!loading && posts.length > 0) {
      localStorage.setItem('socialPosts', JSON.stringify(posts));
    }
  }, [posts, loading]);

  const addPost = async (newPost) => {
    try {
      const addedPost = await addPostToFirebase(newPost);
      setPosts([...posts, addedPost]);
      setError(null);
    } catch (err) {
      console.error('Error adding post:', err);
      const post = {
        ...newPost,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setPosts([...posts, post]);
      setError('Post saved locally. Firebase connection issue.');
    }
  };

  const deletePost = async (postId) => {
    try {
      await deletePostFromFirebase(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        {/* Firebase Status */}
        {!error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-green-50 border-2 border-green-200 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-green-800 font-semibold mb-1">☁️ Firebase Connected!</p>
                <p className="text-green-700 text-sm mb-2">
                  Your posts are saved to the cloud. View your database:
                </p>
                <a 
                  href="https://console.firebase.google.com/project/social-media-command-cen-af2be/firestore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
                >
                  🔥 View Database
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4"
          >
            <p className="text-red-600 font-medium">{error}</p>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Add New Post Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AddPostForm onAddPost={addPost} />
          </motion.div>

          {/* Calendar View Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CalendarView posts={posts} onDeletePost={deletePost} />
          </motion.div>
        </div>

        {/* AI Suggestion Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">AI Insights</h2>
            </div>
            <p className="text-gray-600 text-lg">
              💡 <span className="font-semibold">AI Suggestion:</span> Best posting time coming soon! 
              Our AI will analyze your audience engagement patterns to recommend optimal posting times.
            </p>
          </div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <BarChart3 className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 opacity-70" />
            </div>
            <p className="text-blue-100 text-sm font-medium mb-1">Total Posts</p>
            <p className="text-4xl font-black">{posts.length}</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Clock className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 opacity-70" />
            </div>
            <p className="text-green-100 text-sm font-medium mb-1">Upcoming</p>
            <p className="text-4xl font-black">
              {posts.filter(p => new Date(p.date) >= new Date()).length}
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 opacity-70" />
            </div>
            <p className="text-purple-100 text-sm font-medium mb-1">Past Posts</p>
            <p className="text-4xl font-black">
              {posts.filter(p => new Date(p.date) < new Date()).length}
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 opacity-70" />
            </div>
            <p className="text-pink-100 text-sm font-medium mb-1">This Week</p>
            <p className="text-4xl font-black">
              {posts.filter(p => {
                const postDate = new Date(p.date);
                const today = new Date();
                const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                return postDate >= today && postDate <= weekFromNow;
              }).length}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
