import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Layout from "./components/Layout";

import "./index.css";

import ViewAllDegrees from "./components/view-all-degrees";
import ViewSingleDegree from "./components/view-single-degree";
import ViewAllCohorts from "./components/view-all-cohorts";
import ViewSingleCohort from "./components/view-single-cohort";
import ViewAllStudents from "./components/view-all-students";
import ViewAllModules from "./components/view-all-modules";
import ViewSingleModule from "./components/view-single-module";
import ViewSingleStudent from "./components/view-single-student";
import ViewAllGrades from "./components/view-all-grades";
import ViewAllModulesCohort from "./components/view-all-modules-cohort";
import CreateNewDegree from "./components/create-new-degree";
import CreateNewCohort from "./components/create-new-cohort";
import CreateNewModule from "./components/create-new-module";
import CreateNewStudent from "./components/create-new-student";
import SetModuleGrades from "./components/set-module-grades";
import ViewAllCohortsDegree from "./components/view-all-cohorts-degree";
import GradeUpdateList from "./components/grade-update-list";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/create-degree" element={<CreateNewDegree />} />
          <Route path="/create-student" element={<CreateNewStudent />} />
          <Route path="/cohorts" element={<ViewAllCohorts />} />
          <Route path="/modules" element={<ViewAllModules />} />
          <Route path="/cohort/:cohort" element={<ViewSingleCohort />} />
          <Route path="/module/:module" element={<ViewSingleModule />} />
          <Route path="/degree/:degree" element={<ViewSingleDegree />} />
          <Route path="/degrees" element={<ViewAllDegrees />} />
          <Route path="/students/:cohort" element={<ViewAllStudents />} />
          <Route path="/student/:student" element={<ViewSingleStudent />} />
          <Route path="/create-module" element={<CreateNewModule />} />
          <Route path="/create-cohort" element={<CreateNewCohort />} />
          <Route path="/update-grades/:student" element={<GradeUpdateList />} />
          <Route path="/set-module-grades" element={<SetModuleGrades />} />
          <Route path="/view-all-grades" element={<ViewAllGrades />} />
          <Route path="/view-all-modules-cohort" element={<ViewAllModulesCohort />} />
          <Route path="/view-all-cohorts-degree" element={<ViewAllCohortsDegree />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
