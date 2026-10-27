# 🚀 Complete MERN Exam Cheat-Sheet & Code Vault

> **Copy-paste ready code with zero styling (pure raw HTML) for exams.**  
> Everything you need in one file: terminal commands, universal backend/frontend boilerplate, and plug-and-play exam snippets.

---

## 📑 Table of Contents
1. [Terminal Setup Commands (Run First)](#1-terminal-setup-commands)
2. [Universal Backend Template (7 Files)](#2-universal-backend-template)
3. [Universal Frontend Template (ClassTest Pattern)](#3-universal-frontend-template)
4. [Special Exam Snippets (Plug & Play)](#4-special-exam-snippets)
   - [Snippet A: JWT Authentication & Auth Middleware](#snippet-a-jwt-authentication--auth-middleware)
   - [Snippet B: Search, Filter, Sort & Pagination](#snippet-b-search-filter-sort--pagination)
   - [Snippet C: MongoDB Aggregation (Summary & Grand Total)](#snippet-c-mongodb-aggregation)
   - [Snippet D: Increment / Decrement Stock & Copies](#snippet-d-increment--decrement-stock--copies)
   - [Snippet E: 400ms Search Debounce (Frontend)](#snippet-e-400ms-search-debounce-frontend)
   - [Snippet F: Axios Auth Interceptor & Protected Route](#snippet-f-axios-auth-interceptor--protected-route)

---

## 1. Terminal Setup Commands

### Backend Setup:
```bash
# 1. Inside your backend folder:
npm init -y

# 2. In package.json, add: "type": "module"

# 3. Install core backend packages:
npm i express mongoose cors dotenv

# 4. If the question requires JWT / Password Hashing:
npm i jsonwebtoken bcryptjs

# 5. Start the backend:
npm start   # (or node server.js)
```

### Frontend Setup:
```bash
# 1. Inside your project root:
npm create vite@latest frontend -- --template react

# 2. Go into frontend folder:
cd frontend

# 3. Install packages:
npm i axios react-router-dom

# 4. Clear App.css and index.css (keep them empty - no styling)

# 5. Start frontend:
npm run dev
```

---

## 2. Universal Backend Template

### File 1: `backend/package.json`
```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongoose": "^8.9.5"
  }
}
```

### File 2: `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/exam_db
JWT_SECRET=mysecretkey123
```

### File 3: `backend/server.js`
```javascript
import app from "./app.js";
import connectDB from "./config/db.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### File 4: `backend/app.js`
```javascript
import express from "express";
import cors from "cors";
import itemRoutes from "./routes/item.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(itemRoutes);

export default app;
```

### File 5: `backend/config/db.js`
```javascript
import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectDB;
```

### File 6: `backend/models/item.model.js`
```javascript
import mongoose from "mongoose";

// Replace field names with whatever is in the question:
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Example: category: { type: String, enum: ["Electronics", "Clothing"] }
    // Example: price: { type: Number, required: true, min: 0 }
    // Example: completed: { type: Boolean, default: false }
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
```

### File 7: `backend/controller/item.controller.js`
```javascript
import mongoose from "mongoose";
import Item from "../models/item.model.js";

// 1. GET ALL: GET /api/items (status 200)
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2. GET BY ID: GET /api/items/:id (status 200 or 404)
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 3. CREATE: POST /api/items (status 201 or 400)
export const createItem = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation
    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const newItem = await Item.create({ name: name.trim() });
    return res.status(201).json({ success: true, message: "Created successfully", data: newItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 4. UPDATE / TOGGLE: PUT/PATCH /api/items/:id (status 200 or 404)
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const updated = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    return res.status(200).json({ success: true, message: "Updated", data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 5. DELETE: DELETE /api/items/:id (status 200 or 404)
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const deleted = await Item.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    return res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
```

### File 8: `backend/routes/item.routes.js`
```javascript
import express from "express";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controller/item.controller.js";

const router = express.Router();

router.get("/api/items", getItems);
router.get("/api/items/:id", getItemById);
router.post("/api/items", createItem);
router.put("/api/items/:id", updateItem);
router.delete("/api/items/:id", deleteItem);

export default router;
```

---

## 3. Universal Frontend Template

*(Follows the exact `ClassTest` structure: `components/`, `pages/`, and `App.jsx` with `react-router-dom`)*

### File 1: `frontend/src/components/Navbar.jsx`
```jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>{" | "}
      <Link to="/items">Items List</Link>{" | "}
      <Link to="/add">Add Item</Link>
    </nav>
  );
};

export default Navbar;
```

### File 2: `frontend/src/pages/Home.jsx`
```jsx
const Home = () => {
  return (
    <main>
      <h1>Exam App</h1>
      <p>Welcome to the application.</p>
    </main>
  );
};

export default Home;
```

### File 3: `frontend/src/pages/AddItem.jsx` (Form Page)
```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddItem = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || name.trim() === "") {
      setError("Name is required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/items", { name });
      navigate("/items"); // redirect to list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add item");
    }
  };

  return (
    <div>
      <h1>Add Item</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddItem;
```

### File 4: `frontend/src/pages/Items.jsx` (List Page)
```jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data.data);
    } catch (err) {
      setError("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems(); // refresh list after delete
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  return (
    <div>
      <h1>Items List</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && items.length === 0 && <p>No items found</p>}

      <div>
        {items.map((item) => (
          <div key={item._id}>
            <p>Name: {item.name}</p>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
```

### File 5: `frontend/src/App.jsx`
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Items from "./pages/Items";
import AddItem from "./pages/AddItem";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

---

## 4. Special Exam Snippets

### Snippet A: JWT Authentication & Auth Middleware

#### 1. Register API (`POST /api/auth/register`):
```javascript
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword });

    return res.status(201).json({ success: true, message: "Registered", data: { id: user._id, name, email } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
```

#### 2. Login API (`POST /api/auth/login`):
```javascript
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ success: true, token, user: { id: user._id, name: user.name } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
```

#### 3. RequireAuth Middleware (`middleware/auth.middleware.js`):
```javascript
import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // attach user ID
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
```

---

### Snippet B: Search, Filter, Sort & Pagination

```javascript
// GET /api/products?search=...&category=...&minPrice=...&maxPrice=...&sort=...&page=1&limit=5
export const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort, page = 1, limit = 5 } = req.query;
    const query = {};

    // 1. Case-insensitive search on name
    if (search) query.name = { $regex: search.trim(), $options: "i" };

    // 2. Exact match filter
    if (category && category !== "All") query.category = category;

    // 3. Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 4. Sort
    let sortOptions = { createdAt: -1 };
    if (sort === "price_asc") sortOptions = { price: 1 };
    if (sort === "price_desc") sortOptions = { price: -1 };

    // 5. Pagination
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 5;
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sortOptions).skip(skip).limit(limitNum);

    return res.status(200).json({
      success: true,
      data: products,
      meta: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
```

---

### Snippet C: MongoDB Aggregation

```javascript
// GET /api/expenses/summary - Category totals and grand total
export const getExpenseSummary = async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user) } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $project: { _id: 0, category: "$_id", total: 1 } },
    ]);

    const grandTotal = summary.reduce((acc, curr) => acc + curr.total, 0);

    return res.status(200).json({ success: true, data: summary, grandTotal });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
```

---

### Snippet D: Increment / Decrement Stock & Copies

#### Stock Adjustment (`PATCH /api/products/:id/stock`):
```javascript
export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { change } = req.body; // e.g. +1 or -3

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Not found" });

    // Prevent stock going below 0:
    if (product.stock + change < 0) {
      return res.status(400).json({ success: false, message: "Insufficient stock" });
    }

    product.stock += change;
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
```

#### Issue Book Decrement (`POST /api/books/:id/issue`):
```javascript
export const issueBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberName } = req.body;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    if (book.availableCopies <= 0) {
      return res.status(400).json({ success: false, message: "No copies available" });
    }

    book.availableCopies -= 1;
    await book.save();

    const issue = await Issue.create({ book: book._id, memberName });
    return res.status(201).json(issue);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
```

---

### Snippet E: 400ms Search Debounce (Frontend)

```jsx
import { useState, useEffect } from "react";

const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 400);

  return () => clearTimeout(timer); // clears on next keystroke
}, [search]);

// Now pass `debouncedSearch` to your fetch function!
```

---

### Snippet F: Axios Auth Interceptor & Protected Route

#### `api.js` (Axios Interceptor):
```javascript
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000" });

// Automatically attach Bearer token:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-redirect to /login if 401 Unauthorized:
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
```

#### `ProtectedRoute.jsx`:
```jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
```
