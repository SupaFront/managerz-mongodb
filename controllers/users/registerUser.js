const { User } = require('../../models/user');
const { createError } = require('../../middleware');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { email, password, login } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409);
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({ email, password: hashPassword, login });
  res.status(201).json({
    user: { email: newUser.email, login: newUser.login },
  });
};

module.exports = registerUser;
