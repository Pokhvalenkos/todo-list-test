import express from "express";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
