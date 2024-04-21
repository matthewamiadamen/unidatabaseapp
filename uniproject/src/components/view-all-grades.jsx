import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewAllGrades() {
  const [grades, setGrades] = useState([]);
  const { student } = useParams();

  useEffect(() => {
    fetchData();
  }, [student]); // Include student in the dependency array

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/grade/?student=${student}`
      );
      const data = await response.json();
      setGrades(data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">All Grades</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Module
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  CA Mark
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Exam Mark
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Grade
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`/module/${grade.module
                        .split("/")
                        .filter((part) => !!part)
                        .pop()}`}
                      className="text-blue-500 underline"
                    >
                      {grade.module
                        .split("/")
                        .filter((part) => !!part)
                        .pop()}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.ca_mark}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.exam_mark}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.total_grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a
          href={`/update-grades/${student}`}
          className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Update Grades
        </a>
        <a
          href="/set-module-grades/"
          className="inline-block ml-4 mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Set Modules Grades
        </a>
      </div>
    </div>
  );
}

export default ViewAllGrades;
