import express from 'express';
const router = express.Router();

import {
  addExpense,
  createGroup,
  deleteGroup,
  getAllGroups,
  getOneGroup,
  updateGroup,
} from '../controllers/groupsController.js';

router.route("/").get(getAllGroups).post(createGroup);
router.route("/:id").get(getOneGroup).put(updateGroup).delete(deleteGroup);
router.route("/:id/addExpense").put(addExpense);

export default router;