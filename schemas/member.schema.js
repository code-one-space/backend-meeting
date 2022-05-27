import Joi, { ref } from "joi";

const schema = Joi.object({

    id: Joi.string()
        .hex()
        .length(24),

    name: Joi.string()
        .min(2)
        .max(30)
        .alphanum()
        .required(),
})

module.exports = {
    memberSchema: schema
}