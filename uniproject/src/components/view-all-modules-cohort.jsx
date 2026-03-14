import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ViewAllModulesCohort() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { module } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${module}`)
      .then((r) => r.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [module]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Modules</h1>
        <p className="page-subtitle">Modules delivered to {module}</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner"></div></div>
      ) : data.length === 0 ? (
        <div className="text-center py-20"><p className="text-white/25 text-sm">No modules found.</p></div>
      ) : (
        <div className="card-grid">
          {data.map((mod, i) => (
            <Link
              key={i}
              to={`/module/${mod.code}`}
              className="group card p-6 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-[15px] font-medium text-white/80 group-hover:text-white transition-colors">{mod.full_name}</h2>
                <span className="tag ml-3 shrink-0 font-mono text-[11px]">{mod.code}</span>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-white/20 group-hover:text-white/40 transition-colors">View details →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAllModulesCohort;
