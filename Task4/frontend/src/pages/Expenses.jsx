import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/api/expenses");
      setExpenses(res.data.data);
    } catch (err) {
      setError("Failed to fetch expenses");
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await api.get("/api/expenses/summary");
      setSummary(res.data.data);
      setGrandTotal(res.data.grandTotal);
    } catch (err) {
      setError("Failed to fetch summary");
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/api/expenses", {
        title,
        amount: Number(amount),
        category,
        date: date || undefined,
      });
      setTitle("");
      setAmount("");
      setDate("");
      fetchExpenses();
      fetchSummary();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await api.delete(`/api/expenses/${id}`);
      fetchExpenses();
      fetchSummary();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <button onClick={handleLogout}>Logout</button>

      {error && <p>{error}</p>}

      <h2>Add Expense</h2>
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>

      <h2>Category Summary</h2>
      {summary.map((item) => (
        <p key={item.category}>
          {item.category}: Rs. {item.total}
        </p>
      ))}
      <h3>Grand Total: Rs. {grandTotal}</h3>

      <h2>My Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        <div>
          {expenses.map((exp) => (
            <div key={exp._id}>
              <p>Title: {exp.title}</p>
              <p>Amount: Rs. {exp.amount}</p>
              <p>Category: {exp.category}</p>
              <p>Date: {new Date(exp.date).toLocaleDateString()}</p>
              <button onClick={() => handleDelete(exp._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Expenses;
