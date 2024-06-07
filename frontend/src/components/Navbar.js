import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>Tic Tac Toe</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
