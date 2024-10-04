const Joi = require('joi')
require('dotenv').config()


 const validateBookTicket = (data) => {
  const schema = Joi.object().keys({
    username: Joi.required().messages({
      "any.required": "username field is required",
      "string.empty": "username should not be empty",
    }),
    event_ref: Joi.required().messages({
        "any.required": "event ref field is required",
        "string.empty": "event ref should not be empty",
    }),
  })

  return schema.validate(data)
}



const validateCancelTicket = (data) => {
  const schema = Joi.object().keys({
    username: Joi.required().messages({
      "any.required": "username field is required",
      "string.empty": "username should not be empty",
    }),
    event_ref: Joi.required().messages({
        "any.required": "event ref field is required",
        "string.empty": "event ref should not be empty",
    }),
  })

  return schema.validate(data)
}




  
module.exports = {
  validateBookTicket: validateBookTicket,
  validateCancelTicket: validateCancelTicket

}

