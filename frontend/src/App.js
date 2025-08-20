import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // Fetch todos on load
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add todo
  const addTodo = () => {
    axios.post('http://localhost:5000/api/todos', { task })
      .then(res => {
        setTodos([...todos, res.data]);
        setTask('');
      })
      .catch(err => console.log(err));
  };

  // Toggle complete
  const toggleComplete = (id) => {
    axios.put(`http://localhost:5000/api/todos/${id}`)
      .then(res => {
        setTodos(todos.map(todo => todo._id === id ? res.data : todo));
      })
      .catch(err => console.log(err));
  };

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };
  return (
  <div className="app-container">
    <h1>To-Do List</h1>
    <div className="input-container">
      <input
        value={task}
        onChange={e => setTask(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
    </div>
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo._id} className="todo-item">
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.task}
          </span>
          <div>
            <button className="toggle" onClick={() => toggleComplete(todo._id)}>
              Toggle
            </button>
            <button className="delete" onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;