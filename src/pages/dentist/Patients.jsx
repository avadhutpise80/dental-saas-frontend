import { useEffect, useState } from "react";
import api from "../../api/api";
import SidebarLayout from "../../components/layout/SidebarLayout";

function Patients() {

  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: ""
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPatient = async () => {
    try {

      if (!form.name || !form.age || !form.mobile) {
        alert("Fill all patient fields");
        return;
      }

      await api.post("/patients", form);

      setForm({
        name: "",
        age: "",
        gender: "",
        mobile: ""
      });

      fetchPatients();

    } catch (err) {
      console.error(err);
      alert("Failed to add patient");
    }
  };

  const deletePatient = async (id) => {

    if (!window.confirm("Delete this patient?")) return;

    try {
      await api.delete(`/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SidebarLayout>

      <h2 className="text-2xl font-bold text-indigo-600 mb-6">
        Patients
      </h2>

      {/* Add Patient */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h3 className="font-semibold mb-4">Add Patient</h3>

        <div className="grid grid-cols-4 gap-4">

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

        </div>

        <button
          onClick={addPatient}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Patient
        </button>

      </div>

      {/* Patient Table */}

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Age</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>

            {patients.map((p) => (

              <tr key={p.id} className="border-t">

                <td className="p-4">{p.id}</td>
                <td className="p-4">{p.name}</td>
                <td className="p-4">{p.age}</td>
                <td className="p-4">{p.gender}</td>
                <td className="p-4">{p.mobile}</td>

                <td className="p-4">
                  <button
                    onClick={() => deletePatient(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

            {patients.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  No patients found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </SidebarLayout>
  );
}

export default Patients;