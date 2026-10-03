import React, { useEffect, useState } from "react";
import { supabase } from "../../homePage/signUp/supabaseClient"; // adjust path
import { FileText, CheckCircle, AlertTriangle, Clock } from "lucide-react";

const QuickStats = ({ userId }) => {
  const [stats, setStats] = useState({
    totalReports: 0,
    verifiedReports: 0,
    activeAlerts: 0,
    lastReport: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchStats = async () => {
    try {
      if (!userId) {
        throw new Error("No authenticated user");
      }

      const { data, error } = await supabase
        .from("reports")
        .select("created_at, isverified, severity")
        .eq("user_id", userId);

      if (error) throw error;

      const reports = data || [];

      const totalReports = reports.length;

      const verifiedReports = reports.filter(
        (r) => r.isverified
      ).length;

      const activeAlerts = reports.filter(
        (r) => r.severity === "critical"
      ).length;

      let lastReport = null;

      if (reports.length > 0) {
        const latest = reports.reduce((latest, report) =>
          new Date(report.created_at) > new Date(latest.created_at)
            ? report
            : latest
        );

        lastReport = getTimeSince(new Date(latest.created_at));
      }

      setStats({
        totalReports,
        verifiedReports,
        activeAlerts,
        lastReport,
      });

    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, [userId]);

  const getTimeSince = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;

    return "just now";
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading stats...</p>;
  }

  const cards = [
    {
      icon: FileText,
      label: "Your Reports",
      value: stats.totalReports,
      change: `${stats.totalReports} total`,
    },
    {
      icon: CheckCircle,
      label: "Verified Reports",
      value: stats.verifiedReports,
      change: `${stats.verifiedReports} verified`,
    },
    {
      icon: AlertTriangle,
      label: "Active Alerts",
      value: stats.activeAlerts,
      change: "Critical severity",
    },
    {
      icon: Clock,
      label: "Last Report",
      value: stats.lastReport || "N/A",
      change: "",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#73628A" }}>
                  {stat.label}
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: "#313D5A" }}>
                  {stat.value}
                </p>
                <p className="text-xs mt-1" style={{ color: "#73628A" }}>
                  {stat.change}
                </p>
              </div>
              <IconComponent className="h-8 w-8" style={{ color: "#CBC5EA" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;
