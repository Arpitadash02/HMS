import React, { useEffect, useState } from "react";
import API from "../services/api";
<<<<<<< HEAD
=======
<<<<<<< HEAD

function Patients() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", admitted: false });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data } = await API.get("/patients");
      setPatients(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await API.post("/patients", newPatient);
    setNewPatient({ name: "", age: "", admitted: false });
    fetchPatients();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-700">Patients</h2>
      
      {/* Form */}
      <form onSubmit={handleAdd} className="mt-4 p-4 border rounded shadow-md">
        <input type="text" placeholder="Name" value={newPatient.name}
          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          className="border p-2 mr-2" required />
        <input type="number" placeholder="Age" value={newPatient.age}
          onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
          className="border p-2 mr-2" required />
        <label>
          <input type="checkbox" checked={newPatient.admitted}
            onChange={(e) => setNewPatient({ ...newPatient, admitted: e.target.checked })} /> Admitted
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded ml-2">Add</button>
      </form>

      {/* List */}
      <ul className="mt-4">
        {patients.map((p) => (
          <li key={p._id} className="border p-2 my-2 rounded">
            {p.name} | Age: {p.age} | {p.admitted ? "Admitted" : "Not Admitted"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;
=======
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
export default function Patients() {
  const [patients, setPatients] = useState([]); const [beds, setBeds] = useState({ totalBeds: 50, occupiedBeds: 0, availableBeds: 50 }); const [error, setError] = useState(""); const [busy, setBusy] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const load = async () => { setBusy(true); try { const [p,b] = await Promise.all([API.get("/patients"),API.get("/patients/beds/availability")]); setPatients(p.data); setBeds(b.data); setError(""); } catch(e) { setError(e.response?.data?.message || "Could not load patients. Please log in and check the backend."); } finally { setBusy(false); } };
  useEffect(()=>{load();},[]);
  return <div className="mx-auto max-w-6xl space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Hospital operations</p><h1 className="mt-1 text-3xl font-bold text-slate-900">{user?.role === "patient" ? "My patient record" : "Patients & bed availability"}</h1></div><button onClick={load} className="secondary-button">Refresh data</button></div>
    <section className="grid gap-4 sm:grid-cols-3"><div className="stat-card"><p className="text-sm text-slate-500">Total beds</p><p className="mt-2 text-3xl font-bold">{beds.totalBeds}</p></div><div className="stat-card"><p className="text-sm text-slate-500">Occupied beds</p><p className="mt-2 text-3xl font-bold text-rose-700">{beds.occupiedBeds}</p></div><div className="stat-card"><p className="text-sm text-slate-500">Available beds</p><p className="mt-2 text-3xl font-bold text-emerald-700">{beds.availableBeds}</p></div></section>
    {error && <div role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">{error}</div>}
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-semibold">Patient records</h2><p className="mt-1 text-sm text-slate-500">{user?.role === "patient" ? "Your admission status and room appear here." : "Admission status and room are updated by the treating doctor."}</p></div>
      {busy ? <p className="p-5 text-slate-500">Loading patient records…</p> : patients.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Patient</th><th className="px-5 py-3">Patient ID</th><th className="px-5 py-3">Age</th><th className="px-5 py-3">Admission</th><th className="px-5 py-3">Room / Ward</th></tr></thead><tbody className="divide-y divide-slate-100">{patients.map(p=><tr key={p._id}><td className="px-5 py-4 font-medium">{p.name}</td><td className="px-5 py-4">{p.patientId}</td><td className="px-5 py-4">{p.age}</td><td className="px-5 py-4"><span className={`status-pill ${p.status==="admitted"?"status-green":"status-gray"}`}>{p.status==="admitted"?"Admitted":"Not admitted"}</span></td><td className="px-5 py-4">{p.roomNumber || "—"}</td></tr>)}</tbody></table></div> : <p className="p-5 text-slate-500">{user?.role==="patient" ? "No patient profile is linked to this account. Existing accounts created before this update may need manual linking." : "No patient records found. Register a patient account first."}</p>}
    </section><p className="text-sm text-slate-500">Bed availability is calculated from admitted patient records. Set HOSPITAL_TOTAL_BEDS in the backend environment to your hospital's bed capacity.</p>
  </div>;
}
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
