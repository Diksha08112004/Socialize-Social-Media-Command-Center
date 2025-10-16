# Socialize – Your Social Media Command Center

A modern, beautiful web application for managing and scheduling social media posts across multiple platforms.

## Features

- **Add New Posts**: Create posts with title, date, and platform selection
- **Calendar View**: Visual timeline of all scheduled posts
- **Multi-Platform Support**: Instagram, Twitter/X, Facebook, LinkedIn, YouTube
- **Post Details**: Click any post to view full details
- **Firebase Database**: Cloud-based persistent storage - data never gets lost!
- **Responsive Design**: Works perfectly on desktop and mobile
- **Smooth Animations**: Powered by Framer Motion
- **Modern UI**: Clean, minimal design with Tailwind CSS

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Firebase Firestore** - Cloud database for persistent storage

## Installation

1. Install dependencies:
```bash
npm install
```

2. **Set up Firebase** (Required):
   - Follow the detailed guide in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   - Create a Firebase project
   - Enable Firestore Database
   - Add your Firebase config to `src/firebase/config.js`

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Usage

1. **Add a Post**: Fill in the post title, select a date, choose a platform, and click "Add Post"
2. **View Posts**: See all scheduled posts in the Calendar View section
3. **Post Details**: Click on any post to see full details in a modal
4. **Delete Posts**: Remove posts using the trash icon or from the details modal

## Project Details

- **Category**: Creator Economy & Monetization
- **Interest Score**: 52.0
- **Project ID**: 2436b375-f248-46ba-a219-fae428a1949e

## License

MIT License
