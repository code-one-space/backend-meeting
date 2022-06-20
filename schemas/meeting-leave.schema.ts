const Joi = require("joi-oid")

export let leaveMeetingSchema = Joi.object({
    meetingId: Joi.objectId().required(),
    memberId: Joi.objectId().required(),
})