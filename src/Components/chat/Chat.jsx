import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import "./Chat.css";

function Chat() {
  const { conversationId } = useParams();
  const socketRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [receiverId, setReceiverId] = useState(null);

  const clearChat = async () => {
  try {
    await axios.post(
      `https://divyadavis.pythonanywhere.com/chat/clear-chat/${conversationId}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    // ✅ instantly clear UI
    setMessages([]);

  } catch (err) {
    console.log("Clear chat error:", err);
  }
};

  const deleteMessage = async (messageId) => {
  try {
    await axios.post(
      `https://divyadavis.pythonanywhere.com/chat/delete/${messageId}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    // ✅ update UI instantly
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, text: "This message was deleted", image: null, is_deleted: true }
          : msg
      )
    );

  } catch (err) {
    console.log("Delete error:", err);
  }
};

  useEffect(() => {

    
    const id = localStorage.getItem("user_id");
    setUserId(parseInt(id));

    // ✅ FETCH MESSAGES (FINAL FIXED)
    const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `https://divyadavis.pythonanywhere.com/chat/messages/${conversationId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      // ✅ FIX 1: set messages
      setMessages(
    res.data.messages.map((msg) => ({
      ...msg,
      image: msg.image
        ? `https://divyadavis.pythonanywhere.com${msg.image}`  // ✅ FIX
        : null,
    }))
  );

      // ✅ FIX 2: extract receiver
      const participants = res.data.participants;

      const currentUserId = parseInt(localStorage.getItem("user_id"));
      console.log("Participants:", participants);
      console.log("Current User:", currentUserId);

      const otherUser = participants.find(id => id !== currentUserId);

      setReceiverId(otherUser);

    } catch (err) {
      console.log("Error loading messages:", err);
    }
  };

    fetchMessages();

    const markAsRead = async () => {
      try {
        await axios.post(
          "https://divyadavis.pythonanywhere.com/notification/notifications/read-all/",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        console.log("✅ Notifications cleared");
      } catch (err) {
        console.log("Mark read error:", err);
      }
    };

    markAsRead();
    window.dispatchEvent(new Event("clearNotifications"));

    
    const token = localStorage.getItem("access");

    socketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${conversationId}/?token=${token}`
    );

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 WS DATA:", data);
      const newMsg = {
        text: data.message,
  image: data.image
    ? `https://divyadavis.pythonanywhere.com${data.image}`   // ✅ FIX
    : null,
  sender: data.sender,
      };

      setMessages((prev) => [...prev, newMsg]);
    };

    return () => socketRef.current.close();

  }, [conversationId]);

  const sendMessage = () => {
  if (!message.trim() || !receiverId) return;

  if (socketRef.current.readyState === WebSocket.OPEN) {
    socketRef.current.send(
      JSON.stringify({
        message: message,
        receiver_id: receiverId   // ✅ IMPORTANT
      })
    );

    setMessage("");
  }
};

  const sendImage = async () => {
  if (!selectedImage) return;

  const formData = new FormData();
  formData.append("image", selectedImage);
  formData.append("conversation", conversationId);

  try {
    const res = await axios.post(
      "https://divyadavis.pythonanywhere.com/chat/send-image/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const imageUrl = res.data.image;

    // ✅ send image via websocket
    socketRef.current.send(
      JSON.stringify({
        message: "",
        image: imageUrl,
        receiver_id: receiverId
      })
    );

    setSelectedImage(null);

  } catch (err) {
    console.log("Image upload error:", err);
  }
};

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2 className="chat-title">Messages</h2>
        <button className="clear-chat-btn" onClick={clearChat}>
          Clear Chat
        </button>
      </div>

      <div className="chat-body">
        <div className="message-list">
          {messages.map((msg, index) => (
  <div
    key={index}
    className={
      msg.sender === userId
        ? "message-item-sent"
        : "message-item-received"
    }
  >
    {/* ✅ ADD THIS WRAPPER */}
    <div className="message-content">

      {msg.text && <p className={msg.is_deleted ? "deleted-text" : "message-text"}>
        {msg.text}
      </p>}

      {msg.image && (
        <img
          src={msg.image}
          alt="chat"
          className="chat-image"
        />
      )}

      {msg.sender === userId && !msg.is_deleted && (
        <IconButton
          aria-label="delete"
          onClick={() => deleteMessage(msg.id)}
        >
          <DeleteIcon />
        </IconButton>
      )}

    </div>
  </div>
))}
        </div>
      </div>

      <div className="chat-footer">
        <input
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <input className="chat-image-file"
          type="file"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />

        <button
          className="chat-send-button"
          onClick={() => {
            if (selectedImage) {
              sendImage();   // ✅ send image
            } else {
              sendMessage(); // ✅ send text
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;



