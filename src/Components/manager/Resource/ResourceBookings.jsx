import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ResourceBookings.css"; // 👈 create this css file

function ResourceBookings() {

  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("access");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "https://divyadavis.pythonanywhere.com/communitymanager/resource-bookings/",
        config
      );
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.post(
        "https://divyadavis.pythonanywhere.com/communitymanager/resource-bookings/update-status/",
        { id, status },
        config
      );

      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="resource-bookings-container">

      <h2 className="page-title">Resource Booking Requests</h2>

      <table className="bookings-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Resource</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.user_name}</td>
              <td>{b.resource_name}</td>
              <td>{b.booking_date}</td>
              <td>{b.start_time} - {b.end_time}</td>

              <td>
                <span className={`status ${b.status.toLowerCase()}`}>
                  {b.status}
                </span>
              </td>

              <td>
                {b.status === "PENDING" && (
                  <div className="action-buttons">
                    <button
                      className="btn-approve"
                      onClick={() => updateStatus(b.id, "APPROVED")}
                    >
                      Approve
                    </button>

                    <button
                      className="btn-reject"
                      onClick={() => updateStatus(b.id, "REJECTED")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ResourceBookings;