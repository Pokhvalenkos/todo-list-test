import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../TodoItem";

const todo = { id: "1", title: "Протестувати компонент", completed: false };

test("1. Відображає текст todo", () => {
  render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText(/Протестувати компонент/i)).toBeInTheDocument();
});

test("2. Відображає чекбокс", () => {
  render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByRole("checkbox")).toBeInTheDocument();
});

test("3. Чекбокс не активний, якщо completed=false", () => {
  render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />);
  const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);
});

test("4. Викликає onToggle при кліку по чекбоксу", () => {
  const toggleMock = jest.fn();
  render(<TodoItem todo={todo} onToggle={toggleMock} onDelete={() => {}} />);
  fireEvent.click(screen.getByRole("checkbox"));
  expect(toggleMock).toHaveBeenCalledWith("1");
});

test("5. Викликає onDelete при кліку по кнопці", () => {
  const deleteMock = jest.fn();
  render(<TodoItem todo={todo} onToggle={() => {}} onDelete={deleteMock} />);
  fireEvent.click(screen.getByRole("button", { name: "❌" }));
  expect(deleteMock).toHaveBeenCalledWith("1");
});
