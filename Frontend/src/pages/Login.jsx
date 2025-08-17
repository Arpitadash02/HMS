import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import API from "../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await API.post("/users/login", form);
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("User logged in successfully!");
        setForm({ email: "", password: "" });
        
        // Use the navigate function to redirect after success
        navigate("/appointments"); 
        
      } else {
        toast.error("Login failed. Please check your credentials.");
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Invalid email or password.");
        } else {
          toast.error("Login failed. An unexpected error occurred.");
        }
      } else if (error.request) {
        toast.error("No server response. Please check your network.");
      } else {
        toast.error("An error occurred during login.");
      }
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold text-center">Login</h2>
      
      <input 
        type="email" 
        name="email"
        placeholder="Email" 
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 mt-2" 
        required 
      />
      
      <input 
        type="password" 
        name="password"
        placeholder="Password" 
        value={form.password}
        onChange={handleChange}
        className="w-full border p-2 mt-2" 
        required 
      />
            <button 
        type="submit"
        className="bg-blue-600 text-white w-full py-2 mt-4 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Login
      </button>
    </form>
  );
}

export default Login;