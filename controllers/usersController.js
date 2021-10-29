// IMPORTS ------------------------------------------
import createError from 'http-errors';
import User from '../models/User.js';
// --------------------------------------------------


// METHODS ------------------------------------------
export const createUser = async (req, res, next) => {
  const data = req.body;

  try {
    const user = new User(data);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  };
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  };
};
// --------------------------------------------------