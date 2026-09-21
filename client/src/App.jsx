import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
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
      <TaskForm />
      {tasks.map((task) => (
        <p key={task._id}>{task.title}</p>
      ))}
    </div>
  );
}

export default App;
