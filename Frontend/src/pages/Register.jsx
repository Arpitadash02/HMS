import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
const DEPARTMENTS = ["Cardiology", "Cardiac Surgery", "Orthopedics", "Neurology", "Neurosurgery", "Pediatrics", "Gynecology", "General Medicine", "Dermatology"];
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
}
