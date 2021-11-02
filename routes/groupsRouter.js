import express from 'express';
const router = express.Router();

import {
  
} from '../controllers/groupsController.js';

router.route("/").get().post();
router.route("/:id").get().put().delete();

export default router;