import React from 'react';
import { MapPin, AlertTriangle, Clock } from 'lucide-react';

const NearbyAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'High Risk',
      location: 'Venice Beach, CA',
      hazard: 'Dangerous Rip Currents',
      distance: '2.3 miles',
      time: '1 hour ago',
      severity: 'high'
    },
    {
      id: 2,
      type: 'Medium Risk',
      location: 'Manhattan Beach, CA',
      hazard: 'Jellyfish Activity',
      distance: '5.7 miles',
      time: '3 hours ago',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'Low Risk',
      location: 'Redondo Beach, CA',
      hazard: 'High Surf Advisory',
      distance: '8.1 miles',
      time: '6 hours ago',
      severity: 'low'
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-ocean-800 mb-4">Nearby Alerts</h2>
      
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="border border-ocean-100 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                {alert.type}
              </div>
              <div className="flex items-center text-xs text-ocean-400">
                <Clock className="h-3 w-3 mr-1" />
                {alert.time}
              </div>
            </div>
            
            <h3 className="font-semibold text-ocean-800 mb-1">{alert.hazard}</h3>
            
            <div className="flex items-center text-sm text-ocean-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{alert.location}</span>
              <span className="text-ocean-400 ml-2">• {alert.distance}</span>
            </div>
            
            <button className="text-ocean-600 hover:text-ocean-800 text-sm font-medium">
              View on Map
            </button>
          </div>
        ))}
      </div>
      
      <button className="w-full bg-ocean-100 text-ocean-600 py-2 rounded-lg hover:bg-ocean-200 transition-colors mt-4 font-medium">
        View All Nearby Alerts
      </button>
    </div>
  );
};

export default NearbyAlerts;