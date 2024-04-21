import { useState, useEffect } from "react";

function ViewAllModules() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/module/")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const displayAllModules = () => {
    return (
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">All Modules</h1>
          <div className="grid grid-cols-1 gap-4">
            {data.map((module, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4">
                  <h5 className="text-xl font-semibold mb-2">
                    {module.code} {module.full_name}
                  </h5>
                  <p className="text-gray-600 text-sm">
                    CA Split: <strong>{module.ca_split}</strong>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Delivered To: <strong>{module.delivered_to}</strong>
                  </p>
                  <div className="flex justify-end">
                    <a
                      href={`/module/${module.code}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      View Module
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

  return displayAllModules();
}

export default ViewAllModules;
