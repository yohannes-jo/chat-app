import { Link } from 'react-router-dom';
import './SplashHeader.css'

function SplashHeader() {
  return (
    <div className="SplashHeader">
      <nav className="navbar">
        <h2>Chatting Application</h2>
        <ul className="navitems">
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/">Log In</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SplashHeader;