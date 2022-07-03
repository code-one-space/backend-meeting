const Joi = require("joi-oid")

export let startTimerSchema = Joi.object({
    meetingId: Joi.objectId().required(),
    timer: Joi.object({
        active: Joi.boolean(),
        time: Joi.number() // unix millis
    })
})