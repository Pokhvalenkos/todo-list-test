import React from "react";
import { useState, useEffect } from "react";
import { client } from "./services/client";
import { Todo } from "./types/Todo";
import "./styles/main.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodoHandlers } from "./handlers/useTodoHandlers";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { handleAdd, handleDelete, handleToggleCompleted } = useTodoHandlers(
    todos,
    setTodos
  );

  useEffect(() => {
    client
      .get<Todo[]>("/tasks")
      .then(setTodos)
      .catch(() => alert("Failed to load todos"));
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList
        todos={todos}
        onDelete={handleDelete}
        onToggle={handleToggleCompleted}
      />
    </div>
  );
}

export default App;
