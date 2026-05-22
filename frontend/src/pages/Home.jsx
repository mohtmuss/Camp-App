import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tentIcon from "../tent.png";

// Fake data for now
const fakePosts = [
  {
    id: 1,
    emoji: "🏕️",
    emojiBackground: "#e8f5e9",
    title: "Camp Mentora Summer 2026 is officially open!",
    body: "Don't miss your spot — this year features new outdoor STEM workshops and leadership...",
    author: "Admin Team",
    authorInitial: "A",
    authorColor: "#1e6b45",
    time: "2m ago",
  },
  {
    id: 2,
    emoji: "🧠",
    emojiBackground: "#f3e8ff",
    title: "New mentorship matching is now live",
    body: "We've updated our system to better pair students with mentors based on goals and...",
    author: "Dr. Kim",
    authorInitial: "D",
    authorColor: "#1e6b45",
    time: "1h ago",
  },
  {
    id: 3,
    emoji: "📢",
    emojiBackground: "#fff8e1",
    title: "Reminder: Group session tomorrow at 10am",
    body: "Your cohort has a scheduled group check-in. Please prepare your weekly progress...",
    author: "Ms. Rivera",
    authorInitial: "M",
    authorColor: "#1e6b45",
    time: "3h ago",
  },
  {
    id: 4,
    emoji: "📚",
    emojiBackground: "#e3f2fd",
    title: "New resources added to the library",
    body: "Check out the newly added study guides and career prep materials in your dashboard...",
    author: "Admin Team",
    authorInitial: "A",
    authorColor: "#1e6b45",
    time: "1d ago",
  },
];

const quickCards = [
  { emoji: "👩‍🏫", title: "Dr. Kim", subtitle: "My Mentor", tag: "Available now" },
  { emoji: "📅", title: "3", subtitle: "Appointments", tag: "This week" },
  { emoji: "💬", title: "5", subtitle: "Messages", tag: "Unread" },
];

function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning 🌅";
    if (hour < 18) return "Good afternoon ☀️";
    return "Good evening 🌙";
  };

  return (
    <div style={{
      backgroundColor: "#1e6b45",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── Header ── */}
      <div style={{
        padding: "50px 20px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}>
        <div>
          <p style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "14px",
            margin: 0,
          }}>
            {getGreeting()}
          </p>
          <h1 style={{
            color: "white",
            fontSize: "28px",
            fontWeight: "bold",
            margin: "4px 0 0",
          }}>
            Jordan
          </h1>
        </div>

        {/* Avatar */}
        <div style={{
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          border: "2px solid rgba(255,255,255,0.4)",
        }}>
          J
        </div>
      </div>

      {/* ── Quick Cards ── */}
      <div style={{
        display: "flex",
        gap: "12px",
        padding: "0 20px 24px",
        overflowX: "auto",
      }}>
        {quickCards.map((card, i) => (
          <div key={i} style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "14px",
            minWidth: "120px",
            border: "1px solid rgba(255,255,255,0.2)",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: "28px" }}>{card.emoji}</span>
            <h3 style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              margin: "8px 0 2px",
            }}>
              {card.title}
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "13px",
              margin: 0,
              fontWeight: "500",
            }}>
              {card.subtitle}
            </p>
            <p style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "11px",
              margin: "2px 0 0",
            }}>
              {card.tag}
            </p>
          </div>
        ))}
      </div>

      {/* ── White Card ── */}
      <div style={{
        flex: 1,
        backgroundColor: "white",
        borderRadius: "28px 28px 0 0",
        padding: "24px 20px",
        overflowY: "auto",
      }}>

        {/* Latest News Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}>
          <h2 style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#111",
            margin: 0,
          }}>
            Latest News
          </h2>
          <span style={{
            color: "#1e6b45",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
          }}>
            See all
          </span>
        </div>

        {/* News Cards */}
        {fakePosts.map((post) => (
          <div key={post.id} style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid #f0f0f0",
          }}>

            <div style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}>
              {/* Emoji Icon */}
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: post.emojiBackground,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                flexShrink: 0,
              }}>
                {post.emoji}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#111",
                  margin: "0 0 6px",
                  lineHeight: "1.3",
                }}>
                  {post.title}
                </h4>
                <p style={{
                  fontSize: "13px",
                  color: "#777",
                  margin: "0 0 10px",
                  lineHeight: "1.4",
                }}>
                  {post.body}
                </p>

                {/* Author Row */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <div style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    backgroundColor: post.authorColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}>
                    {post.authorInitial}
                  </div>
                  <span style={{
                    fontSize: "12px",
                    color: "#999",
                    fontWeight: "500",
                  }}>
                    {post.author}
                  </span>
                  <span style={{ color: "#ddd", fontSize: "12px" }}>·</span>
                  <span style={{
                    fontSize: "12px",
                    color: "#bbb",
                  }}>
                    {post.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* ── Bottom Nav ── */}
      <div style={{
        backgroundColor: "white",
        borderTop: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0 20px",
      }}>
        {[
          { id: "home", icon: "🏠", label: "Home" },
          { id: "schedule", icon: "📅", label: "Schedule" },
          { id: "chat", icon: "💬", label: "Chat" },
          { id: "profile", icon: "👤", label: "Profile" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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
  )
}

export default Home;