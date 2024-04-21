import React, { useState, useEffect } from "react";

function CreateCohort() {
  const usedValues = [];
  const [cohort, setCohort] = useState([]);
  const [degree, setDegree] = useState([]);
  const [form, setForm] = useState({
    id: "",
    year: "",
    degree: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cohort/")
      .then((response) => response.json())
      .then((data) => setCohort(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/degree/")
      .then((response) => response.json())
      .then((data1) => setDegree(data1))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    fetch("http://127.0.0.1:8000/api/cohort/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .finally(() => {
        setForm({
          id: "",
          year: "",
          degree: "",
        });
      });
  };

  const handleCohortChange = (event) => {
    const selectedCohort = event.target.value;
    setForm((prevState) => ({
      ...prevState,
      degree: selectedCohort,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form id="cohort-form" onSubmit={handleSubmit}>
      <div>
        <label>ID </label>
        <input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Year </label>
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          max={4}
        />
      </div>
      <div>
        <label>
          Degree
          <select name="cohort" value={form.cohort} onChange={handleCohortChange}>
          <option value="" disabled selected>Select Degree</option>
          {cohort.map((cohort) => 
            degree.map((degree) => {
              if (!usedValues.includes(cohort.id) && !usedValues.includes(degree.full_name)) {
                usedValues.push(cohort.degree);
                usedValues.push(degree.full_name);
            return (
            <option key={degree.full_name} value={cohort.degree}>
                {degree.full_name}
            </option>
            );
              }
            })
          )}
          </select>
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default CreateCohort;