import express from 'express';
const router = express.Router();

import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  loginUser,
  updateUser
} from '../controllers/usersController.js';

import auth from '../middleware/authentication/authenticator.js';

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getOneUser).put(auth, updateUser).delete(auth, deleteUser);
router.route("/login").post(loginUser);

export default router;