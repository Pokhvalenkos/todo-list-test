import React from "react";
import { useState, useEffect } from "react";
import { client } from "./services/client";
import { Todo } from "./types/Todo";
import "./styles/main.scss";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    client
      .get<Todo[]>("/")
      .then(setTodos)
      .catch(() => alert("Failed to load todos"));
  }, []);

  const handleAdd = async (title: string) => {
    try {
      const newTodo = await client.post("/", { title, completed: false });
      setTodos((prev) => [...prev, newTodo]);
    } catch {
      alert("Failed to add todo");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await client.delete(`/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch {
      alert("Failed to delete todo");
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
}

export default App;
