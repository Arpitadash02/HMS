import React from "react";

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
