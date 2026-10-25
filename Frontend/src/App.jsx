import React from "react";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
=======
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
=======
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

<<<<<<< HEAD
=======
<<<<<<< HEAD
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

=======
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
function Navigation() {
  const navigate=useNavigate(); const location=useLocation();
  const user=JSON.parse(localStorage.getItem("user")||"null");
  const logout=()=>{localStorage.removeItem("token");localStorage.removeItem("user");navigate("/login");};
  const navClass=(path)=>`rounded-lg px-3 py-2 text-sm font-medium ${location.pathname===path?"bg-blue-50 text-blue-700":"text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`;
  return <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur"><nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
    <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-slate-900"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white">+</span> HMS <span className="hidden text-xs font-medium text-slate-400 sm:inline">Hospital Management</span></Link>
    <div className="flex flex-wrap items-center gap-1"><Link className={navClass("/")} to="/">Dashboard</Link><Link className={navClass("/patients")} to="/patients">Patients & Beds</Link><Link className={navClass("/appointments")} to="/appointments">Appointments</Link>
      {!user?<><Link className={navClass("/login")} to="/login">Login</Link><Link className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800" to="/register">Register</Link></>:<><span className="hidden px-2 text-sm text-slate-500 sm:inline">{user.name} · {user.role}{user.department?` · ${user.department}`:""}</span><button className="secondary-button" onClick={logout}>Log out</button></>}
    </div>
  </nav></header>;
}
export default function App() {
  return <BrowserRouter><div className="min-h-screen bg-slate-50"><Navigation/><main className="mx-auto max-w-7xl px-4 py-8 sm:px-6"><Routes><Route path="/" element={<Dashboard/>}/><Route path="/patients" element={<Patients/>}/><Route path="/appointments" element={<Appointments/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="*" element={<Dashboard/>}/></Routes></main><footer className="mt-12 border-t border-slate-200 bg-white px-4 py-5 text-center text-xs text-slate-400">HMS demo · Do not use for real patient care without security, privacy, and clinical validation.</footer></div></BrowserRouter>;
}
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
