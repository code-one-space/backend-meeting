const Joi = require("joi-oid")

export let createMeetingSchema = Joi.object({
    id: Joi.objectId(),
    creator: Joi.object(),
    creatorName: Joi.string()
        .min(2)
        .max(30)
        .required(),
    memberId: Joi.objectId(),
    meetingName: Joi.string()
        .min(2)
        .max(30)
        .required(),
    createdAt: Joi.date(),
    done: Joi.bool(),
    members: Joi.array(),
    currentTool: Joi.string().allow("", null),
    timer: Joi.object({
        active: Joi.boolean(),
        time: Joi.number()
    })
})