const express = require('express');
const notesCtrl = require('../../controllers/notes');
const { ctrlWrapper, authenticate, validation } = require('../../middleware');
const { noteJoiSchemas } = require('../../models/note');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(notesCtrl.getNotes));

router.post('/', authenticate, validation(noteJoiSchemas.add), ctrlWrapper(notesCtrl.addNote));

router.post('/:id', validation(noteJoiSchemas.add), ctrlWrapper(notesCtrl.editNote));

router.delete('/:id', ctrlWrapper(notesCtrl.removeNote));

module.exports = router;
