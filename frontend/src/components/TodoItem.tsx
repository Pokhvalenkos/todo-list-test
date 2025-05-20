import React from "react";
import { Todo } from "../types/Todo";

interface Props {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onDelete, onToggle }) => {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.title}
        </span>
        <button onClick={() => onDelete(todo.id)}>❌</button>
      </label>
    </li>
  );
};

export default TodoItem;
