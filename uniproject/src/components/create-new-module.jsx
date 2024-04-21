import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNewModule = () => {
  const [code, setCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [deliveredTo, setDeliveredTo] = useState([]);
  const [caSplit, setCaSplit] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/module/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          full_name: fullName,
          delivered_to: deliveredTo,
          ca_split: parseInt(caSplit),
        }),
      });

      if (response.ok) {
        setMessage("Module created successfully.");
        setCode("");
        setFullName("");
        setDeliveredTo([]);
        setCaSplit("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error creating module:", error);
      setMessage("An error occurred while creating the module.");
    }
  };

  const handleDeliveredToChange = (e) => {
    const values = e.target.value.split(",").map((value) => value.trim());
    setDeliveredTo(values);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Create a New Module
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Code:
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              className="input-field"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={5}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name:
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="input-field"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deliveredTo" className="block text-sm font-medium text-gray-700">
              Delivered To:
            </label>
            <input
              id="deliveredTo"
              name="deliveredTo"
              type="text"
              required
              className="input-field"
              placeholder="Delivered To"
              value={deliveredTo.join(", ")}
              onChange={handleDeliveredToChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="caSplit" className="block text-sm font-medium text-gray-700">
              CA Split:
            </label>
            <input
              id="caSplit"
              name="caSplit"
              type="number"
              required
              className="input-field"
              placeholder="CA Split"
              value={caSplit}
              onChange={(e) => setCaSplit(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-block px-6 py-3 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Create Module
            </button>
          </div>
        </form>
        {message && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
            <p>{message}</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateNewModule;
