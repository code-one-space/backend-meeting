import { ObjectId } from "mongodb";
import { collections } from "../mongodb-client";
import { Answer } from "../interfaces"

export async function addAnswer(meetingId: ObjectId, surveyId: ObjectId, answers: Array<Answer>): Promise<any> {

    try {
        return await collections.meetings.findOneAndUpdate(
            { _id: meetingId, "surveys.id": surveyId },
            { 
                $push: { 
                    "surveys.$.answers": {
                        $each: answers
                    }
                } as any 
            },
            { returnDocument: "after" }
        )
    } catch (error) {
        console.log(error)
    }
}
