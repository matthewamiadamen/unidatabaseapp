import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GradeForm = ({ cohort }) => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");

  useEffect(() => {
    if (cohort) {
      fetch(`${cohort}`).then((r) => r.json()).then((d) => setModules(d))
        .catch(() => toast.error("Failed to fetch modules"));
    }
  }, [cohort]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/grade/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cohort, module: selectedModule }),
      });
      if (response.ok) toast.success("Grade updated");
      else toast.error("Failed to update grade");
    } catch { toast.error("An error occurred"); }
  };

  return (
    <div className="page-container">
      <div className="max-w-md mx-auto">
        <div className="page-header text-center">
          <h1 className="page-title">Update Grades</h1>
          <p className="page-subtitle">Select module and enter grade</p>
        </div>

        <div className="card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Module</label>
              <select className="form-input" value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)}>
                <option value="">Select a module</option>
                {modules.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">Update Grade</button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default GradeForm;
