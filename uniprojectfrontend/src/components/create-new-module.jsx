import React, { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

const CreateNewModule = () => {
  const [code, setCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [deliveredTo, setDeliveredTo] = useState([]);
  const [caSplit, setCaSplit] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/module/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, full_name: fullName, delivered_to: deliveredTo, ca_split: parseInt(caSplit) }),
      });
      if (response.ok) {
        setMessage("Module created successfully."); setIsSuccess(true);
        setCode(""); setFullName(""); setDeliveredTo([]); setCaSplit("");
      } else {
        const err = await response.json();
        setMessage(err.message || "Failed to create module."); setIsSuccess(false);
      }
    } catch { setMessage("An error occurred."); setIsSuccess(false); }
  };

  return (
    <div className="page-container">
      <div className="max-w-md mx-auto">
        <div className="page-header text-center">
          <h1 className="page-title">New Module</h1>
          <p className="page-subtitle">Add a course module</p>
        </div>

        <div className="card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Module Code</label>
              <input type="text" required className="form-input font-mono" placeholder="CA123" value={code} onChange={(e) => setCode(e.target.value)} maxLength={5} />
            </div>
            <div>
              <label className="form-label">Full Name</label>
              <input type="text" required className="form-input" placeholder="Introduction to Programming" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Delivered To <span className="text-white/15 normal-case tracking-normal">(comma-separated)</span></label>
              <input type="text" required className="form-input" placeholder="COMSCI1, COMSCI2" value={deliveredTo.join(", ")} onChange={(e) => setDeliveredTo(e.target.value.split(",").map((v) => v.trim()))} />
            </div>
            <div>
              <label className="form-label">CA Split (%)</label>
              <input type="number" required className="form-input" placeholder="40" value={caSplit} onChange={(e) => setCaSplit(e.target.value)} min="0" max="100" />
              {caSplit && (
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-white/20 mb-1">
                    <span>CA: {caSplit}%</span>
                    <span>Exam: {100 - parseInt(caSplit || 0)}%</span>
                  </div>
                  <div className="w-full bg-white/[0.04] rounded-full h-1">
                    <div className="bg-white/20 h-1 rounded-full transition-all duration-300" style={{ width: `${caSplit}%` }}></div>
                  </div>
                </div>
              )}
            </div>
            <button type="submit" className="btn-primary w-full">Create Module</button>
          </form>
          {message && <div className={isSuccess ? "alert-success" : "alert-error"}><p>{message}</p></div>}
        </div>
      </div>
    </div>
  );
};

export default CreateNewModule;
