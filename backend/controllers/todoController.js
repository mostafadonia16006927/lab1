const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  try {
    const filter = {};

    if (req.query.done !== undefined) {
      filter.done = req.query.done === 'true';
    }

    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createTodo = async (req, res) => {
  if (!req.body.title) return res.status(400).json({ error: 'Title is required' });
  
  try {
    const newTodo = await Todo.create({ title: req.body.title });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};