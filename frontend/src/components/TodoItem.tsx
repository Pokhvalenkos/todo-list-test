import React from "react";
import { Todo } from "../types/Todo";

interface Props {
  todo: Todo;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onDelete }) => {
  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo.id)}>❌</button>
    </li>
  );
};

export default TodoItem;
