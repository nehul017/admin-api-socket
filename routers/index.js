const express = require("express");
const router = express.Router();

const { userController, taskController } = require("../controllers");
const {
  registerSchema,
  loginSchema,
  caretTaskSchema,
  updateTaskSchema,
} = require("../middleware/joiValidation");

router.post("/register", registerSchema, userController.register);
router.post("/login", loginSchema, userController.login);

router.post("/create-task", caretTaskSchema, taskController.createTask);
router.put("/update-task", updateTaskSchema, taskController.updateTask);
router.delete("remove", taskController.removeTask);
router.get("/task-by-id/:id", taskController.getOneTaskById);
router.get("/task", taskController.getOneTask);
router.get("/tasks", taskController.getAllTasks);

exports.router = router;
