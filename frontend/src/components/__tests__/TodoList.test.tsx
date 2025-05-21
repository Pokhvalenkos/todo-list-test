import { render, screen } from "@testing-library/react";
import TodoList from "../TodoList";

describe("TodoList", () => {
  const mockTodos = [
    { id: "1", title: "Перше todo", completed: false },
    { id: "2", title: "Друге todo", completed: true },
  ];

  test("1. Відображає todos у списку", () => {
    render(
      <TodoList todos={mockTodos} onToggle={() => {}} onDelete={() => {}} />
    );

    expect(screen.getByText("Перше todo")).toBeInTheDocument();
    expect(screen.getByText("Друге todo")).toBeInTheDocument();
  });

  test("2. Виводиться правильна кількість TodoItem", () => {
    const { container } = render(
      <TodoList todos={mockTodos} onToggle={() => {}} onDelete={() => {}} />
    );

    const listItems = container.querySelectorAll("li"); // якщо TodoItem рендериться як <li>
    expect(listItems.length).toBe(2);
  });

  test("3. Показує позначку, якщо todo виконано", () => {
    render(
      <TodoList todos={mockTodos} onToggle={() => {}} onDelete={() => {}} />
    );

    const completedTodo = screen.getByText("Друге todo");
    expect(completedTodo).toBeInTheDocument();
    // Можна додати клас або style перевірку, якщо є
  });

  test("4. Працює колбек onToggle (імітація)", () => {
    const toggleMock = jest.fn();

    render(
      <TodoList todos={mockTodos} onToggle={toggleMock} onDelete={() => {}} />
    );

    const checkbox = screen.getAllByRole("checkbox")[0];
    checkbox.click();

    expect(toggleMock).toHaveBeenCalledWith("1"); // Перше todo
  });

  test("5. Працює onDelete (імітація)", () => {
    const deleteMock = jest.fn();

    render(
      <TodoList todos={mockTodos} onToggle={() => {}} onDelete={deleteMock} />
    );

    const deleteButtons = screen.getAllByRole("button");
    deleteButtons[0].click();

    expect(deleteMock).toHaveBeenCalledWith("1");
  });
});
