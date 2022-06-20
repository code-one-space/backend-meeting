import { collections } from "../mongodb-client";

export async function clearAllMeetings() {

    await collections.meetings.deleteMany({})
}