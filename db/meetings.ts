import { ObjectId } from "mongodb";
import { collections } from "./mongodb-client";

export enum ToolType {
    DEVILS_ADVOCAT = "devils_advocat", PLANNING_POKER = "planning_poker"
}

export interface Member {
    id?: ObjectId;
    name: string;
}

export interface Tool {
    id?: ObjectId;
    name: string;
    toolType: ToolType;
}

export interface Meeting {
    owner?: Member;
    id?: ObjectId
    name: string;
    createdAt: Date;
    done: boolean;
    members: Array<Member>;
    tools: Array<Tool>;
}

export async function findAllMeetings(): Promise<Meeting[]> {
    const meetings = (await collections.meetings.find({}).toArray()) as unknown as Meeting[]
    return meetings;
}

export async function addMeeting(newMeeting: Meeting, owner: Member): Promise<Meeting> {
    newMeeting.createdAt = new Date();
    owner.id = new ObjectId();
    newMeeting.members = [owner];
    newMeeting.tools = [];
    delete newMeeting.owner;
    const result = await collections.meetings.insertOne(newMeeting)
    if (!result.acknowledged) {
        throw Error("Could not add todo")
    } else {
        console.log({ newMeeting })
        return newMeeting;
    }
}

export async function joinMeeting(meetingId: ObjectId, member: Member) {
    const result = await collections.meetings.updateOne({ _id: meetingId}, {
        $push: {
            members: {
                member
            }
        }
    })
    return await collections.meetings.findOne({ _id: meetingId })
}