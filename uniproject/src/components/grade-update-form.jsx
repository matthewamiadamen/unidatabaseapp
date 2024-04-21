import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GradeUpdateForm = ({ grade, student }) => {
  const [caMark, setCaMark] = useState(grade.ca_mark);
  const [examMark, setExamMark] = useState(grade.exam_mark);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/grade/${grade.id}/`,
        {
          method: "PATCH", // Use PATCH method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ca_mark: caMark,
            exam_mark: examMark,
            total_grade:
              caMark * (grade.ca_split / 100) +
              examMark * (1 - grade.ca_split / 100),
          }),
        }
      );

      if (response.ok) {
        toast.success("Grade updated successfully.");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error updating grade:", error);
      toast.error("An error occurred while updating the grade.");
    }
  };

  useEffect(() => {
    setCaMark(grade.ca_mark);
    setExamMark(grade.exam_mark);
  }, [grade]);

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update {student} Grade for Module{" "}
            {grade.module
              .split("/")
              .filter((part) => !!part)
              .pop()}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="caMark" className="sr-only">
                CA Mark:
              </label>
              <input
                id="caMark"
                name="caMark"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="CA Mark"
                value={caMark}
                onChange={(e) => setCaMark(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="examMark" className="sr-only">
                Exam Mark:
              </label>
              <input
                id="examMark"
                name="examMark"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Exam Mark"
                value={examMark}
                onChange={(e) => setExamMark(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Grade
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default GradeUpdateForm;
