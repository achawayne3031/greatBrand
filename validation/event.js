const Joi = require('joi')
require('dotenv').config()


 const validateCreateEvent = (data) => {
  const schema = Joi.object().keys({
    name: Joi.required().messages({
      "any.required": "event name field is required",
      "string.empty": "event name should not be empty",
    }),
    total: Joi.required().messages({
        "any.required": "total tickets field is required",
        "string.empty": "total tickets should not be empty",
    }),
  })

  return schema.validate(data)
}




  
module.exports = {
    validateCreateEvent: validateCreateEvent

  }

