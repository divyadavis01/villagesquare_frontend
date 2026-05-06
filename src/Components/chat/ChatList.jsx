import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChatList.css";

function ChatList() {
  const [chatItems, setChatItems] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const navigate = useNavigate();

  // 🔥 FETCH FUNCTION (same)
  const fetchChats = () => {
    const token = localStorage.getItem("access");

    const convReq = axios.get("https://divyadavis.pythonanywhere.com/chat/conversations/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userReq = axios.get("https://divyadavis.pythonanywhere.com/chat/users/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    Promise.all([convReq, userReq])
      .then(([convRes, userRes]) => {
        const conversations = convRes.data;
        const users = userRes.data;

        const merged = users.map((user) => {
          const existingConv = conversations.find(
            (c) => c.user_id === user.user_id
          );

          return {
            user_id: user.user_id,
            username: user.username,
            conversation_id: existingConv
              ? existingConv.conversation_id
              : null,
            last_message: existingConv
              ? existingConv.last_message
              : null,
            timestamp: existingConv
              ? existingConv.timestamp
              : null,
          };
        });

        merged.sort((a, b) => {
          if (!a.timestamp) return 1;
          if (!b.timestamp) return -1;
          return new Date(b.timestamp) - new Date(a.timestamp);
        });

        setChatItems(merged);
      })
      .catch((err) => console.log(err));
  };

  // ✅ INITIAL LOAD
  useEffect(() => {
    fetchChats();
  }, []);

  // 🔥 NEW: WEBSOCKET LISTENER (REPLACES INTERVAL)
  useEffect(() => {
    const token = localStorage.getItem("access");

    const socket = new WebSocket(
      `ws://127.0.0.1:8000/ws/notifications/?token=${token}`
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("📩 Notification received:", data);

      // 🔥 REFRESH CHAT LIST WHEN MESSAGE ARRIVES
      fetchChats();
    };

    socket.onclose = () => {
      console.log("❌ Notification socket closed");
    };

    return () => socket.close();
  }, []);

  // ✅ SELECT USERS
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // ✅ PRIVATE CHAT
  const handleStartChat = (userId, conversationId) => {
    if (selectedUsers.length > 0) return;

    if (conversationId) {
      navigate(`/chat/${conversationId}`);
    } else {
      axios
        .post(
          "https://divyadavis.pythonanywhere.com/chat/create-conversation/",
          { user_id: userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          navigate(`/chat/${res.data.conversation_id}`);
        })
        .catch((err) => console.log(err));
    }
  };

  // 🔥 OPEN MODAL
  const openModal = () => {
    setShowModal(true);
  };

  // 🔥 CLOSE MODAL
  const closeModal = () => {
    setShowModal(false);
    setBroadcastMessage("");
  };

  // 🔥 SEND BROADCAST
  const handleBroadcast = () => {
    if (!broadcastMessage || selectedUsers.length === 0) {
      alert("Enter message");
      return;
    }

    axios
      .post(
        "https://divyadavis.pythonanywhere.com/chat/send-broadcast/",
        {
          user_ids: selectedUsers,
          message: broadcastMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then(() => {
        alert("Broadcast sent!");
        setSelectedUsers([]);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="chatlist-container">
      <h2 className="chatlist-title">Chats</h2>

      {/* 🔥 BUTTON */}
      {selectedUsers.length > 0 && (
        <button className="broadcast-btn" onClick={openModal}>
          Send Broadcast ({selectedUsers.length})
        </button>
      )}

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Send Broadcast</h3>

            <textarea
              placeholder="Type your message..."
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              className="modal-textarea"
            />

            <div className="modal-actions">
              <button className="send-btn" onClick={handleBroadcast}>
                Send
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 CHAT LIST */}
      <div className="chatlist-list">
        {chatItems.map((item) => (
          <div key={item.user_id} className="chatlist-item">
            <input
              type="checkbox"
              checked={selectedUsers.includes(item.user_id)}
              onChange={() => handleSelectUser(item.user_id)}
              onClick={(e) => e.stopPropagation()}
            />

            <div
              className="chatlist-userinfo"
              onClick={() =>
                handleStartChat(item.user_id, item.conversation_id)
              }
            >
              <p className="chatlist-username">{item.username}</p>

              {item.last_message && (
                <p className="chatlist-lastmessage">
                  {item.last_message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;