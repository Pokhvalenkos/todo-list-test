import React from "react";
import { useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
