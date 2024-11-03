import express from "express";

const router = express.Router();

const tasks = [{ id: 1, title: "Sample Task", completed: false }];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const task = tasks.find((task) => task.id === parseInt(req.params.id));
  if (task) {
    task.title = req.body.title || task.title;
    task.completed = req.body.completed ?? task.completed;
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

router.delete("/:id", (req, res) => {
  const index = tasks.findIndex((task) => task.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

export default router;
