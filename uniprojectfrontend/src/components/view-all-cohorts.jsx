import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ViewAllCohorts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cohort/")
      .then((response) => response.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">All Cohorts</h1>
        <p className="page-subtitle">View and manage student cohorts</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner"></div></div>
      ) : data.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/25 text-sm">No cohorts found.</p>
        </div>
      ) : (
        <div className="card-grid">
          {data.map((cohort, i) => (
            <div
              key={i}
              className="card p-6 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-[15px] font-medium text-white/80">{cohort.name}</h2>
                <span className="tag ml-3 shrink-0">{cohort.id}</span>
              </div>
              <div className="flex gap-3 mt-5">
                <Link to={`/students/${cohort.id}`} className="btn-primary text-xs flex-1 text-center">
                  Students
                </Link>
                <Link to={`/modules-cohort/${cohort.id}`} className="btn-outline text-xs flex-1 text-center">
                  Modules
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAllCohorts;
