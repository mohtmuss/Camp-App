import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// Fake appointments
const fakeAppointments = {
  7: [{ id: 1, time: "10:00", duration: "60m", title: "College Prep Workshop", person: "Prof. Santos", initial: "P", type: "Group", status: "Confirmed" }],
  13: [{ id: 2, time: "10:00", duration: "60m", title: "College Prep Workshop", person: "Prof. Santos", initial: "P", type: "Group", status: "Confirmed" }],
  15: [{ id: 3, time: "2:00", duration: "30m", title: "1-on-1 Mentoring", person: "Dr. Kim", initial: "D", type: "Private", status: "Pending" }],
  22: [{ id: 4, time: "11:00", duration: "45m", title: "Career Planning", person: "Ms. Rivera", initial: "M", type: "Group", status: "Confirmed" }],
};

function Schedule() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [activeRole, setActiveRole] = useState("Mentee");
  const [activeTab, setActiveTab] = useState("schedule");
  const navigate = useNavigate();

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const isToday = (day) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const selectedAppointments = fakeAppointments[selectedDay] || [];

  const ordinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div style={{
      backgroundColor: "#1e6b45",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── Header ── */}
      <div style={{ padding: "50px 20px 16px" }}>

        {/* Title */}
        <h1 style={{
          color: "white",
          fontSize: "22px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "0 0 16px",
        }}>
          Schedule
        </h1>

        {/* Month Navigation */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}>
          <button
            onClick={prevMonth}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}>
            ‹
          </button>

          <h2 style={{
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            margin: 0,
          }}>
            {MONTHS[currentMonth]} {currentYear}
          </h2>

          <button
            onClick={nextMonth}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}>
            ›
          </button>
        </div>

        {/* Role Switcher */}
        <div style={{
          display: "flex",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "12px",
          padding: "4px",
          marginBottom: "16px",
        }}>
          {["Mentee", "Mentor", "Teacher"].map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: activeRole === role ? "white" : "transparent",
                color: activeRole === role ? "#1e6b45" : "rgba(255,255,255,0.7)",
                fontWeight: activeRole === role ? "bold" : "normal",
                fontSize: "13px",
                cursor: "pointer",
              }}>
              {role}
            </button>
          ))}
        </div>

        {/* Day Headers */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: "8px",
        }}>
          {DAYS.map((day) => (
            <div key={day} style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.6)",
              fontSize: "12px",
              fontWeight: "500",
            }}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
        }}>
          {/* Empty cells */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const hasAppt = !!fakeAppointments[day];
            const selected = day === selectedDay;
            const todayDate = isToday(day);

            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  cursor: "pointer",
                  padding: "4px 0",
                }}>
                <div style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: selected
                    ? "white"
                    : todayDate
                    ? "rgba(255,255,255,0.3)"
                    : "transparent",
                  color: selected ? "#1e6b45" : "white",
                  fontSize: "14px",
                  fontWeight: selected || todayDate ? "bold" : "normal",
                }}>
                  {day}
                </div>

                {/* Dot for appointments */}
                {hasAppt && (
                  <div style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: selected ? "white" : "rgba(255,255,255,0.6)",
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── White Card ── */}
      <div style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderRadius: "24px 24px 0 0",
        padding: "20px",
        overflowY: "auto",
        position: "relative",
      }}>

        {/* Selected Day Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}>
          <div>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#111",
              margin: "0 0 4px",
            }}>
              {MONTHS[currentMonth]} {ordinal(selectedDay)}
            </h2>
            <p style={{
              color: "#999",
              fontSize: "13px",
              margin: 0,
            }}>
              {selectedAppointments.length > 0
                ? `Book a mentor · ${selectedAppointments.length} session`
                : "No appointments today"}
            </p>
          </div>

          {/* Role Badge */}
          <div style={{
            backgroundColor: "#e8f5e9",
            color: "#1e6b45",
            padding: "6px 14px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "bold",
          }}>
            {activeRole}
          </div>
        </div>

        {/* Appointments */}
        {selectedAppointments.length > 0 ? (
          selectedAppointments.map((appt) => (
            <div key={appt.id} style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
            }}>
              {/* Time */}
              <div style={{ flexShrink: 0 }}>
                <p style={{
                  color: "#1e6b45",
                  fontWeight: "bold",
                  fontSize: "16px",
                  margin: 0,
                }}>
                  {appt.time}
                </p>
                <p style={{
                  color: "#999",
                  fontSize: "12px",
                  margin: 0,
                }}>
                  {appt.duration}
                </p>
              </div>

              {/* Divider */}
              <div style={{
                width: "2px",
                alignSelf: "stretch",
                backgroundColor: "#1e6b45",
                borderRadius: "2px",
                opacity: 0.3,
              }} />

              {/* Details */}
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                }}>
                  <h4 style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#111",
                    margin: 0,
                  }}>
                    {appt.title}
                  </h4>

                  {/* Status Badge */}
                  <span style={{
                    backgroundColor: appt.status === "Confirmed" ? "#e8f5e9" : "#fff8e1",
                    color: appt.status === "Confirmed" ? "#1e6b45" : "#f57c00",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    border: `1px solid ${appt.status === "Confirmed" ? "#a5d6a7" : "#ffe082"}`,
                  }}>
                    {appt.status}
                  </span>
                </div>

                {/* Person */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <div style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#1e6b45",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}>
                    {appt.initial}
                  </div>
                  <span style={{
                    fontSize: "13px",
                    color: "#555",
                    fontWeight: "500",
                  }}>
                    {appt.person}
                  </span>
                  <span style={{ color: "#ddd" }}>·</span>
                  <span style={{
                    fontSize: "13px",
                    color: "#999",
                  }}>
                    {appt.type}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#ccc",
          }}>
            <p style={{ fontSize: "40px" }}>📅</p>
            <p style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#aaa",
              margin: "8px 0 4px",
            }}>
              No appointments
            </p>
            <p style={{ fontSize: "13px", color: "#bbb" }}>
              Tap + to book a session
            </p>
          </div>
        )}

        {/* + Button */}
        <button style={{
          position: "absolute",
          bottom: "80px",
          right: "20px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          backgroundColor: "#1e6b45",
          border: "none",
          color: "white",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(30,107,69,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          +
        </button>

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
  )
}

export default Schedule;