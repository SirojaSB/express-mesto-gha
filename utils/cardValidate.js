const { celebrate, Joi } = require('celebrate');
const { REGEX_URL } = require('./constants');

module.exports.validateCardInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(REGEX_URL),
  }),
});
