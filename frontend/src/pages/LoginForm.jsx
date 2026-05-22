import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tentIcon from "../tent.png";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields ❌");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/home");
      } else {
        setError(data.message || "Invalid email or password ❌");
      }
    } catch (err) {
      setError("Something went wrong. Try again ❌");
    }

    setLoading(false);
  };

  return (
    <div style={{
      backgroundColor: "#1e6b45",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        ‹
      </button>

      {/* Top Section */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 24px 32px",
        gap: "12px",
      }}>

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
          <img src={tentIcon} alt="tent" style={{ width: "50px" }} />
        </div>

        <h1 style={{
          color: "white",
          fontSize: "28px",
          fontWeight: "bold",
          margin: 0,
        }}>
          Welcome Back
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "14px",
          margin: 0,
        }}>
          Login to your Mentora account
        </p>

      </div>

      {/* White Card */}
      <div style={{
        flex: 1,
        backgroundColor: "white",
        borderRadius: "30px 30px 0 0",
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email</label>
          <div style={inputGroup}>
            <span>📧</span>
            <input
              style={inputStyle}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label style={labelStyle}>Password</label>
          <div style={inputGroup}>
            <span>🔒</span>
            <input
              style={inputStyle}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                padding: 0,
              }}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <p
          onClick={() => alert("Forgot password coming soon!")}
          style={{
            color: "#1e6b45",
            fontSize: "13px",
            textAlign: "right",
            cursor: "pointer",
            fontWeight: "bold",
            margin: 0,
          }}>
          Forgot Password?
        </p>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: "#fff0f0",
            border: "1px solid #ffcccc",
            borderRadius: "12px",
            padding: "12px",
            color: "#cc0000",
            fontSize: "13px",
            textAlign: "center",
          }}>
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#1e6b45",
            color: "white",
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "8px",
            opacity: loading ? 0.7 : 1,
          }}>
          {loading ? "Logging in..." : "Login →"}
        </button>

        {/* Create Account Link */}
        <p style={{
          textAlign: "center",
          color: "#888",
          fontSize: "14px",
          margin: 0,
        }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/code")}
            style={{
              color: "#1e6b45",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
            Create one
          </span>
        </p>

      </div>

    </div>
  )
}

const labelStyle = {
  fontSize: "13px",
  fontWeight: "bold",
  color: "#333",
  display: "block",
  marginBottom: "8px",
};

const inputGroup = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  borderRadius: "12px",
  padding: "4px 14px",
  gap: "10px",
};

const inputStyle = {
  border: "none",
  backgroundColor: "transparent",
  padding: "13px 0",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  color: "#333",
};

export default LoginForm;