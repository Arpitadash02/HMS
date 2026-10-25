import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" }); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const navigate = useNavigate(); const location = useLocation();
  const submit = async (e) => {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      const { data } = await API.post("/users/login", { email: form.email.trim(), password: form.password });
      localStorage.setItem("token", data.token); localStorage.setItem("user", JSON.stringify(data.user));
      navigate(data.user.role === "doctor" ? "/appointments" : data.user.role === "patient" ? "/patients" : "/");
    } catch (err) { setError(err.response?.data?.message || "Login failed. Check backend and database connection."); }
    finally { setBusy(false); }
  };
  return <div className="mx-auto my-10 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Welcome back</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Sign in to HMS</h1>
    {location.state?.message && <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">{location.state.message}</div>}
    {error && <div role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
    <form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-medium">Email<input className="form-control mt-1" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} autoComplete="email" required /></label>
      <label className="block text-sm font-medium">Password<input className="form-control mt-1" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} autoComplete="current-password" required /></label>
      <button disabled={busy} className="primary-button w-full disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button></form>
    <p className="mt-5 text-center text-sm text-slate-600">New to HMS? <Link className="font-semibold text-blue-700 hover:underline" to="/register">Create an account</Link></p>
  </div>;
}
>>>>>>> master
