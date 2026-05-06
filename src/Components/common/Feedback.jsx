import React, { useState } from "react";
import axios from "axios";
import "./Feedback.css";

function Feedback() {
  const [formData, setFormData] = useState({
    feedback_type: "suggestion",
    message: "",
    rating: "",
    attachment: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    const data = new FormData();
    data.append("feedback_type", formData.feedback_type);
    data.append("message", formData.message);
    data.append("rating", formData.rating);

    if (formData.attachment) {
      data.append("attachment", formData.attachment);
    }

    try {
      await axios.post("https://divyadavis.pythonanywhere.com/footer/feedback/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Feedback submitted successfully!");

      // reset form
      setFormData({
        feedback_type: "suggestion",
        message: "",
        rating: "",
        attachment: null,
      });

    } catch (error) {
      console.error(error);
      alert("❌ Error submitting feedback");
    }
  };

  return (
    <div className="feedback-container">
      <h2>Feedback / Suggestions</h2>

      <form onSubmit={handleSubmit} className="feedback-form">

        {/* Feedback Type */}
        <select name="feedback_type" onChange={handleChange}>
          <option value="suggestion">Suggestion</option>
          <option value="bug">Bug Report</option>
          <option value="complaint">Complaint</option>
          <option value="appreciation">Appreciation</option>
        </select>

        {/* Rating */}
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          onChange={handleChange}
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Write your feedback..."
          onChange={handleChange}
          required
        ></textarea>

        {/* File Upload */}
        <input
          type="file"
          name="attachment"
          onChange={handleFileChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;