import React, { useState } from "react";

const SetModuleGrades = () => {
  const [formData, setFormData] = useState({ module: "", ca_mark: "", exam_mark: "", cohort: "", student: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/grade/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage("Grade submitted successfully."); setIsSuccess(true);
        setFormData({ module: "", ca_mark: "", exam_mark: "", cohort: "", student: "" });
      } else {
        const err = await response.json();
        setMessage(err.message || "Failed to submit grade."); setIsSuccess(false);
      }
    } catch { setMessage("An error occurred."); setIsSuccess(false); }
  };

  return (
    <div className="page-container">
      <div className="max-w-md mx-auto">
        <div className="page-header text-center">
          <h1 className="page-title">Set Grades</h1>
          <p className="page-subtitle">Enter module grade results</p>
        </div>

        <div className="card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Module Code</label>
              <input type="text" name="module" required className="form-input font-mono" placeholder="CA123" value={formData.module} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">CA Mark</label>
                <input type="number" name="ca_mark" required className="form-input" placeholder="0-100" value={formData.ca_mark} onChange={handleChange} min="0" max="100" />
              </div>
              <div>
                <label className="form-label">Exam Mark</label>
                <input type="number" name="exam_mark" required className="form-input" placeholder="0-100" value={formData.exam_mark} onChange={handleChange} min="0" max="100" />
              </div>
            </div>
            <div>
              <label className="form-label">Cohort</label>
              <input type="text" name="cohort" required className="form-input" placeholder="COMSCI1" value={formData.cohort} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">Student ID</label>
              <input type="text" name="student" required className="form-input font-mono" placeholder="12345678" value={formData.student} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-primary w-full">Submit Grade</button>
          </form>
          {message && <div className={isSuccess ? "alert-success" : "alert-error"}><p>{message}</p></div>}
        </div>
      </div>
    </div>
  );
};

export default SetModuleGrades;
