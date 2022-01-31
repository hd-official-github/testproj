const Joi = require('joi')

var clientSchema = Joi.array().items(

    Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.number().required(),
        totalBill: Joi.number().required()
    })
);

var agencySchema = Joi.object({

    name: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.string(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.number().required(),

    client: clientSchema.required()
});

module.exports = agencySchema