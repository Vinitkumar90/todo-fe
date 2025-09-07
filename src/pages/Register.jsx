import React, { useState } from "react";
import axios from "axios";
import api from "../api/axios";
import { Link } from "react-router";

const Register = ({ onAuth }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      onAuth(res.data.newUser);
      console.log(res.data.newUser);
    } catch (err) {
      alert(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form
        className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Register
        </button>
        <p>
          Registered?{" "}
          <span className="text-blue-600  font-mono">
            <Link to={"/login"}>just login here</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
