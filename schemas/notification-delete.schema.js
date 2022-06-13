const Joi = require("joi-oid")

const schema = Joi.object({
    meetingId: Joi.objectId().required(),
    receiverId: Joi.objectId().required(),
    notificationId: Joi.objectId().required(),
})

module.exports.notificationDeleteSchema = schema
