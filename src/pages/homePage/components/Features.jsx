import React from 'react';
import { Shield, Users, MapPin, BarChart3, Bell, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Real-time Hazard Reports',
      description: 'Submit and receive instant notifications about ocean hazards in your area, helping keep communities safe.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Users,
      title: 'Community-Driven',
      description: 'Join a global network of ocean enthusiasts, researchers, and coastal residents contributing to safety.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MapPin,
      title: 'Location-Based Alerts',
      description: 'Get precise, location-specific warnings for dangerous conditions in your favorite coastal areas.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Predictive Analytics',
      description: 'AI-powered analysis of community data helps predict and prevent dangerous ocean conditions.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Bell,
      title: 'Instant Notifications',
      description: 'Receive push notifications and SMS alerts for hazardous conditions in areas you care about.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Optimized for mobile use, allowing you to report hazards and check conditions on the go.',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <section id="features" className="py-16 bg-ocean-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-800 mb-4">
            Platform Features
          </h2>
          <p className="text-xl text-ocean-600 max-w-2xl mx-auto">
            Discover how our platform helps protect coastal communities worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-ocean-800 mb-3">{feature.title}</h3>
              <p className="text-ocean-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-ocean-600 text-white px-8 py-3 rounded-lg hover:bg-ocean-800 transition-colors font-medium mr-4">
            Get Started
          </button>
          <button className="border-2 border-ocean-600 text-ocean-600 px-8 py-3 rounded-lg hover:bg-ocean-600 hover:text-white transition-colors font-medium">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;