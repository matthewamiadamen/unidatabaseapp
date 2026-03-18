import React, { useState, useEffect } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

function CreateNewStudent() {
  const usedValues = [];
  const [cohort, setCohort] = useState([]);
  const [degree, setDegree] = useState([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({ student_id: "", first_name: "", last_name: "", cohort: "" });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/student/`).then((r) => r.json()).then((d) => setCohort(d)).catch(console.log);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cohort/`).then((r) => r.json()).then((d) => setDegree(d)).catch(console.log);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/api/student/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((r) => { setMessage(r.ok ? "Student created successfully." : "Failed to create student."); setIsSuccess(r.ok); return r.json(); })
      .then(console.log)
      .finally(() => setForm({ student_id: "", first_name: "", last_name: "", cohort: "" }));
  };

  const handleChange = (e) => { const { name, value } = e.target; setForm((p) => ({ ...p, [name]: value })); };

  return (
    <div className="page-container">
      <div className="max-w-md mx-auto">
        <div className="page-header text-center">
          <h1 className="page-title">New Student</h1>
          <p className="page-subtitle">Enroll a student</p>
        </div>

        <div className="card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Student ID</label>
              <input type="number" name="student_id" value={form.student_id} onChange={handleChange} min={10000000} max={99999999} className="form-input font-mono" placeholder="12345678" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">First Name</label>
                <input type="text" name="first_name" value={form.first_name} onChange={handleChange} className="form-input" placeholder="John" required />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input type="text" name="last_name" value={form.last_name} onChange={handleChange} className="form-input" placeholder="Doe" required />
              </div>
            </div>
            <div>
              <label className="form-label">Cohort</label>
              <select name="student" value={form.cohort} onChange={(e) => setForm((p) => ({ ...p, cohort: e.target.value }))} className="form-input" required>
                <option value="" disabled>Select Cohort</option>
                {cohort.map((c) => degree.map((d) => {
                  if (!usedValues.includes(c.cohort) && !usedValues.includes(d.name)) {
                    usedValues.push(c.cohort); usedValues.push(d.name);
                    return <option key={d.degree} value={c.cohort}>{d.name}</option>;
                  }
                  return null;
                }))}
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">Create Student</button>
          </form>
          {message && <div className={isSuccess ? "alert-success" : "alert-error"}><p>{message}</p></div>}
        </div>
      </div>
    </div>
  );
}

export default CreateNewStudent;