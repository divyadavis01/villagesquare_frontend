import React from "react";
import "./Home.css";

const features = [
  {
    icon: "🤝",
    iconClass: "icon-teal",
    title: "Borrow & Lend",
    desc: "Share tools, books, and household items with verified neighbors — no cost, just community.",
  },
  {
    icon: "🏛️",
    iconClass: "icon-blue",
    title: "Book Spaces",
    desc: "Reserve community halls, sports courts, libraries, and meeting rooms in just a few clicks.",
  },
  {
    icon: "📅",
    iconClass: "icon-sage",
    title: "Local Events",
    desc: "Discover workshops, clean-up drives, and cultural events happening right in your neighborhood.",
  },
  {
    icon: "🔔",
    iconClass: "icon-gold",
    title: "Live Announcements",
    desc: "Get real-time notices from your community managers about important updates and alerts.",
  },
  {
    icon: "👤",
    iconClass: "icon-teal",
    title: "Member Profiles",
    desc: "Build trust through verified profiles, ratings, and a track record of community participation.",
  },
  {
    icon: "🛡️",
    iconClass: "icon-blue",
    title: "Admin Controls",
    desc: "Managers can approve registrations, moderate listings, and keep the community safe and organized.",
  },
];

const stats = [
  { number: "500+", label: "Resources Shared" },
  { number: "1.2k", label: "Active Members" },
  { number: "80+", label: "Monthly Events" },
];

function Home() {
  return (
    <div className="home-wrapper">

      {/* ── Animated Background ── */}
      <div className="home-bg" aria-hidden="true">
        <div className="home-bg-orb" /><div className="home-bg-orb" /><div className="home-bg-orb" />
        <div className="home-bg-orb" /><div className="home-bg-orb" />
        <div className="home-bg-ring" /><div className="home-bg-ring" /><div className="home-bg-ring" />
        <div className="home-bg-ring" />
        <div className="home-bg-dot" /><div className="home-bg-dot" /><div className="home-bg-dot" />
        <div className="home-bg-dot" /><div className="home-bg-dot" /><div className="home-bg-dot" />
        <div className="home-bg-dot" /><div className="home-bg-dot" />
        <div className="home-bg-line" /><div className="home-bg-line" />
      </div>

      {/* ── Hero ── */}
      <header className="home-hero">
        <span className="home-badge">
          <span className="home-badge-dot" />
          Community Resource Platform
        </span>

        <h1 className="home-title">
          Village Square
          <span className="home-title-underline" />
        </h1>

        <p className="home-subtitle">
          A smarter way to <strong>share resources</strong>, reserve spaces, and
          stay connected with every corner of your neighborhood.
        </p>
      </header>

      {/* ── Stats ── */}
      <div className="home-stats" aria-label="Community statistics">
        {stats.map(({ number, label }) => (
          <div className="home-stat" key={label}>
            <span className="home-stat-number">{number}</span>
            <span className="home-stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Feature Cards ── */}
      <section className="home-features" aria-label="Platform features">
        {features.map(({ icon, iconClass, title, desc }) => (
          <div className="home-feature-card" key={title}>
            <div className={`home-feature-icon ${iconClass}`}>{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </section>

      {/* ── CTA ── */}
      <div className="home-cta">
        <div className="home-cta-buttons">
          <a href="/local-user-register" className="btn-primary">
            🌱 Join Your Village
          </a>
          <a href="/about" className="btn-secondary">
            🔍 Explore Resources
          </a>
        </div>
        <span className="home-cta-note">Free to join · Manager approval required for login.</span>
      </div>

    </div>
  );
}

export default Home;