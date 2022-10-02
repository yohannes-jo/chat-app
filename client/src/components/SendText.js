import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import "./SendText.css";

function SendText() {
  const [text, setText] = useState("");
  const [id, setID] = useState(0);
  const [user, setUser] = useState("");
  const [recieverUsername, setRecieverUsername] = useState("");
  const [reciever, setReciever] = useState(0);
  const [redirSignIn, setRedirSignIn] = useState(false);

  const parseCookie = (str) => {
    str
      .split(";")
      .map((v) => v.split("="))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {});
  };

  useEffect(() => {
    axios.get("http://localhost:5000/sign-in").then((response) => {
      if (response.data.loggedIn === true) {
        document.cookie = "id=" + response.data.id + ";";
        document.cookie = "username=" + response.data.user + ";";
        setUser(response.data.user);
        setID(response.data.id);
      } else {
        setRedirSignIn(true);
      }
    });
  });

  const sendMessage = () => {
    let cookies = parseCookie(document.cookie);
    const sender = cookies.id;
    axios
      .get(`http://localhost:5000/get-user/${recieverUsername}`)
      .then((response) => {
        setReciever(response.data[0].id);
      })
      .then(() => {
        axios
          .post(`http://localhost:5000/send-text`, {
            sender: sender,
            reciever: reciever,
            text: text,
          })
          .then(() => {
            alert("Message sent!");
          });
      });
  };

  if (redirSignIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="SendText">
      <Header />
      <form className="SendTextForm">
        <h2>Sending to Someone</h2>
        <div className="InputField">
          <label htmlFor="user">Send to</label>
          <input
            placeholder="username"
            name="user"
            onChange={(event) => setRecieverUsername(event.target.value)}
          />
        </div>
        <div className="InputField">
          <label htmlFor="text">Text</label>
          <textarea
            rows="10"
            cols="80"
            name="text"
            onChange={(event) => {
              setText(event.target.value);
            }}
            required
            placeholder="Write your message here"
          />
        </div>

        <button type="button" onClick={sendMessage}>
          Send Message
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default SendText;
