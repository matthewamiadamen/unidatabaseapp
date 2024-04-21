import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GradeForm = ({ cohort }) => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    if (cohort) {
      fetch(`${cohort}`)
        .then((response) => response.json())
        .then((data) => setModules(data))
        .catch((error) => {
          console.error("Error fetching modules:", error);
          toast.error("Failed to fetch modules");
        });
    }
  }, [cohort]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/grade/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cohort: cohort,
          module: selectedModule,
          grade: grade,
        }),
      });
      if (response.ok) {
        console.log("Grade updated successfully");
        // Optionally reset form fields or show success message
      } else {
        console.error("Error updating grade:", response.statusText);
        toast.error("Failed to update grade");
      }
    } catch (error) {
      console.error("Error updating grade:", error);
      toast.error("An error occurred while updating grade");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Student Grades
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="module"
              className="block text-sm font-medium text-gray-700"
            >
              Module
            </label>
            <select
              id="module"
              name="module"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
            >
              <option value="">Select a module</option>
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))}
            </select>
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
      <ToastContainer />
    </div>
  );
};

export default GradeForm;
