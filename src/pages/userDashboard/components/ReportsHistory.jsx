import React, { useEffect, useState } from "react";
import { supabase } from "../../homePage/signUp/supabaseClient"; 
import { Calendar, MapPin, Eye } from "lucide-react";

const ReportsHistory = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // 1. Get current logged-in user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        // 2. Fetch only their reports
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setReports(data);
      } catch (err) {
        console.error("Error fetching reports:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical": return "#183642";
      case "high": return "#313D5A";
      case "medium": return "#73628A";
      default: return "#CBC5EA";
    }
  };

  const getStatusColor = (isverified) => {
    return isverified ? "#73628A" : "#CBC5EA";
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading reports...</p>;
  }

  if (reports.length === 0) {
    return <p className="text-center text-gray-500">No reports submitted yet.</p>;
  }

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-[#313D5A]">
        Your Reports History
      </h2>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="p-4 rounded-lg border-l-4 transition-all hover:shadow-md"
            style={{
              backgroundColor: "#EAEAEA",
              borderLeftColor: getSeverityColor(report.severity),
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-3">
                {report.severity && (
                  <span
                    className="px-2 py-1 text-xs font-medium rounded uppercase"
                    style={{
                      backgroundColor: getSeverityColor(report.severity),
                      color: "#FFFFFF",
                    }}
                  >
                    {report.severity}
                  </span>
                )}
                <span
                  className="px-2 py-1 text-xs font-medium rounded"
                  style={{
                    backgroundColor: getStatusColor(report.isverified),
                    color: "#FFFFFF",
                  }}
                >
                  {report.isverified ? "verified" : "pending"}
                </span>
              </div>
              <button className="p-1 hover:bg-gray-200 rounded">
                <Eye className="h-4 w-4 text-[#73628A]" />
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2 text-[#313D5A]">
              {report.hazard_type}
            </h3>

            <p className="mb-3 text-[#313D5A]">
              {report.description}
            </p>

            {report.image_url && (
              <img
                src={report.image_url}
                alt="Report evidence"
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}

            <div className="flex items-center justify-between text-sm text-[#73628A]">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(report.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {report.latitude.toFixed(3)}, {report.longitude.toFixed(3)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsHistory;
