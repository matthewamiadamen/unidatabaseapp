import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewAllModulesCohort() {
  const [data, setData] = useState([]);
  const { module } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${module}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [module]);

  const displayAllModulesCohort = () => {
    return (
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">
            All Modules Taken By {module}
          </h1>
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
                  <div className="flex justify-end">
                    <a
                      href={`/module/${module.code}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      View Module Info
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

  return displayAllModulesCohort();
}

export default ViewAllModulesCohort;
