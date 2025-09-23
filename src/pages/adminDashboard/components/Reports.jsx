import React, { useState, useEffect } from "react";
import { supabase } from "../../homePage/signUp/supabaseClient"; // adjust path
import { 
  Filter, 
  Download, 
  Search,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

const Reports = () => {
  const [filters, setFilters] = useState({
    status: "",
    location: "",
    eventType: "",
    dateRange: "",
    urgencyLevel: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reports from Supabase
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from("reports")
          .select(`
            id,
            hazard_type,
            description,
            severity,
            isverified,
            created_at,
            latitude,
            longitude,
            user_id
          `)
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Map data for table display
        const formatted = data.map((r) => {
          const createdAt = new Date(r.created_at);
          return {
            id: r.id,
            title: r.hazard_type,
            location: `${r.latitude.toFixed(3)}, ${r.longitude.toFixed(3)}`,
            eventType: r.hazard_type,
            status: r.isverified ? "verified" : "pending",
            urgencyLevel: r.severity || "low",
            reporter: r.user_id,
            date: createdAt.toLocaleDateString(),
            time: createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            description: r.description
          };
        });

        setReports(formatted);
      } catch (err) {
        console.error("Error fetching reports:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified": return <CheckCircle size={16} className="text-green-600" />;
      case "pending": return <Clock size={16} className="text-yellow-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high": return "#183642";
      case "medium": return "#73628A";
      case "low": return "#CBC5EA";
      default: return "#EAEAEA";
    }
  };

  // Filter + search
  const filteredReports = reports.filter((report) => {
    return (
      (filters.status === "" || report.status === filters.status) &&
      (filters.urgencyLevel === "" || report.urgencyLevel === filters.urgencyLevel) &&
      (filters.eventType === "" || report.eventType.toLowerCase() === filters.eventType.toLowerCase()) &&
      (filters.dateRange === "" || report.date === filters.dateRange) &&
      (filters.location === "" || report.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (searchTerm === "" ||
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const exportToCSV = () => {
    const csvContent = [
      ["ID", "Title", "Location", "Event Type", "Status", "Urgency", "Reporter", "Date", "Time", "Description"],
      ...filteredReports.map((report) => [
        report.id,
        report.title,
        report.location,
        report.eventType,
        report.status,
        report.urgencyLevel,
        report.reporter,
        report.date,
        report.time,
        report.description,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ocean_hazard_reports.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <p className="p-8 text-gray-500">Loading reports...</p>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#313D5A]">Reports</h1>
        <p className="text-gray-600 mt-2">Manage and filter ocean hazard reports from the community</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#313D5A] flex items-center">
            <Filter size={20} className="mr-2" />
            Filters
          </h2>
          <button 
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#73628A" }}
          >
            <Download size={16} className="mr-2" />
            Export CSV
          </button>
        </div>
        
        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#73628A]">
            <option value="">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>

          <input type="text" placeholder="Location" value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#73628A]" />

          <select value={filters.eventType} onChange={(e) => setFilters({...filters, eventType: e.target.value})}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#73628A]">
            <option value="">All Event Types</option>
            <option value="Tsunami">Tsunami</option>
            <option value="Rip Current">Rip Current</option>
            <option value="Storm Surge">Storm Surge</option>
            <option value="High Waves">High Waves</option>
          </select>

          <input type="date" value={filters.dateRange}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#73628A]" />

          <select value={filters.urgencyLevel} onChange={(e) => setFilters({...filters, urgencyLevel: e.target.value})}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#73628A]">
            <option value="">All Urgency Levels</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#73628A]"
          />
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "#EAEAEA" }}>
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-[#313D5A]">Report</th>
                <th className="px-6 py-4 text-left font-semibold text-[#313D5A]">Location</th>
                <th className="px-6 py-4 text-left font-semibold text-[#313D5A]">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-[#313D5A]">Urgency</th>
                <th className="px-6 py-4 text-left font-semibold text-[#313D5A]">Reporter (User ID)</th>
                <th className="px-6 py-4 text-left font-semibold text-[#313D5A]">Date & Time</th>
              </tr>
            </thead>
            {/* <tbody>
              {filteredReports.map((report, index) => (
                <tr 
                  key={report.id} 
                  className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <h4 className="font-semibold text-[#313D5A]">{report.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 flex items-center text-gray-700">
                    <MapPin size={16} className="mr-2" />
                    {report.location}
                  </td>
                  <td className="px-6 py-4 flex items-center">
                    {getStatusIcon(report.status)}
                    <span className="ml-2 capitalize text-sm">{report.status}</span>
                  </td>
                  <td className="px-6 py-4 flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getUrgencyColor(report.urgencyLevel) }}></div>
                    <span className="capitalize text-sm">{report.urgencyLevel}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <span className="capitalize text-sm">{report.reporter}</span></td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-700">
                        <Calendar size={14} className="mr-1" />
                        <span className="capitalize text-sm">{report.date}</span>
                      </div>
                      <div className="flex items-center text-gray-500 mt-1">
                        <Clock size={14} className="mr-1" />
                        <span className="capitalize text-sm">{report.time}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody> */}
            <tbody>
  {filteredReports.map((report, index) => (
    <tr 
      key={report.id} 
      className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
    >
      <td className="px-6 py-4">
        <div>
          <h4 className="font-semibold text-[#313D5A]">{report.title}</h4>
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
      
      <td className="px-6 py-4 text-gray-700">
        <span className="capitalize text-sm">{report.reporter}</span>
      </td>
      
      <td className="px-6 py-4">
        <div className="text-sm">
          <div className="flex items-center text-gray-700">
            <Calendar size={14} className="mr-1" />
            <span className="capitalize text-sm">{report.date}</span>
          </div>
          <div className="flex items-center text-gray-500 mt-1">
            <Clock size={14} className="mr-1" />
            <span className="capitalize text-sm">{report.time}</span>
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
