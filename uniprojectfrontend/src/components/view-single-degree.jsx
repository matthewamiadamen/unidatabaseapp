import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

function ViewSingleDegree() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { degree } = useParams();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/degree/${degree}/`)
      .then((r) => r.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [degree]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Degree Details</h1>
        <p className="page-subtitle">Programme information</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner"></div></div>
      ) : (
        <div className="max-w-xl animate-slide-up">
          <div className="card p-8">
            <div className="detail-row">
              <span className="detail-label">Degree Name</span>
              <span className="detail-value">{data.full_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Shortcode</span>
              <span className="detail-value font-mono">{data.shortcode}</span>
            </div>
            <div className="pt-6">
              <Link to="/view-all-cohorts-degree" className="btn-primary w-full text-center">
                View Cohorts
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSingleDegree;
