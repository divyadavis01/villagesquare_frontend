import { Link, useNavigate, useLocation } from "react-router"
import { useEffect, useState } from "react"
import "./Navbar.css"
import HomeIcon from "@mui/icons-material/Home";
import { LoginOutlined } from "@mui/icons-material";
import Face6Icon from '@mui/icons-material/Face6';
import Face6OutlinedIcon from '@mui/icons-material/Face6Outlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {

  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access")
    const userRole = localStorage.getItem("role")

    if (token) {
      setIsLoggedIn(true)
      setRole(userRole)
    } else {
      setIsLoggedIn(false)
      setRole("")
    }

  }, [location])

  useEffect(() => {
  if (!isLoggedIn) return;

  const token = localStorage.getItem("access");

  const socket = new WebSocket(
    `ws://127.0.0.1:8000/ws/notifications/?token=${token}`
  );

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "notification") {
      setNotifications((prev) => [data.message, ...prev]);
    }
  };

  socket.onerror = (err) => {
    console.error("Notification socket error:", err);
  };

  return () => socket.close();

}, [isLoggedIn]);

  useEffect(() => {
  const clearHandler = () => {
    setNotifications([]);
  };

  window.addEventListener("clearNotifications", clearHandler);

  return () => {
    window.removeEventListener("clearNotifications", clearHandler);
  };
}, []);

  const handleLogout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
    setRole("")
    navigate("/")
  }

  return (
    <nav>

      <Link to="/"><HomeIcon color="primary" /> Home</Link>

      {!isLoggedIn && (
        <>
          <span>|</span>
          <Link to="/login"><LoginOutlined color="primary"/>Login</Link>

          <span>|</span>
          <div className="dropdown-container">
            <button onClick={() => setShowDropdown(!showDropdown)}>
              Register ▼
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <div>
                  <Link to="/local-user-register" onClick={() => setShowDropdown(false)}>
                    <Face6Icon color="primary"/>Local User
                  </Link>
                </div>
                <div>
                  <Link to="/community-manager-register" onClick={() => setShowDropdown(false)}>
                    <Face6OutlinedIcon color="primary"/>Community Manager
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {isLoggedIn && (
        <>

          <span>|</span>
          <Link to={
            role === "USER"
              ? "/user-dashboard"
              : role === "MANAGER"
              ? "/manager-dashboard"
              : "/admin-dashboard"
          }>
            Dashboard
          </Link>

          {/* Only for USER and MANAGER */}
          {(role === "USER" || role === "MANAGER") && (
            <>
              <span>|</span>
              
              <div className="notification-container">

  <div
    className="notification-bell"
    onClick={() => setShowNotifications(!showNotifications)}
  >
    <NotificationsIcon color="primary" />

    {notifications.length > 0 && (
      <span className="notification-count">
        {notifications.length}
      </span>
    )}
  </div>

  {showNotifications && (
    <div className="notification-dropdown">
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((note, index) => (
          <p key={index} className="notification-item">
            {note}
          </p>
        ))
      )}
    </div>
  )}

</div>

              <span>|</span>
              <Link to="/profile">
                <AccountCircleIcon color="primary"/> Profile
              </Link>
            </>
          )}

          <span>|</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

    </nav>
  )
}

export default Navbar