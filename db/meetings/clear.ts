import { collections } from "../mongodb-client";

export default async function clear() {

    await collections.meetings.deleteMany({})
}