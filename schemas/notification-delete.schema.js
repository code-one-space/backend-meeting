const Joi = require("joi")

const schema = Joi.object({
    meetingId: Joi.string().hex().length(24).required(),
    memberId: Joi.string().hex().length(24).required(),
    notificationId: Joi.string().hex().length(24),
})

module.exports.notificationDeleteSchema = schema
