const Todo = require("../database/models/Todo");
const { ErrorResponse } = require("../model/ErrorResponse");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");

exports.getAll = asyncMiddleware(async (req, res, next) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

exports.createNewTodo = asyncMiddleware(async (req, res, next) => {
  const { description } = req.body;
  const todo = new Todo({
    description,
  });
  const newTodo = await todo.save();
  res.status(201).json(newTodo);
});

exports.deleteTodoById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) return next(new ErrorResponse(404, "failed to delete"));
  res.json({ deletedTodo });
});

exports.updateTodoById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const updatedTodo = await Todo.findById(id);
  const { description, complete } = req.body;
  if ("complete" in req.body) updatedTodo.complete = complete;
  if ("description" in req.body) updatedTodo.description = description;
  const todo = await updatedTodo.save();
  res.json({ todo });
});
