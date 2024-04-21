import React, { useState } from "react";

const SetModuleGrades = () => {
  const [formData, setFormData] = useState({
    module: "",
    ca_mark: "",
    exam_mark: "",
    cohort: "",
    student: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/grade/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Form submitted successfully.");
        // Reset form data if submission is successful
        setFormData({
          module: "",
          ca_mark: "",
          exam_mark: "",
          cohort: "",
          student: "",
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Set Module Grades
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="module" className="sr-only">
                Module:
              </label>
              <input
                type="text"
                id="module"
                name="module"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Module"
                value={formData.module}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="ca_mark" className="sr-only">
                CA Mark:
              </label>
              <input
                type="number"
                id="ca_mark"
                name="ca_mark"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="CA Mark"
                value={formData.ca_mark}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>
            <div>
              <label htmlFor="exam_mark" className="sr-only">
                Exam Mark:
              </label>
              <input
                type="number"
                id="exam_mark"
                name="exam_mark"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Exam Mark"
                value={formData.exam_mark}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>
            <div>
              <label htmlFor="cohort" className="sr-only">
                Cohort:
              </label>
              <input
                type="text"
                id="cohort"
                name="cohort"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Cohort"
                value={formData.cohort}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="student" className="sr-only">
                Student:
              </label>
              <input
                type="text"
                id="student"
                name="student"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Student"
                value={formData.student}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default SetModuleGrades;
