import express from "express";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
