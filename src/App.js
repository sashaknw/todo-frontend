import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

    const api = axios.create({
    baseURL: '/api',
  });

    useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get('/todos');
        setTodos(res.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, [api]);

  const addTodo = async (text) => {
    try {
      const res = await api.post('/todos', { text });
      setTodos([res.data, ...todos]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await api.put(`/todos/${id}`);

      // Play sound if the task is marked as complete
      if (res.data.completed) {
                        const audio = new Audio('/sounds/yay-6326.mp3');
        audio.volume = 0.3; // Set volume to 30% to be subtle
        audio.play();
      }

      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: res.data.completed } : todo
        )
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const editTodo = async (id, updatedData) => {
    try {
      const res = await api.put(`/todos/${id}`, updatedData);
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, ...res.data } : todo
        )
      );
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List App</h1>
      </header>
      <main>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      </main>
    </div>
  );
}

export default App;
