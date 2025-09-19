import React from 'react';
import { BarChart3, MapPin, Clock, Users } from 'lucide-react';

const Statistics = () => {
  const stats = [
    {
      icon: BarChart3,
      value: '1,247,892',
      label: 'Total Reports Submitted',
      change: '+12.5% this month',
      color: 'text-green-600'
    },
    {
      icon: Users,
      value: '25,847',
      label: 'Active Contributors',
      change: '+8.3% this week',
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      value: '342',
      label: 'Coastal Areas Monitored',
      change: '+2 new areas',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      value: '4.2 mins',
      label: 'Average Response Time',
      change: '-15% improvement',
      color: 'text-ocean-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-800 mb-4">
            Platform Statistics
          </h2>
          <p className="text-xl text-ocean-600 max-w-2xl mx-auto">
            Real-time data showing the impact of our global community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-ocean-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-ocean-100 rounded-lg mb-4">
                <stat.icon className="h-6 w-6 text-ocean-600" />
              </div>
              <div className="text-3xl font-bold text-ocean-800 mb-2">{stat.value}</div>
              <div className="text-ocean-600 font-medium mb-2">{stat.label}</div>
              <div className={`text-sm ${stat.color} font-medium`}>{stat.change}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;