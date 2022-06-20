import { ObjectId } from "mongodb";
import { collections } from "../../mongodb-client";

export async function stopTimer(meetingId: ObjectId) {

    return (await collections.meetings.findOneAndUpdate({ _id: meetingId }, { $set: { timer: { active: false, time: -1 } }},
    {
        returnDocument: "after"
    }))?.value
}