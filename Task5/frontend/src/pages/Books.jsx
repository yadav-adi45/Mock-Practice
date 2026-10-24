import { useState, useEffect } from "react";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data.data);
    } catch (err) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:5000/api/books", {
        title,
        author,
        totalCopies: Number(totalCopies),
      });
      setTitle("");
      setAuthor("");
      setTotalCopies("");
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book");
    }
  };

  const handleIssue = async (bookId) => {
    setError("");
    const memberName = window.prompt("Enter member name:");
    if (!memberName || memberName.trim() === "") return;

    try {
      await axios.post(`http://localhost:5000/api/books/${bookId}/issue`, {
        memberName,
      });
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to issue book");
    }
  };

  return (
    <div>
      <h1>Library Books</h1>

      {/* Add Book Form */}
      <h2>Add Book</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total Copies"
          value={totalCopies}
          onChange={(e) => setTotalCopies(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>

      {/* Error & Loading */}
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && books.length === 0 && <p>No books available</p>}

      {/* Books List */}
      <h2>Available Books</h2>
      <div>
        {books.map((book) => (
          <div key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>
              Available: {book.availableCopies} / {book.totalCopies}
            </p>
            <button
              disabled={book.availableCopies <= 0}
              onClick={() => handleIssue(book._id)}
            >
              Issue Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
