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
           <Link to="/">HMS</Link>
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


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"; // Added useLocation for active link state
// import Dashboard from "./pages/Dashboard";
// import Patients from "./pages/Patients";
// import Appointments from "./pages/Appointments";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import "./App.css";

// // A component for the Navigation Bar to keep code clean
// const Navbar = () => {
//   const location = useLocation(); // Hook to get the current URL path

//   const isActive = (path) => {
//     return location.pathname === path ? "text-blue-600 font-bold" : "text-gray-600";
//   };

//   return (
//     <nav className="navbar bg-white p-4 shadow-lg sticky top-1 z-100">
//       <div className="container mx-auto flex items-center justify-between">
//         <div className="text-xl font-bold text-blue-600">
//           <Link to="/">HMS</Link>
//         </div>
//         <ul className="flex space-x-30 items-center">
//           <li>
//             <Link to="/" className={`${isActive("/")} hover:text-blue-600 transition-colors duration-200 font-medium`}>
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link to="/patients" className={`${isActive("/patients")} hover:text-blue-600 transition-colors duration-200 font-medium`}>
//               Patients
//             </Link>
//           </li>
//           <li>
//             <Link to="/appointments" className={`${isActive("/appointments")} transition-colors duration-200 font-medium hover:text-blue-600`}>
//               Appointments
//             </Link>
//           </li>
//           <li>
//             {/* The login button is now a call-to-action */}
//             <Link to="/login" className="bg-blue-200 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
//               Login
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// // Main App Component
// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100 font-sans antialiased">
//         <Navbar />

//         {/* Main content area */}
//         <main className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-xl">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/patients" element={<Patients />} />
//             <Route path="/appointments" element={<Appointments />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;