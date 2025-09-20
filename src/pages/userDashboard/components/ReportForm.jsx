import React, { useState, useRef } from 'react';
import { Camera, MapPin, Upload, FileImage, Cloud } from 'lucide-react';
import {supabase} from "../../homePage/signUp/supabaseClient"

const ReportForm = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);


  const [reportData, setReportData] = useState({
    location: '',
    hazardType: '',
    description: '',
    urgency: 'medium',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);

  const hazardTypes = [
    'High Waves',
    'Rip Current',
    'Coastal Flooding',
    'Coastal Currents',
    'Storm Surge',
    'Marine Life Incident',
    'Tsunami',
    'Other'
  ];

  const handleImageUpload = async () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Uploading file:", file);

    // const fileName = `${Date.now()}_${file.name}`;
    const fileName = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;

    const { error } = await supabase.storage
      .from("ReportImages") // bucket name exactly as in dashboard
      .upload(fileName, file);

    if (error) {
      console.error("Upload failed:", error.message);
      return;
    }

//     const { data, error } = await supabase.storage.listBuckets();
// console.log(data, error);

    const { data: publicUrlData } = supabase.storage
      .from("ReportImages")
      .getPublicUrl(fileName);

    setReportData((prev) => ({
      ...prev,
      image_url: publicUrlData.publicUrl,
    }));
    

    console.log("Uploaded successfully:", publicUrlData.publicUrl);
  };

  input.click();
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert("You must be logged in to submit a report.");
    setLoading(false);
    return;
  }

  const { error } = await supabase.from("reports").insert([
    {
      user_id: user.id,
      latitude: parseFloat(reportData.location.split(",")[0]) || null,
      longitude: parseFloat(reportData.location.split(",")[1]) || null,
      hazard_type: reportData.hazardType,
      description: reportData.description,
      image_url: reportData.image_url || null,  // ✅ Correct column
      isverified: null,
      severity: null,
    },
  ]);

  if (error) {
    console.error("❌ Insert error:", error.message);
  } else {
    alert("✅ Report submitted successfully!");
    setReportData({
      location: "",
      hazardType: "",
      description: "",
      image_url: "",
    });
  }

  setLoading(false);
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

  const handleImageCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // Capture a frame
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageData = canvasRef.current.toDataURL("image/png"); // base64 string
      setCapturedImage(imageData);
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
              placeholder="Enter location coordinates"
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
            Upload Image
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleImageCapture()}
              className="p-4 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#CBC5EA' }}>
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