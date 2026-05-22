import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tentIcon from "../tent.png";

function Code() {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [view, setView] = useState("choice");
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 4) {
      document.getElementById(`box-${index + 1}`).focus();
    }
  };

  const handleContinue = async () => {
    const userCode = code.join("");

    const response = await fetch("http://localhost:5000/check-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: userCode }),
    });

    const data = await response.json();

    if (data.success) {
      navigate("/signup-profile?role=mentor");
    } else {
      setError("Invalid code! Please try again. ❌");
      setCode(["", "", "", "", ""]);
      document.getElementById("box-0").focus();
    }
  };

  return (
    <div style={{
      backgroundColor: "#1e6b45",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      padding: "24px",
    }}>

      {/* Back Button */}
      <button
        onClick={() => view === "code" ? setView("choice") : navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.2)",
          border: "none",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
        }}>
        ‹
      </button>

      {/* Icon */}
      <div style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <img src={tentIcon} alt="camping icon" style={{ width: "50px" }} />
      </div>

      {/* ── CHOICE VIEW ── */}
      {view === "choice" && (
        <>
          <h1 style={{
            color: "white",
            fontSize: "26px",
            fontWeight: "bold",
            margin: 0,
            textAlign: "center",
          }}>
            Create Account
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "14px",
            margin: 0,
            textAlign: "center",
          }}>
            How would you like to join?
          </p>

          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>

            {/* I Have a Code */}
            <button
              onClick={() => setView("code")}
              style={choiceCard}>
              <div style={choiceIconBox}>🔑</div>
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, fontWeight: "bold", fontSize: "15px", color: "white" }}>
                  I Have a Code
                </p>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                  Mentor or Mentee — enter your invite code
                </p>
              </div>
              <span style={{ color: "white", marginLeft: "auto" }}>→</span>
            </button>

            {/* I'm a Teacher */}
            <button
              onClick={() => navigate("/signup-profile?role=teacher")}
              style={choiceCard}>
              <div style={choiceIconBox}>👨‍🏫</div>
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, fontWeight: "bold", fontSize: "15px", color: "white" }}>
                  I'm a Teacher
                </p>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                  Admin — create your account directly
                </p>
              </div>
              <span style={{ color: "white", marginLeft: "auto" }}>→</span>
            </button>

          </div>

          <p style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "12px",
            textAlign: "center",
          }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "white", fontWeight: "bold", cursor: "pointer" }}>
              Login
            </span>
          </p>
        </>
      )}

      {/* ── CODE VIEW ── */}
      {view === "code" && (
        <>
          <h1 style={{
            color: "white",
            fontSize: "26px",
            fontWeight: "bold",
            margin: 0,
            textAlign: "center",
          }}>
            Enter Your Code
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "14px",
            margin: 0,
            textAlign: "center",
          }}>
            Type the 5-digit code from your teacher
          </p>

          {/* 5 Boxes */}
          <div style={{ display: "flex", gap: "10px" }}>
            {code.map((digit, index) => (
              <input
                key={index}
                id={`box-${index}`}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                maxLength={1}
                style={{
                  width: "50px",
                  height: "60px",
                  borderRadius: "14px",
                  border: digit ? "2px solid white" : "none",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                  fontSize: "24px",
                  textAlign: "center",
                  outline: "none",
                }}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <p style={{
              color: "#ff6b6b",
              fontSize: "14px",
              backgroundColor: "rgba(255,0,0,0.15)",
              padding: "10px 20px",
              borderRadius: "10px",
              margin: 0,
              textAlign: "center",
            }}>
              {error}
            </p>
          )}

          {/* Success */}
          {!error && code.join("").length === 5 && (
            <p style={{
              color: "#90EE90",
              fontSize: "14px",
              backgroundColor: "rgba(0,255,0,0.15)",
              padding: "10px 20px",
              borderRadius: "10px",
              margin: 0,
            }}>
              ✅ Code looks good! Click Continue.
            </p>
          )}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            style={{
              backgroundColor: code.join("").length === 5
                ? "white" : "rgba(255,255,255,0.2)",
              color: code.join("").length === 5 ? "#1e6b45" : "white",
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: code.join("").length === 5 ? "pointer" : "not-allowed",
            }}>
            Continue →
          </button>

          <p style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "13px",
          }}>
            Don't have a code?{" "}
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/")}
            >
              Request one
            </span>
          </p>
        </>
      )}

    </div>
  )
}

const choiceCard = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "16px",
  borderRadius: "16px",
  backgroundColor: "rgba(255,255,255,0.1)",
  border: "2px solid rgba(255,255,255,0.2)",
  cursor: "pointer",
  width: "100%",
};

const choiceIconBox = {
  fontSize: "24px",
  backgroundColor: "rgba(255,255,255,0.15)",
  borderRadius: "12px",
  width: "46px",
  height: "46px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export default Code;