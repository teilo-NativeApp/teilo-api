import express from 'express';
const router = express.Router();

import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
} from '../controllers/eventsController.js';

router.route("/").get(getAllEvents).post(createEvent);
router.route("/:id").get(getOneEvent).put(updateEvent).delete(deleteEvent);

export default router;