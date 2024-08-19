import React, { useState } from "react";
import "./Todo.css";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const addTask = () => {
    if (inputValue.trim() === "") {
      setError("Поле не може бути порожнім");
      return;
    }

    if (tasks.includes(inputValue.trim())) {
      setError("Задача вже існує");
      return;
    }
    setTasks([...tasks, inputValue.trim()]);
    setInputValue("");
    setError("");
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
  };

  return (
    <div className="todo-container">
      <h1>TODO</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Введіть завдання"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="btn" onClick={addTask}>
          Додати
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {tasks.length === 0 && (
        <p className="empty-message">Список задач пустий</p>
      )}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {task}
            <button className="delete-button" onClick={() => deleteTask(task)}>
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
