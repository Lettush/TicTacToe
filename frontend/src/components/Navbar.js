import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">Tic Tac Toe</Link>
      </div>
    </nav>
  );
};

export default Navbar;
