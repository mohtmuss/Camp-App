import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import LoginForm from "./pages/LoginForm";
import Code from "./pages/Code";
import SignupProfile from "./pages/SignupProfile";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="phoneWrapper">
        <div className="phone">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/code" element={<Code />} />
            <Route path="/signup-profile" element={<SignupProfile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;