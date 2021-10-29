import express from 'express';
const router = express.Router();

import {
  createUser,
  getAllUsers
} from '../controllers/usersController.js';

router.route("/").get(getAllUsers).post(createUser);

export default router;