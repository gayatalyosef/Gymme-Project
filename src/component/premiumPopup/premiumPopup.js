import React from "react";
import "./premiumPopup.css";

const PremiumPopup = ({ onClose, isPremium }) => {
  return (
    <div className="premium-popup">
      {isPremium && <h3>{'\u{1F451}'}</h3>}
      {!isPremium && <h2>{'Congratulations!'}</h2>}
      <p>{isPremium ? 'You are already a premium member!' : 'You have activated the Premium account!'}</p>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default PremiumPopup;
