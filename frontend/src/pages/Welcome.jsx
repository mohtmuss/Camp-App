import { useNavigate } from "react-router-dom";
import tentIcon from "../tent.png";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: "#1e6b45",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap:"60px",
      padding: "30px 24px 40px",
    }}>

      {/* Top Section */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        marginTop: "40px",
      }}>

        {/* Icon */}
        <div style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <img src={tentIcon} alt="tent" style={{ width: "65px" }} />
        </div>

        {/* App Name */}
        <h1 style={{
          color: "white",
          fontSize: "36px",
          fontWeight: "bold",
          margin: 0,
        }}>
          Mentora
        </h1>

        {/* Tagline */}
        <p style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "16px",
          textAlign: "center",
          margin: 0,
          lineHeight: "1.5",
        }}>
          Your journey to knowledge starts here
        </p>

        {/* Dots */}
        <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
          <div style={{
            width: "8px", height: "8px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.4)",
          }} />
          <div style={{
            width: "20px", height: "8px",
            borderRadius: "4px",
            backgroundColor: "white",
          }} />
          <div style={{
            width: "8px", height: "8px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.4)",
          }} />
        </div>

      </div>

      {/* Bottom Buttons */}
      <div style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}>

        {/* Login Button */}
        <button
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: "white",
            color: "#1e6b45",
            width: "100%",
            padding: "18px",
            borderRadius: "16px",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}>
          Login
        </button>

        {/* Create Account Button */}
        <button
          onClick={() => navigate("/code")}
          style={{
            backgroundColor: "transparent",
            color: "white",
            width: "100%",
            padding: "18px",
            borderRadius: "16px",
            border: "2px solid rgba(255,255,255,0.4)",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}>
          Create Account
        </button>

        {/* Terms */}
        <p style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: "12px",
          textAlign: "center",
          margin: "8px 0 0",
        }}>
          By continuing, you agree to our Terms & Privacy Policy
        </p>

      </div>

    </div>
  )
}

export default Welcome;