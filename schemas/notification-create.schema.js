const Joi = require("joi")

const schema = Joi.object({
    id: Joi.string().hex().length(24),
    meetingId: Joi.string().hex().length(24).required(),
    creatorId: Joi.string().hex().length(24).required(),
    createdAt: Joi.date(),
    message: Joi.string().min(2).max(100),
})

module.exports.notificationCreateSchema = schema;
