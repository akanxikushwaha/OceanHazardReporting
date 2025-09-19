import React from 'react';
import { AlertTriangle, MapPin, Clock, TrendingUp } from 'lucide-react';

const ActiveAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'High Risk',
      location: 'California Coast',
      hazard: 'Dangerous Rip Currents',
      time: '2 hours ago',
      severity: 'high',
      reports: 47
    },
    {
      id: 2,
      type: 'Medium Risk',
      location: 'Florida Keys',
      hazard: 'Jellyfish Bloom',
      time: '4 hours ago',
      severity: 'medium',
      reports: 23
    },
    {
      id: 3,
      type: 'Low Risk',
      location: 'Oregon Coast',
      hazard: 'High Surf Advisory',
      time: '6 hours ago',
      severity: 'low',
      reports: 15
    },
    {
      id: 4,
      type: 'High Risk',
      location: 'North Carolina',
      hazard: 'Red Tide Warning',
      time: '8 hours ago',
      severity: 'high',
      reports: 62
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section id="alerts" className="py-16 bg-ocean-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-800 mb-4">
            Active Hazard Alerts
          </h2>
          <p className="text-xl text-ocean-600 max-w-2xl mx-auto">
            Real-time alerts from our community of ocean monitors
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(alert.severity)}`}>
                  {alert.type}
                </div>
                <div className="flex items-center text-sm text-ocean-400">
                  <Clock className="h-4 w-4 mr-1" />
                  {alert.time}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-ocean-800 mb-2">{alert.hazard}</h3>
              
              <div className="flex items-center text-ocean-600 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{alert.location}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-ocean-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>{alert.reports} reports</span>
                </div>
                <button className="bg-ocean-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-800 transition-colors text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="bg-ocean-600 text-white px-8 py-3 rounded-lg hover:bg-ocean-800 transition-colors font-medium">
            View All Alerts
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActiveAlerts;