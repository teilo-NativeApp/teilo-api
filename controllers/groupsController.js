// IMPORTS ------------------------------------------
import createError from 'http-errors';
import Group from '../models/Group.js';
// --------------------------------------------------


// METHODS ------------------------------------------
export const createGroup = async (req, res, next) => {
  const data = req.body;

  try {
    const group = new Group(data);
    const savedGroup = await group.save();
    res.json(savedGroup);
  } catch (error) {
    next(error);
  };
};

export const getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    next(error);
  };
};

export const getOneGroup = async (req, res, next) => {
  const { id } = req.params;
  try {
    const group = await Group.findById(id);
    if (!group) throw new createError(404, `No group with id --> ${id}found`);
    res.json(group);
  } catch (error) {
    next(error);
  };
};

export const updateGroup = async (req, res, next) => {
  // need to add hashing in case of password change
  
  try {
    const { id } = req.params;
    const updateData = req.body;
    let group = await Group.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!group) throw new createError(404, `No group with id --> ${id} found`);
    res.send(group);
  } catch (error) {
    next(error);
  };
};

export const deleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await Group.findByIdAndDelete(id);
    if (!group) throw new createError(404, `No group with id --> ${id} was found`);
    res.json({
      success: `Group with id:${id} was deleted.`,
      group: group
    });
  } catch (error) {
    next( error );
  };
};
// --------------------------------------------------