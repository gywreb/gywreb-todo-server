const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.route("/").get(todoController.getAll).post(todoController.createNewTodo);
router
  .route("/:id")
  .delete(todoController.deleteTodoById)
  .patch(todoController.updateTodoById);

module.exports = router;
