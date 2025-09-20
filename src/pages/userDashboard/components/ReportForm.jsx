import React, { useState } from 'react';
import { Camera, MapPin, Upload, FileImage, Cloud } from 'lucide-react';

const ReportForm = () => {
  const [reportData, setReportData] = useState({
    location: '',
    hazardType: '',
    description: '',
    urgency: 'medium',
    images: []
  });
  const [loading, setLoading] = useState(false);

  const hazardTypes = [
    'High Waves',
    'Rip Current',
    'Coastal Flooding',
    'Storm Surge',
    'Erosion',
    'Debris',
    'Oil Spill',
    'Marine Life Incident',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Report submitted successfully!');
    setReportData({
      location: '',
      hazardType: '',
      description: '',
      urgency: 'medium',
      images: []
    });
    setLoading(false);
  };

  const handleImageUpload = (method) => {
    // Simulate image upload
    alert(`Opening ${method} for image upload...`);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setReportData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        () => alert('Unable to get your location')
      );
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#313D5A' }}>
        Submit Hazard Report
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#313D5A' }}>
            Location
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={reportData.location}
              onChange={(e) => setReportData(prev => ({ ...prev, location: e.target.value }))}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: '#CBC5EA' }}
              placeholder="Enter location or coordinates"
              required
            />
            <button
              type="button"
              onClick={getCurrentLocation}
              className="px-4 py-2 text-white rounded-md hover:opacity-90"
              style={{ backgroundColor: '#73628A' }}
            >
              <MapPin className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#313D5A' }}>
            Hazard Type
          </label>
          <select
            value={reportData.hazardType}
            onChange={(e) => setReportData(prev => ({ ...prev, hazardType: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: '#CBC5EA' }}
            required
          >
            <option value="">Select hazard type</option>
            {hazardTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#313D5A' }}>
            Urgency Level
          </label>
          <div className="flex space-x-4">
            {['low', 'medium', 'high', 'critical'].map(level => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  value={level}
                  checked={reportData.urgency === level}
                  onChange={(e) => setReportData(prev => ({ ...prev, urgency: e.target.value }))}
                  className="mr-2"
                />
                <span className="capitalize" style={{ color: '#313D5A' }}>{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#313D5A' }}>
            Description
          </label>
          <textarea
            value={reportData.description}
            onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 h-24"
            style={{ borderColor: '#CBC5EA' }}
            placeholder="Describe what you observed..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#313D5A' }}>
            Upload Images
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleImageUpload('camera')}
              className="p-4 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#CBC5EA' }}
            >
              <Camera className="h-6 w-6 mx-auto mb-2" style={{ color: '#73628A' }} />
              <span className="text-xs" style={{ color: '#313D5A' }}>Camera</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleImageUpload('local')}
              className="p-4 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#CBC5EA' }}
            >
              <FileImage className="h-6 w-6 mx-auto mb-2" style={{ color: '#73628A' }} />
              <span className="text-xs" style={{ color: '#313D5A' }}>Browse</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleImageUpload('drive')}
              className="p-4 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#CBC5EA' }}
            >
              <Cloud className="h-6 w-6 mx-auto mb-2" style={{ color: '#73628A' }} />
              <span className="text-xs" style={{ color: '#313D5A' }}>Drive</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-md text-white font-medium transition-colors hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: '#73628A' }}
        >
          {loading ? 'Submitting Report...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;