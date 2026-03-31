const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('user', 'employer').default('user'),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    error.isJoi = true;
    return next(error);
  }
  next();
};

module.exports = { registerSchema, validate };