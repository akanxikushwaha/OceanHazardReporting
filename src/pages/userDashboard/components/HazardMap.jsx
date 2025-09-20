import { Map, ZoomIn, ZoomOut, Layers, Info } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const HazardMap = ({ viewOnly = false }) => {
  const [selectedLayer, setSelectedLayer] = useState('hazards');
  const [zoom, setZoom] = useState(10);

  const mockHazards = [
    { id: 1, lat: 34.0194, lng: -118.4912, type: 'High Waves', urgency: 'high' },
    { id: 2, lat: 34.0259, lng: -118.7798, type: 'Rip Current', urgency: 'critical' },
    { id: 3, lat: 33.9425, lng: -118.4081, type: 'Debris', urgency: 'medium' }
  ];

  return (
    <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold" style={{ color: '#313D5A' }}>
          Hazard Density Map
        </h2>
        {viewOnly && (
          <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: '#CBC5EA', color: '#313D5A' }}>
            View Only
          </span>
        )}
      </div>

      <div className="mb-4 flex justify-between items-center">
         <div className="flex space-x-2">
           <button
            onClick={() => setSelectedLayer('hazards')}
            className={`px-3 py-1 text-sm rounded ${selectedLayer === 'hazards' ? 'text-white' : ''}`}
            style={{ 
              backgroundColor: selectedLayer === 'hazards' ? '#73628A' : '#EAEAEA',
              color: selectedLayer === 'hazards' ? '#FFFFFF' : '#313D5A'
            }}
          >
            Hazards
          </button> 
          <button
            onClick={() => setSelectedLayer('density')}
            className={`px-3 py-1 text-sm rounded ${selectedLayer === 'density' ? 'text-white' : ''}`}
            style={{ 
              backgroundColor: selectedLayer === 'density' ? '#73628A' : '#EAEAEA',
              color: selectedLayer === 'density' ? '#FFFFFF' : '#313D5A'
            }}
          >
            Report Density
          </button>
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={() => setZoom(Math.min(zoom + 1, 18))}
            className="p-2 rounded hover:bg-gray-100"
          >
            <ZoomIn className="h-4 w-4" style={{ color: '#73628A' }} />
          </button>
          <button 
            onClick={() => setZoom(Math.max(zoom - 1, 1))}
            className="p-2 rounded hover:bg-gray-100"
          >
            <ZoomOut className="h-4 w-4" style={{ color: '#73628A' }} />
          </button>
        </div> 
      </div>

      {/* Mock Map Display */}
      <div 
        className="relative w-full h-96 rounded-lg border-2 flex items-center justify-center"
        style={{ backgroundColor: '#EAEAEA', borderColor: '#CBC5EA' }}
      >
        <div className="text-center">
          <Map className="h-16 w-16 mx-auto mb-4" style={{ color: '#73628A' }} />
          <p className="text-lg font-medium" style={{ color: '#313D5A' }}>
            Interactive Map
          </p>
          <p className="text-sm" style={{ color: '#73628A' }}>
            Showing {mockHazards.length} hazard reports
          </p>
        </div>

        Mock hazard markers 
        <div className="absolute top-4 left-4 space-y-2">
          {mockHazards.map(hazard => (
            <div 
              key={hazard.id}
              className="flex items-center space-x-2 bg-white p-2 rounded shadow-md"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: hazard.urgency === 'critical' ? '#183642' : 
                                 hazard.urgency === 'high' ? '#313D5A' : '#73628A'
                }}
              />
              <span className="text-xs" style={{ color: '#313D5A' }}>
                {hazard.type}
              </span>
            </div>
          ))}
        </div>
      </div> 

      {/* <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((loc, index) => (
              <Marker key={index} position={[loc.lat, loc.lng]} icon={redIcon}>
                <Popup>
                  <b>{loc.username}</b><br />
                  Lat: {loc.lat.toFixed(5)}<br />
                  Lng: {loc.lng.toFixed(5)}
                </Popup>
              </Marker>
            ))}
          </MapContainer> */}

      <div className="mt-4 flex items-center text-sm" style={{ color: '#73628A' }}>
        <Info className="h-4 w-4 mr-2" />
        {viewOnly ? 
          'This map is view-only. Contact admin for reporting features.' :
          'Click on markers for more details. Use filters to customize view.'
        }
      </div>
    </div>
  );
};

export default HazardMap;