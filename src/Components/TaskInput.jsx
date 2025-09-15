import React, { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <form className="task-input" onSubmit={submit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a task and press Enter or click Add"
        aria-label="New task"
      />
      <button type="submit">Add</button>
    </form>
  );
}
