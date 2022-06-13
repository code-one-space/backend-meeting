const Joi = require("joi")

const schema = Joi.object({

    creator: Joi.object(),

    creatorName: Joi.string()
        .min(2)
        .max(30)
        .required(),

    id: Joi.string()
        .hex()
        .length(24),

    memberId: Joi.string()
        .hex()
        .length(24),

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
