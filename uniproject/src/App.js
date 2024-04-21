import { Link } from "react-router-dom";

const LinkButton = ({ to, children }) => (
  <Link
    to={to}
    className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-center m-2"
  >
    {children}
  </Link>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 text-center">DCU Archive & Database</h1>
      <div className="max-w-full mx-auto flex flex-wrap justify-center">
        <LinkButton to="/degrees">View All Degrees | </LinkButton>
        <LinkButton to="/cohorts">View All Cohorts | </LinkButton>
        <LinkButton to="/modules">View All Modules | </LinkButton>
        <LinkButton to="/create-degree">Create New Degree | </LinkButton>
        <LinkButton to="/create-cohort">Create New Cohort | </LinkButton>
        <LinkButton to="/create-module">Create New Module | </LinkButton>
        <LinkButton to="/create-student">Create New Student | </LinkButton>
        <LinkButton to="/set-module-grades">Set Module Grades | </LinkButton>
      </div>
    </div>
  );
}
