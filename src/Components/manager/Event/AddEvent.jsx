import React, { useState } from "react"
import axios from "axios"
import "./AddEvent.css"

function AddEvent() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("access")

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("event_date", eventDate)
    formData.append("location", location)

    if (image) {
      formData.append("event_image", image)
    }

    try {

      const response = await axios.post(
        "https://divyadavis.pythonanywhere.com/communitymanager/managerapi/events/",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      )

      alert("Event added successfully!")

      setTitle("")
      setDescription("")
      setEventDate("")
      setLocation("")
      setImage(null)

    } catch (error) {
      console.error(error)
      alert("Failed to add event")
    }
  }

  return (

    <div className="add-event-container">

      <h2>Add Community Event</h2>

      <form onSubmit={handleSubmit} className="event-form">

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Event Description"
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
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Add Event</button>

      </form>

    </div>
  )
}

export default AddEvent