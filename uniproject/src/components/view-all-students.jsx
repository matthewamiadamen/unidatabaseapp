import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewAllStudents() {
  const [data, setData] = useState([]);
  const { cohort } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohort}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const displayAllStudents = () => {
    return (
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">
            All Students Taking {cohort}
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {data.map((student, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4">
                  <h5 className="text-xl font-semibold mb-2">
                    {student.first_name} {student.last_name}
                  </h5>
                  <p className="py-2">
                    Email: <strong>{student.email}</strong>
                  </p>
                  <p className="mb-2">
                    Student Number: <strong>{student.student_id}</strong>
                  </p>
                  <div className="flex justify-end">
                    <a
                      href={`/student/${student.student_id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      View Grades & Modules
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return displayAllStudents();
}

export default ViewAllStudents;
