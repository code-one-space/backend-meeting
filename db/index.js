// meetings
import addMeeting from "./meetings/addMeeting"
import clear from "./meetings/clear"
import getMeeting from "./meetings/getMeeting"
import getMeetings from "./meetings/getMeetings"
import joinMeeting from "./meetings/joinMeeting"
import leaveMeeting from "./meetings/leaveMeeting"

module.exports.addMeeting = addMeeting
module.exports.clear = clear
module.exports.getMeeting = getMeeting
module.exports.getMeetings = getMeetings
module.exports.joinMeeting = joinMeeting
module.exports.leaveMeeting = leaveMeeting

// notifications
import addNotification from "./notifications/addNotification"
import deleteNotification from "./notifications/deleteNotification"
import getNotifications from "./notifications/getNotifications"

module.exports.addNotification = addNotification
module.exports.deleteNotification = deleteNotification
module.exports.getNotifications = getNotifications

// surveys
import addAnswer from "./surveys/addAnswer"
import createSurvey from "./surveys/createSurvey"

module.exports.addAnswer = addAnswer
module.exports.createSurvey = createSurvey

// tools
// six hats
import startSixHats from "./tools/sixhats/startSixHats"
import stopSixHats from "./tools/sixhats/stopSixHats"

module.exports.startSixHats = startSixHats
module.exports.stopSixHats = stopSixHats

// timer
import startTimer from "./tools/timer/startTimer"
import stopTimer from "./tools/timer/stopTimer"

module.exports.startTimer = startTimer
module.exports.stopTimer = stopTimer