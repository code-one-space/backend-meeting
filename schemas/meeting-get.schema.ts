const Joi = require("joi-oid")

export let getMeetingSchema = Joi.objectId().required()