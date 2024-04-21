import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GradeUpdateForm from "./grade-update-form";

const GradeUpdateList = ({ studentId }) => {
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { student } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/grade/?student=${student}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch grades");
        }
        const data = await response.json();
        setGrades(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching grades");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  const handleAddInfo = () => {
    // Render a form for adding grades
    setGrades([
      ...grades,
      {
        id: "",
        module: "",
        ca_mark: 0,
        exam_mark: 0,
        cohort: "",
        total_grade: 0,
        student: `${student}`,
      },
    ]);
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center">{error}</p>}
      {!isLoading && !error && (
        <div>
          {grades.length === 0 ? (
            <div className="text-center">
              <p>No grades found.</p>
              <button
                onClick={handleAddInfo}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Information
              </button>
            </div>
          ) : (
            <>
              {grades.map((grade, index) => (
                <div key={index} className="mt-4">
                  <GradeUpdateForm grade={grade} student={student} />
                  <hr className="my-4" />
                </div>
              ))}
              <button
                onClick={handleAddInfo}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add More Information
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GradeUpdateList;
