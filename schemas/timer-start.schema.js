const Joi = require("joi-oid")

const schema = Joi.object({
    meetingId: Joi.objectId().required(),
    timer: Joi.object({
        active: Joi.boolean(),
        time: Joi.number() // unix millis
    })
})

module.exports.timerStartSchema = schema
