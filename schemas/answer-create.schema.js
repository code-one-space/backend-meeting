const Joi = require("joi-oid")

const schema = Joi.object({
    meetingId: Joi.objectId().required(),
    surveyId: Joi.objectId().required(),
    memberName: Joi.string().min(2).max(30),
    answers: Joi.array().min(0).items(Joi.object().optional())
})

module.exports.surveyCreateSchema = schema
