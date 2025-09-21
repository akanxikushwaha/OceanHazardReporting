import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../homePage/signUp/supabaseClient'; // adjust path to your supabase client

const HazardMap = () => {
  // Setup default icons
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  const redIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const blueIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const greenIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const getIconForPoint = (color) => {
    switch (color) {
      case 'red':
        return redIcon;
      case 'blue':
        return blueIcon;
      case 'green':
        return greenIcon;
      default:
        return redIcon;
    }
  };

  const [reports, setReports] = useState([]);

  // Fetch initial data
  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase.from('reports').select('id, latitude, longitude, severity');
      if (error) {
        console.error('Error fetching reports:', error);
      } else {
        setReports(data);
      }
    };

    fetchReports();

    // Realtime subscription for new inserts
    const channel = supabase
      .channel('reports-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'reports' },
        (payload) => {
          setReports((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold" style={{ color: '#313D5A' }}>
          Hazard Density Map
        </h2>
      </div>
      <div className="relative w-full h-96">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{
            height: '100%',
            width: '100%',
            margin: '20px auto',
            border: '2px solid #333',
            borderRadius: '4px',
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {reports.map((report) => (
            <Marker
              key={report.id}
              position={[report.latitude, report.longitude]}
              icon={getIconForPoint(report.severity || 'red')}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Report #{report.id}</h4>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Latitude:</strong> {report.latitude.toFixed(5)}
                    <br />
                    <strong>Longitude:</strong> {report.longitude.toFixed(5)}
                    <br />
                    <strong>Severity:</strong> {report.severity || 'N/A'}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default HazardMap;
