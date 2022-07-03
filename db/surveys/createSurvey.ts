// @ts-nocheck
import { ObjectId } from "mongodb";
import { collections } from "../mongodb-client";
import { Survey } from "../interfaces"

// adds a survey to a meeting
export async function createSurvey(meetingId: ObjectId, survey: Survey) {
    try {
        return await collections.meetings.findOneAndUpdate(
            { _id: meetingId },
            { 
                $push: { 
                    surveys: survey
                }
            },
            { returnDocument: "after" }
        )
    } catch (error) {
        console.log(error)
    }
}