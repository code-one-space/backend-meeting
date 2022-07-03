const Joi = require("joi-oid")

export let deleteNotificationSchema = Joi.object({
    meetingId: Joi.objectId().required(),
    receiverId: Joi.objectId().required(),
    notificationId: Joi.objectId().required(),
})