import React from "react"
import { useNavigate } from "react-router-dom"
import "./ManagerDashboard.css"
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

function ManagerDashboard() {

  const navigate = useNavigate()

  return (
    <div className="manager-dashboard">

      <h2>Community Manager Dashboard</h2>

      <div className="card-container">

        {/* Manage Events */}
        <div className="dashboard-card">
          <h3>Manage Events</h3>
          <p>Add, edit or delete upcoming community events.</p>

          <div className="card-buttons">
            <button onClick={() => navigate("/manager/add-event")}>
              Add Event
            </button>

            <button onClick={() => navigate("/manager/events")}>
              View Events
            </button>
          </div>
        </div>


        {/* Manage Registrations */}
        <div className="dashboard-card">
          <h3>New User Registrations</h3>
          <p>View newly registered local users and activate accounts.</p>

          <div className="card-buttons">
            <button onClick={() => navigate("/manager/view-user")}>
              View Existing Users
            </button>

            <button onClick={() => navigate("/manager/new-registrations")}>
              View New Users
            </button>
          </div>
        </div>


        {/* Manage Resources */}
        <div className="dashboard-card">
          <h3>Community Resources</h3>
          <p>Manage resources like community hall and library.</p>

          <div className="card-buttons">
            <button onClick={() => navigate("/manager/add-resource")}>
              Add Resource
            </button>

            <button onClick={() => navigate("/manager/view-resources")}>
              View Resources
            </button>
          </div>
        </div>


        {/* ✅ NEW: Resource Booking Requests */}
        <div className="dashboard-card">
          <h3>Resource Booking Requests</h3>
          <p>Approve or reject user booking requests.</p>

          <div className="card-buttons">
            <button onClick={() => navigate("/manager/resource-bookings")}>
              View Requests
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Event Registrations</h3>
          <p>All users who registered for events</p>

          <div className="card-buttons">
            <button onClick={() => navigate("/events")}>
  View Event Registrations
</button>
          </div>
        </div>


        {/* Chat Button */}
        <div className="chat-button">
          <IconButton onClick={() => navigate("/chat-list")}>
            <ChatIcon />
          </IconButton>
        </div>

      </div>

    </div>
  )
}

export default ManagerDashboard