import { collections } from "../mongodb-client";
import { Meeting } from "../interfaces"

export async function findAllMeetings(): Promise<Meeting[]> {

    const meetings = (await collections.meetings.find({}).toArray()) as unknown as Meeting[]
    return meetings;
}