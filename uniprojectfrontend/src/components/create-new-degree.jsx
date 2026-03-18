import React, { useState } from "react";

const CreateNewDegree = () => {
  const [fullName, setFullName] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/degree/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, shortcode }),
      });
      if (response.ok) {
        setMessage("Degree created successfully.");
        setIsSuccess(true);
        setFullName("");
        setShortcode("");
      } else {
        const err = await response.json();
        setMessage(err.message || "Failed to create degree.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("An error occurred.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="page-container">
      <div className="max-w-md mx-auto">
        <div className="page-header text-center">
          <h1 className="page-title">New Degree</h1>
          <p className="page-subtitle">Add a degree programme</p>
        </div>

        <div className="card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input id="fullName" type="text" required className="form-input" placeholder="Bachelor of Science in Computing" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="shortcode" className="form-label">Shortcode</label>
              <input id="shortcode" type="text" required className="form-input font-mono" placeholder="COMSCI" value={shortcode} onChange={(e) => setShortcode(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary w-full">Create Degree</button>
          </form>
          {message && <div className={isSuccess ? "alert-success" : "alert-error"}><p>{message}</p></div>}
        </div>
      </div>
    </div>
  );
};

export default CreateNewDegree;