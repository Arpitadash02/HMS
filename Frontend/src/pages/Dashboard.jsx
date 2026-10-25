import React from "react";
<<<<<<< HEAD

function Dashboard() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 text-center">
          🏥 Hospital Management System
        </h1>
        <p className="text-gray-600 text-lg text-center mb-6">
          Manage Patients, Doctors, and Appointments seamlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 hover:bg-blue-200 p-6 rounded-xl shadow cursor-pointer transition">
            <h2 className="text-xl font-semibold text-blue-800">👨‍⚕️ Doctors</h2>
            <p className="text-gray-600 mt-2">View and manage doctor profiles.</p>
          </div>
          <div className="bg-green-100 hover:bg-green-200 p-6 rounded-xl shadow cursor-pointer transition">
            <h2 className="text-xl font-semibold text-green-800">🧑‍🤝‍🧑 Patients</h2>
            <p className="text-gray-600 mt-2">Keep track of patient records.</p>
          </div>
          <div className="bg-yellow-100 hover:bg-yellow-200 p-6 rounded-xl shadow cursor-pointer transition">
            <h2 className="text-xl font-semibold text-yellow-800">📅 Appointments</h2>
            <p className="text-gray-600 mt-2">Schedule and monitor appointments.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
=======
import { Link } from "react-router-dom";
const departments=["Cardiology","Cardiac Surgery","Orthopedics","Neurology","Neurosurgery","Pediatrics","Gynecology","General Medicine"];
export default function Dashboard() {
  const user=JSON.parse(localStorage.getItem("user")||"null");
  const cards=[
    {title:"Patients & beds",description:"Review admission status, room allocation, and available bed count.",to:"/patients",icon:"🛏️",tone:"bg-emerald-50"},
    {title:"Appointments",description:"Schedule appointments and track doctor reviews and admission decisions.",to:"/appointments",icon:"📅",tone:"bg-blue-50"},
    {title:"Account access",description:user?`Signed in as ${user.name} (${user.role}).`:"Register a patient or doctor account, then sign in.",to:user?"/login":"/register",icon:"🔐",tone:"bg-violet-50"}
  ];
  return <div className="space-y-10">
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 px-6 py-10 text-white shadow-lg sm:px-10 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Hospital Management System</p><h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">Better coordination for every patient.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">Register patients, connect them with the right medical department, schedule appointments, and record room admission from a doctor's account.</p>
      <div className="mt-7 flex flex-wrap gap-3"><Link to="/appointments" className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-900 hover:bg-blue-50">View appointments</Link><Link to="/patients" className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Check beds</Link></div>
    </section>
    <section className="grid gap-4 md:grid-cols-3">{cards.map(c=><Link key={c.title} to={c.to} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.tone} text-2xl`}>{c.icon}</div><h2 className="mt-4 text-lg font-bold text-slate-900">{c.title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{c.description}</p><span className="mt-5 inline-block text-sm font-semibold text-blue-700">Open section →</span></Link>)}</section>
    <section><div className="mb-4"><p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Specialties</p><h2 className="mt-1 text-2xl font-bold text-slate-900">8 medical departments</h2><p className="mt-2 text-slate-500">Doctors choose a specialty during registration. Patients can select a doctor by department when booking.</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{departments.map((d,i)=><div key={d} className="rounded-xl border border-slate-200 bg-white p-4"><div className="text-xs font-bold text-blue-700">0{i+1}</div><div className="mt-2 font-semibold text-slate-800">{d}</div></div>)}</div></section>
  </div>;
}
>>>>>>> master
