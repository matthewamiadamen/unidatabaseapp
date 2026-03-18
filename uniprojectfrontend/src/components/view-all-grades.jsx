import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

function ViewAllGrades() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const { student } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/grade/?student=${student}`);
        const data = await response.json();
        setGrades(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching grades:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [student]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Grade Report</h1>
        <p className="page-subtitle">Academic results for student #{student}</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner"></div></div>
      ) : grades.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/25 text-sm">No grades recorded yet.</p>
        </div>
      ) : (
        <>
          <div className="card overflow-hidden animate-slide-up">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>CA Mark</th>
                    <th>Exam Mark</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade, i) => {
                    const total = grade.total_grade;
                    const color = total >= 70 ? "text-emerald-400/80" : total >= 50 ? "text-amber-400/80" : "text-red-400/80";
                    return (
                      <tr key={i}>
                        <td>
                          <Link
                            to={`/module/${grade.module.split("/").filter(Boolean).pop()}`}
                            className="text-white/60 hover:text-white transition-colors"
                          >
                            {grade.module.split("/").filter(Boolean).pop()}
                          </Link>
                        </td>
                        <td className="font-mono text-white/50">{grade.ca_mark}</td>
                        <td className="font-mono text-white/50">{grade.exam_mark}</td>
                        <td className={`font-mono font-medium ${color}`}>{total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to={`/update-grades/${student}`} className="btn-primary">Update Grades</Link>
            <Link to="/set-module-grades/" className="btn-outline">Set Module Grades</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewAllGrades;
