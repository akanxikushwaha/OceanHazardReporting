import React from 'react';
import { ExternalLink, Calendar, User } from 'lucide-react';

const NewsHeadlines = () => {
  const news = [
    {
      id: 1,
      title: 'New Rip Current Detection Technology Saves Lives on California Beaches',
      source: 'Ocean Safety News',
      date: 'December 15, 2024',
      excerpt: 'Advanced AI-powered detection systems have been deployed across 15 beaches, reducing drowning incidents by 40%.',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Marine Biologists Report Unusual Jellyfish Migration Patterns',
      source: 'Marine Research Today',
      date: 'December 14, 2024',
      excerpt: 'Climate change effects are causing unprecedented shifts in jellyfish populations along the East Coast.',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Research'
    },
    {
      id: 3,
      title: 'Crowdsourced Data Helps Predict Red Tide Events with 95% Accuracy',
      source: 'Environmental Science Weekly',
      date: 'December 13, 2024',
      excerpt: 'Community-submitted water quality data has revolutionized our ability to forecast harmful algal blooms.',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Environment'
    },
    {
      id: 4,
      title: 'New Mobile App Alerts Beachgoers to Dangerous Surf Conditions',
      source: 'Coastal Safety Tribune',
      date: 'December 12, 2024',
      excerpt: 'Real-time notifications from our platform help prevent accidents during high-risk surf conditions.',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Safety'
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Technology':
        return 'bg-blue-100 text-blue-800';
      case 'Research':
        return 'bg-purple-100 text-purple-800';
      case 'Environment':
        return 'bg-green-100 text-green-800';
      case 'Safety':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-800 mb-4">
            Coastline Hazards News
          </h2>
          <p className="text-xl text-ocean-600 max-w-2xl mx-auto">
            Latest updates and research on ocean safety and hazard prediction
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {news.map((article) => (
            <article key={article.id} className="bg-ocean-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-ocean-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-ocean-800 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-ocean-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-ocean-400">
                    <User className="h-4 w-4 mr-1" />
                    <span>{article.source}</span>
                  </div>
                  <button className="flex items-center space-x-1 text-ocean-600 hover:text-ocean-800 transition-colors">
                    <span className="text-sm font-medium">Read More</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="bg-ocean-600 text-white px-8 py-3 rounded-lg hover:bg-ocean-800 transition-colors font-medium">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsHeadlines;