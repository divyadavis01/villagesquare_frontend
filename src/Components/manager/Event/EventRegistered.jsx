import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EventRegistered.css";

function EventRegistered() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.get(
        "https://divyadavis.pythonanywhere.com/communitymanager/managerapi/events/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  // 🔹 Fetch registrations for selected event
  const fetchRegistrations = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access");

      const response = await axios.get(
        `https://divyadavis.pythonanywhere.com/communitymanager/registered-events/${id}/registrations/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // remove duplicate users
      const uniqueUsers = [];
      const seen = new Set();

      response.data.forEach((reg) => {
        if (!seen.has(reg.user)) {
          seen.add(reg.user);
          uniqueUsers.push(reg);
        }
      });

      setRegistrations(uniqueUsers);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registrations-container">

      {/* 🔹 Event List */}
      <h2>Select Event</h2>

      <div className="event-list">
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.location}</p>

              <button
                onClick={() => {
                  setSelectedEvent(event);
                  fetchRegistrations(event.id);
                }}
              >
                View Registrations
              </button>
            </div>
          ))
        )}
      </div>

      {/* 🔹 Registration Table */}
      {selectedEvent && (
        <>
          <h2>Registrations for {selectedEvent.title}</h2>

          {loading ? (
            <p>Loading...</p>
          ) : registrations.length === 0 ? (
            <p>No users registered yet.</p>
          ) : (
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Registered At</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((reg, index) => (
                  <tr key={reg.id}>
                    <td>{index + 1}</td>
                    <td>{reg.username}</td>
                    <td>{reg.email}</td>
                    <td>
                      <span
                        className={
                          reg.status === "REGISTERED"
                            ? "status-registered"
                            : "status-cancelled"
                        }
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td>
                      {new Date(reg.registered_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default EventRegistered;