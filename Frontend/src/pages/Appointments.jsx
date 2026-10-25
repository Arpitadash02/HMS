import React, { useEffect, useState } from "react";
import API from "../services/api";
const today = () => { const n=new Date(); return new Date(n.getTime()-n.getTimezoneOffset()*60000).toISOString().slice(0,10); };
const fmt = (v) => v ? new Date(v).toLocaleString(undefined,{dateStyle:"medium",timeStyle:"short"}) : "—";
const FEES = {"Cardiology":900,"Cardiac Surgery":1800,"Orthopedics":700,"Neurology":1000,"Neurosurgery":2000,"Pediatrics":600,"Gynecology":750,"General Medicine":500,"Dermatology":650};
const TIME_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","14:00","14:30","15:00","15:30","16:00"];
export default function Appointments() {
  const [appointments,setAppointments]=useState([]); const [patients,setPatients]=useState([]); const [doctors,setDoctors]=useState([]);
  const [beds,setBeds]=useState({totalBeds:50,occupiedBeds:0,availableBeds:50}); const [form,setForm]=useState({patient:"",doctor:"",date:"",time:"09:00"});
  const [admission,setAdmission]=useState({}); const [error,setError]=useState(""); const [notice,setNotice]=useState(""); const [busy,setBusy]=useState(true);
  const user=JSON.parse(localStorage.getItem("user")||"null");
  const load=async()=>{setBusy(true);try{
    const requests=[API.get("/appointments"),API.get("/users/doctors"),API.get("/patients/beds/availability")];
    requests.push(API.get("/patients"));
    const r=await Promise.all(requests);setAppointments(r[0].data);setDoctors(r[1].data);setBeds(r[2].data);setPatients(r[3]?.data||[]);setError("");
  }catch(e){setError(e.response?.data?.message||"Could not load appointments. Log in and check backend/database.");}finally{setBusy(false);}};
  useEffect(()=>{load();},[]);
  const book=async(e)=>{e.preventDefault();setError("");setNotice("");try{
    const date=new Date(`${form.date}T${form.time}:00`).toISOString();
    const patientId = user?.role==="patient" ? patients[0]?._id : form.patient;
    await API.post("/appointments",{patient:patientId,doctor:form.doctor,date});
    setForm({patient:"",doctor:"",date:"",time:"09:00"});setNotice("Appointment booked successfully.");await load();
  }catch(e){setError(e.response?.data?.message||"Could not book appointment.");}};
  const saveAdmission=async(a)=>{const v=admission[a._id]||{status:a.patient?.status==="admitted"?"admitted":"not_admitted",roomNumber:a.patient?.roomNumber||""};setError("");setNotice("");try{
    await API.patch(`/appointments/${a._id}/admission`,v);setNotice(`Admission updated for ${a.patient?.name||"patient"}.`);await load();
  }catch(e){setError(e.response?.data?.message||"Could not update admission status.");}};
  const changeStatus=async(id,status)=>{try{await API.patch(`/appointments/${id}/status`,{status});setNotice("Appointment status updated.");await load();}catch(e){setError(e.response?.data?.message||"Could not update appointment.");}};
  return <div className="mx-auto max-w-6xl space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Scheduling & care</p><h1 className="mt-1 text-3xl font-bold text-slate-900">Appointments</h1><p className="mt-2 text-slate-500">{user?.role==="doctor"?`Doctor workspace · ${user.department||"Department not set"}`:"Book and track hospital appointments."}</p></div><button onClick={load} className="secondary-button">Refresh</button></div>
    <section className="grid gap-4 sm:grid-cols-3"><div className="stat-card"><p className="text-sm text-slate-500">Total beds</p><p className="mt-2 text-3xl font-bold">{beds.totalBeds}</p></div><div className="stat-card"><p className="text-sm text-slate-500">Occupied beds</p><p className="mt-2 text-3xl font-bold text-rose-700">{beds.occupiedBeds}</p></div><div className="stat-card"><p className="text-sm text-slate-500">Available beds</p><p className="mt-2 text-3xl font-bold text-emerald-700">{beds.availableBeds}</p></div></section>
    {error&&<div role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}{notice&&<div role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</div>}
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold">Book an appointment</h2><form onSubmit={book} className="mt-4 grid gap-3 md:grid-cols-2">
      <label className="text-sm font-medium">Patient<select className="form-control mt-1" value={user?.role==="patient"?(patients[0]?._id||""):form.patient} onChange={e=>setForm({...form,patient:e.target.value})} required disabled={user?.role==="patient"}><option value="">Select patient</option>{patients.map(p=><option key={p._id} value={p._id}>{p.name} · {p.patientId}</option>)}</select></label>
      <label className="text-sm font-medium">Doctor<select className="form-control mt-1" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})} required><option value="">Select doctor</option>{doctors.filter(d=>user?.role!=="doctor" || d._id===user.id).map(d=><option key={d._id} value={d._id}>{d.name} · {d.department}</option>)}</select></label>
      <label className="text-sm font-medium">Appointment date<input className="form-control mt-1" type="date" min={today()} value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required /></label>
      <label className="text-sm font-medium">Available appointment slot<select className="form-control mt-1" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} required>{TIME_SLOTS.map(t=><option key={t} value={t}>{t}</option>)}</select><span className="mt-1 block text-xs text-slate-500">Demo slots · 9 AM–12 PM and 2 PM–4 PM. Availability is confirmed when the booking is submitted.</span></label>
      <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900 md:col-span-2">Estimated consultation charge: <strong>₹{FEES[doctors.find(d=>d._id===form.doctor)?.department]||"—"}</strong> <span className="text-blue-700">· excludes tests, procedures and admission charges</span></div><button className="primary-button md:col-span-2">Book appointment</button>
    </form>{!patients.length&&<p className="mt-3 text-sm text-amber-700">No patient record is linked to your account. Register a patient account first.</p>}{!doctors.length&&<p className="mt-1 text-sm text-amber-700">No doctors registered yet. Register doctor accounts with departments first.</p>}</section>
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-semibold">Appointment list</h2><p className="mt-1 text-sm text-slate-500">Doctors can update admission and room/ward after reviewing a patient.</p></div>
      {busy?<p className="p-5 text-slate-500">Loading appointments…</p>:appointments.length?<div className="divide-y divide-slate-100">{appointments.map(a=>{const v=admission[a._id]||{status:a.patient?.status==="admitted"?"admitted":"not_admitted",roomNumber:a.patient?.roomNumber||""};const canManage=user?.role==="doctor"||user?.role==="admin";return <article key={a._id} className="p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold text-slate-900">{a.patient?.name||"Patient"} <span className="text-slate-400">·</span> Dr. {a.doctor?.name||"Doctor"}</h3><p className="mt-1 text-sm text-slate-500">{a.doctor?.department||"Department not set"} · {fmt(a.date)}</p></div><div className="flex flex-wrap gap-2"><span className="status-pill status-gray">{a.status}</span><span className={`status-pill ${a.patient?.status==="admitted"?"status-green":"status-gray"}`}>{a.patient?.status==="admitted"?`Admitted · Room ${a.patient.roomNumber}`:"Not admitted"}</span></div></div>
      {canManage&&<div className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto_auto] md:items-end"><label className="text-sm font-medium">Admission status<select className="form-control mt-1" value={v.status} onChange={e=>setAdmission({...admission,[a._id]:{...v,status:e.target.value}})}><option value="not_admitted">Not admitted</option><option value="admitted">Admitted</option></select></label><label className="text-sm font-medium">Room / ward<input className="form-control mt-1" placeholder="e.g. W-204" value={v.roomNumber} onChange={e=>setAdmission({...admission,[a._id]:{...v,roomNumber:e.target.value}})} /></label><button className="primary-button" onClick={()=>saveAdmission(a)}>Save admission</button><select aria-label="Appointment status" className="form-control" value={a.status} onChange={e=>changeStatus(a._id,e.target.value)}><option value="scheduled">Scheduled</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>}
      </article>;})}</div>:<p className="p-5 text-slate-500">No appointments found. Register patients and doctors before booking.</p>}
    </section>
  </div>;
}
