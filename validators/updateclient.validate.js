const Joi = require('joi')
var clientUpdateSchema = Joi.object({

    clientId: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
    totalBill: Joi.number().required(),
});

module.exports = clientUpdateSchema