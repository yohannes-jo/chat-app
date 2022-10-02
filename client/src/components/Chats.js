import { useEffect, useState } from 'react';
import axios from 'axios'
import Header from './Header';
import Footer from './Footer';

import './Chats.css'
import { Navigate } from 'react-router-dom';

function Chats() {
  axios.defaults.withCredentials = true;

  const [id, setID] = useState('');
  const [user, setUser] = useState('');
  const [texts, setTexts] = useState([]);
  const [redirSignIn, setRedirSignIn] = useState(false);


  const parseCookie = (str) => {
    str
      .split(';')
      .map(v => v.split('='))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {});
  }

  useEffect(() => {
    axios.get("http://localhost:5000/sign-in").then((response) => {
      if (response.data.loggedIn === true) {
        document.cookie = "id=" + response.data.id;
        document.cookie = "username=" + response.data.user;
        setUser(response.data.user)
        setID(response.data.id)
      } else {
        setRedirSignIn(true);
      }
    })
      .then(() => {
        axios.get(`http://localhost:5000/${id}/texts`).then((response) => {
          setTexts(response.data)
        })
      });
  }, []);

  if (redirSignIn) {
    return <Navigate to="/" />
  }

  return (
    <div className="Chats">
      <Header />
      <h2>Hello, {user}!</h2>

      <table className='chats-table'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Text</td>
          </tr>
        </thead>
        <tbody>
          {
            texts.map((text) => {
              <tr key={text.id}>
                <td>{text.sender}</td>
                <td>{text.text}</td>
              </tr>
            })
          }
        </tbody>
      </table>
      <Footer />
    </div>
  )
}

export default Chats;