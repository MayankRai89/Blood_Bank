import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Signin";
import Profile from "./pages/Profile";
import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import Register from "./pages/auth/Signup";
import LandingPage from "./pages/Landing";

function App() {
  return (
      <Routes>
        <Route path="/createaccount" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="*" element={<Navigate to="/createaccount" />} /> */}
      </Routes>
  );
}

export default App;
