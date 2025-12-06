// src/routes/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "../page/Login";
import Dashboard from "../page/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../page/Signup";
import Login from "../page/Login";
import AdminDashboard from "../page/AdminDashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admindashboard" element={< AdminDashboard/>} />
        <Route path="/signup" element={<Signup />} />
       <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
