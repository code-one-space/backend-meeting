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
    creator?: Member;
    creatorName?: string;
    id?: ObjectId;
    memberId?: ObjectId;
    meetingName: string;
    createdAt: Date;
    done: boolean;
    members: Array<Member>;
    tools: Array<Tool>;
}

export async function findAllMeetings(): Promise<Meeting[]> {
    
    const meetings = (await collections.meetings.find({}).toArray()) as unknown as Meeting[]
    return meetings;
}

export async function addMeeting(newMeeting: Meeting, creator: Member): Promise<Meeting> {
    
    newMeeting.createdAt = new Date();
    newMeeting.members = [creator];
    newMeeting.tools = [];

    delete newMeeting.creatorName;

    const result = await collections.meetings.insertOne(newMeeting)

    if (!result.acknowledged) {
        throw Error("Could not add todo")
    } else {
        console.log({ newMeeting })
        return newMeeting;
    }
}

export async function joinMeeting(meetingId: ObjectId, member: Member) {
    
    await collections.meetings.updateOne({ _id: meetingId}, {
        $push: {
            members: {
                ...member
            }
        }
    })
    return await collections.meetings.findOne({ _id: meetingId })
}

export async function leaveMeeting(meetingId: ObjectId, memberId: ObjectId) {
    
    await collections.meetings.updateOne({ _id: meetingId}, {
        $pull: {
            members: {
                id: memberId 
            }
        }
    })

    await collections.meetings.deleteOne({
        members: {
            $size: 0
        } 
    })
}

export async function getSingleMeeting(meetingId: ObjectId) {
    return await collections.meetings.findOne({ _id: meetingId })
}