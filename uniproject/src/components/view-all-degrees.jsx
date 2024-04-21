import { useState, useEffect } from "react";

export default function ViewAllDegrees() {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/degree/")
      .then((response) => response.json())
      .then((data) => setDegrees(data));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">All Degrees</h1>
      <div className="grid grid-cols-1 gap-4">
        {degrees.map((degree, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <div className="px-6 py-4">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                {degree.full_name}
              </h2>
              <p className="text-gray-700">
                Shortname: <strong>{degree.shortcode}</strong>
              </p>
            </div>
            <div className="px-6 py-4">
              <a
                href={`/degree/${degree.shortcode}`}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                View Degree & Cohorts
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
