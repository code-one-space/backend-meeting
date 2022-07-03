const Joi = require("joi-oid")

export let stopTimerSchema = Joi.object({
    meetingId: Joi.objectId().required(),
})