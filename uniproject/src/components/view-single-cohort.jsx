import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewSingleCohort() {
  const [data, setData] = useState({});
  const { cohort } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cohort/${cohort}/`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Single Cohort</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            <li className="py-4 px-6">
              <span className="font-semibold">ID:</span> {data.id}
            </li>
            <li className="py-4 px-6">
              <span className="font-semibold">Name:</span> {data.name}
            </li>
            <li className="py-4 px-6 flex justify-end">
              <a
                href={`/modules-cohort/${data.id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                View All Modules
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleCohort;
