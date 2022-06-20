const Joi = require("joi-oid")

const schema = Joi.object({
    meetingId: Joi.objectId().required(),
    memberId: Joi.objectId().required(),
})

module.exports.meetingLeaveSchema = schema;
