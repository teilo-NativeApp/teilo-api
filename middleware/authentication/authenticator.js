// IMPORTS ------------------------------------------
import User from '../../models/User.js';
// --------------------------------------------------

const auth = async (req, res, next) => {
  const token = req.headers.auth;

  if (!token) {
    return next("No token provided");
  }

  try {
    const user = User.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  };
};

export default auth;