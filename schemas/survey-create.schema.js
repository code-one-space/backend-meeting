const Joi = require("joi-oid")

const schema = Joi.object({
    id: Joi.objectId(),
    meetingId: Joi.objectId().required(),
    question: Joi.string().min(1).max(300),
    creatorName: Joi.string().min(2).max(30),
    choices: Joi.array().items(Joi.string()),
    answers: Joi.array().min(0).items(Joi.string().optional())
})

module.exports.surveyCreateSchema = schema
