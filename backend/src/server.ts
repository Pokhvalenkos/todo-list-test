import express from "express";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
