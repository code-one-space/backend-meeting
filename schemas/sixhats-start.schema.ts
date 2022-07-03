const Joi = require("joi-oid")

export let startSixHatsSchema = Joi.object({
    meetingId: Joi.objectId().required(),
})