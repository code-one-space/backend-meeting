import { ObjectId } from "mongodb";
import { collections } from "../../mongodb-client";

export async function stopSixHats(meetingId: ObjectId) {

    return (await collections.meetings.findOneAndUpdate({ _id: meetingId }, { $set: { currentTool: "", "members.$[].hat": "" }},
    {
        returnDocument: "after"
    }))?.value
}