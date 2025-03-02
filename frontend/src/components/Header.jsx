import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <h3>Finance Manager</h3>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/main">Main</Link></li>
      </ul>
    </nav>
  );
}

export default Header;
