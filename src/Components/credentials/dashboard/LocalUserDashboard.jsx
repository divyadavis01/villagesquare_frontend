import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LocalUserDashboard.css";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

function LocalUserDashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);

  // 🔥 Booking State
  const [selectedResource, setSelectedResource] = useState(null);
  const [bookingData, setBookingData] = useState({
    booking_date: "",
    start_time: "",
    end_time: "",
  });

  const communityName = "Green Village";
  const token = localStorage.getItem("access");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchProfile();
    fetchEvents();
    fetchResources();
  }, []);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "https://divyadavis.pythonanywhere.com/credentials/my-profile/",
        config
      );
      setUserName(res.data.username);
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "https://divyadavis.pythonanywhere.com/userdashboard/events/",
        config
      );
      setEvents(res.data);
    } catch (error) {
      console.error("Events fetch error:", error);
    }
  };

  // Fetch resources
  const fetchResources = async () => {
    try {
      const res = await axios.get(
        "https://divyadavis.pythonanywhere.com/userdashboard/resources/",
        config
      );
      setResources(res.data);
    } catch (error) {
      console.error("Resources fetch error:", error);
    }
  };

  // Event register
  const handleRegister = async (eventId) => {
    try {
      await axios.post(
        "https://divyadavis.pythonanywhere.com/userdashboard/events/register/",
        { event: eventId },
        config
      );
      fetchEvents();
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  // 🔥 Booking handler
  const handleBook = async (resourceId) => {
    if (
      !bookingData.booking_date ||
      !bookingData.start_time ||
      !bookingData.end_time
    ) {
      alert("Please select date and time");
      return;
    }

    try {
      await axios.post(
        "https://divyadavis.pythonanywhere.com/userdashboard/resources/book/",
        {
          resource: resourceId,
          booking_date: bookingData.booking_date,
          start_time: bookingData.start_time + ":00",
          end_time: bookingData.end_time + ":00",
        },
        config
      );

      setSelectedResource(null);
      setBookingData({
        booking_date: "",
        start_time: "",
        end_time: "",
      });

      fetchResources();
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome */}
      <div className="welcome-card">
        <h2 className="welcome-text">Welcome, {userName} 👋</h2>
        <p className="community-name">Community: {communityName}</p>
      </div>

      {/* Events */}
      <div className="events-section">
        <h3 className="section-title">Upcoming Events</h3>

        <table className="events-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.event_date}</td>
                <td>{event.location}</td>
                <td>
                  {event.is_registered ? (
                    <button className="btn-registered" disabled>
                      Registered
                    </button>
                  ) : (
                    <button
                      className="btn-register"
                      onClick={() => handleRegister(event.id)}
                    >
                      Register
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resources */}
      <div className="resources-section">
        <h3 className="section-title">Community Resources</h3>

        <div className="resources-grid">
          {resources.map((resource) => (
            <div className="resource-card" key={resource.id}>
              <h4 className="resource-title">{resource.name}</h4>
              <p className="resource-desc">{resource.description}</p>

              <p className="resource-price">
                Charge per day: {resource.charge_per_day}
              </p>
              <p className="resource-price">
                Charge per hour: {resource.charge_per_hour}
              </p>

              <img
                src={resource.resource_image}
                alt={resource.name}
                className="resource-image"
              />

              <span
                className={
                  resource.availability
                    ? "status-available"
                    : "status-unavailable"
                }
              >
                {resource.availability ? "Available" : "Not Available"}
              </span>

              {/* Status buttons */}
              {resource.booking_status === "PENDING" && (
                <button className="btn-pending" disabled>
                  Pending
                </button>
              )}

              {resource.booking_status === "APPROVED" && (
                <button className="btn-approved" disabled>
                  Approved
                </button>
              )}

              {resource.booking_status === "REJECTED" && (
                <button className="btn-rejected" disabled>
                  Rejected
                </button>
              )}

              {/* Book Button */}
              {!resource.booking_status && resource.availability && (
                <>
                  <button
                    className="btn-book"
                    onClick={() => setSelectedResource(resource.id)}
                  >
                    Book Now
                  </button>

                  {/* Booking Form */}
                  {selectedResource === resource.id && (
                    <div className="booking-form">
                      <input
                        type="date"
                        className="input-date"
                        value={bookingData.booking_date}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            booking_date: e.target.value,
                          })
                        }
                      />

                      <input
                        type="time"
                        className="input-time"
                        value={bookingData.start_time}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            start_time: e.target.value,
                          })
                        }
                      />

                      <input
                        type="time"
                        className="input-time"
                        value={bookingData.end_time}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            end_time: e.target.value,
                          })
                        }
                      />

                      <button
                        className="btn-confirm"
                        onClick={() => handleBook(resource.id)}
                      >
                        Confirm Booking
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Button */}
      <div className="chat-button">
        <IconButton onClick={() => navigate("/chat-list")}>
          <ChatIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default LocalUserDashboard;