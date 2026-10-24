import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 400ms search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        params: {
          search: debouncedSearch || undefined,
          category: category !== "All" ? category : undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          sort,
          page,
          limit: 5,
        },
      });
      setProducts(res.data.data);
      setPages(res.data.meta.pages);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, category, minPrice, maxPrice, sort, page]);

  // Adjust stock (+1 / -1)
  const handleStock = async (id, change) => {
    try {
      await axios.patch(`http://localhost:5000/api/products/${id}/stock`, {
        change,
      });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating stock");
    }
  };

  return (
    <div>
      <h1>Product Inventory</h1>

      {/* Search & Filters */}
      <input
        placeholder="Search name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}
      >
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Grocery">Grocery</option>
        <option value="Clothing">Clothing</option>
        <option value="Books">Books</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => {
          setMinPrice(e.target.value);
          setPage(1);
        }}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => {
          setMaxPrice(e.target.value);
          setPage(1);
        }}
      />

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>

      <hr />

      {/* Loading, Error, Empty States */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && products.length === 0 && <p>No products found</p>}

      {/* Product Table */}
      {!loading && products.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                style={{
                  backgroundColor: p.stock < 5 ? "#ffdddd" : "transparent",
                }}
              >
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => handleStock(p._id, 1)}>+1</button>{" "}
                  <button onClick={() => handleStock(p._id, -1)}>-1</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <br />
      <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
        Previous
      </button>
      <span>
        {" "}
        Page {page} of {pages}{" "}
      </span>
      <button onClick={() => setPage(page + 1)} disabled={page >= pages}>
        Next
      </button>
    </div>
  );
};

export default App;
