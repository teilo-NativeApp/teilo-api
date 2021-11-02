// IMPORTS ------------------------------------------
import createError from 'http-errors';
import Task from '../models/Task.js';
// --------------------------------------------------


// METHODS ------------------------------------------
export const createTask = async (req, res, next) => {
  const info = req.body;

  try {
    const task = new Task(info);
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    next(error);
  };
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    next(error);
  };
};

export const getOneTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) throw new createError(404, `No task with id --> ${id}found`);
    res.json(task);
  } catch (error) {
    next(error);
  };
};

export const updateTask = async (req, res, next) => {
  // need to add hashing in case of password change
  
  try {
    const { id } = req.params;
    const updateData = req.body;
    let task = await Task.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!task) throw new createError(404, `No task with id --> ${id} found`);
    res.send(task);
  } catch (error) {
    next(error);
  };
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) throw new createError(404, `No task with id --> ${id} was found`);
    res.json({
      success: `task with id:${id} was deleted.`,
      task: task
    });
  } catch (error) {
    next( error );
  };
};
// --------------------------------------------------