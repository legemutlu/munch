import React from "react";
import "./Footer.css";
import logo from "../../images/diner.png";
const Footer = () => {
  return (
    <div className="footer">
      <img src={logo} className="footer-logo"></img>
      <div className="footer-text">Footer</div>
    </div>
  );
};

export default Footer;
