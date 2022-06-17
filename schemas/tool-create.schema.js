const Joi = require("joi-oid")

const schema = Joi.object({

    id: Joi.objectId(),

    meetingId: Joi.objectId().required(),

    createdAt: Joi.date(),
    done: Joi.bool()
})

module.exports = {
    toolCreateSchema: schema
}