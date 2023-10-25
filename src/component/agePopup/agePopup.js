import React, { useState, useEffect } from "react";
import "./agePopup.css";

const AgePopup = ({ onClose }) => {
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleConfirm = () => {
    if (!age || isNaN(age) || parseInt(age) < 1 || parseInt(age) > 100) {
      setMessage("Please enter a valid age.");
      setMessageType("error");
    } else {
      localStorage.setItem('age', age);
      setMessage("Age successfully set.");
      setMessageType("success");
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  return (
    <>
      <div className="age-popup-backdrop" />
      <div className="age-popup">
        <h2>Enter Your Age</h2>
        <label>
          Age
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        {message && <p className={`message ${messageType}`}>{message}</p>}
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </>
  );
};

export default AgePopup;
