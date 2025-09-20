import React from 'react';
import { Calendar, MapPin, AlertCircle, Eye } from 'lucide-react';

const ReportsHistory = () => {
  const reports = [
    {
      id: 1,
      date: '2025-01-28',
      location: 'Santa Monica Beach, CA',
      type: 'High Waves',
      urgency: 'high',
      status: 'verified',
      description: 'Waves reaching 12-15 feet, dangerous for swimmers'
    },
    {
      id: 2,
      date: '2025-01-25',
      location: 'Malibu Point, CA',
      type: 'Rip Current',
      urgency: 'critical',
      status: 'verified',
      description: 'Strong rip current observed near the pier'
    },
    {
      id: 3,
      date: '2025-01-22',
      location: 'Venice Beach, CA',
      type: 'Debris',
      urgency: 'medium',
      status: 'pending',
      description: 'Large amounts of seaweed and debris on shore'
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return '#183642';
      case 'high': return '#313D5A';
      case 'medium': return '#73628A';
      default: return '#CBC5EA';
    }
  };

  const getStatusColor = (status) => {
    return status === 'verified' ? '#73628A' : '#CBC5EA';
  };

  return (
    <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#313D5A' }}>
        Your Reports History
      </h2>

      <div className="space-y-4">
        {reports.map(report => (
          <div 
            key={report.id}
            className="p-4 rounded-lg border-l-4 transition-all hover:shadow-md"
            style={{ 
              backgroundColor: '#EAEAEA',
              borderLeftColor: getUrgencyColor(report.urgency)
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-3">
                <span 
                  className="px-2 py-1 text-xs font-medium rounded uppercase"
                  style={{ 
                    backgroundColor: getUrgencyColor(report.urgency),
                    color: '#FFFFFF'
                  }}
                >
                  {report.urgency}
                </span>
                <span 
                  className="px-2 py-1 text-xs font-medium rounded"
                  style={{ 
                    backgroundColor: getStatusColor(report.status),
                    color: '#FFFFFF'
                  }}
                >
                  {report.status}
                </span>
              </div>
              <button className="p-1 hover:bg-gray-200 rounded">
                <Eye className="h-4 w-4" style={{ color: '#73628A' }} />
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2" style={{ color: '#313D5A' }}>
              {report.type}
            </h3>

            <p className="mb-3" style={{ color: '#313D5A' }}>
              {report.description}
            </p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center" style={{ color: '#73628A' }}>
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(report.date).toLocaleDateString()}
              </div>
              <div className="flex items-center" style={{ color: '#73628A' }}>
                <MapPin className="h-4 w-4 mr-1" />
                {report.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsHistory;