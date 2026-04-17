import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "DENTIST",
    clinic_name: "",
    lab_name: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[450px]">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Register
        </h2>

        <input name="name" placeholder="Name" onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3" />

        <input name="email" placeholder="Email" onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3" />

        <input type="password" name="password" placeholder="Password" onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3" />

        <select name="role" onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3">
          <option value="DENTIST">Dentist</option>
          <option value="LAB">Lab</option>
        </select>

        {form.role === "DENTIST" && (
          <input name="clinic_name" placeholder="Clinic Name"
            onChange={handleChange}
            className="w-full border p-2 rounded-lg mb-3" />
        )}

        {form.role === "LAB" && (
          <input name="lab_name" placeholder="Lab Name"
            onChange={handleChange}
            className="w-full border p-2 rounded-lg mb-3" />
        )}

        <button onClick={handleRegister}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;