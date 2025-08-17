import React, { useEffect, useState } from "react";
import API from "../services/api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppt, setNewAppt] = useState({ patient: "", doctor: "", date: "" });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data } = await API.get("/appointments");
    setAppointments(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await API.post("/appointments", newAppt);
    setNewAppt({ patient: "", doctor: "", date: "" });
    fetchAppointments();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-700">Appointments</h2>
      
      <form onSubmit={handleAdd} className="mt-4 p-4 border rounded shadow-md">
        <input type="text" placeholder="Patient ID" value={newAppt.patient}
          onChange={(e) => setNewAppt({ ...newAppt, patient: e.target.value })}
          className="border p-2 mr-2" required />
        <input type="text" placeholder="Doctor Name" value={newAppt.doctor}
          onChange={(e) => setNewAppt({ ...newAppt, doctor: e.target.value })}
          className="border p-2 mr-2" required />
        <input type="date" value={newAppt.date}
          onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
          className="border p-2 mr-2" required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <ul className="mt-4">
        {appointments.map((a) => (
          <li key={a._id} className="border p-2 my-2 rounded">
            Patient: {a.patient} | Doctor: {a.doctor} | Date: {new Date(a.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;
