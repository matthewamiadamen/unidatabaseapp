import React, { useState, useEffect } from "react";

function CreateNewStudent() {
  const usedValues = [];
  const [cohort, setCohort] = useState([]);
  const [degree, setDegree] = useState([]);
  
  const [form, setForm] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    cohort: ""
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/student/")
      .then((response) => response.json())
      .then((data) => setCohort(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cohort/")
      .then((response) => response.json())
      .then((data1) => setDegree(data1))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    fetch("http://127.0.0.1:8000/api/student/", {
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
          student_id: "",
          first_year: "",
          last_name: "",
          cohort: "",
        });
      });
  };

  const handleCohortChange = (event) => {
    const selectedCohort = event.target.value;
    setForm((prevState) => ({
      ...prevState,
      cohort: selectedCohort,
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
    <form id="student-form" onSubmit={handleSubmit}>
      <div>
        <label>Student ID </label>
        <input
          type="number"
          name="student_id"
          value={form.student_id}
          onChange={handleChange}
          min={10000000}
          max={99999999}
        />
      </div>
      <div>
        <label>First Name </label>
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name </label>
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          Cohort 
      <select name="student" value={form.cohort} onChange={handleCohortChange}>
      <option value="" disabled>Select Cohort</option>
      {cohort.map((cohortItem) => 
        degree.map((degreeItem) => {
          if (!usedValues.includes(cohortItem.cohort) && !usedValues.includes(degreeItem.name)) {
            usedValues.push(cohortItem.cohort);
            usedValues.push(degreeItem.name);
            return (
              <option key={`${degreeItem.degree}`} value={cohortItem.cohort}>
                {degreeItem.name}
              </option>
              );
            }
            return null; // Return null if condition is not met
          })
        )}
      </select>
      </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateNewStudent;