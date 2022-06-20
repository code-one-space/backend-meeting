import { ObjectId } from "mongodb";
import { collections } from "../mongodb-client";
import { Member } from "../interfaces"

export async function joinMeeting(meetingId: ObjectId, member: Member) {

    await collections.meetings.updateOne({ _id: meetingId}, {
        $push: {
            members: {
                ...member
            }
        }
    })
    return await collections.meetings.findOne({ _id: meetingId })
}