import express from 'express';
const router = express.Router();

import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser
} from '../controllers/usersController.js';

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

export default router;