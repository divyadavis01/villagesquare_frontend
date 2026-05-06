import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewResource.css";
import { useNavigate } from "react-router-dom";

function ViewResource() {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  // Fetch all resources on component mount
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const token = localStorage.getItem("access");
    try {
      const response = await axios.get(
        "https://divyadavis.pythonanywhere.com/communitymanager/managerapi/resources/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  // Delete resource
  const handleDelete = async (id) => {
    const token = localStorage.getItem("access");
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await axios.delete(
          `https://divyadavis.pythonanywhere.com/communitymanager/managerapi/resources/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchResources(); // refresh list after deletion
      } catch (error) {
        console.error("Error deleting resource:", error);
      }
    }
  };

  // Navigate to EditResource page
  const handleEdit = (id) => {
    navigate(`/edit-resource/${id}`);
  };

  return (
    <div className="view-resources-container">
      <h2>Community Resources</h2>
      <div className="resources-grid">
        {resources.map((res) => (
          <div className="resource-card" key={res.id}>
            {res.resource_image && (
              <img
                src={res.resource_image}
                alt={res.name}
              />
            )}
            <h3>{res.name}</h3>
            <p><strong>Type:</strong> {res.resource_type}</p>
            {res.description && <p>{res.description}</p>}
            <p>
              <strong>Availability:</strong>{" "}
              {res.availability ? "Available" : "Not Available"}
            </p>
            {res.charge_per_hour && (
              <p><strong>Charge per Hour:</strong> ₹{res.charge_per_hour}</p>
            )}
            {res.charge_per_day && (
              <p><strong>Charge per Day:</strong> ₹{res.charge_per_day}</p>
            )}

            <div className="resource-card-buttons">
            <button onClick={() => navigate(`/edit-resource/${res.id}`)}>
              Edit
            </button> 
             <button onClick={() => handleDelete(res.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewResource;