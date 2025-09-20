import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const QuickStats = () => {
  const stats = [
    {
      icon: FileText,
      label: 'Your Reports',
      value: '12',
      change: '+3 this week'
    },
    {
      icon: CheckCircle,
      label: 'Verified',
      value: '9',
      change: '75% accuracy'
    },
    {
      icon: AlertTriangle,
      label: 'Active Alerts',
      value: '4',
      change: 'In your area'
    },
    {
      icon: Clock,
      label: 'Last Report',
      value: '2 days',
      change: 'ago'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div 
            key={index}
            className="p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#73628A' }}>
                  {stat.label}
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: '#313D5A' }}>
                  {stat.value}
                </p>
                <p className="text-xs mt-1" style={{ color: '#73628A' }}>
                  {stat.change}
                </p>
              </div>
              <IconComponent className="h-8 w-8" style={{ color: '#CBC5EA' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;