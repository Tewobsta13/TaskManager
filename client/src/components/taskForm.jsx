import { useState } from "react";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");

  async function handleAdd() {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });

    const data = await response.json();
    onTaskAdded(data);

    console.log(data);

    setTitle("");
  }

  return (
    <div>
      <input
        placeholder="Enter a task..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default TaskForm;
