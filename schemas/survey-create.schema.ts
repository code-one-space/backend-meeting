const Joi = require("joi-oid")

export let createSurveySchema = Joi.object({
    id: Joi.objectId(),
    meetingId: Joi.objectId().required(),
    question: Joi.string().min(1).max(300),
    creatorName: Joi.string().min(2).max(30),
    choices: Joi.array().items(Joi.string().max(100)),
    answers: Joi.array().min(0).items(Joi.string().optional())
})