import express from 'express';
const router = express.Router();

import {
  
} from '../controllers/eventsController.js';

router.route("/").get().post();
router.route("/:id").get().put().delete();

export default router;