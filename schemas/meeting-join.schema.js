const Joi = require("joi-oid")

const schema = Joi.object({

    meetingId: Joi.objectId().required(),
    memberName: Joi.string()
        .min(2)
        .max(30)
        .required(),
})

module.exports.meetingJoinSchema = schema;
