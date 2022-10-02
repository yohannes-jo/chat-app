import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'

import SplashHeader from './SplashHeader';
import Footer from './Footer';

import './SignIn.css';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [redirChats, setRedirChats] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:5000/sign-in").then((response) => {
      if (response.data.loggedIn === true) {
        document.cookie = "username=" + response.data.user;
      }
    });
  }, []);

  if (redirChats) {
    return <Navigate to="/chats" />
  }

  const signIn = () => {
    if (password.length < 8) {
      setErrorMsg("Password too short!")
    } else {
      axios.post('http://localhost:5000/sign-in', {
        username: username,
        password: password
      }).then(() => {
        setRedirChats(true);
      })
    }
  }

  return (
    <div className="SignIn">
      <SplashHeader />
      <h2>Welcome Back!</h2>
      <form className='SignInForm'>
        <div className="inputField">
          <label htmlFor='username'>Username</label>
          <input type="text" placeholder='username' required name='username' onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className='inputField'>
          <label htmlFor='password'>Password</label>
          <input type="password" placeholder='password' required name='password' onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div className='ErrorMsg'>
          {errorMsg}
        </div>
        <button type='button' onClick={signIn}>Sign In</button>
        <p>Don't have an account? <Link to='/sign-up'>Sign Up</Link></p>
      </form>
      <Footer />
    </div>
  )
}

export default SignIn;