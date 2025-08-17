import React, { useEffect, useState } from "react";
import API from "../services/api";

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
