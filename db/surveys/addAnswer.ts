import { ObjectId } from "mongodb";
import { collections } from "../mongodb-client";
import { Answer } from "../interfaces"

export async function addNotification(meetingId: ObjectId, surveyId: ObjectId, answer: Answer): Promise<any> {

    try {
        return await collections.meetings.findOneAndUpdate(
            { _id: meetingId, "surveys.id": surveyId },
            { 
                $push: { 
                    "surveys.$": answer
                } as any 
            },
            { returnDocument: "after" }
        )
    } catch (error) {
        console.log(error)
    }
}
