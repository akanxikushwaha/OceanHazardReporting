import React, { useState } from 'react';
import { AlertTriangle, MapPin, Users, Send, Plus } from 'lucide-react';

const AlertSystem = () => {
  const [showCreateAlert, setShowCreateAlert] = useState(false);

  const activeAlerts = [
    {
      id: 1,
      title: 'Dangerous Rip Currents - Malibu Beach',
      severity: 'high',
      location: 'Malibu, CA',
      affected: 2847,
      created: '2 hours ago'
    },
    {
      id: 2,
      title: 'Jellyfish Bloom Advisory',
      severity: 'medium',
      location: 'Santa Monica, CA',
      affected: 1205,
      created: '4 hours ago'
    },
    {
      id: 3,
      title: 'High Surf Warning',
      severity: 'low',
      location: 'Venice Beach, CA',
      affected: 856,
      created: '6 hours ago'
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-ocean-800">Alert System</h2>
        <button 
          onClick={() => setShowCreateAlert(true)}
          className="bg-ocean-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-800 transition-colors flex items-center space-x-1 text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Create Alert</span>
        </button>
      </div>

      <div className="space-y-4">
        {activeAlerts.map((alert) => (
          <div key={alert.id} className="border border-ocean-100 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                {alert.severity.toUpperCase()}
              </div>
              <button className="text-ocean-600 hover:text-ocean-800 text-sm">
                Edit
              </button>
            </div>
            
            <h3 className="font-semibold text-ocean-800 mb-2">{alert.title}</h3>
            
            <div className="flex items-center text-sm text-ocean-600 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{alert.location}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-ocean-400">
                <Users className="h-4 w-4 mr-1" />
                <span>{alert.affected.toLocaleString()} users notified</span>
              </div>
              <span className="text-ocean-400">{alert.created}</span>
            </div>
            
            <div className="flex justify-end space-x-2 mt-3">
              <button className="px-3 py-1 bg-ocean-100 text-ocean-600 rounded text-sm hover:bg-ocean-200 transition-colors">
                Extend
              </button>
              <button className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 transition-colors">
                Deactivate
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreateAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-ocean-800 mb-4">Create New Alert</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ocean-600 mb-1">Alert Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400"
                  placeholder="Enter alert title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ocean-600 mb-1">Location</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ocean-600 mb-1">Severity</label>
                <select className="w-full px-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400">
                  <option>Low Risk</option>
                  <option>Medium Risk</option>
                  <option>High Risk</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowCreateAlert(false)}
                  className="px-4 py-2 text-ocean-600 border border-ocean-200 rounded-lg hover:bg-ocean-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-ocean-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-800 transition-colors flex items-center space-x-1"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Alert</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertSystem;