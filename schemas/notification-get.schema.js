const Joi = require("joi")

const schema = Joi.object({
    meetingId: Joi.string().hex().length(24).required(),
    memberId: Joi.string().hex().length(24).required(),
})

module.exports.notificationGetSchema = schema
