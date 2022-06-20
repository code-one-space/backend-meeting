import { collections } from "../mongodb-client";

export async function clear() {

    await collections.meetings.deleteMany({})
}