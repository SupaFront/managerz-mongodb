const { Note } = require('../../models/note');
const { createError } = require('../../middleware');

const editNote = async (req, res) => {
  const { id } = req.params;
  let result = Note.findByIdAndUpdate(id, req.body).populate('owner', 'email login role ');
  result = await result.populate('owner', 'email login role ');
  if (!result) {
    throw createError(404);
  }
  res.status(200).json(result);
};

module.exports = editNote;
