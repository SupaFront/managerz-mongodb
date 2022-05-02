const Joi = require('joi');
const { Schema, model } = require('mongoose');

const resultOptions = ['+', '-'];

const noteSchema = Schema(
  {
    result: {
      type: String,
      required: [true, 'Result is required'],
      enum: resultOptions,
    },
    additional: {
      type: String,
      required: [true, 'Additional is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const addNoteSchema = Joi.object({
  result: Joi.string()
    .valid(...resultOptions)
    .required(),
  additional: Joi.string().required(),
  owner: Joi.string().hex().length(24),
});

const noteJoiSchemas = {
  add: addNoteSchema,
};

const Note = model('note', noteSchema);

module.exports = { noteJoiSchemas, Note };
