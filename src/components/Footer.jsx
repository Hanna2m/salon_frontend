import React from "react";
import logo from "../assets/logo.png";
import facebook from "../assets/icon-facebook.svg";
import instagram from "../assets/icon-instagram.svg";
import twitter from "../assets/icon-twitter.svg";

import "../components/styles/_footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="" />
      </div>
      <div className="footer-hours">
        <ul>
          <li>Operating hours:</li>
          <li>Mon-Fri: 0900-1800</li>
          <li>Sat-Sun: 0900-1730</li>
          <li>Public holidays closed</li>
        </ul>
      </div>

      <div className="footer-socials-container">
        <img className="social-icon" src={facebook} alt="link to facebook" />
        <img className="social-icon" src={instagram} alt="link to instagram" />
        <img className="social-icon" src={twitter} alt="link to twitter" />
      </div>
    </footer>
  );
}

export default Footer;
