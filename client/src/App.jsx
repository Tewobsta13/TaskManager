import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  function handleTaskAdded(task) {
    setTasks((previousTasks) => [...previousTasks, task]);
  }

  console.log(tasks);

  async function toggleTask(task) {
    const response = await fetch(
      `http://localhost:5000/api/tasks/${task._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          completed: !task.completed,
        }),
      },
    );

    const updatedTask = await response.json();

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task,
      ),
    );
  }

  useEffect(() => {
    async function getTasks() {
      const response = await fetch("http://localhost:5000/api/tasks");

      const data = await response.json();

      setTasks(data);
    }

    getTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>

      <TaskForm onTaskAdded={handleTaskAdded} />

      {tasks.map((task) => (
        <p key={task._id} onClick={() => toggleTask(task)}>
          {task.title}
        </p>
      ))}
    </div>
  );
}

export default App;
