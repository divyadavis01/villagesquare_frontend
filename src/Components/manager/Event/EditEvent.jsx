import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./EditEvent.css"

function EditEvent() {

  const { id } = useParams()       // get event ID from route
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [location, setLocation] = useState("")
  const [eventImage, setEventImage] = useState(null)

  const token = localStorage.getItem("access")

  useEffect(() => {
    fetchEvent()
  }, [])

  const fetchEvent = async () => {
    try {
      const res = await axios.get(
        `https://divyadavis.pythonanywhere.com/communitymanager/managerapi/events/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const event = res.data
      setTitle(event.title)
      setDescription(event.description)
      setEventDate(event.event_date)
      setLocation(event.location)
    } catch (error) {
      console.error("Error fetching event", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("event_date", eventDate)
    formData.append("location", location)
    if (eventImage) formData.append("event_image", eventImage)

    try {
      await axios.put(
        `https://divyadavis.pythonanywhere.com/communitymanager/managerapi/events/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      alert("Event updated successfully")
      navigate("/manager/events") // redirect back to event list
    } catch (error) {
      console.error("Update failed", error)
    }
  }

  return (
    <div className="add-event-container">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setEventImage(e.target.files[0])}
        />
        <button type="submit">Update Event</button>
      </form>
    </div>
  )
}

export default EditEvent