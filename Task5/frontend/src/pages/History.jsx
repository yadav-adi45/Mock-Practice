import { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchIssues = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/issues");
      setIssues(res.data.data);
    } catch (err) {
      setError("Failed to fetch issue history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleReturn = async (issueId) => {
    setError("");
    try {
      await axios.post(`http://localhost:5000/api/issues/${issueId}/return`);
      fetchIssues();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to return book");
    }
  };

  return (
    <div>
      <h1>Issue History</h1>

      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && issues.length === 0 && <p>No issues found</p>}

      <div>
        {issues.map((issue) => (
          <div key={issue._id}>
            <p>Member: {issue.memberName}</p>
            <p>Book: {issue.book?.title || "Unknown Book"}</p>
            <p>Issued: {new Date(issue.issuedAt).toLocaleDateString()}</p>
            <p>
              Status:{" "}
              {issue.returnedAt
                ? `Returned on ${new Date(issue.returnedAt).toLocaleDateString()}`
                : "Pending"}
            </p>
            {!issue.returnedAt && (
              <button onClick={() => handleReturn(issue._id)}>
                Return Book
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
