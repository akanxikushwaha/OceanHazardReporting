import React, { useState } from 'react';
import { MapPin, Camera, Send, AlertTriangle } from 'lucide-react';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    hazardType: '',
    location: '',
    severity: 'medium',
    description: '',
    photo: null
  });

  const hazardTypes = [
    'Rip Currents',
    'Dangerous Surf',
    'Jellyfish',
    'Red Tide',
    'Pollution',
    'Marine Life',
    'Strong Winds',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-ocean-800 mb-6">Report Ocean Hazard</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ocean-600 mb-2">
              Hazard Type
            </label>
            <select 
              value={formData.hazardType}
              onChange={(e) => setFormData({...formData, hazardType: e.target.value})}
              className="w-full px-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400"
              required
            >
              <option value="">Select hazard type</option>
              {hazardTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ocean-600 mb-2">
              Severity Level
            </label>
            <select 
              value={formData.severity}
              onChange={(e) => setFormData({...formData, severity: e.target.value})}
              className="w-full px-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400"
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ocean-600 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-ocean-400" />
            <input 
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Enter beach/coastal location"
              className="w-full pl-10 pr-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ocean-600 mb-2">
            Description
          </label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows="4"
            placeholder="Describe the hazard conditions in detail..."
            className="w-full px-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ocean-600 mb-2">
            Photo (Optional)
          </label>
          <div className="border-2 border-dashed border-ocean-100 rounded-lg p-6 text-center">
            <Camera className="h-8 w-8 text-ocean-400 mx-auto mb-2" />
            <p className="text-ocean-600 mb-2">Upload a photo of the hazard</p>
            <input type="file" accept="image/*" className="hidden" id="photo-upload" />
            <label htmlFor="photo-upload" className="bg-ocean-100 text-ocean-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-ocean-200 transition-colors">
              Choose File
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" className="px-6 py-2 border border-ocean-200 text-ocean-600 rounded-lg hover:bg-ocean-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-ocean-600 text-white px-6 py-2 rounded-lg hover:bg-ocean-800 transition-colors flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Submit Report</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;