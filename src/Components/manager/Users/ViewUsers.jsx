import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewUsers.css";

function ViewUsers() {
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

        setUsers(res.data);

      } catch (err) {
        console.log("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="view-users-container">
      <h2 className="view-users-title">All Users</h2>

      <div className="users-list">
        {users.map((user) => (
          <div key={user.user_id} className="user-card">

            <p className="user-name">
              <strong>Name:</strong> {user.username}
            </p>

            <p className="user-role">
              <strong>Role:</strong> 
              <span className={user.role === "MANAGER" ? "role-manager" : "role-user"}>
                {user.role}
              </span>
            </p>

            <p className="user-status">
              <strong>Status:</strong> 
              <span className={user.is_verified ? "status-approved" : "status-pending"}>
                {user.is_verified ? "Approved" : "Pending"}
              </span>
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewUsers;