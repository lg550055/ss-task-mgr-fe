"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import { Task, TaskCreate } from "../types";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<TaskCreate>({ title: "", description: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/tasks/${editId}`, form);
        setEditId(null);
      } else {
        await api.post("/tasks", form);
      }
      setForm({ title: "", description: "" });
      fetchTasks();
    } catch {
      alert("Error");
    }
  };

  const handleEdit = (task: Task) => {
    setForm(task);
    setEditId(task.id);
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <button onClick={logout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit">{editId ? "Update" : "Create"} Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <b>{task.title}</b> - {task.description}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
