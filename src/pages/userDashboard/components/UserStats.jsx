import React from 'react';
import { BarChart3, Users, CheckCircle, TrendingUp } from 'lucide-react';

const UserStats = () => {
  const stats = [
    {
      icon: BarChart3,
      label: 'Reports Submitted',
      value: '23',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: CheckCircle,
      label: 'Verified Reports',
      value: '18',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Users,
      label: 'Community Rank',
      value: '#247',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: TrendingUp,
      label: 'Accuracy Rating',
      value: '94%',
      color: 'text-ocean-600 bg-ocean-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-ocean-800 mb-4">Your Statistics</h2>
      
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-ocean-600">{stat.label}</div>
              <div className="text-xl font-bold text-ocean-800">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-ocean-50 rounded-lg">
        <h3 className="text-sm font-semibold text-ocean-800 mb-1">Achievement Unlocked!</h3>
        <p className="text-xs text-ocean-600">You've helped keep 156 beachgoers safe this month.</p>
      </div>
    </div>
  );
};

export default UserStats;