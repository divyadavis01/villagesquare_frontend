import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditResource.css";

function EditResource() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [resource, setResource] = useState({
    name: "",
    resource_type: "HALL",
    description: "",
    availability: true,
    charge_per_hour: "",
    charge_per_day: "",
    resource_image: null
  });

  useEffect(() => {
    fetchResource();
  }, []);

  const fetchResource = async () => {

    const token = localStorage.getItem("access");

    try {

      const response = await axios.get(
        `https://divyadavis.pythonanywhere.com/communitymanager/managerapi/resources/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResource(response.data);

    } catch (error) {
      console.error("Error fetching resource", error);
    }
  };

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setResource({
      ...resource,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleFileChange = (e) => {

    setResource({
      ...resource,
      resource_image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("access");

    const formData = new FormData();

    formData.append("name", resource.name);
    formData.append("resource_type", resource.resource_type);
    formData.append("description", resource.description);
    formData.append("availability", resource.availability);
    formData.append("charge_per_hour", resource.charge_per_hour);
    formData.append("charge_per_day", resource.charge_per_day);

    if (resource.resource_image instanceof File) {
      formData.append("resource_image", resource.resource_image);
    }

    try {

      await axios.patch(
        `https://divyadavis.pythonanywhere.com/communitymanager/managerapi/resources/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Resource updated successfully");

      navigate("/manager/view-resources");

    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="edit-resource-container">

      <div className="edit-resource-card">

        <div className="edit-resource-header">
          <h2>Edit Resource</h2>
        </div>

        <form onSubmit={handleSubmit} className="edit-resource-form">

          <div className="form-group">
            <input
              type="text"
              name="name"
              value={resource.name}
              onChange={handleChange}
              placeholder="Resource Name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <select
              name="resource_type"
              value={resource.resource_type}
              onChange={handleChange}
              className="form-select"
            >
              <option value="HALL">Community Hall</option>
              <option value="LIB">Library</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="form-group">
            <textarea
              name="description"
              value={resource.description}
              onChange={handleChange}
              placeholder="Description"
              className="form-textarea"
            />
          </div>

          <div className="form-group availability-group">
            <label>
              Availability
              <input
                type="checkbox"
                name="availability"
                checked={resource.availability}
                onChange={handleChange}
                className="form-checkbox"
              />
            </label>
          </div>

          <div className="form-group">
            <input
              type="number"
              name="charge_per_hour"
              value={resource.charge_per_hour || ""}
              onChange={handleChange}
              placeholder="Charge Per Hour"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="charge_per_day"
              value={resource.charge_per_day || ""}
              onChange={handleChange}
              placeholder="Charge Per Day"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              onChange={handleFileChange}
              className="form-file"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="update-button">
              Update Resource
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default EditResource;