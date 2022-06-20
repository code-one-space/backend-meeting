import { collections } from "../mongodb-client";
import { Notification } from "../interfaces"

export async function addNotification(notification: Notification): Promise<any> {
    try {
        let meetingId = notification?.meetingId
        let receiverId = notification?.receiverId
        delete notification?.meetingId
        delete notification?.receiverId
    
        return await collections.meetings.findOneAndUpdate(
            { _id: meetingId, "members.id": receiverId },
            { 
                $push: { 
                    "members.$.notifications": notification
                } as any 
            },
            { returnDocument: "after" }
        )
    } catch (error) {
        console.log(error)
    }
}
