import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../models/task";

const router = Router();
let tasks: Task[] = [
  { id: "1", title: "firstTask" },
  { id: "2", title: "secondTask" },
];

router.get("/", (req: Request, res: Response) => {
  res.json(tasks);
});

router.post("/", (req: Request, res: Response) => {
  const title = req.body;
  const newTask: Task = { id: uuidv4(), title };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.delete("/", (req: Request, res: Response) => {
  const { id } = req.params;

  tasks = tasks.filter((task) => task.id !== id);
  res.status(204).send();
});

export default router;
