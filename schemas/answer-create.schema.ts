const Joi = require("joi-oid")

export let createAnswerSchema = Joi.object({
    meetingId: Joi.objectId().required(),
    surveyId: Joi.objectId().required(),
    answers: Joi.array().min(0).items(Joi.object({
        memberName: Joi.string().min(2).max(30),
        answer: Joi.string().min(1).max(100)
    }))
})