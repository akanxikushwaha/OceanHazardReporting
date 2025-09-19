import React from 'react';
import { MapPin, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const UserReports = () => {
  const reports = [
    {
      id: 1,
      hazardType: 'Rip Currents',
      location: 'Malibu Beach, CA',
      severity: 'high',
      status: 'verified',
      date: '2024-12-15',
      time: '10:30 AM',
      description: 'Strong rip currents observed near lifeguard station 3'
    },
    {
      id: 2,
      hazardType: 'Jellyfish',
      location: 'Santa Monica Pier, CA',
      severity: 'medium',
      status: 'pending',
      date: '2024-12-14',
      time: '3:45 PM',
      description: 'Multiple jellyfish sightings reported by swimmers'
    },
    {
      id: 3,
      hazardType: 'High Surf',
      location: 'Huntington Beach, CA',
      severity: 'low',
      status: 'rejected',
      date: '2024-12-13',
      time: '7:20 AM',
      description: 'Waves higher than usual, but within normal range'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-ocean-800 mb-6">Your Reports</h2>
      
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="border border-ocean-100 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className={`h-5 w-5 ${getSeverityColor(report.severity)}`} />
                <h3 className="font-semibold text-ocean-800">{report.hazardType}</h3>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(report.status)}`}>
                {getStatusIcon(report.status)}
                <span className="capitalize">{report.status}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-ocean-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{report.location}</span>
            </div>
            
            <p className="text-ocean-600 text-sm mb-3">{report.description}</p>
            
            <div className="flex items-center justify-between text-xs text-ocean-400">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{report.date} at {report.time}</span>
              </div>
              <button className="text-ocean-600 hover:text-ocean-800 font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <button className="text-ocean-600 hover:text-ocean-800 font-medium">
          View All Reports
        </button>
      </div>
    </div>
  );
};

export default UserReports;