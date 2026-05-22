import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import tentIcon from "../tent.png";

function SignupProfile() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role"); // "teacher" or "mentor"
  const isTeacher = role === "teacher";

  const totalSteps = isTeacher ? 2 : 6;

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [school, setSchool] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [gradYear, setGradYear] = useState("");
  const navigate = useNavigate();

  const progress = (step / totalSteps) * 100;

  const searchUniversity = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) { setSearchResults([]); return; }
    const res = await fetch(`http://universities.hipolabs.com/search?name=${query}`);
    const data = await res.json();
    setSearchResults(data.slice(0, 6));
  };

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const quickYears = [2026, 2027, 2028, 2029, 2030];

  const passwordStrength = () => {
    if (password.length === 0) return null;
    if (password.length < 6) return { label: "Weak", color: "#ff6b6b", width: "30%" };
    if (password.length < 10) return { label: "Medium", color: "#ffa500", width: "65%" };
    return { label: "Strong", color: "#4CAF50", width: "100%" };
  };

  const strength = passwordStrength();

  return (
    <div style={{
      backgroundColor: "#1e6b45",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Progress Bar */}
      <div style={{
        padding: "50px 20px 0",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <button
          onClick={() => step === 1 ? navigate("/code") : setStep(step - 1)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.2)",
            border: "none",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            flexShrink: 0,
          }}>
          ‹
        </button>

        <div style={{
          flex: 1,
          height: "4px",
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: "2px",
        }}>
          <div style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "white",
            borderRadius: "2px",
            transition: "width 0.3s ease",
          }} />
        </div>

        <span style={{
          color: "white",
          fontSize: "13px",
          fontWeight: "bold",
          flexShrink: 0,
        }}>{step}/{totalSteps}</span>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 20px",
        overflowY: "auto",
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
          marginBottom: "20px",
        }}>
          <img src={tentIcon} alt="tent" style={{ width: "50px" }} />
        </div>

        {/* ── STEP 1 — Name, Email, Password ── */}
        {step === 1 && (
          <div style={{ width: "100%" }}>
            <h1 style={titleStyle}>
              {isTeacher ? "Teacher Account 👨‍🏫" : "Let's Get Started 👋"}
            </h1>
            <p style={subtitleStyle}>
              {isTeacher ? "Create your admin account" : "Create your account"}
            </p>

            <label style={labelStyle}>First Name</label>
            <div style={inputGroup}>
              <input
                style={inputStyle}
                placeholder="e.g. Alex"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <label style={labelStyle}>Last Name</label>
            <div style={inputGroup}>
              <input
                style={inputStyle}
                placeholder="e.g. Johnson"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

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

            <label style={labelStyle}>Password</label>
            <div style={inputGroup}>
              <span>🔒</span>
              <input
                style={inputStyle}
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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

            {/* Password Strength */}
            {strength && (
              <div style={{ marginTop: "8px" }}>
                <div style={{
                  height: "4px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "2px",
                }}>
                  <div style={{
                    height: "100%",
                    width: strength.width,
                    backgroundColor: strength.color,
                    borderRadius: "2px",
                    transition: "width 0.3s ease",
                  }} />
                </div>
                <p style={{
                  fontSize: "12px",
                  color: strength.color,
                  margin: "4px 0 0",
                  fontWeight: "bold",
                }}>
                  {strength.label} password
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2 (Teacher) — All Set ── */}
        {step === 2 && isTeacher && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <h1 style={{ ...titleStyle, fontSize: "28px" }}>You're all set! 🎉</h1>
            <p style={subtitleStyle}>
              Welcome to Mentora, <strong>{firstName}</strong>!
            </p>

            <div style={summaryBox}>
              {[
                { icon: "👤", label: "Name", value: `${firstName} ${lastName}` },
                { icon: "📧", label: "Email", value: email },
                { icon: "👨‍🏫", label: "Role", value: "Teacher / Admin" },
              ].map((item) => (
                <div key={item.label} style={summaryRow}>
                  <span style={{ fontSize: "22px" }}>{item.icon}</span>
                  <span style={summaryLabel}>{item.label}</span>
                  <span style={summaryValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2 (Mentor) — Birthday ── */}
        {step === 2 && !isTeacher && (
          <div style={{ width: "100%" }}>
            <h1 style={titleStyle}>When's Your Birthday? 🎂</h1>
            <p style={subtitleStyle}>We'll personalise your experience</p>

            <label style={labelStyle}>Month</label>
            <div style={inputGroup}>
              <select
                style={{ ...inputStyle, appearance: "none" }}
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
              >
                <option value="">Select month</option>
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <span style={{ color: "rgba(255,255,255,0.6)" }}>∨</span>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Day</label>
                <div style={inputGroup}>
                  <select
                    style={{ ...inputStyle, appearance: "none" }}
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                  >
                    <option value="">Day</option>
                    {days.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>∨</span>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Year</label>
                <div style={inputGroup}>
                  <input
                    style={inputStyle}
                    type="number"
                    placeholder="YYYY"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3 — Student Type ── */}
        {step === 3 && !isTeacher && (
          <div style={{ width: "100%" }}>
            <h1 style={titleStyle}>What Kind of Student Are You?</h1>
            <p style={subtitleStyle}>We'll personalise your programme</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={() => setSchoolType("highschool")}
                style={{
                  ...choiceCard,
                  backgroundColor: schoolType === "highschool" ? "white" : "rgba(255,255,255,0.1)",
                  color: schoolType === "highschool" ? "#1e6b45" : "white",
                }}>
                <span style={{ fontSize: "32px" }}>🏫</span>
                <div style={{ textAlign: "left" }}>
                  <p style={{ margin: 0, fontWeight: "bold", fontSize: "16px" }}>High School</p>
                  <p style={{ margin: 0, fontSize: "13px", opacity: 0.7 }}>Grades 9-12 / Secondary school</p>
                </div>
                {schoolType === "highschool" && <span style={{ marginLeft: "auto" }}>✓</span>}
              </button>

              <button
                onClick={() => setSchoolType("university")}
                style={{
                  ...choiceCard,
                  backgroundColor: schoolType === "university" ? "white" : "rgba(255,255,255,0.1)",
                  color: schoolType === "university" ? "#1e6b45" : "white",
                }}>
                <span style={{ fontSize: "32px" }}>🎓</span>
                <div style={{ textAlign: "left" }}>
                  <p style={{ margin: 0, fontWeight: "bold", fontSize: "16px" }}>University</p>
                  <p style={{ margin: 0, fontSize: "13px", opacity: 0.7 }}>Undergraduate or graduate student</p>
                </div>
                {schoolType === "university" && <span style={{ marginLeft: "auto" }}>✓</span>}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4 — High School ── */}
        {step === 4 && schoolType === "highschool" && (
          <div style={{ width: "100%" }}>
            <h1 style={titleStyle}>Your High School 🏫</h1>
            <p style={subtitleStyle}>Type your high school name</p>

            <label style={labelStyle}>School name</label>
            <div style={inputGroup}>
              <input
                style={inputStyle}
                placeholder="e.g. Lincoln High School"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* ── STEP 4 — University Search ── */}
        {step === 4 && schoolType === "university" && (
          <div style={{ width: "100%" }}>
            <h1 style={titleStyle}>Your University 🎓</h1>
            <p style={subtitleStyle}>Search for your university</p>

            <label style={labelStyle}>Search university</label>
            <div style={{ ...inputGroup, marginBottom: "8px" }}>
              <span style={{ color: "rgba(255,255,255,0.6)" }}>🔍</span>
              <input
                style={inputStyle}
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => searchUniversity(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setSearchResults([]); setSchool(""); }}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>
                  ✕
                </button>
              )}
            </div>

            {searchResults.length > 0 && (
              <div style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "16px",
                overflow: "hidden",
              }}>
                {searchResults.map((uni, i) => (
                  <button
                    key={i}
                    onClick={() => { setSchool(uni.name); setSearchQuery(uni.name); setSearchResults([]); }}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: i < searchResults.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}>
                    🎓 {uni.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── STEP 5 — Graduation Year ── */}
        {step === 5 && !isTeacher && (
          <div style={{ width: "100%" }}>
            <h1 style={titleStyle}>Graduation Year 🎓</h1>
            <p style={subtitleStyle}>When do you plan to graduate?</p>

            <label style={labelStyle}>Quick select</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
              {quickYears.map((y) => (
                <button
                  key={y}
                  onClick={() => setGradYear(String(y))}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "12px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    backgroundColor: gradYear === String(y) ? "white" : "transparent",
                    color: gradYear === String(y) ? "#1e6b45" : "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}>
                  {y}
                </button>
              ))}
            </div>

            <label style={labelStyle}>Or enter manually</label>
            <div style={inputGroup}>
              <input
                style={inputStyle}
                type="number"
                placeholder="e.g. 2028"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                min="1990"
                max="2035"
              />
            </div>
          </div>
        )}

        {/* ── STEP 6 — All Set (Mentor) ── */}
        {step === 6 && !isTeacher && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <h1 style={{ ...titleStyle, fontSize: "28px" }}>You're all set! 🎉</h1>
            <p style={subtitleStyle}>
              Welcome to Mentora, <strong>{firstName}</strong>!<br />
              Your journey starts now.
            </p>

            <div style={summaryBox}>
              {[
                { icon: "👤", label: "Name", value: `${firstName} ${lastName}` },
                { icon: "📧", label: "Email", value: email },
                { icon: "🎂", label: "Birthday", value: `${birthMonth} ${birthDay}, ${birthYear}` },
                { icon: "📚", label: "Type", value: schoolType === "university" ? "University" : "High School" },
                { icon: "🏫", label: "School", value: school },
                { icon: "🎓", label: "Graduation", value: gradYear },
              ].map((item) => (
                <div key={item.label} style={summaryRow}>
                  <span style={{ fontSize: "22px" }}>{item.icon}</span>
                  <span style={summaryLabel}>{item.label}</span>
                  <span style={summaryValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Bottom Button */}
      <div style={{ padding: "16px 20px 32px" }}>
        <button
          onClick={() => {
            const lastStep = isTeacher ? 2 : 6;
            if (step < lastStep) setStep(step + 1);
            else navigate("/home");
          }}
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
          {step === (isTeacher ? 2 : 6) ? "Enter Mentora →" : step === (isTeacher ? 1 : 5) ? "Finish Setup ✓" : "Next →"}
        </button>
      </div>

    </div>
  )
}

const titleStyle = {
  color: "white",
  fontSize: "26px",
  fontWeight: "bold",
  margin: "0 0 8px",
  textAlign: "center",
};

const subtitleStyle = {
  color: "rgba(255,255,255,0.7)",
  fontSize: "14px",
  textAlign: "center",
  margin: "0 0 24px",
};

const labelStyle = {
  color: "rgba(255,255,255,0.8)",
  fontSize: "13px",
  fontWeight: "bold",
  display: "block",
  marginBottom: "8px",
  marginTop: "12px",
};

const inputGroup = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.15)",
  borderRadius: "14px",
  padding: "4px 16px",
  gap: "10px",
  marginBottom: "4px",
};

const inputStyle = {
  border: "none",
  backgroundColor: "transparent",
  padding: "14px 0",
  fontSize: "15px",
  outline: "none",
  width: "100%",
  color: "white",
};

const choiceCard = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "16px",
  borderRadius: "16px",
  border: "2px solid rgba(255,255,255,0.2)",
  cursor: "pointer",
  width: "100%",
};

const summaryBox = {
  backgroundColor: "rgba(255,255,255,0.1)",
  borderRadius: "20px",
  padding: "20px",
  marginTop: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  textAlign: "left",
};

const summaryRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const summaryLabel = {
  color: "rgba(255,255,255,0.6)",
  fontSize: "14px",
  width: "80px",
};

const summaryValue = {
  color: "white",
  fontWeight: "bold",
  fontSize: "14px",
};

export default SignupProfile;