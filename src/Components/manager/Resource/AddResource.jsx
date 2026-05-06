import React, { useState } from "react";
import axios from "axios";
import "./AddResource.css";

function AddResource() {
  const [formData, setFormData] = useState({
    name: "",
    resource_type: "HALL",
    description: "",
    availability: true,
    charge_per_hour: "",
    charge_per_day: "",
    resource_image: null
  });

  const [message, setMessage] = useState("");

  // Handle text/number/select changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      resource_image: e.target.files[0]
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("resource_type", formData.resource_type);
    data.append("description", formData.description);
    data.append("availability", formData.availability);
    data.append("charge_per_hour", formData.charge_per_hour || 0);
    data.append("charge_per_day", formData.charge_per_day || 0);
    if (formData.resource_image) {
      data.append("resource_image", formData.resource_image);
    }

    const token = localStorage.getItem("access"); // Bearer token

    try {
      const response = await axios.post(
        "https://divyadavis.pythonanywhere.com/communitymanager/managerapi/resources/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Resource added successfully!");
      setFormData({
        name: "",
        resource_type: "HALL",
        description: "",
        availability: true,
        charge_per_hour: "",
        charge_per_day: "",
        resource_image: null
      });
    } catch (error) {
      console.error("Error adding resource", error);
      setMessage("Failed to add resource. Check console for details.");
    }
  };

  return (
    <div className="add-resource-container">
      <h2>Add Community Resource</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="add-resource-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Resource Type:
          <select
            name="resource_type"
            value={formData.resource_type}
            onChange={handleChange}
            required
          >
            <option value="HALL">Community Hall</option>
            <option value="LIB">Library</option>
            <option value="OTHER">Other</option>
          </select>
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Availability:
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
        </label>

        <label>
          Charge per Hour:
          <input
            type="number"
            name="charge_per_hour"
            value={formData.charge_per_hour}
            onChange={handleChange}
            step="0.01"
          />
        </label>

        <label>
          Charge per Day:
          <input
            type="number"
            name="charge_per_day"
            value={formData.charge_per_day}
            onChange={handleChange}
            step="0.01"
          />
        </label>

        <label>
          Resource Image:
          <input type="file" name="resource_image" onChange={handleFileChange} />
        </label>

        <button type="submit">Add Resource</button>
      </form>
    </div>
  );
}

export default AddResource;