import { ObjectId } from "mongodb";
import { collections } from "../mongodb-client";

export async function leaveMeeting(meetingId: ObjectId, memberId: ObjectId) {

    await collections.meetings.updateOne({ _id: meetingId}, {
        $pull: {
            members: {
                id: memberId
            }
        }
    })

    await collections.meetings.deleteOne({
        members: {
            $size: 0
        }
    })
}