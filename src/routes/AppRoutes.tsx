// src/routes/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "../page/Login";
import Dashboard from "../page/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../page/Signup";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
       <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
