const express = require("express");
const app = express();
const pool = require("./db.js");

app.use(express.json());

//Routes
//Get all todo
app.get("/api/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Get a specific todo
app.get("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Creating a todo
app.post("/api/todos", async (req, res) => {
  const { description } = req.body;

  try {
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Update a specific todo
app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = ($1) WHERE todo_id = $2 RETURNING *",
      [req.body.description, id]
    );
    res.json(updatedTodo.rows);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Delete a specific todo
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json({ message: "Successfully deleted the todo." });
  } catch (err) {
    res.json({ message: err.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
