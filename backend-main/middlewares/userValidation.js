const { celebrate, Joi } = require("celebrate");
const { dateRegex } = require("../utils/constants");

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    login: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    registrationDate: Joi.date(),
  }),
});

const validateUserAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    login: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  validateUserUpdate,
  validateUserAuthentication,
  validateUserInfo,
};
