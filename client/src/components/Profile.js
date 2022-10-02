import Header from './Header'
import Footer from './Footer'

import './Profile.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

function Profile() {
  const [user, setUser] = useState('');
  const [redirSignIn, setRedirSignIn] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/sign-in").then((response) => {
      if (response.data.loggedIn === true) {
        document.cookie = "username=" + response.data.user + ";";
        setUser(response.data.user);
      } else {
        setRedirSignIn(true);
      }
    });
  });

  if (redirSignIn) {
    <Navigate to="/" />
  }

  const updateProfile = () => {

  }
  
  return (
    <div className="Profile">
      <Header />
      <div className="Card">
        <h2>Change Your Profile Information</h2>
        <form className="ProfileForm">
          <div className="InputField">
            <label htmlFor="username">Username</label>
            <input name="username" required placeholder="Username" />
          </div>

          <div className="InputField">
            <label htmlFor="cPassword">Current Password</label>
            <input name="cPassword" required placeholder="Current Password" />
          </div>

          <div className="InputField">
            <label htmlFor="nPassword">New Password</label>
            <input name="nPassword" required placeholder="New Password" />
          </div>

          <div className="InputField">
            <label htmlFor="aPassword">Enter New Password Again</label>
            <input name="aPassword" required placeholder="One More Time" />
          </div>

          <button type="button" onClick={updateProfile}>Update Profile</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
