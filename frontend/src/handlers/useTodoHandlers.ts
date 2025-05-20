import { Dispatch, SetStateAction } from "react";
import { client } from "../services/client";
import { Todo } from "../types/Todo";

export const useTodoHandlers = (
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
) => {
  const handleAdd = async (title: string) => {
    try {
      const newTodo = await client.post<Todo>("/tasks", {
        title,
        completed: false,
      });
      setTodos((prev) => [...prev, newTodo]);
    } catch {
      alert("Failed to add todo");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await client.delete(`/tasks/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch {
      alert("Failed to delete todo");
    }
  };

  const handleToggleCompleted = async (id: string) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const updated = await client.patch<Todo>(`/tasks/${id}`, {
        completed: !todo.completed,
      });

      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: updated.completed } : t
        )
      );
    } catch {
      alert("Failed to toggle todo");
    }
  };

  return { handleAdd, handleDelete, handleToggleCompleted };
};
