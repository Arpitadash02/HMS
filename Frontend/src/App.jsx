import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
      {/* Navbar */}
      <nav className="mt-2.5 bg-amber-100 p-4 text-white shadow-md flex items-center justify-between">

        <div className="text-xl font-bold text-blue-600 ">
           <Link to="/">🏥 HMS</Link>
        </div>

        <ul className="flex space-x-20">
          <li><Link to="/" className="hover:bg-blue-100 underline">Dashboard</Link></li>
          <li><Link to="/patients" className="hover:bg-blue-100 underline">Patients</Link></li>
          <li><Link to="/appointments" className="hover:bg-blue-100 underline">Appointments</Link></li>
          <li><Link to="/Register" className="hover:bg-blue-100 underline">Register</Link></li>
          <li><Link to="/login" className="hover:bg-blue-100 underline">Login</Link></li>
        </ul>
      </nav>

      {/* Routes */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
    </div>
    
  );
}

export default App;

