import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

function ViewAllModules() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/module/`)
      .then((response) => response.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">All Modules</h1>
        <p className="page-subtitle">Browse available course modules</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner"></div></div>
      ) : data.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/25 text-sm">No modules found.</p>
        </div>
      ) : (
        <div className="card-grid">
          {data.map((module, i) => (
            <Link
              key={i}
              to={`/module/${module.code}`}
              className="group card p-6 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-[15px] font-medium text-white/80 group-hover:text-white transition-colors">
                  {module.full_name}
                </h2>
                <span className="tag ml-3 shrink-0 font-mono text-[11px]">{module.code}</span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/25">CA Split</span>
                  <span className="text-white/50">{module.ca_split}%</span>
                </div>
                <div className="w-full bg-white/[0.04] rounded-full h-1">
                  <div
                    className="bg-white/20 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${module.ca_split}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-white/20">
                Delivered to: {Array.isArray(module.delivered_to) ? module.delivered_to.join(", ") : module.delivered_to}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAllModules;
