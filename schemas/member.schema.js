const Joi = require("joi-oid")

const schema = Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string()
        .min(2)
        .max(30)
        .required(),
})

module.exports.memberSchema = schema