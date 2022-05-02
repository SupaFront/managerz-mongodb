const { Note } = require('../../models/note');

const addNote = async (req, res) => {
  console.log(req.body);
  const data = { owner: req.user._id, ...req.body };
  let result = await Note.create(data);
  result = await result.populate('owner', 'email login role ');
  res.status(201).json(result);
};

module.exports = addNote;
