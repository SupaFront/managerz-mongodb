const { Note } = require('../../models/note');

const getNotes = async (req, res) => {
  const { page = 1, limit = 10, ...filter } = req.query;

  const { _id, role } = req.user;
  const skip = (page - 1) * limit;
  const props = role === 'admin' ? { ...filter } : { owner: _id, ...filter };
  const result = await Note.find(props, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', 'email login role ');
  res.status(200).json(result);
};

module.exports = getNotes;
