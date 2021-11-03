// IMPORTS ------------------------------------------
import createError from 'http-errors';
import Event from '../models/Event.js';
import Group from '../models/Group.js';
// --------------------------------------------------


// METHODS ------------------------------------------
export const createEvent = async (req, res, next) => {
  const info = req.body;
  // need to grab Group id from frontend, from the logged in user
  try {
    const event = new Event(info);
    const savedEvent = await event.save();
    const group = await Group.findByIdAndUpdate(req.body.groupID, {$push: { events: savedEvent._id }});
    res.json(savedEvent);
  } catch (error) {
    next(error);
  };
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    next(error);
  };
};

export const getOneEvent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) throw new createError(404, `No event with id --> ${id}found`);
    res.json(event);
  } catch (error) {
    next(error);
  };
};

export const updateEvent = async (req, res, next) => {
  // need to add hashing in case of password change
  
  try {
    const { id } = req.params;
    const updateData = req.body;
    let event = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!event) throw new createError(404, `No event with id --> ${id} found`);
    res.send(event);
  } catch (error) {
    next(error);
  };
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) throw new createError(404, `No event with id --> ${id} was found`);
    res.json({
      success: `event with id:${id} was deleted.`,
      event: event
    });
  } catch (error) {
    next( error );
  };
};
// --------------------------------------------------