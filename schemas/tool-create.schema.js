const Joi = require("joi-oid")

const schema = Joi.object({

    id: Joi.objectId(),

    meetingId: Joi.objectId().required(),

    toolType: Joi.string()
        .valid("devils_advocat", "planning_poker")
        .required(),

    createdAt: Joi.date(),
    done: Joi.bool(),
    members: Joi.array()
})

module.exports = {
    toolCreateSchema: schema
}