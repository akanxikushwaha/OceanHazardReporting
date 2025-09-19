import React, { useState } from 'react';
import { AlertTriangle, MapPin, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

const ReportManagement = () => {
  const [filter, setFilter] = useState('all');

  const reports = [
    {
      id: 1,
      hazardType: 'Rip Currents',
      location: 'Malibu Beach, CA',
      severity: 'high',
      status: 'pending',
      reporter: 'john_doe',
      time: '30 minutes ago',
      description: 'Strong rip currents near lifeguard station 3'
    },
    {
      id: 2,
      hazardType: 'Jellyfish',
      location: 'Santa Monica, CA',
      severity: 'medium',
      status: 'pending',
      reporter: 'beach_lover',
      time: '1 hour ago',
      description: 'Large jellyfish bloom observed'
    },
    {
      id: 3,
      hazardType: 'Red Tide',
      location: 'Huntington Beach, CA',
      severity: 'high',
      status: 'verified',
      reporter: 'marine_bio',
      time: '2 hours ago',
      description: 'Water discoloration and dead fish'
    }
  ];

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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-ocean-800">Report Management</h2>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 border border-ocean-200 rounded-lg text-sm"
        >
          <option value="all">All Reports</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="border border-ocean-100 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className={`h-5 w-5 ${getSeverityColor(report.severity)}`} />
                <h3 className="font-semibold text-ocean-800">{report.hazardType}</h3>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                {report.status}
              </div>
            </div>
            
            <div className="flex items-center text-sm text-ocean-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{report.location}</span>
              <span className="mx-2">•</span>
              <span>by {report.reporter}</span>
            </div>
            
            <p className="text-ocean-600 text-sm mb-3">{report.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-ocean-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>{report.time}</span>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-ocean-600 hover:bg-ocean-100 rounded">
                  <Eye className="h-4 w-4" />
                </button>
                {report.status === 'pending' && (
                  <>
                    <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                      <XCircle className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full bg-ocean-100 text-ocean-600 py-2 rounded-lg hover:bg-ocean-200 transition-colors mt-4 font-medium">
        Load More Reports
      </button>
    </div>
  );
};

export default ReportManagement;