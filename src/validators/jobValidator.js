const Joi = require('joi');
const { validate } = require('./userValidator');

const jobSchema = Joi.object({
  title: Joi.string().max(150).required(),
  description: Joi.string().allow('', null),
  requirements: Joi.string().allow('', null),
  salary_min: Joi.number().integer().allow(null),
  salary_max: Joi.number().integer().allow(null),
  location: Joi.string().max(100).allow('', null),
  type: Joi.string().max(50).allow('', null),
  company_id: Joi.string().required(),
  category_id: Joi.string().allow('', null),
});

module.exports = { jobSchema, validate };