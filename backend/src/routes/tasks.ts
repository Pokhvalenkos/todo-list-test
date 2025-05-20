import express, { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../types/task";

const router: Router = express.Router();

let tasks: Task[] = [
  { id: "1", title: "firstTask", completed: false },
  { id: "2", title: "secondTask", completed: false },
];

router.get("/", (req: Request, res: Response) => {
  res.json(tasks);
});

router.post("/", (req: Request, res: Response) => {
  const { title } = req.body;
  const newTask: Task = { id: uuidv4(), title, completed: false };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "'completed' must be boolean" });
  }

  task.completed = completed;
  res.status(200).json(task);
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== id);
  res.status(204).send();
});

export default router;
