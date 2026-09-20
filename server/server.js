const express = require("express"); // give me the express package so that we can use it
// express is a function we call it using express()
// app is just a variable that we can use to call express function
// app contains the methods and properties of express

const mongoose = require("mongoose"); // give me the mongoose package so that we can use it
const cors = require("cors"); // allow our frontend to communicate with our backend
require("dotenv").config(); // load variables from our .env file

const Task = require("./models/task"); // give me the Task model so that we can use it

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  // when somebody requests to /, run this function
  res.send("Task Manager API is running!");
});
app.get("/api/tasks", async (req, res) => {
  // when somebody sends a GET request to /api/tasks, run this function

  try {
    // Task.find() asks MongoDB to find all the tasks
    // await waits for MongoDB to finish and gives us the result
    const tasks = await Task.find();

    // send the tasks back to whoever made the request as JSON
    res.json(tasks);
  } catch (error) {
    // if something goes wrong, send an error response
    res.status(500).json({ message: "Failed to get tasks" });
  }
});
app.post("/api/tasks", async (req, res) => {
  // when somebody sends a POST request to /api/tasks, run this function

  try {
    // get the title that the client sent in the request body
    const { title } = req.body; //req is the request that came from the frontend.

    //body is the data inside that request.
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    // create a new task in MongoDB
    const task = await Task.create({
      title: title,
    });

    // send the newly created task back as JSON
    res.status(201).json(task);
  } catch (error) {
    // if something goes wrong, send an error response
    res.status(500).json({ message: "Failed to create task" });
  }
});
app.put("/api/tasks/:id", async (req, res) => {
  // when somebody sends a PUT request to /api/tasks/:id, run this function

  try {
    // get the new data from the request body
    const { title, completed } = req.body;

    // find the task using its id and update it
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        completed: completed,
      },
      {
        new: true,
      },
    );

    // if no task was found with that id
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // send the updated task back as JSON
    res.json(task);
  } catch (error) {
    // if something goes wrong
    res.status(500).json({ message: "Failed to update task" });
  }
});
app.delete("/api/tasks/:id", async (req, res) => {
  // when somebody sends a DELETE request to /api/tasks/:id, run this function

  try {
    // find the task using its id and delete it
    const task = await Task.findByIdAndDelete(req.params.id);

    // if no task was found with that id
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // tell the client that the task was deleted
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    // if something goes wrong
    res.status(500).json({ message: "Failed to delete task" });
  }
});
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
