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

  const toggleCompleted = async (task: Task) => {
    try {
      await api.put(`/tasks/${task.id}`, {
        ...task,
        completed: !task.completed,
      });
      fetchTasks();
    } catch {
      alert("Failed to update task status.");
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit">{editId ? "Update" : "Create"} Task</button>
      </form>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleCompleted(task)} title="Mark completed" />
            <span style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginLeft: "0.5rem",
              }}
            >
              <b>{task.title}</b>: {task.description}
            </span>
            <button onClick={() => handleEdit(task)} title="Edit Task">🖉</button>
            <button onClick={() => handleDelete(task.id)} title="Delete Task">🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
