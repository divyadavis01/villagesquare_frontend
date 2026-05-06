import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* 🔹 HEADER SECTION */}
      <header className="about-header">
        <h1 className="about-title">Village Square</h1>
        <p className="about-subtitle">
          Building Stronger Communities Through Resource Sharing
        </p>
      </header>

      {/* 🔹 INTRODUCTION SECTION */}
      <section className="about-introduction">
        <h2 className="section-title">About Community</h2>
        <p className="section-text">
          Village Square is a community resource sharing platform designed to
          connect people within a locality. It allows users to share resources,
          communicate easily, and support each other in daily needs.
        </p>
      </section>

      {/* 🔹 MISSION SECTION */}
      <section className="about-mission">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-text">
          Our mission is to create a connected and helpful environment where
          people can collaborate, share resources, and build stronger community bonds.
        </p>
      </section>

      {/* 🔹 FEATURES SECTION */}
      <section className="about-features">
        <h2 className="section-title">Key Features</h2>
        <ul className="features-list">
          <li className="feature-item">Resource sharing among users</li>
          <li className="feature-item">Real-time chat system</li>
          <li className="feature-item">Broadcast announcements</li>
          <li className="feature-item">Location-based services</li>
          <li className="feature-item">Issue reporting system</li>
        </ul>
      </section>

      {/* 🔹 HOW IT WORKS SECTION */}
      <section className="about-working">
        <h2 className="section-title">How It Works</h2>
        <ol className="working-steps">
          <li className="step-item">Register and login to the platform</li>
          <li className="step-item">Post or request resources</li>
          <li className="step-item">Connect with other community members</li>
          <li className="step-item">Share and receive help</li>
        </ol>
      </section>

      {/* 🔹 ROLES SECTION */}
      <section className="about-roles">
        <h2 className="section-title">User Roles</h2>
        <div className="roles-container">
          <div className="role-card">
            <h3>Local User</h3>
            <p>Can share resources, chat, and request help.</p>
          </div>

          <div className="role-card">
            <h3>Community Manager</h3>
            <p>Manages users, monitors activities, and handles issues.</p>
          </div>

          <div className="role-card">
            <h3>Admin</h3>
            <p>Controls the overall system and ensures smooth functioning.</p>
          </div>
        </div>
      </section>

      {/* 🔹 BENEFITS SECTION */}
      <section className="about-benefits">
        <h2 className="section-title">Benefits</h2>
        <ul className="benefits-list">
          <li>Encourages sharing and collaboration</li>
          <li>Improves communication within the community</li>
          <li>Saves time and resources</li>
          <li>Builds trust among users</li>
        </ul>
      </section>

      {/* 🔹 FOOTER SECTION */}
      <footer className="about-footer">
        <p>© 2026 Village Square | Community Resource Sharing Platform</p>
      </footer>

    </div>
  );
}

export default About;