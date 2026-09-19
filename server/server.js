const express = require("express"); // give me the express package so that we can use it
// express is a function we call it using express()
// app is just a variable that we can use to call express function
// app contains the methods and properties of express

const mongoose = require("mongoose"); // give me the mongoose package so that we can use it
const cors = require("cors"); // allow our frontend to communicate with our backend
require("dotenv").config(); // load variables from .env

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// connect our application to MongoDB
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

app.get("/", (req, res) => {
  // when somebody requests to /, run this function
  res.send("Task Manager API is running!");
});
