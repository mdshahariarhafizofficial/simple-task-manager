import React, { useEffect, useState } from "react";
import TaskInput from "./Components/TaskInput";
import TaskList from "./Components/TaskList";
import "./index.css"; // styles in one file

const LOCAL_STORAGE_KEY = "my_tasks_v1";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState("all"); // 'all' | 'completed' | 'pending'

  // Save to localStorage on tasks change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // add task
  const addTask = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((p) => [newTask, ...p]);
  };

  // toggle completed
  const toggleCompleted = (id) =>
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  // delete
  const deleteTask = (id) => setTasks((p) => p.filter((t) => t.id !== id));

  const clearCompleted = () => setTasks((p) => p.filter((t) => !t.completed));

  // filtered list for UI
  const visible = tasks.filter((t) =>
    filter === "all" ? true : filter === "completed" ? t.completed : !t.completed
  );

  return (
    <div className="app">
      <h1>Simple Task Manager</h1>

      <TaskInput onAdd={addTask} />

      <div className="controls">
        <div className="filters">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
            All
          </button>
          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="actions">
          <span>
            Showing: <strong>{visible.length}</strong> — Pending:{" "}
            <strong>{tasks.filter((t) => !t.completed).length}</strong>
          </span>
          <button onClick={clearCompleted} disabled={!tasks.some((t) => t.completed)}>
            Clear completed
          </button>
        </div>
      </div>

      <TaskList tasks={visible} onToggle={toggleCompleted} onDelete={deleteTask} />
    </div>
  );
}
