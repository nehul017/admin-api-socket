const Joi = require("joi");

function registerSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function loginSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function caretTaskSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    amount: Joi.string().required(),
    description: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function updateTaskSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().optional(),
    type: Joi.string().optional(),
    amount: Joi.string().optional(),
    description: Joi.string().optional(),
  });
  validateRequest(req, next, schema);
}

function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    req.body = value;
    next();
  }
}

module.exports = {
  registerSchema,
  loginSchema,
  caretTaskSchema,
  updateTaskSchema,
};
