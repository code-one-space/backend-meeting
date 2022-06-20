import { collections } from "../mongodb-client";
import { Meeting, Member } from "../interfaces"

export async function addMeeting(newMeeting: Meeting, creator: Member): Promise<Meeting> {

    newMeeting.createdAt = new Date();
    newMeeting.members = [creator];

    delete newMeeting.creatorName;

    const result = await collections.meetings.insertOne(newMeeting)

    if (!result.acknowledged) {
        throw Error("Could not add todo")
    } else {
        console.log({ newMeeting })
        return newMeeting;
    }
}