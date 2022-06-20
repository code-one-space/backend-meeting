const Joi = require("joi-oid")

const schema = Joi.object({
    creator: Joi.object(),
    creatorName: Joi.string()
        .min(2)
        .max(30)
        .required(),
    id: Joi.objectId().required(),
    memberId: Joi.objectId(),
    meetingName: Joi.string()
        .min(2)
        .max(30)
        .required(),
    createdAt: Joi.date(),
    done: Joi.bool(),
    members: Joi.array(),
    currentTool: Joi.string().allow("", null)
})

module.exports.meetingCreateSchema = schema;
