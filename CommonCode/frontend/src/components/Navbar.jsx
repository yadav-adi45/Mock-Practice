import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>{" | "}
      <Link to="/items">Items</Link>{" | "}
      <Link to="/add">Add Item</Link>
    </nav>
  );
};

export default Navbar;
