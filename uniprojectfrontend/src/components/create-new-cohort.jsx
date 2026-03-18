import React, { useState, useEffect } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

function CreateCohort() {
  const usedValues = [];
  const [cohort, setCohort] = useState([]);
  const [degree, setDegree] = useState([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({ id: "", year: "", degree: "" });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cohort/`).then((r) => r.json()).then((d) => setCohort(d)).catch(console.log);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/degree/`).then((r) => r.json()).then((d) => setDegree(d)).catch(console.log);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/api/cohort/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((r) => { setMessage(r.ok ? "Cohort created successfully." : "Failed to create cohort."); setIsSuccess(r.ok); return r.json(); })
      .then(console.log)
      .finally(() => setForm({ id: "", year: "", degree: "" }));
  };

  const handleChange = (e) => { const { name, value } = e.target; setForm((p) => ({ ...p, [name]: value })); };

  return (
    <div className="page-container">
      <div className="max-w-md mx-auto">
        <div className="page-header text-center">
          <h1 className="page-title">New Cohort</h1>
          <p className="page-subtitle">Register a student cohort</p>
        </div>

        <div className="card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Cohort ID</label>
              <input type="text" name="id" value={form.id} onChange={handleChange} className="form-input font-mono" placeholder="COMSCI1" required />
            </div>
            <div>
              <label className="form-label">Year</label>
              <input type="number" name="year" value={form.year} onChange={handleChange} max={4} className="form-input" placeholder="1" required />
            </div>
            <div>
              <label className="form-label">Degree Programme</label>
              <select name="cohort" value={form.degree} onChange={(e) => setForm((p) => ({ ...p, degree: e.target.value }))} className="form-input" required>
                <option value="" disabled>Select Degree</option>
                {cohort.map((c) => degree.map((d) => {
                  if (!usedValues.includes(c.id) && !usedValues.includes(d.full_name)) {
                    usedValues.push(c.degree); usedValues.push(d.full_name);
                    return <option key={d.full_name} value={c.degree}>{d.full_name}</option>;
                  }
                  return null;
                }))}
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">Create Cohort</button>
          </form>
          {message && <div className={isSuccess ? "alert-success" : "alert-error"}><p>{message}</p></div>}
        </div>
      </div>
    </div>
  );
}

export default CreateCohort;