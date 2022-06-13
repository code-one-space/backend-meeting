const Joi = require("joi-oid")

const schema = Joi.object({

    meetingId: Joi.objectId().required(),
})

module.exports = {
    toolQuitSchema: schema
}