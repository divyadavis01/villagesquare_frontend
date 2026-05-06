import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewUsers.css";

function NewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://divyadavis.pythonanywhere.com/credentials/all-users/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        // ✅ Filter only NEW (pending) local users
        const pendingUsers = res.data.filter(
          (user) => user.role === "USER" && !user.is_verified
        );

        setUsers(pendingUsers);

      } catch (err) {
        console.log("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Approve
  const approveUser = async (id) => {
    try {
      await axios.post(
        `https://divyadavis.pythonanywhere.com/credentials/approve-user/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      // remove from list
      setUsers((prev) => prev.filter((user) => user.user_id !== id));

    } catch (err) {
      console.log("Approve error:", err);
    }
  };

  // ❌ Reject
  const rejectUser = async (id) => {
    try {
      await axios.post(
        `https://divyadavis.pythonanywhere.com/credentials/reject-user/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setUsers((prev) => prev.filter((user) => user.user_id !== id));

    } catch (err) {
      console.log("Reject error:", err);
    }
  };

  return (
    <div className="new-users-container">
      <h2 className="new-users-title">New User Registrations</h2>

      <div className="users-list">
        {users.length === 0 ? (
          <p>No pending users</p>
        ) : (
          users.map((user) => (
            <div key={user.user_id} className="user-card">

              <p><strong>Name:</strong> {user.username}</p>

              <div className="action-buttons">
                <button
                  className="approve-btn"
                  onClick={() => approveUser(user.user_id)}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => rejectUser(user.user_id)}
                >
                  Reject
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NewUsers;