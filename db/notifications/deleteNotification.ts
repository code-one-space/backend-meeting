import { ObjectId } from "mongodb";
import { collections } from "../mongodb-client";

export async function deleteNotification(meetingId: ObjectId, receiverId: ObjectId, notificationId: ObjectId) {
    return await collections.meetings.updateOne(
        { _id: meetingId },
        { $pull: { "members.$[elem].notifications": { id: notificationId } } },
        { arrayFilters: [ { "elem.id": receiverId } ] }
    )
}