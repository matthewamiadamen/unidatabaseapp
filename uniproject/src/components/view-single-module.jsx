import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewSingleModule() {
  const [data, setData] = useState({});
  const { module } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/module/${module}/`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Module Information</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-semibold mb-2">Module Name:</h2>
            <p className="text-lg">{data.full_name}</p>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-semibold mb-2">Module Code:</h2>
            <p className="text-lg">{data.code}</p>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-semibold mb-2">CA Split:</h2>
            <p className="text-lg">{data.ca_split}</p>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-semibold mb-2">Delivered To:</h2>
            <ul className="list-group">
              {data.delivered_to &&
                data.delivered_to.map((item, index) => (
                  <li key={index} className="list-group-item">
                    <a href={item}>{item}</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleModule;
