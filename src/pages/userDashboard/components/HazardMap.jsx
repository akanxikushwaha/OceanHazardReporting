import { Map, ZoomIn, ZoomOut, Layers, Info } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const HazardMap = ({ viewOnly = false }) => {

  // const redIcon = new L.Icon({
  //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  //   iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  // });

  //   const specificPoints = [
  //   { lat: 24.2321, lng: 46.4324, name: "Point 1", color: "red" },
  //   { lat: 85.2374, lng: 85.6253, name: "Point 2", color: "red" },
  //   { lat: 932.3487, lng: 25.9583, name: "Point 3", color: "red" }
  // ];

  // return (
  //   <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
  //     <div className="flex justify-between items-center mb-4">
  //       <h2 className="text-2xl font-bold" style={{ color: '#313D5A' }}>
  //         Hazard Density Map
  //       </h2>
  //       {viewOnly && (
  //         <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: '#CBC5EA', color: '#313D5A' }}>
  //           View Only
  //         </span>
  //       )}
  //     </div>

  //     {/* <div className="mb-4 flex justify-between items-center">
  //        <div className="flex space-x-2">
  //          <button
  //           onClick={() => setSelectedLayer('hazards')}
  //           className={`px-3 py-1 text-sm rounded ${selectedLayer === 'hazards' ? 'text-white' : ''}`}
  //           style={{ 
  //             backgroundColor: selectedLayer === 'hazards' ? '#73628A' : '#EAEAEA',
  //             color: selectedLayer === 'hazards' ? '#FFFFFF' : '#313D5A'
  //           }}
  //         >
  //           Hazards
  //         </button> 
  //         <button
  //           onClick={() => setSelectedLayer('density')}
  //           className={`px-3 py-1 text-sm rounded ${selectedLayer === 'density' ? 'text-white' : ''}`}
  //           style={{ 
  //             backgroundColor: selectedLayer === 'density' ? '#73628A' : '#EAEAEA',
  //             color: selectedLayer === 'density' ? '#FFFFFF' : '#313D5A'
  //           }}
  //         >
  //           Report Density
  //         </button>
  //       </div>

  //       <div className="flex space-x-2">
  //         <button 
  //           onClick={() => setZoom(Math.min(zoom + 1, 18))}
  //           className="p-2 rounded hover:bg-gray-100"
  //         >
  //           <ZoomIn className="h-4 w-4" style={{ color: '#73628A' }} />
  //         </button>
  //         <button 
  //           onClick={() => setZoom(Math.max(zoom - 1, 1))}
  //           className="p-2 rounded hover:bg-gray-100"
  //         >
  //           <ZoomOut className="h-4 w-4" style={{ color: '#73628A' }} />
  //         </button>
  //       </div> 
  //     </div> */}

  //     {/* Mock Map Display */}
  //     {/* <div 
  //       className="relative w-full h-96 rounded-lg border-2 flex items-center justify-center"
  //       style={{ backgroundColor: '#EAEAEA', borderColor: '#CBC5EA' }}
  //     >
  //       <div className="text-center">
  //         <Map className="h-16 w-16 mx-auto mb-4" style={{ color: '#73628A' }} />
  //         <p className="text-lg font-medium" style={{ color: '#313D5A' }}>
  //           Interactive Map
  //         </p>
  //         <p className="text-sm" style={{ color: '#73628A' }}>
  //           Showing {mockHazards.length} hazard reports
  //         </p>
  //       </div>

  //       Mock hazard markers 
  //       <div className="absolute top-4 left-4 space-y-2">
  //         {mockHazards.map(hazard => (
  //           <div 
  //             key={hazard.id}
  //             className="flex items-center space-x-2 bg-white p-2 rounded shadow-md"
  //           >
  //             <div 
  //               className="w-3 h-3 rounded-full"
  //               style={{ 
  //                 backgroundColor: hazard.urgency === 'critical' ? '#183642' : 
  //                                hazard.urgency === 'high' ? '#313D5A' : '#73628A'
  //               }}
  //             />
  //             <span className="text-xs" style={{ color: '#313D5A' }}>
  //               {hazard.type}
  //             </span>
  //           </div>
  //         ))}
  //       </div>
  //     </div>  */}
  //     <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
  //     <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Location Map</h1>

  //     <div style={{
  //       marginTop: '10px',
  //       padding: '10px',
  //       backgroundColor: '#e9ecef',
  //       borderRadius: '4px',
  //       fontSize: '14px',
  //       textAlign: 'center'
  //     }}>
  //       <p><strong>Legend:</strong></p>
  //       <p>🔴 <strong>Red marker:</strong> All locations</p>
  //     </div>

  //     <MapContainer
  //       center={[20, 0]}
  //       zoom={2}
  //       style={{ height: '30rem', width: '30rem', margin: '20px auto', border: '2px solid #333', borderRadius: '4px' }}
  //     >
  //       <TileLayer
  //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //       />

  //       {/* Display specific points with only red icon */}
  //       {specificPoints.map((point, index) => (
  //         <Marker
  //           key={`point-${index}`}
  //           position={[point.lat, point.lng]}
  //           icon={redIcon}
  //         >
  //           <Popup>
  //             <div style={{ textAlign: 'center' }}>
  //               <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{point.name}</h4>
  //               <p style={{ margin: '5px 0', fontSize: '14px' }}>
  //                 <strong>Latitude:</strong> {point.lat.toFixed(5)}<br />
  //                 <strong>Longitude:</strong> {point.lng.toFixed(5)}
  //               </p>
  //             </div>
  //           </Popup>
  //         </Marker>
  //       ))}
  //     </MapContainer>
  //   </div>

  //     <div className="mt-4 flex items-center text-sm" style={{ color: '#73628A' }}>
  //       <Info className="h-4 w-4 mr-2" />
  //       {viewOnly ? 
  //         'This map is view-only. Contact admin for reporting features.' :
  //         'Click on markers for more details. Use filters to customize view.'
  //       }
  //     </div>
  //   </div>
  //);
};

export default HazardMap;