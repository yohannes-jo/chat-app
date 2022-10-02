import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

import Footer from "./Footer";
import SplashHeader from "./SplashHeader";

import './SignUp.css'

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [redirChats, setRedirChats] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (redirChats) {
    return <Navigate to="/chats" />
  }

  const signUp = () => {
    if (password === cPassword && password.length >= 8) {
      axios.post('http://localhost:5000/sign-up', {
        username: username,
        password: password
      }).then(() => {
        setRedirChats(true);
      })
    } else {
      setErrorMsg("Invalid input! (Check if passwords match and password length is > 8.")
    }
  }

  return (
    <div className="SignUp">
      <SplashHeader />
      <h2>Create a new account.</h2>
      <form className="SignUpForm">
        <div className="inputField">
          <label htmlFor='username'>Username</label>
          <input type="text" placeholder='username' required name='username' onChange={(event) => { setUsername(event.target.value) }} />
        </div>
        <div className='inputField'>
          <label htmlFor='password'>Password</label>
          <input type="password" placeholder='password' required name='password' onChange={(event) => { setPassword(event.target.value) }} />
        </div>
        <div className='inputField'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input type="password" placeholder='password' required name='confirmPassword' onChange={(event) => { setCPassword(event.target.value) }} />
        </div>
        <div className='ErrorMsg'>
          {errorMsg}
        </div>
        <button type='button' onClick={signUp}>Sign Up</button>
        <p>Already have an account? <Link to='/'>Sign In</Link></p>
      </form>
      <Footer />
    </div>
  )
}

export default SignUp;