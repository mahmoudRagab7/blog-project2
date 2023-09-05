const {
  newUserSchema,
  newUserSchemaLogin,
} = require("../sevices/userValidation.services");
const loggerEvent = require("../sevices/logger.services");
const logger = loggerEvent("user");

function newUserValidation(req, res, next) {
  try {
    let { error } = newUserSchema.validate(req.body);
    if (error) {
      let errMsg = error.details[0].message;
      logger.warn(errMsg);
      return res.status(403).send({
        message: errMsg,
      });
    }

    next();
  } catch (error) {
    logger.error(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
}

function newUserValidationLogin(req, res, next) {
  try {
    let { error } = newUserSchemaLogin.validate(req.body);
    if (error) {
      let errMsg = error.details[0].message;
      logger.warn(errMsg);
      return res.status(403).send({
        message: errMsg,
      });
    }

    next();
  } catch (error) {
    logger.error(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = {
  newUserValidation,
  newUserValidationLogin,
};
