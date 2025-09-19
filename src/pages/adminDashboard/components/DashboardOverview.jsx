import React from 'react';
import { Users, AlertTriangle, CheckCircle, TrendingUp, Eye, Clock, MapPin } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      icon: AlertTriangle,
      label: 'Pending Reports',
      value: '47',
      change: '+12 today',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: CheckCircle,
      label: 'Verified Reports',
      value: '1,234',
      change: '+89 this week',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Users,
      label: 'Active Users',
      value: '25,847',
      change: '+234 this week',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Eye,
      label: 'Active Alerts',
      value: '12',
      change: '3 critical',
      color: 'text-red-600 bg-red-100'
    }
  ];

  const recentActivity = [
    {
      icon: AlertTriangle,
      text: 'New high-risk report submitted for Malibu Beach',
      time: '2 minutes ago',
      type: 'report'
    },
    {
      icon: CheckCircle,
      text: 'Report verified: Rip currents at Santa Monica',
      time: '15 minutes ago',
      type: 'verification'
    },
    {
      icon: Users,
      text: 'New user registered: marine_biologist_2024',
      time: '1 hour ago',
      type: 'user'
    },
    {
      icon: MapPin,
      text: 'Alert issued for Venice Beach - Strong currents',
      time: '2 hours ago',
      type: 'alert'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ocean-800 mb-2">Admin Dashboard</h1>
        <p className="text-ocean-600">Monitor and manage the OceanGuard platform</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <button className="text-ocean-400 hover:text-ocean-600">
                <Eye className="h-4 w-4" />
              </button>
            </div>
            <div className="text-2xl font-bold text-ocean-800 mb-1">{stat.value}</div>
            <div className="text-sm text-ocean-600 mb-2">{stat.label}</div>
            <div className="text-xs text-green-600 font-medium">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-ocean-800">Recent Activity</h2>
          <button className="text-ocean-600 hover:text-ocean-800 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-ocean-50 rounded-lg">
              <div className="text-ocean-600">
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-ocean-800">{activity.text}</p>
              </div>
              <div className="flex items-center text-xs text-ocean-400">
                <Clock className="h-3 w-3 mr-1" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;