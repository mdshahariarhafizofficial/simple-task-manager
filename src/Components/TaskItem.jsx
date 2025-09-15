import React from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.text}" as ${task.completed ? "pending" : "completed"}`}
        />
        <span className="text">{task.text}</span>
      </label>

      <div className="right">
        <small className="time">{new Date(task.createdAt).toLocaleString()}</small>
        <button className="delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
