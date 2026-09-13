const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

let todos = [];
let nextId = 1;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      error: "Todo title is required"
    });
  }

  const todo = {
    id: nextId++,
    title: title.trim(),
    completed: false
  };

  todos.push(todo);

  res.status(201).json(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  todo.completed = !todo.completed;

  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todoExists = todos.some((item) => item.id === id);

  if (!todoExists) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  todos = todos.filter((item) => item.id !== id);

  res.json({
    message: "Todo deleted successfully"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    application: "node-todo-app"
  });
});

app.listen(PORT, () => {
  console.log(`Node Todo App running on port ${PORT}`);
});