const Joi = require("joi-oid")

export let joinMeetingSchema = Joi.object({

    meetingId: Joi.objectId().required(),
    memberName: Joi.string()
        .min(2)
        .max(30)
        .required(),
})