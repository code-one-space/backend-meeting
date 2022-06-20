const Joi = require("joi-oid")

const schema = Joi.object({
    meetingId: Joi.objectId().required(),
    answers: Joi.array().min(0).items(Joi.object().optional())
})

module.exports.answerCreateSchema = schema
