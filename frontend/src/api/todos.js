// api/todos.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/todos'
});

export const fetchTodos = async (done) => {
  const params = {};
  if (done !== undefined && done !== 'all') {
    params.done = done;   // 'true' or 'false'
  }
  const res = await api.get('/', { params });
  return res.data;
};
export const createTodo = (title) =>
  api.post('/', { title }).then(res => res.data);

export const updateTodo = (id, updates) =>
  api.put(`/${id}`, updates).then(res => res.data);

export const deleteTodo = (id) =>
  api.delete(`/${id}`).then(res => res.data);