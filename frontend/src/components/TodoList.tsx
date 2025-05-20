import React from "react";
import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  onDelete: (id: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, onDelete, onToggle }) => {
  return (
    <ul>
      <ul>
        {todos.length === 0 ? (
          <li>No todos yet</li>
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
    </ul>
  );
};

export default TodoList;
