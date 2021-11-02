import express from 'express';
const router = express.Router();

import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getOneGroup,
  updateGroup,
} from '../controllers/groupsController.js';

router.route("/").get(getAllGroups).post(createGroup);
router.route("/:id").get(getOneGroup).put(updateGroup).delete(deleteGroup);

export default router;