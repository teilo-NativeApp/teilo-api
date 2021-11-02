import express from 'express';
const router = express.Router();

import {
  createTask,
  deleteTask,
  getAllTasks,
  getOneTask,
  updateTask,
} from '../controllers/tasksController.js';

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getOneTask).put(updateTask).delete(deleteTask);

export default router;