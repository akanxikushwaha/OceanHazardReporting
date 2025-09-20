import React, { useState } from 'react';
import { 
  Filter, 
  Download, 
  Search,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const Reports = () => {
  const [filters, setFilters] = useState({
    status: '',
    location: '',
    eventType: '',
    dateRange: '',
    urgencyLevel: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const reports = [
    {
      id: 1,
      title: 'Tsunami Warning - Santa Monica',
      location: 'Santa Monica, CA',
      eventType: 'Tsunami',
      status: 'verified',
      urgencyLevel: 'high',
      reporter: 'John Doe',
      date: '2025-01-10',
      time: '14:30',
      description: 'Unusual wave patterns and water recession observed'
    },
    {
      id: 2,
      title: 'Rip Current Alert - Miami Beach',
      location: 'Miami Beach, FL',
      eventType: 'Rip Current',
      status: 'pending',
      urgencyLevel: 'medium',
      reporter: 'Sarah Johnson',
      date: '2025-01-10',
      time: '12:45',
      description: 'Strong offshore currents reported by lifeguards'
    },
    {
      id: 3,
      title: 'Storm Surge - Galveston',
      location: 'Galveston, TX',
      eventType: 'Storm Surge',
      status: 'resolved',
      urgencyLevel: 'low',
      reporter: 'Mike Wilson',
      date: '2025-01-09',
      time: '18:20',
      description: 'Minor flooding during high tide'
    },
    {
      id: 4,
      title: 'High Waves - Monterey Bay',
      location: 'Monterey Bay, CA',
      eventType: 'High Waves',
      status: 'rejected',
      urgencyLevel: 'low',
      reporter: 'Lisa Chen',
      date: '2025-01-09',
      time: '09:15',
      description: 'Normal wave activity, false alarm'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle size={16} className="text-green-600" />;
      case 'pending': return <Clock size={16} className="text-yellow-600" />;
      case 'resolved': return <CheckCircle size={16} className="text-blue-600" />;
      case 'rejected': return <XCircle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return '#183642';
      case 'medium': return '#73628A';
      case 'low': return '#CBC5EA';
      default: return '#EAEAEA';
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Title', 'Location', 'Event Type', 'Status', 'Urgency', 'Reporter', 'Date', 'Time', 'Description'],
      ...reports.map(report => [
        report.id,
        report.title,
        report.location,
        report.eventType,
        report.status,
        report.urgencyLevel,
        report.reporter,
        report.date,
        report.time,
        report.description
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ocean_hazard_reports.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#313D5A' }}>Reports</h1>
        <p className="text-gray-600 mt-2">Manage and filter ocean hazard reports from the community</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: '#313D5A' }}>
            <Filter size={20} className="inline mr-2" />
            Filters
          </h2>
          <button 
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: '#73628A' }}
          >
            <Download size={16} className="mr-2" />
            Export CSV
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <select 
            className="p-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: '#73628A' }}
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>

          <input 
            type="text"
            placeholder="Location"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: '#73628A' }}
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          />

          <select 
            className="p-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: '#73628A' }}
            value={filters.eventType}
            onChange={(e) => setFilters({...filters, eventType: e.target.value})}
          >
            <option value="">All Event Types</option>
            <option value="tsunami">Tsunami</option>
            <option value="rip-current">Rip Current</option>
            <option value="storm-surge">Storm Surge</option>
            <option value="high-waves">High Waves</option>
          </select>

          <input 
            type="date"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: '#73628A' }}
            value={filters.dateRange}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
          />

          <select 
            className="p-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: '#73628A' }}
            value={filters.urgencyLevel}
            onChange={(e) => setFilters({...filters, urgencyLevel: e.target.value})}
          >
            <option value="">All Urgency Levels</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="relative">
          <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search reports..."
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: '#73628A' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#EAEAEA' }}>
              <tr>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: '#313D5A' }}>Report</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: '#313D5A' }}>Location</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: '#313D5A' }}>Status</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: '#313D5A' }}>Urgency</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: '#313D5A' }}>Reporter</th>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: '#313D5A' }}>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr 
                  key={report.id} 
                  className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <h4 className="font-semibold" style={{ color: '#313D5A' }}>{report.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-700">
                      <MapPin size={16} className="mr-2" />
                      {report.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(report.status)}
                      <span className="ml-2 capitalize text-sm">{report.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: getUrgencyColor(report.urgencyLevel) }}
                      ></div>
                      <span className="capitalize text-sm">{report.urgencyLevel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{report.reporter}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-700">
                        <Calendar size={14} className="mr-1" />
                        {report.date}
                      </div>
                      <div className="flex items-center text-gray-500 mt-1">
                        <Clock size={14} className="mr-1" />
                        {report.time}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;