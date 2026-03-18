import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GradeUpdateForm from "./grade-update-form";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

const GradeUpdateList = ({ studentId }) => {
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { student } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/grade/?student=${student}`);
        if (!response.ok) throw new Error("Failed to fetch grades");
        const data = await response.json();
        setGrades(data);
        setIsLoading(false);
      } catch { setError("Error fetching grades"); setIsLoading(false); }
    };
    fetchData();
  }, [studentId, student]);

  const handleAddInfo = () => {
    setGrades([...grades, { id: "", module: "", ca_mark: 0, exam_mark: 0, cohort: "", total_grade: 0, student: `${student}` }]);
  };

  return (
    <div className="page-container">
      <div className="max-w-xl mx-auto">
        <div className="page-header">
          <h1 className="page-title">Update Grades</h1>
          <p className="page-subtitle">Modify grades for student #{student}</p>
        </div>

        {isLoading && <div className="flex justify-center py-20"><div className="spinner"></div></div>}
        {error && <div className="alert-error"><p>{error}</p></div>}

        {!isLoading && !error && (
          <div className="space-y-5">
            {grades.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white/25 text-sm mb-6">No grades found for this student.</p>
                <button onClick={handleAddInfo} className="btn-outline">Add Grade</button>
              </div>
            ) : (
              <>
                {grades.map((grade, i) => (
                  <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}>
                    <GradeUpdateForm grade={grade} student={student} />
                  </div>
                ))}
                <div className="text-center pt-2">
                  <button onClick={handleAddInfo} className="btn-outline">Add More</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeUpdateList;
