import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

test("перевірка наявності заголовка TODO", () => {
  render(<Todo />);
  const headerElement = screen.getByText(/TODO/i);
  expect(headerElement).toBeInTheDocument();
});

test("можливість введення цифр та букв у поле для тексту", () => {
  render(<Todo />);
  const inputElement = screen.getByPlaceholderText(/введіть завдання/i);
  fireEvent.change(inputElement, { target: { value: "Task 123" } });
  expect(inputElement.value).toBe("Task 123");
});

test("отримання помилки при спробі додати пусте завдання", () => {
  render(<Todo />);
  const addButton = screen.getByText(/Додати/i);
  fireEvent.click(addButton);
  const errorMessage = screen.getByText(/Поле не може бути порожнім/i);
  expect(errorMessage).toBeInTheDocument();
});

test("додавання нового елементу до списку після введення тексту", () => {
  render(<Todo />);
  const inputElement = screen.getByPlaceholderText(/введіть завдання/i);
  const addButton = screen.getByText(/Додати/i);

  fireEvent.change(inputElement, { target: { value: "New Task" } });
  fireEvent.click(addButton);

  const listItem = screen.getByText(/New Task/i);
  expect(listItem).toBeInTheDocument();
});

test("очищення поля введення після додавання елементу", () => {
  render(<Todo />);
  const inputElement = screen.getByPlaceholderText(/введіть завдання/i);
  const addButton = screen.getByText(/Додати/i);

  fireEvent.change(inputElement, { target: { value: "New Task" } });
  fireEvent.click(addButton);

  expect(inputElement.value).toBe("");
});

test("видалення задачі з списку", () => {
  render(<Todo />);

  const inputElement = screen.getByPlaceholderText(/введіть завдання/i);
  const addButton = screen.getByText(/Додати/i);
  fireEvent.change(inputElement, { target: { value: "Task to delete" } });
  fireEvent.click(addButton);

  const listItem = screen.getByText(/Task to delete/i);
  expect(listItem).toBeInTheDocument();
});

test("не додає дублікати задач", () => {
  render(<Todo />);

  const inputElement = screen.getByPlaceholderText(/введіть завдання/i);
  const addButton = screen.getByText(/Додати/i);

  fireEvent.change(inputElement, { target: { value: "Duplicate Task" } });
  fireEvent.click(addButton);
  fireEvent.change(inputElement, { target: { value: "Duplicate Task" } });
  fireEvent.click(addButton);

  const listItems = screen.getAllByText(/Duplicate Task/i);
  expect(listItems.length).toBe(1);
});

test("відображення повідомлення при пустому списку задач", () => {
  render(<Todo />);

  const inputElement = screen.getByPlaceholderText(/введіть завдання/i);
  const addButton = screen.getByText(/Додати/i);
  fireEvent.change(inputElement, { target: { value: "New Task" } });
  fireEvent.click(addButton);
});
