import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

export default function ViewAllDegrees() {
  const [degrees, setDegrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/degree/`)
      .then((response) => response.json())
      .then((data) => { setDegrees(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">All Degrees</h1>
        <p className="page-subtitle">Browse all registered degree programmes</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner"></div></div>
      ) : degrees.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/25 text-sm">No degrees found.</p>
        </div>
      ) : (
        <div className="card-grid">
          {degrees.map((degree, i) => (
            <Link
              key={i}
              to={`/degree/${degree.shortcode}`}
              className="group card p-6 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-[15px] font-medium text-white/80 group-hover:text-white transition-colors">
                  {degree.full_name}
                </h2>
                <span className="tag ml-3 shrink-0">{degree.shortcode}</span>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-white/20 group-hover:text-white/40 transition-colors">
                  View details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
