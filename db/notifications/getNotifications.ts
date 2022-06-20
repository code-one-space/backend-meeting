// @ts-nocheck

import { ObjectId } from "mongodb";
import { collections } from "../mongodb-client";
import { Notification } from "../interfaces"

export async function getNotifications(meetingId: ObjectId, memberId: ObjectId): Promise<Array<Notification>> {
    return await collections.meetings.findOne({ _id: meetingId })?.members.find(x => x.id === memberId)?.notifications ?? []
}
