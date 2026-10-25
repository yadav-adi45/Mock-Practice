import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>{" | "}
      <Link to="/contacts">Contacts</Link>{" | "}
      <Link to="/add">Add Contact</Link>
    </nav>
  );
};

export default Navbar;
