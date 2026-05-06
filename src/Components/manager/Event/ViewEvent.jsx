import React, { useEffect, useState } from "react"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"
import "./ViewEvent.css"

function ViewEvent() {

  const [events, setEvents] = useState([])
  const navigate= useNavigate()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {

    const token = localStorage.getItem("access")

    try {

      const response = await axios.get(
        "https://divyadavis.pythonanywhere.com/communitymanager/managerapi/events/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setEvents(response.data)

    } catch (error) {
      console.error("Error fetching events", error)
    }
  }

  // DELETE EVENT
  const deleteEvent = async (id) => {

    const token = localStorage.getItem("access")

    if (!window.confirm("Are you sure you want to delete this event?")) return

    try {

      await axios.delete(
        `https://divyadavis.pythonanywhere.com/communitymanager/managerapi/events/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Event deleted successfully")

      fetchEvents() // refresh list

    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  return (
    <div className="view-events-container">

      <h2>Community Events</h2>

      <div className="events-grid">

        {events.map((event) => (

          <div className="event-card" key={event.id}>

            {event.event_image && (
              <img
                src={event.event_image}
                alt={event.title}
              />
            )}

            <h3>{event.title}</h3>

            <p>{event.description}</p>

            <p><strong>Date:</strong> {event.event_date}</p>

            <p><strong>Location:</strong> {event.location}</p>

            {/* Buttons */}
            <div className="event-buttons">

              <button
                className="edit-btn"
                onClick={() => navigate(`/edit-event/${event.id}`)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteEvent(event.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default ViewEvent