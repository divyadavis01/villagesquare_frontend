import React from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="contact-page">

      {/* Header */}
      <header className="contact-header">
        <h1>Contact Manager / Help</h1>
        <p>We are here to assist you</p>
      </header>

      {/* Contact Info */}
      <section className="contact-info">
        <h2>Contact Information</h2>
        <p>📧 Email: support@villagesquare.com</p>
        <p>📞 Phone: +91 82810 19647</p>
      </section>

      {/* Help Section */}
      <section className="help-section">
        <h2>Help & FAQs</h2>
        <ul>
          <li>How to share resources?</li>
          <li>How to chat with other users?</li>
          <li>How to report an issue?</li>
          <li>How to contact community manager?</li>
        </ul>
      </section>

      {/* Actions */}
      <section className="contact-actions">
        <button onClick={() => navigate("/feedback")}>
          Give Feedback
        </button>
      </section>

      {/* Footer */}
      <footer className="contact-footer">
        <p>© 2026 Village Square</p>
      </footer>

    </div>
  );
}

export default Contact;