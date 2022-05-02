const { createError } = require('../../middleware');
const { User } = require('../../models/user');

const getUsers = async (req, res) => {
  const result = await User.find({ role: 'manager' }, '-password -createdAt -updatedAt');
  if (!result) {
    throw createError(404);
  }
  res.status(200).json(result);
};

module.exports = getUsers;
