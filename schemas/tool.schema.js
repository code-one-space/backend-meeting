import Joi, { ref } from "joi";

const schema = Joi.object({

    id: Joi.string()
        .hex()
        .length(24),

    toolType: Joi.string()
        .valid("devils_advocat", "planning_poker")
        .required(),

    createdAt: Joi.date(),
    done: Joi.bool(),
    members: Joi.array(),
    tools: Joi.array()
})

module.exports = {
    toolSchema: schema
}