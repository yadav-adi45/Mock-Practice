import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Books</Link>{" | "}
      <Link to="/history">Issue History</Link>
    </nav>
  );
};

export default Navbar;
