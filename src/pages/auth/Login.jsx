import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      if (user.role === "DENTIST") navigate("/dentist");
      if (user.role === "LAB") navigate("/lab");
      if (user.role === "ADMIN") navigate("/admin");

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5')",
        }}
      />

      <div className="absolute inset-0 bg-black/60"></div>

      {/* Card */}
      <div className="relative bg-white rounded-xl shadow-lg p-8 w-[380px]">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:ring-1 focus:ring-indigo-500 outline-none"
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md pr-10 focus:ring-1 focus:ring-indigo-500 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              // Eye OFF
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94L1 1"></path>
                <path d="M10.58 10.58A3 3 0 019 12a3 3 0 01-3-3c0-.43.09-.84.25-1.21"></path>
                <path d="M6.1 6.1A8.06 8.06 0 0112 5c5 0 9 4 9 4a17.7 17.7 0 01-4.3 3.7"></path>
                <path d="M3.51 3.51A17.65 17.65 0 003 9s4 4 9 4a8.93 8.93 0 004.49-1.19"></path>
              </svg>
            ) : (
              // Eye ON
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 9s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6z"></path>
                <circle cx="12" cy="9" r="3"></circle>
              </svg>
            )}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          New user?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;