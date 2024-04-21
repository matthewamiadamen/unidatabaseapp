import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewSingleStudent() {
  const [data, setData] = useState({});
  const { student } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/${student}/`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [student]);

  return (
    <div className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          {data.first_name} {data.last_name}'s Grade Report
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-2 sm:px-6">
            <h2 className="text-lg font-semibold mb-2">Student ID:</h2>
            <p className="text-lg">{data.student_id}</p>
          </div>
          <div className="px-4 py-2 sm:px-6">
            <h2 className="text-lg font-semibold mb-2">First Name:</h2>
            <p className="text-lg">{data.first_name}</p>
          </div>
          <div className="px-4 py-2 sm:px-6">
            <h2 className="text-lg font-semibold mb-2">Last Name:</h2>
            <p className="text-lg">{data.last_name}</p>
          </div>
          <div className="px-4 py-2 sm:px-6">
            <h2 className="text-lg font-semibold mb-2">Cohort:</h2>
            <p className="text-lg">{data.cohort}</p>
          </div>
          <div className="px-4 py-2 sm:px-6">
            <h2 className="text-lg font-semibold mb-2">Email:</h2>
            <p className="text-lg">{data.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleStudent;
