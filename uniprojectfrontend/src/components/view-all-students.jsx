import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ViewAllStudents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cohort } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohort}`)
      .then((response) => response.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [cohort]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Students</h1>
        <p className="page-subtitle">Students enrolled in cohort {cohort}</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner"></div></div>
      ) : data.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/25 text-sm">No students found in this cohort.</p>
        </div>
      ) : (
        <div className="card-grid">
          {data.map((student, i) => (
            <div
              key={i}
              className="card p-6 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex items-start justify-between mb-1">
                <h2 className="text-[15px] font-medium text-white/80">
                  {student.first_name} {student.last_name}
                </h2>
                <span className="tag ml-3 shrink-0 font-mono text-[11px]">{student.student_id}</span>
              </div>
              {student.email && (
                <p className="text-xs text-white/25 mb-5 truncate">{student.email}</p>
              )}
              <Link
                to={`/student/${student.student_id}`}
                className="btn-outline text-xs w-full text-center mt-auto"
              >
                View Grades & Modules
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAllStudents;
