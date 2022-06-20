// meetings
let createMeetingSchema = require("./meeting-create.schema")
let joinMeetingSchema = require("./meeting-join.schema")
let leaveMeetingSchema = require("./meeting-leave.schema")

module.exports.createMeetingSchema = createMeetingSchema
module.exports.joinMeetingSchema = joinMeetingSchema
module.exports.leaveMeetingSchema = leaveMeetingSchema

// member
let memberSchema = require("./member.schema")

module.exports.memberSchema = memberSchema

// notifications
let createNotificationSchema = require("./notification-create.schema")
let deleteNotificationSchema = require("./notification-delete.schema")

module.exports.createNotificationSchema = createNotificationSchema
module.exports.deleteNotificationSchema = deleteNotificationSchema

// six hats
let sixHatsStartSchema = require("./sixhats-start.schema")
let sixHatsStopSchema = require("./sixhats-stop.schema")

module.exports.sixHatsStartSchema = sixHatsStartSchema
module.exports.sixHatsStopSchema = sixHatsStopSchema

// survey
let createSurveySchema = require("./survey-create.schema")

module.exports.createSurveySchema = createSurveySchema

// survey answers
let createAnswerSchema = require("./answer-create.schema")

module.exports.createAnswerSchema = createAnswerSchema

// timer
let startTimerSchema = require("./timer-start.schema")
let stopTimerSchema = require("./timer-stop.schema")

module.exports.startTimerSchema = startTimerSchema
module.exports.stopTimerSchema = stopTimerSchema