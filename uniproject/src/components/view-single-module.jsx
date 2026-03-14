import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewSingleModule() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { module } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/module/${module}/`)
      .then((r) => r.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [module]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Module Details</h1>
        <p className="page-subtitle">Module information and delivery</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner"></div></div>
      ) : (
        <div className="max-w-xl animate-slide-up">
          <div className="card p-8">
            <div className="detail-row">
              <span className="detail-label">Module Name</span>
              <span className="detail-value">{data.full_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Code</span>
              <span className="detail-value font-mono">{data.code}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">CA Split</span>
              <div className="flex items-center gap-3">
                <span className="detail-value">{data.ca_split}%</span>
                <div className="w-20 bg-white/[0.04] rounded-full h-1.5">
                  <div className="bg-white/20 h-1.5 rounded-full" style={{ width: `${data.ca_split}%` }}></div>
                </div>
              </div>
            </div>
            <div className="pt-4 pb-1">
              <span className="detail-label block mb-3">Delivered To</span>
              <div className="flex flex-wrap gap-2">
                {data.delivered_to &&
                  data.delivered_to.map((item, i) => (
                    <span key={i} className="tag">{item}</span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSingleModule;
