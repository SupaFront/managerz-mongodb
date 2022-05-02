const createError = require('./createError');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { User } = require('../models/user');
// const { Note } = require('../models/note');

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw createError(401, 'Not authorized');
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw createError(401, 'Not authorized');
    }
    // const props = user.role === 'admin' ? {} : { owner: user._id };
    // const notes = await Note.find(props).populate('owner', 'email login role');
    req.user = user;
    // req.user.notes = notes;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = 'Not authorized';
    }
    next(error);
  }
};

module.exports = authenticate;
