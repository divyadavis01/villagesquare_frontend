import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access");
      console.log("TOKEN:", token);

      const res = await axios.get(
        "https://divyadavis.pythonanywhere.com/credentials/my-profile/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("PROFILE DATA:", res.data);
      setProfile(res.data);

    } catch (error) {
      if (error.response) {
        console.error("Error status:", error.response.status);
        console.error("Error data:", error.response.data);
      } else {
        console.error("Profile fetch error:", error.message);
      }
    }
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">

        {/* For LocalUser */}
        {profile.profile_image && (
          <img
            src={`https://divyadavis.pythonanywhere.com${profile.profile_image}`}
            alt="profile"
            className="profile-image"
          />
        )}

        <p><strong>Username:</strong> {profile.username}</p>
        {profile.phone && <p><strong>Phone:</strong> {profile.phone}</p>}
        {profile.address && <p><strong>Address:</strong> {profile.address}</p>}

        {/* For Community Manager */}
        
    
        {profile.area_name && <p><strong>Area:</strong> {profile.area_name}</p>}
        {profile.id_proof && (
          <p>
            <strong>ID Proof:</strong>{" "}
            <a
              href={`https://divyadavis.pythonanywhere.com${profile.id_proof}`}
              target="_blank"
              rel="noreferrer"
            >
              View Document
            </a>
          </p>
        )}
        
      </div>
    </div>
  );
}

export default Profile;