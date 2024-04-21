import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewSingleDegree() {
  const [data, setData] = useState({});
  const { degree } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/degree/${degree}/`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [degree]);

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Degree Information</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-semibold mb-2">Degree Name:</h2>
            <p className="text-lg">
              <strong>{data.full_name}</strong>
            </p>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-semibold mb-2">Degree Code:</h2>
            <p className="text-lg">
              <strong>{data.shortcode}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleDegree;
