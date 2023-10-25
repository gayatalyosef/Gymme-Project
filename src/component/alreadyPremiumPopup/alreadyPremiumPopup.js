import React from "react";
import "./alreadyPremiumPopup.css";

const AlreadyPremiumPopup = ({ onClose }) => {
  return (
    <div className="already-premium-popup">
      {<h3>{'\u{1F451}'}</h3>}
      <p>{'You are already a premium member!'}</p>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default AlreadyPremiumPopup;
