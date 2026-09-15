// App.jsx
import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todos';
import './todo.css';

const today = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
});

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const load = async () => {
      try {
        let done;
        if (filter === 'done') done = 'true';
        else if (filter === 'active') done = 'false';
        const data = await fetchTodos(done);
        setTodos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filter]);

  const handleAdd = async (title) => {
    const newTodo = await createTodo(title);
    setTodos([newTodo, ...todos]);
  };

  const handleToggle = async (id, done) => {
    const updated = await updateTodo(id, { done: !done });
    setTodos(todos.map(t => t._id === id ? updated : t));
  };

  const handleRename = async (id, title) => {
    const updated = await updateTodo(id, { title });
    setTodos(todos.map(t => t._id === id ? updated : t));
  };

  const handleRemove = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t._id !== id));
  };

 return(
   <div className="receipt-page">
      <div className="receipt">
        <header className="receipt-header">...</header>

        <TodoForm onAdd={handleAdd} />

        <div className="filters">
          <button onClick={() => setFilter('all')}    className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
          <button onClick={() => setFilter('done')}   className={filter === 'done' ? 'active' : ''}>Done</button>
        </div>

        <TodoList
          todos={todos}
          loading={loading}
          onToggle={handleToggle}
          onRename={handleRename}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}
