const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');


// Get all todos

router.get('/', async (req, res) => {
  try{
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
});

// POST new todo

router.post('/', async (req, res) => {
  const todo = new Todo({
    task: req.body.task
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//PUT update todo

router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE todo

router.delete('/:id', async (req, res) => {
  try {
    console.log('DELETE /api/todos/:id received, ID:', req.params.id);
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      console.log('Todo not found for ID:', req.params.id);
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log('Todo deleted:', todo);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error('Error in DELETE /api/todos/:id:', err.message, err.stack);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

module.exports = router;
