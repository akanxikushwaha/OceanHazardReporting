import React from 'react';
import { TrendingUp, TrendingDown, Activity, MapPin } from 'lucide-react';

const Analytics = () => {
  const metrics = [
    {
      label: 'Reports This Month',
      value: '1,847',
      change: '+23%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      label: 'Response Time',
      value: '4.2 min',
      change: '-15%',
      trend: 'down',
      icon: Activity
    },
    {
      label: 'User Engagement',
      value: '78%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      label: 'Coverage Areas',
      value: '342',
      change: '+12',
      trend: 'up',
      icon: MapPin
    }
  ];

  const topLocations = [
    { name: 'California Coast', reports: 456, percentage: 85 },
    { name: 'Florida Keys', reports: 234, percentage: 65 },
    { name: 'Oregon Coast', reports: 189, percentage: 55 },
    { name: 'North Carolina', reports: 167, percentage: 48 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-ocean-800 mb-6">Analytics</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-ocean-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-5 w-5 text-ocean-600" />
                <span className={`text-xs font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-lg font-bold text-ocean-800">{metric.value}</div>
              <div className="text-sm text-ocean-600">{metric.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold text-ocean-800 mb-3">Top Reporting Locations</h3>
          <div className="space-y-3">
            {topLocations.map((location, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-ocean-800">{location.name}</span>
                    <span className="text-sm text-ocean-600">{location.reports}</span>
                  </div>
                  <div className="w-full bg-ocean-100 rounded-full h-2">
                    <div 
                      className="bg-ocean-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${location.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;