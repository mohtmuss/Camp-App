import { useState } from "react";
import { useNavigate } from "react-router-dom";

const fakeChats = [
  { id: 1, name: "Dr. Kim", initial: "D", lastMessage: "Great work on today's session!", time: "9:41 AM", unread: 3, online: true },
  { id: 2, name: "Ms. Rivera", initial: "M", lastMessage: "I've reviewed your essay draft 📝", time: "Yesterday", unread: 1, online: false },
  { id: 3, name: "Prof. Santos", initial: "P", lastMessage: "The workshop is confirmed for Friday", time: "Yesterday", unread: 0, online: true },
  { id: 4, name: "Mr. Osei", initial: "M", lastMessage: "Let me know when you're available", time: "Mon", unread: 0, online: false },
  { id: 5, name: "Alex T.", initial: "A", lastMessage: "Can we reschedule to Thursday?", time: "Mon", unread: 0, online: true },
  { id: 6, name: "Mentora Team", initial: "M", lastMessage: "Welcome to Mentora! 🎉", time: "Sun", unread: 0, online: false },
];

const fakeMessages = [
  { id: 1, text: "Yes! I worked through most of them. I got stuck on question 7 though.", time: "9:22 AM", mine: true },
  { id: 2, text: "That's a tricky one. Let's go over it in our next session. I'll prepare some hints for you.", time: "9:24 AM", mine: false },
  { id: 3, text: "That would be amazing, thank you!", time: "9:25 AM", mine: true },
  { id: 4, isDate: true, label: "Today" },
  { id: 5, text: "Good morning! Just a reminder — our session is at 10 AM today 📅", time: "8:05 AM", mine: false },
  { id: 6, text: "Good morning! I'll be there. Already reviewed my notes.", time: "8:12 AM", mine: true },
  { id: 7, text: "Perfect! See you soon 👍", time: "8:13 AM", mine: false },
  { id: 8, text: "Great work on today's session! You've really improved 🌟", time: "9:41 AM", mine: false },
];

function Chat() {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState(fakeMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const navigate = useNavigate();

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: messages.length + 1,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mine: true,
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const filteredChats = fakeChats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Chat Room Screen ──
  if (activeChat) {
    return (
      <div style={{
        backgroundColor: "#1e6b45",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{
          padding: "50px 16px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <button
            onClick={() => setActiveChat(null)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              flexShrink: 0,
            }}>
            ‹
          </button>

          {/* Avatar */}
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            flexShrink: 0,
          }}>
            {activeChat.initial}
          </div>

          {/* Name & Status */}
          <div>
            <h2 style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              margin: 0,
            }}>
              {activeChat.name}
            </h2>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: activeChat.online ? "#4CAF50" : "#999",
              }} />
              <span style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "12px",
              }}>
                {activeChat.online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          padding: "16px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}>
          {messages.map((msg) => {
            if (msg.isDate) {
              return (
                <div key={msg.id} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: "8px 0",
                }}>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#ddd" }} />
                  <span style={{ color: "#aaa", fontSize: "12px" }}>{msg.label}</span>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#ddd" }} />
                </div>
              );
            }

            return (
              <div key={msg.id} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.mine ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  backgroundColor: msg.mine ? "#1e6b45" : "white",
                  color: msg.mine ? "white" : "#111",
                  padding: "12px 16px",
                  borderRadius: msg.mine
                    ? "18px 18px 4px 18px"
                    : "18px 18px 18px 4px",
                  maxWidth: "75%",
                  fontSize: "14px",
                  lineHeight: "1.4",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                }}>
                  {msg.text}
                </div>
                <span style={{
                  color: "#bbb",
                  fontSize: "11px",
                  marginTop: "4px",
                  marginLeft: msg.mine ? 0 : "4px",
                  marginRight: msg.mine ? "4px" : 0,
                }}>
                  {msg.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div style={{
          backgroundColor: "white",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderTop: "1px solid #f0f0f0",
        }}>
          <input
            style={{
              flex: 1,
              backgroundColor: "#f5f5f5",
              border: "none",
              borderRadius: "24px",
              padding: "12px 16px",
              fontSize: "14px",
              outline: "none",
              color: "#333",
            }}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: newMessage.trim() ? "#1e6b45" : "#f0f0f0",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              flexShrink: 0,
            }}>
            ➤
          </button>
        </div>

      </div>
    );
  }

  // ── Chat List Screen ──
  return (
    <div style={{
      backgroundColor: "#1e6b45",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Header */}
      <div style={{
        padding: "50px 20px 16px",
      }}>
        <h1 style={{
          color: "white",
          fontSize: "22px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "0 0 16px",
        }}>
          Messages
        </h1>

        {/* Search Bar */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "14px",
          padding: "4px 14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <span style={{ color: "#aaa" }}>🔍</span>
          <input
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              padding: "10px 0",
              fontSize: "14px",
              color: "#333",
            }}
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Chat List */}
      <div style={{
        flex: 1,
        backgroundColor: "white",
        borderRadius: "24px 24px 0 0",
        overflowY: "auto",
        padding: "8px 0",
      }}>
        {filteredChats.map((chat, i) => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "14px 20px",
              cursor: "pointer",
              borderBottom: i < filteredChats.length - 1
                ? "1px solid #f5f5f5" : "none",
              backgroundColor: "white",
            }}>

            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: "#1e6b45",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
              }}>
                {chat.initial}
              </div>

              {/* Online dot */}
              {chat.online && (
                <div style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#4CAF50",
                  border: "2px solid white",
                }} />
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{
                fontSize: "15px",
                fontWeight: chat.unread > 0 ? "bold" : "600",
                color: "#111",
                margin: "0 0 4px",
              }}>
                {chat.name}
              </h4>
              <p style={{
                fontSize: "13px",
                color: chat.unread > 0 ? "#555" : "#aaa",
                margin: 0,
                fontWeight: chat.unread > 0 ? "500" : "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {chat.lastMessage}
              </p>
            </div>

            {/* Time & Unread */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "6px",
              flexShrink: 0,
            }}>
              <span style={{
                fontSize: "12px",
                color: chat.unread > 0 ? "#1e6b45" : "#bbb",
                fontWeight: chat.unread > 0 ? "bold" : "normal",
              }}>
                {chat.time}
              </span>

              {chat.unread > 0 && (
                <div style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  backgroundColor: "#1e6b45",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}>
                  {chat.unread}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div style={{
        backgroundColor: "white",
        borderTop: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0 20px",
      }}>
        {[
          { id: "home", icon: "🏠", label: "Home", path: "/home" },
          { id: "schedule", icon: "📅", label: "Schedule", path: "/schedule" },
          { id: "chat", icon: "💬", label: "Chat", path: "/chat" },
          { id: "profile", icon: "👤", label: "Profile", path: "/profile" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); navigate(tab.path); }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: activeTab === tab.id ? "#1e6b45" : "#999",
              fontSize: "11px",
              fontWeight: activeTab === tab.id ? "bold" : "normal",
            }}>
            <span style={{ fontSize: "24px" }}>{tab.icon}</span>
            {tab.label}
            {activeTab === tab.id && (
              <div style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "#1e6b45",
              }} />
            )}
          </button>
        ))}
      </div>

    </div>
  );
}

export default Chat;