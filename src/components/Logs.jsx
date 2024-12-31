import { getAllDailyLogs } from "@/utils/dailyStorage";
import Layout from "@/components/Layout";
import LogBento from "./LogBento";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Download, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Logs() {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  const [expandedDate, setExpandedDate] = useState(dateParam);
  const logs = getAllDailyLogs();

  useEffect(() => {
    if (dateParam) {
      setExpandedDate(dateParam);
    }
  }, [dateParam]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "daily-logs.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete all logs? This action cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-4 relative">
        {logs.length > 0 ? (
          <>
            <div className="absolute right-6 top-0 flex gap-2">
              <button
                onClick={handleDelete}
                className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                title="Delete all logs"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
                title="Download logs"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold mb-8 text-center">Daily Logs</h2>
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.date} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden mb-4">
                  <button 
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-zinc-800/50 transition-colors"
                    onClick={() => setExpandedDate(expandedDate === log.date ? null : log.date)}
                  >
                    <h3 className="text-lg font-medium">{formatDate(log.date)}</h3>
                    {expandedDate === log.date ? (
                      <ChevronUp className="h-5 w-5 text-zinc-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-zinc-400" />
                    )}
                  </button>
                  
                  {expandedDate === log.date && (
                    <LogBento log={log} />
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-zinc-400 text-lg">No logs yet, start journaling!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
