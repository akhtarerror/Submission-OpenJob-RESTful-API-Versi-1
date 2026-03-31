const Joi = require('joi');
const { validate } = require('./userValidator');

const companySchema = Joi.object({
  name: Joi.string().max(150).required(),
  description: Joi.string().allow('', null),
  location: Joi.string().max(100).allow('', null),
  website: Joi.string().max(200).allow('', null),
  logo: Joi.string().allow('', null),
});

module.exports = { companySchema, validate };