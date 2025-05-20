import React from "react";
import { useState, useEffect } from "react";
import { client } from "./services/client";
import { Todo } from "./types/Todo";
import "./styles/main.scss";
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
    <div>
      <h1>Todo List</h1>
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
