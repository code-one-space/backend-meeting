const Joi = require("joi-oid")

export let memberSchema = Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string()
        .min(2)
        .max(30)
        .required(),
})