import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GradeUpdateForm = ({ grade, student }) => {
  const [caMark, setCaMark] = useState(grade.ca_mark);
  const [examMark, setExamMark] = useState(grade.exam_mark);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/grade/${grade.id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ca_mark: caMark,
          exam_mark: examMark,
          total_grade: caMark * (grade.ca_split / 100) + examMark * (1 - grade.ca_split / 100),
        }),
      });
      if (response.ok) toast.success("Grade updated.");
      else toast.error("Failed to update grade.");
    } catch { toast.error("An error occurred."); }
  };

  useEffect(() => { setCaMark(grade.ca_mark); setExamMark(grade.exam_mark); }, [grade]);

  const moduleName = grade.module.split("/").filter(Boolean).pop();

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[15px] font-medium text-white/80">
            Module: <span className="font-mono text-white/50">{moduleName}</span>
          </h3>
          <p className="text-xs text-white/25 mt-0.5">Student: {student}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">CA Mark</label>
            <input type="number" required className="form-input" placeholder="CA Mark" value={caMark} onChange={(e) => setCaMark(e.target.value)} min="0" max="100" />
          </div>
          <div>
            <label className="form-label">Exam Mark</label>
            <input type="number" required className="form-input" placeholder="Exam Mark" value={examMark} onChange={(e) => setExamMark(e.target.value)} min="0" max="100" />
          </div>
        </div>
        <button type="submit" className="btn-primary w-full">Update Grade</button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default GradeUpdateForm;
