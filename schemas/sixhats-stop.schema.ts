const Joi = require("joi-oid")

export let stopSixHatsSchema = Joi.object({
    meetingId: Joi.objectId().required(),
})