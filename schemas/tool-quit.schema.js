const Joi = require("joi-oid")

const schema = Joi.object({

    toolId: Joi.objectId().required(),
    meetingId: Joi.objectId().required(),
})

module.exports = {
    toolQuitSchema: schema
}