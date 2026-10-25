import React, { useState } from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
const DEPARTMENTS = ["Cardiology", "Cardiac Surgery", "Orthopedics", "Neurology", "Neurosurgery", "Pediatrics", "Gynecology", "General Medicine", "Dermatology"];
=======
<<<<<<< HEAD
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User registered:", form);
    try{
      //call backend API with axios
      const response = await axios.post('/api/register', form);
      const isAlreadyRegistered = false;

      if (isAlreadyRegistered) {
        toast.error("User already exists!");
      } else {
        toast.success("User registration complete!");

        // Clear the form fields only on success
        setForm({ name: "", email: "", password: "" });
      }

    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <><div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
          <button
            type="submit" onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div><ToastContainer position="top-right" /></>
  );
=======
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
const DEPARTMENTS = ["Cardiology", "Cardiac Surgery", "Orthopedics", "Neurology", "Neurosurgery", "Pediatrics", "Gynecology", "General Medicine"];
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "patient", department: DEPARTMENTS[0], age: "" });
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false); const navigate = useNavigate();
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      await API.post("/users/register", { name: form.name.trim(), email: form.email.trim(), password: form.password, role: form.role, ...(form.role === "doctor" ? { department: form.department } : { age: Number(form.age) }) });
      navigate("/login", { state: { message: "Registration successful. Please log in." } });
    } catch (err) { setError(err.response?.data?.message || "Registration failed. Check the backend and database connection."); }
    finally { setBusy(false); }
  };
  return <div className="mx-auto my-8 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Hospital Management System</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Create your account</h1><p className="mt-2 text-slate-500">Register as a patient or doctor.</p>
    {error && <div role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
    <form onSubmit={submit} className="mt-6 space-y-4">
      <label className="block text-sm font-medium">Full name<input className="form-control mt-1" name="name" value={form.name} onChange={change} autoComplete="name" required /></label>
      <label className="block text-sm font-medium">Email<input className="form-control mt-1" type="email" name="email" value={form.email} onChange={change} autoComplete="email" required /></label>
      <label className="block text-sm font-medium">Password<input className="form-control mt-1" type="password" name="password" value={form.password} onChange={change} minLength={8} autoComplete="new-password" required /><span className="mt-1 block text-xs text-slate-500">At least 8 characters.</span></label>
      <label className="block text-sm font-medium">Account type<select className="form-control mt-1" name="role" value={form.role} onChange={change}><option value="patient">Patient</option><option value="doctor">Doctor</option></select></label>
      {form.role === "patient" ? <label className="block text-sm font-medium">Age<input className="form-control mt-1" type="number" name="age" value={form.age} onChange={change} min="0" max="125" required /></label> : <label className="block text-sm font-medium">Department<select className="form-control mt-1" name="department" value={form.department} onChange={change}>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</select><span className="mt-1 block text-xs text-amber-700">Demo project: production doctor accounts should be approved by an administrator.</span></label>}
      <button disabled={busy} className="primary-button w-full disabled:opacity-60">{busy ? "Creating account…" : "Create account"}</button>
    </form><p className="mt-5 text-center text-sm text-slate-600">Already registered? <Link className="font-semibold text-blue-700 hover:underline" to="/login">Log in</Link></p>
  </div>;
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
}
