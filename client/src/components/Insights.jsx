import { useEffect, useState } from "react";
import axios from "axios";

export default function Insights({ userId, refreshTrigger }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/insights/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching insights:", error);
        setError("Failed to load insights");
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchInsights();
    }
  }, [userId, refreshTrigger]);

  if (loading) return <div className="text-center"><p>Loading insights...</p></div>;
  if (error) return <div className="text-center"><p className="text-danger">{error}</p></div>;
  if (!data) return <div className="text-center"><p>No insights data available</p></div>;

  return (
    <div className="insights-card card p-3 mb-3">
      <h3 className="text-center mb-3">📊 Monthly Insights</h3>
      <div className="insights-grid row">
        <div className="insight-item col-md-3 col-sm-6 mb-2">
          <div className="card h-100">
            <div className="card-body text-center">
              <span className="label d-block text-muted">This Month</span>
              <span className="value h4 text-primary">₹{data.currentTotal}</span>
            </div>
          </div>
        </div>
        <div className="insight-item col-md-3 col-sm-6 mb-2">
          <div className="card h-100">
            <div className="card-body text-center">
              <span className="label d-block text-muted">Last Month</span>
              <span className="value h4 text-secondary">₹{data.prevTotal}</span>
            </div>
          </div>
        </div>
        <div className="insight-item col-md-3 col-sm-6 mb-2">
          <div className="card h-100">
            <div className="card-body text-center">
              <span className="label d-block text-muted">Change</span>
              <span className={`value h4 ${data.change >= 0 ? 'text-danger' : 'text-success'}`}>
                {data.change}%
              </span>
            </div>
          </div>
        </div>
        <div className="insight-item col-md-3 col-sm-6 mb-2">
          <div className="card h-100">
            <div className="card-body text-center">
              <span className="label d-block text-muted">Top Category</span>
              <span className="value h4 text-info">{data.topCategory || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}