import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <div className="Header">
      <nav className="navbar">
        <h2>Chatting Application</h2>
        <ul className="navitems">
          <li>
            <Link to="/chats">Chats</Link>
          </li>
          <li>
            <Link to="/send">Send Message</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/">Log Out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
