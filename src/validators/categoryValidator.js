const Joi = require('joi');
const { validate } = require('./userValidator');

const categorySchema = Joi.object({
  name: Joi.string().max(100).required(),
});

module.exports = { categorySchema, validate };