import express from "express";
import taskRoutes from "./features/task/routes/taskRoutes";
import userRoutes from "./features/user/routes/userRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API!");
});

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
