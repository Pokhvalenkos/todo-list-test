import React from "react";
import { Todo } from "../types/Todo";

interface Props {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onDelete, onToggle }) => {
  return (
    <li className="w-[90%] max-w-xl mx-auto flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow transition-all duration-300 scale-100 hover:scale-[1.01]">
      <label className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          className="w-5 h-5 accent-blue-500"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span
          className={`text-base ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </span>
      </label>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 text-xl hover:scale-110 transition-transform"
      >
        ❌
      </button>
    </li>
  );
};

export default TodoItem;
