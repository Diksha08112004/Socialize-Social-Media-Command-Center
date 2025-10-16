import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase/config';

const POSTS_COLLECTION = 'posts';

// Add a new post to Firestore
export const addPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
      ...postData,
      createdAt: new Date().toISOString()
    });
    return { id: docRef.id, ...postData };
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};

// Get all posts from Firestore
export const getPosts = async () => {
  try {
    const q = query(collection(db, POSTS_COLLECTION), orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
};

// Delete a post from Firestore
export const deletePost = async (postId) => {
  try {
    await deleteDoc(doc(db, POSTS_COLLECTION, postId));
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
