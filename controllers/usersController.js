// IMPORTS ------------------------------------------
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
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

export const getOneUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) throw new createError(404, `No user with id --> ${id}found`);
    res.json(user);
  } catch (error) {
    next(error);
  };
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    let user = await User.findOneAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!user) throw new createError(404, `No user with id --> ${id} found`);
    res.send(user);
  } catch (error) {
    next(error);
  };
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new createError(404, `No user with id --> ${id} was found`);
    res.json({
      success: `User with id:${id} was deleted.`,
      user: user
    });
  } catch (error) {
    next( error );
  };
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new createError(404, "User with given email not found");

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    console.log("Are the hash and the pass matching --> ", passwordIsValid);
    if (!passwordIsValid) next(createError(404, "Password is not valid"));

    const token = user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    next(error);    
  }
};
// --------------------------------------------------