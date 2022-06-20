import { ObjectId } from "mongodb";
import { collections } from "../mongodb-client";

export async function getMeeting(meetingId: ObjectId) {
    return await collections.meetings.findOne({ _id: meetingId })
}