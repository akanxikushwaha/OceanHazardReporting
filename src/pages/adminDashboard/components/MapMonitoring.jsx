import React, { useState } from 'react';
import { 
  Map as MapIcon, 
  AlertTriangle, 
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import HazardMap from '../../userDashboard/components/HazardMap';

const MapMonitoring = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mapView, setMapView] = useState('density');

  // Mock data for report density
  const regions = [
    {
      id: 1,
      name: 'California Coast',
      reportCount: 156,
      urgencyLevel: 'high',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      activeIncidents: 12
    },
    {
      id: 2,
      name: 'Florida Gulf',
      reportCount: 89,
      urgencyLevel: 'medium',
      coordinates: { lat: 27.6648, lng: -81.5158 },
      activeIncidents: 5
    },
    {
      id: 3,
      name: 'Oregon Coast',
      reportCount: 34,
      urgencyLevel: 'low',
      coordinates: { lat: 44.9419, lng: -124.0628 },
      activeIncidents: 2
    },
    {
      id: 4,
      name: 'Texas Gulf',
      reportCount: 67,
      urgencyLevel: 'medium',
      coordinates: { lat: 29.3013, lng: -94.7977 },
      activeIncidents: 8
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return '#183642';
      case 'medium': return '#73628A';
      case 'low': return '#CBC5EA';
      default: return '#EAEAEA';
    }
  };

  const getReportDensitySize = (count) => {
    if (count > 100) return 'large';
    if (count > 50) return 'medium';
    return 'small';
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#313D5A' }}>Map Monitoring</h1>
        <p className="text-gray-600 mt-2">Real-time visualization of report density and urgency levels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#313D5A' }}>Map Controls</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#313D5A' }}>View Mode</label>
                <select 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#73628A' }}
                  value={mapView}
                  onChange={(e) => setMapView(e.target.value)}
                >
                  <option value="density">Report Density</option>
                  <option value="urgency">Urgency Scale</option>
                  <option value="incidents">Active Incidents</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                  <ZoomIn size={16} className="mx-auto" />
                </button>
                <button className="flex-1 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                  <ZoomOut size={16} className="mx-auto" />
                </button>
                <button className="flex-1 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RotateCcw size={16} className="mx-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#313D5A' }}>
              <Layers size={20} className="inline mr-2" />
              Legend
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: '#183642' }}
                ></div>
                <span className="text-sm">High Urgency</span>
              </div>
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: '#73628A' }}
                ></div>
                <span className="text-sm">Medium Urgency</span>
              </div>
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: '#CBC5EA' }}
                ></div>
                <span className="text-sm">Low Urgency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Mock Map Interface */}
            <HazardMap/>

            {/* Selected Region Info */}
            {selectedRegion && (
              <div className="p-6 border-t" style={{ borderColor: '#EAEAEA' }}>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#313D5A' }}>
                  {selectedRegion.name}
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#EAEAEA' }}>
                    <p className="text-2xl font-bold" style={{ color: '#313D5A' }}>
                      {selectedRegion.reportCount}
                    </p>
                    <p className="text-sm text-gray-600">Total Reports</p>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#EAEAEA' }}>
                    <p className="text-2xl font-bold" style={{ color: '#313D5A' }}>
                      {selectedRegion.activeIncidents}
                    </p>
                    <p className="text-sm text-gray-600">Active Incidents</p>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#EAEAEA' }}>
                    <div 
                      className="w-6 h-6 rounded-full mx-auto mb-1"
                      style={{ backgroundColor: getUrgencyColor(selectedRegion.urgencyLevel) }}
                    ></div>
                    <p className="text-sm text-gray-600 capitalize">{selectedRegion.urgencyLevel} Urgency</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Region Summary Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {regions.map((region) => (
              <div 
                key={region.id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedRegion(region)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold" style={{ color: '#313D5A' }}>{region.name}</h4>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getUrgencyColor(region.urgencyLevel) }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Reports: {region.reportCount}</span>
                  <span className="text-gray-600">Active: {region.activeIncidents}</span>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MapMonitoring;