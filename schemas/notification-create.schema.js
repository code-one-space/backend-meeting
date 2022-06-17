const Joi = require("joi-oid")

const schema = Joi.object({
    id: Joi.objectId(),
    meetingId: Joi.objectId().required(),
    receiverId: Joi.objectId().required(),
    createdAt: Joi.date(),
    message: Joi.string().min(2).max(100),
})

module.exports.notificationCreateSchema = schema
