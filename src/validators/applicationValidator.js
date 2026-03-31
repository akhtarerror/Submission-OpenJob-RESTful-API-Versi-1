const Joi = require('joi');
const { validate } = require('./userValidator');

const applicationSchema = Joi.object({
  job_id: Joi.string().required(),
  cover_letter: Joi.string().allow('', null),
});

const updateApplicationSchema = Joi.object({
  status: Joi.string().valid('pending', 'reviewed', 'accepted', 'rejected').required(),
});

module.exports = { applicationSchema, updateApplicationSchema, validate };