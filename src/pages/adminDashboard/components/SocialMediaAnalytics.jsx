import React, { useState, useEffect } from 'react';
import { supabase } from '../../homePage/signUp/supabaseClient';
import { X } from "lucide-react"; // close icon

import { 
  TrendingUp, 
  MessageSquare, 
  Heart, 
  Share2, 
  Eye,
  Hash,
  BarChart3,
  Calendar
} from 'lucide-react';

const SocialMediaAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    const fetchImages = () => {
      const files = [
        "likes_vs_retweets.png",
        "replies_distribution.png",
        "severity_distribution.png",
        "top10_tweets_by_engagement.png",
        "tweets_over_time.png",
      ];

      const urls = files.map((file) => {
        const { data } = supabase.storage
          .from("ReportImages")
          .getPublicUrl(`analyticsGraphs/${file}`);
        return { name: file, url: data.publicUrl };
      });

      setImages(urls);
    };

    fetchImages();
  }, []);

  const analytics = {
    totalPosts: 2847,
    totalEngagement: 18436,
    avgSentiment: 0.65,
    reachCount: 125789
  };

  const hazardPosts = [
    {
      id: 1,
      platform: 'Twitter',
      content: 'Massive waves hitting the Santa Monica pier! Everyone stay safe! #tsunami #santamonica',
      author: '@surfer_dude_ca',
      engagement: { likes: 234, shares: 89, comments: 45 },
      sentiment: 'negative',
      hazardType: 'tsunami',
      timestamp: '2 hours ago',
      verified: true
    },
    {
      id: 2,
      platform: 'Instagram',
      content: 'Beautiful but dangerous rip currents at Miami Beach today. Lifeguards on high alert.',
      author: '@miami_beach_watch',
      engagement: { likes: 567, shares: 123, comments: 78 },
      sentiment: 'neutral',
      hazardType: 'rip current',
      timestamp: '4 hours ago',
      verified: true
    },
    {
      id: 3,
      platform: 'Facebook',
      content: 'Storm surge warning for Galveston area. Residents advised to evacuate low-lying areas.',
      author: 'Galveston Weather Service',
      engagement: { likes: 892, shares: 456, comments: 167 },
      sentiment: 'negative',
      hazardType: 'storm surge',
      timestamp: '6 hours ago',
      verified: true
    }
  ];

  const trendingHashtags = [
    { tag: '#tsunami', count: 1240, change: '+23%' },
    { tag: '#ripcurrent', count: 867, change: '+15%' },
    { tag: '#stormsurge', count: 543, change: '+8%' },
    { tag: '#oceansafety', count: 421, change: '+31%' },
    { tag: '#coastalwarning', count: 298, change: '+12%' }
  ];

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '#73628A';
      case 'neutral': return '#CBC5EA';
      case 'negative': return '#183642';
      default: return '#EAEAEA';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Twitter': return '#313D5A';
      case 'Instagram': return '#73628A';
      case 'Facebook': return '#183642';
      default: return '#EAEAEA';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#313D5A' }}>Social Media Analytics</h1>
        <p className="text-gray-600 mt-2">Monitor Twitter activity and public engagement on Hazard related posts.</p>
      </div>
      <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center" style={{ color: '#313D5A' }}>
        Analytics Graphs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.name}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:scale-105 transition-transform"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.url}
              alt={img.name}
              className="w-full h-64 object-contain bg-gray-50"
            />
            <div className="p-2 text-center text-sm text-gray-600">
              {img.name.replace(".png", "").replace(/_/g, " ")}
            </div>
          </div>
        ))}
      </div>
    </div>
          {/* Fullscreen Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage.url}
            alt={selectedImage.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Time Range Selector */}
      {/* <div className="mb-6">
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === range
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              style={{ 
                backgroundColor: timeRange === range ? '#73628A' : 'transparent',
                border: '1px solid #CBC5EA'
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div> */}

      {/* Analytics Overview */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#73628A20' }}>
              <MessageSquare size={24} style={{ color: '#73628A' }} />
            </div>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold" style={{ color: '#313D5A' }}>
            {analytics.totalPosts.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm mt-1">Hazard-related Posts</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#313D5A20' }}>
              <Heart size={24} style={{ color: '#313D5A' }} />
            </div>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold" style={{ color: '#313D5A' }}>
            {analytics.totalEngagement.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm mt-1">Total Engagement</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#18364220' }}>
              <BarChart3 size={24} style={{ color: '#183642' }} />
            </div>
            <span className="text-sm text-gray-600">65% Positive</span>
          </div>
          <h3 className="text-2xl font-bold" style={{ color: '#313D5A' }}>
            {(analytics.avgSentiment * 100).toFixed(0)}%
          </h3>
          <p className="text-gray-600 text-sm mt-1">Average Sentiment</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#CBC5EA20' }}>
              <Eye size={24} style={{ color: '#73628A' }} />
            </div>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold" style={{ color: '#313D5A' }}>
            {analytics.reachCount.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm mt-1">Total Reach</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Hazard Posts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b" style={{ borderColor: '#EAEAEA' }}>
              <h2 className="text-xl font-bold" style={{ color: '#313D5A' }}>Recent Hazard-Related Posts</h2>
              <p className="text-gray-600 text-sm mt-1">Latest social media activity about ocean hazards</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {hazardPosts.map((post) => (
                  <div key={post.id} className="border-b pb-6 last:border-b-0" style={{ borderColor: '#EAEAEA' }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getPlatformColor(post.platform) }}
                        ></div>
                        <span className="font-semibold text-sm" style={{ color: '#313D5A' }}>
                          {post.author}
                        </span>
                        <span className="text-xs text-gray-500">{post.platform}</span>
                        {post.verified && (
                          <span className="text-xs px-2 py-1 rounded text-white" style={{ backgroundColor: '#73628A' }}>
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{post.timestamp}</span>
                    </div>
                    
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Heart size={14} className="mr-1" />
                          {post.engagement.likes}
                        </div>
                        <div className="flex items-center">
                          <Share2 size={14} className="mr-1" />
                          {post.engagement.shares}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare size={14} className="mr-1" />
                          {post.engagement.comments}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span 
                          className="px-2 py-1 rounded text-xs text-white capitalize"
                          style={{ backgroundColor: getSentimentColor(post.sentiment) }}
                        >
                          {post.sentiment}
                        </span>
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#EAEAEA', color: '#313D5A' }}>
                          {post.hazardType}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        

          

          {/* Sentiment Distribution */}
          {/* <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b" style={{ borderColor: '#EAEAEA' }}>
              <h2 className="text-xl font-bold" style={{ color: '#313D5A' }}>Sentiment Distribution</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded mr-3"
                      style={{ backgroundColor: '#73628A' }}
                    ></div>
                    <span className="text-sm">Positive</span>
                  </div>
                  <span className="font-semibold" style={{ color: '#313D5A' }}>45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded mr-3"
                      style={{ backgroundColor: '#CBC5EA' }}
                    ></div>
                    <span className="text-sm">Neutral</span>
                  </div>
                  <span className="font-semibold" style={{ color: '#313D5A' }}>35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded mr-3"
                      style={{ backgroundColor: '#183642' }}
                    ></div>
                    <span className="text-sm">Negative</span>
                  </div>
                  <span className="font-semibold" style={{ color: '#313D5A' }}>20%</span>
                </div>
              </div>
            </div>
          </div> */}

            {/* Trending Hashtags 
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="p-6 border-b" style={{ borderColor: '#EAEAEA' }}>
              <h2 className="text-xl font-bold" style={{ color: '#313D5A' }}>
                <Hash size={20} className="inline mr-2" />
                Trending Hashtags
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {trendingHashtags.map((hashtag, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold" style={{ color: '#313D5A' }}>{hashtag.tag}</p>
                      <p className="text-sm text-gray-600">{hashtag.count.toLocaleString()} posts</p>
                    </div>
                    <span className="text-xs text-green-600 font-medium">{hashtag.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div> 
          


        </div>*/}
       </div>
    // </div>
  );
};

export default SocialMediaAnalytics;