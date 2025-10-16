import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Youtube } from 'lucide-react';

const platformConfig = {
  Instagram: {
    icon: Instagram,
    gradient: 'from-pink-500 via-purple-500 to-orange-500',
    bg: 'bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500',
    lightBg: 'bg-pink-50',
    border: 'border-pink-200',
    text: 'text-pink-700'
  },
  'Twitter/X': {
    icon: Twitter,
    gradient: 'from-blue-400 to-blue-600',
    bg: 'bg-gradient-to-br from-blue-400 to-blue-600',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700'
  },
  Facebook: {
    icon: Facebook,
    gradient: 'from-blue-600 to-blue-800',
    bg: 'bg-gradient-to-br from-blue-600 to-blue-800',
    lightBg: 'bg-blue-50',
    border: 'border-blue-300',
    text: 'text-blue-800'
  },
  LinkedIn: {
    icon: Linkedin,
    gradient: 'from-blue-700 to-blue-900',
    bg: 'bg-gradient-to-br from-blue-700 to-blue-900',
    lightBg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-900'
  },
  YouTube: {
    icon: Youtube,
    gradient: 'from-red-500 to-red-700',
    bg: 'bg-gradient-to-br from-red-500 to-red-700',
    lightBg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700'
  }
};

export const PlatformIcon = ({ platform, className = "w-5 h-5" }) => {
  const config = platformConfig[platform];
  if (!config) return null;
  const Icon = config.icon;
  return <Icon className={className} />;
};

export const PlatformBadge = ({ platform, size = 'md', showLabel = true }) => {
  const config = platformConfig[platform];
  if (!config) return null;

  const Icon = config.icon;
  const sizes = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  if (!showLabel) {
    return (
      <div className={`${sizes[size]} ${config.bg} rounded-xl text-white shadow-lg`}>
        <Icon className={iconSizes[size]} />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-2 ${config.lightBg} rounded-lg border ${config.border}`}>
      <div className={`p-1.5 ${config.bg} rounded-lg text-white`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <span className={`text-sm font-semibold ${config.text}`}>{platform}</span>
    </div>
  );
};

export default PlatformBadge;
