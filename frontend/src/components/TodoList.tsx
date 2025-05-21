import React from "react";
import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, onDelete, onToggle }) => {
  return (
    <ul className="flex flex-col gap-3 w-full max-w-md mx-auto mt-6">
      {todos.length === 0 ? (
        <li className="text-center text-gray-400">🚫 No todos yet</li>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))
      )}
    </ul>
  );
};

export default TodoList;
