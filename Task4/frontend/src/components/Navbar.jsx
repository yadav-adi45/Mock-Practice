import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/register">Register</Link>{" | "}
      <Link to="/login">Login</Link>{" | "}
      <Link to="/expenses">Expenses</Link>
    </nav>
  );
};

export default Navbar;
