import express, { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../types/task";
import fs from "fs/promises";
import path from "path";

const router: Router = express.Router();
const DATA_PATH = path.join(__dirname, "..", "data", "tasks.json");

const readTasks = async (): Promise<Task[]> => {
  const data = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(data);
};

const writeTasks = async (tasks: Task[]) => {
  await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2));
};

router.get("/", async (req: Request, res: Response) => {
  const tasks = await readTasks();
  res.json(tasks);
});

router.post("/", async (req: Request, res: Response) => {
  const { title } = req.body;
  const tasks = await readTasks();
  const newTask: Task = { id: uuidv4(), title, completed: false };

  tasks.push(newTask);
  await writeTasks(tasks);

  res.status(201).json(newTask);
});

router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;
  const tasks = await readTasks();

  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "'completed' must be boolean" });
  }

  task.completed = completed;
  await writeTasks(tasks);

  res.status(200).json(task);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const tasks = await readTasks();
  const filtered = tasks.filter((task) => task.id !== id);

  await writeTasks(filtered);
  res.status(204).send();
});

export default router;
