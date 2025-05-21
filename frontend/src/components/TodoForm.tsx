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
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6 w-full max-w-md mx-auto"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition "
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
