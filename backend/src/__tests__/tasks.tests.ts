import request from "supertest";
import app from "../app";

describe("Тести API /tasks", () => {
  test("1. GET /tasks повертає масив", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("2. POST /tasks додає нове завдання", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Нове завдання" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Нове завдання");
    expect(res.body.completed).toBe(false);
  });

  test("3. PATCH /tasks/:id перемикає статус виконання", async () => {
    const task = await request(app)
      .post("/tasks")
      .send({ title: "Тест статусу" });

    const res = await request(app)
      .patch(`/tasks/${task.body.id}`)
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  test("4. DELETE /tasks/:id видаляє завдання (204)", async () => {
    const task = await request(app)
      .post("/tasks")
      .send({ title: "На видалення" });

    const res = await request(app).delete(`/tasks/${task.body.id}`);

    expect(res.status).toBe(204);
  });

  test("5. POST /tasks без title повертає 400", async () => {
    const res = await request(app).post("/tasks").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
