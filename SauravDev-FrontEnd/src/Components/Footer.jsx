import React from "react";
import "../style/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>© Copyright Saurav Bhilare | All Rights Reserved</p>
      <div className="social-icons">
        <a href="https://github.com/sauravbhilare" target="_blank">
          <i class="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/saurav-bhilare-98b394269/"
          target="_blank"
        >
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
      <p style={{ marginTop: "10px" }}>
        Designed & Developed by
        <strong style={{ color: "#2a9d8f" }}> Saurav.Dev</strong>
      </p>
    </div>
  );
};

export default Footer;
