import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

function ViewSingleCohort() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { cohort } = useParams();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cohort/${cohort}/`)
      .then((r) => r.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [cohort]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Cohort Details</h1>
        <p className="page-subtitle">Cohort information</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner"></div></div>
      ) : (
        <div className="max-w-xl animate-slide-up">
          <div className="card p-8">
            <div className="detail-row">
              <span className="detail-label">Cohort ID</span>
              <span className="detail-value font-mono">{data.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Name</span>
              <span className="detail-value">{data.name}</span>
            </div>
            <div className="flex gap-3 pt-6">
              <Link to={`/students/${data.id}`} className="btn-primary flex-1 text-center">Students</Link>
              <Link to={`/modules-cohort/${data.id}`} className="btn-outline flex-1 text-center">Modules</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSingleCohort;
