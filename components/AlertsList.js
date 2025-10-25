"use client";
import { useEffect, useState, useCallback } from "react";

export default function AlertsList({ userId }) {
  const [alerts, setAlerts] = useState([]);

  // Fetch alerts from API
  const fetchAlerts = useCallback( async () => {
    try {
      const res = await fetch(`/api/alerts?display=true&username=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch alerts");
      const data = await res.json();

      if (Array.isArray(data)) {
        // Optional: filter only enabled alerts for this user
        const filtered = data.filter(
          (alert) => alert.is_enabled && (!userId || alert.user_id === userId)
        );
        setAlerts(filtered);
      } else {
        setAlerts([]);
      }
    } catch (err) {
      console.error("Failed to fetch alerts:", err);
      setAlerts([]);
    }
  }, []);

  // Toggle alert enable/disable
  const toggleAlert = async (id, currentState) => {
    try {
      await fetch("/api/alerts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alert_id: id, is_enabled: !currentState }),
      });
      fetchAlerts(); // refresh after toggle
    } catch (err) {
      console.error("Failed to update alert:", err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return (
    <div className="max-w-4xl bg-gray-950 border border-green-400/30 rounded-lg p-6 shadow-lg shadow-green-900/40 w-full mx-auto ">
      <h2 className="flex justify-center text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
        Notifications
      </h2>

      <div className="max-h-70 overflow-y-auto">
      {alerts.length === 0 ? (
        <p className="text-gray-400 text-center">No alerts to show</p>
      ) : (
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className="flex justify-between items-center bg-gray-900 border border-green-400/40 rounded-lg p-4"
            >
              <div>
                <p className="text-white">{alert.message}</p>
                <p className="text-sm text-gray-400">
                  Category: {alert.category} |{" "}
                  {new Date(alert.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => toggleAlert(alert.alert_id, alert.is_enabled)}
                className={`px-4 py-1 rounded-lg font-semibold transition-all ${
                  alert.is_enabled
                    ? "bg-green-400 text-gray-900 hover:bg-green-300"
                    : "bg-gray-600 text-white hover:bg-gray-500"
                }`}
              >
                {alert.is_enabled ? "Disable" : "Enable"}
              </button>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}
