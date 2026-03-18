import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ViewSingleStudent() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { student } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/${student}/`)
      .then((r) => r.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [student]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{data.first_name} {data.last_name}</h1>
        <p className="page-subtitle">Student profile</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner"></div></div>
      ) : (
        <div className="max-w-xl animate-slide-up">
          <div className="card p-8">
            <div className="detail-row">
              <span className="detail-label">Student ID</span>
              <span className="detail-value font-mono">{data.student_id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">First Name</span>
              <span className="detail-value">{data.first_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Last Name</span>
              <span className="detail-value">{data.last_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Cohort</span>
              <span className="detail-value">{data.cohort}</span>
            </div>
            {data.email && (
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{data.email}</span>
              </div>
            )}
            <div className="pt-6">
              <Link to="/view-all-grades" className="btn-primary w-full text-center">
                View Grade Report
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSingleStudent;
