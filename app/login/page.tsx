"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../lib/api";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("username", form.username);
      params.append("password", form.password);

      const res = await api.post("/token", params);

      login(res.data.access_token);

      router.push("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}
