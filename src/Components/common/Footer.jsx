import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">

        <p onClick={() => navigate("/feedback")} className="footer-link">
          Feedback / Suggestions
        </p>

        <p onClick={() => navigate("/contact")} className="footer-link">
          Contact Manager / Help
        </p>

        <p onClick={() => navigate("/about")} className="footer-link">
          About Community
        </p>

        <p onClick={() => navigate("/")} className="footer-link">
          Village Square
        </p>

      </div>
    </footer>
  );
}

export default Footer;