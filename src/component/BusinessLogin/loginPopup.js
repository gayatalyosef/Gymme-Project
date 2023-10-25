import React, { useState } from "react";
import "./loginPopup.css";
import {useNavigate} from 'react-router-dom';

const LoginPopup = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();


  const handleSignIn = () => {
    console.log(
      "Signing in with business name:",
      businessName,
      "username",
      username,
      "and password:",
      password
    );

    const data = {
      username: username,
      password: password,
    };
    fetch("/api/get_business_owner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const response = data["message"];
        const errorMessage = "The username or password is incorrect";
        if (response === errorMessage) {
          setMessage(errorMessage);
          setMessageType("error");
        } else {
          setMessage("successfully signed in");
          setMessageType("success");
          // forward to business page
          localStorage.setItem('username', username);
          navigate("/myBusiness", { state: { username } });
        }
      })
      .catch((error) => {
        setMessage("An error occurred");
        setMessageType("error");
      });
    //onClose();
  };

  const handleSignUp = () => {
    // sign-up logic
    console.log(
      "Signing up with business name:",
      businessName,
      "username",
      username,
      "and password:",
      password
    );
    const data = {
      username: username,
      password: password,
      premium: 0,
    };
    fetch("/api/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const response = data["message"];
        const errorMessage = "The username already exists";
        if (response === errorMessage) {
          setMessage(errorMessage);
          setMessageType("error");
        } else {
          setMessage("successfully signed up");
          setMessageType("success");
          // forward to business page

        }
      })
      .catch((error) => alert(error));
    //onClose();
  };

  const switchForm = () => {
    setIsSignup(!isSignup);
    setUsername("");
    setPassword("");
    setBusinessName("");
  };

  return (
    <div className="login-popup">
      <h2>{isSignup ? "Business Owner Sign Up" : "Business Owner Login"}</h2>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {message && <p className={`message ${messageType}`}>{message}</p>}
      {isSignup ? (
        <button onClick={handleSignUp}>Sign Up</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button className="switch-form-btn" onClick={switchForm}>
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
      <button className="close-button" onClick={onClose}>
        Close
      </button>

    </div>
  );
};

export default LoginPopup;
