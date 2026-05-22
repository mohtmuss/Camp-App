import { useState } from "react";
import { useNavigate } from "react-router-dom";

const userData = {
  firstName: "Jordan",
  lastName: "Lee",
  role: "Mentee",
  email: "jordan.lee@email.com",
  birthday: "Mar 15, 2005",
  school: "Westbrook High",
  gradYear: "2027",
  studentType: "High School",
  mentor: "Dr. Kim",
  sessions: 24,
  days: 68,
  messages: 142,
};

function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(userData);
  const [editData, setEditData] = useState(userData);
  const navigate = useNavigate();

  const handleSave = () => {
    setUser(editData);
    setEditing(false);
  };

  const infoRows = [
    { icon: "✉️", label: "Email", value: user.email, key: "email" },
    { icon: "🎂", label: "Birthday", value: user.birthday, key: "birthday" },
    { icon: "🏫", label: "School", value: user.school, key: "school" },
    { icon: "🎓", label: "Graduation Year", value: user.gradYear, key: "gradYear" },
    { icon: "📚", label: "Student Type", value: user.studentType, key: "studentType" },
    { icon: "👤", label: "My Mentor", value: user.mentor, key: "mentor" },
  ];

  const settingsRows = [
    { icon: "🔔", label: "Notifications", color: "#111" },
    { icon: "🔒", label: "Change Password", color: "#111" },
    { icon: "🌙", label: "Dark Mode", color: "#111" },
    { icon: "🚪", label: "Log Out", color: "#cc0000" },
  ];

  return (
    <div style={{
      backgroundColor: "#1e6b45",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── Top Green Section ── */}
      <div style={{
        padding: "50px 20px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}>

        {/* Avatar */}
        <div style={{ position: "relative" }}>
          <div style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "36px",
            fontWeight: "bold",
            border: "3px solid rgba(255,255,255,0.3)",
          }}>
            {user.firstName[0]}
          </div>

          {/* Camera Icon */}
          <div style={{
            position: "absolute",
            bottom: "0px",
            right: "0px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}>
            📷
          </div>
        </div>

        {/* Name */}
        <h1 style={{
          color: "white",
          fontSize: "22px",
          fontWeight: "bold",
          margin: 0,
        }}>
          {user.firstName} {user.lastName}
        </h1>

        {/* Role Badge */}
        <div style={{
          backgroundColor: "rgba(255,255,255,0.2)",
          color: "white",
          padding: "6px 20px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "bold",
          border: "1px solid rgba(255,255,255,0.3)",
        }}>
          {user.role}
        </div>

        {/* Stats Row */}
        <div style={{
          display: "flex",
          gap: "12px",
          marginTop: "8px",
          width: "100%",
        }}>
          {[
            { value: user.sessions, label: "Sessions\nCompleted" },
            { value: user.days, label: "Days in\nProgram" },
            { value: user.messages, label: "Messages\nSent" },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.12)",
              borderRadius: "16px",
              padding: "14px 8px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              <h2 style={{
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 4px",
              }}>
                {stat.value}
              </h2>
              <p style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "11px",
                margin: 0,
                lineHeight: "1.3",
                whiteSpace: "pre-line",
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── White Card ── */}
      <div style={{
        flex: 1,
        backgroundColor: "white",
        borderRadius: "24px 24px 0 0",
        overflowY: "auto",
        padding: "20px",
      }}>

        {/* Personal Info Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#111",
            margin: 0,
          }}>
            Personal Info
          </h3>
          <button
            onClick={() => editing ? handleSave() : setEditing(true)}
            style={{
              backgroundColor: editing ? "#1e6b45" : "#f0f9f4",
              color: editing ? "white" : "#1e6b45",
              border: "none",
              borderRadius: "20px",
              padding: "6px 16px",
              fontSize: "13px",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
            {editing ? "Save ✓" : "✏️ Edit"}
          </button>
        </div>

        {/* Info Rows */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          overflow: "hidden",
          marginBottom: "20px",
        }}>
          {infoRows.map((row, i) => (
            <div key={row.key} style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 16px",
              borderBottom: i < infoRows.length - 1 ? "1px solid #f5f5f5" : "none",
            }}>
              {/* Icon & Label */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flex: 1,
              }}>
                <span style={{ fontSize: "20px" }}>{row.icon}</span>
                <span style={{
                  color: "#aaa",
                  fontSize: "14px",
                }}>
                  {row.label}
                </span>
              </div>

              {/* Value or Input */}
              {editing ? (
                <input
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    fontSize: "13px",
                    color: "#111",
                    outline: "none",
                    width: "140px",
                    textAlign: "right",
                  }}
                  value={editData[row.key]}
                  onChange={(e) => setEditData({
                    ...editData,
                    [row.key]: e.target.value,
                  })}
                />
              ) : (
                <span style={{
                  color: "#111",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textAlign: "right",
                }}>
                  {row.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Settings Section */}
        <h3 style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "#111",
          margin: "0 0 12px",
        }}>
          Account Settings
        </h3>

        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          overflow: "hidden",
          marginBottom: "20px",
        }}>
          {settingsRows.map((row, i) => (
            <div
              key={row.label}
              onClick={() => row.label === "Log Out" && navigate("/")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderBottom: i < settingsRows.length - 1 ? "1px solid #f5f5f5" : "none",
                cursor: "pointer",
              }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}>
                <span style={{ fontSize: "20px" }}>{row.icon}</span>
                <span style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: row.color,
                }}>
                  {row.label}
                </span>
              </div>
              <span style={{
                color: row.label === "Log Out" ? "#cc0000" : "#ccc",
                fontSize: "18px",
              }}>
                →
              </span>
            </div>
          ))}
        </div>

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

export default Profile;