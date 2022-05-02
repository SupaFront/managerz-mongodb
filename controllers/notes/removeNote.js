const { Note } = require('../../models/note');
const { createError } = require('../../middleware');

const removeNote = async (req, res) => {
  const { id } = req.params;
  const result = Note.findByIdAndRemove(id);
  if (!result) {
    throw createError(404);
  }
  res.status(200).json({ message: `Note ${id} successfully removed` });
};

module.exports = removeNote;
