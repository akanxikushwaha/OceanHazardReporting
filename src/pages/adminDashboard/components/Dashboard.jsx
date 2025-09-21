import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  MapPin,
  Users,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Verified Reports',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: CheckCircle,
      color: '#73628A'
    },
    {
      title: 'Active Alerts',
      value: '23',
      change: '-8%',
      trend: 'down',
      icon: AlertTriangle,
      color: '#313D5A'
    },
    {
      title: 'Most Affected State',
      value: 'Odisha',
      change: '156 reports',
      trend: 'neutral',
      icon: MapPin,
      color: '#183642'
    },
    {
      title: 'Active Users',
      value: '8,492',
      change: '+24%',
      trend: 'up',
      icon: Users,
      color: '#73628A'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'High Priority Report',
      location: 'Odisha, India',
      time: '2 minutes ago',
      status: 'urgent',
      description: 'Tsunami warning reported by multiple users'
    },
    {
      id: 2,
      type: 'Report Verified',
      location: 'West Bengal, India',
      time: '15 minutes ago',
      status: 'verified',
      description: 'Rip current warning confirmed by authorities'
    },
    {
      id: 3,
      type: 'New Report',
      location: 'Odisha, India',
      time: '32 minutes ago',
      status: 'pending',
      description: 'Unusual wave patterns observed'
    },
    {
      id: 4,
      type: 'Alert Sent',
      location: 'Andhra, Pradesh',
      time: '1 hour ago',
      status: 'completed',
      description: 'Emergency alert dispatched to local authorities'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return '#183642';
      case 'verified': return '#73628A';
      case 'pending': return '#CBC5EA';
      case 'completed': return '#73628A';
      default: return '#EAEAEA';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#313D5A' }}>Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with ocean hazard reports.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
                <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: '#313D5A' }}>{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b" style={{ borderColor: '#EAEAEA' }}>
          <h2 className="text-xl font-bold" style={{ color: '#313D5A' }}>Recent Activity</h2>
          <p className="text-gray-600 text-sm mt-1">Latest updates and reports from the platform</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div 
                  className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: getStatusColor(activity.status) }}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold" style={{ color: '#313D5A' }}>{activity.type}</h4>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                  <p className="text-xs" style={{ color: '#73628A' }}>
                    <MapPin size={12} className="inline mr-1" />
                    {activity.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;