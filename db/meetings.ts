// @ts-nocheck
import { ObjectId } from "mongodb";
import { collections } from "./mongodb-client";

export enum ToolType {
    DEVILS_ADVOCAT = "devils_advocat", PLANNING_POKER = "planning_poker"
}

export interface Member {
    id?: ObjectId;
    name: string;
    notifications?: Array<Notification>;
    hat: string;
}

export interface Meeting {
    creator?: Member;
    creatorName?: string;
    id?: ObjectId;
    memberId?: ObjectId;
    createdToolId?: ObjectId;
    meetingName: string;
    createdAt: Date;
    done: boolean;
    members: Array<Member>;
    currentTool: string;
}

export interface Notification {
    id: ObjectId;
    meetingId: ObjectId;
    receiverId: ObjectId;
    createdAt: Date;
    message: string;
}

export async function addNotification(notification: Notification) {

    try {
        let meetingId = notification?.meetingId
        let receiverId = notification?.receiverId
        delete notification?.meetingId
        delete notification?.receiverId
    
        return await collections.meetings.findOneAndUpdate(
            { _id: meetingId, "members.id": receiverId },
            { 
                $push: { 
                    "members.$.notifications": {
                        // just for safety reasons if we remove joi
                        id: notification.id,
                        message: notification?.message ?? "",
                        createdAt: notification.createdAt
                    }
                }
            },
            { returnDocument: "after" }
        )
    } catch (error) {
        console.log(error)
    }

}

export async function getNotifications(meetingId: ObjectId, memberId: ObjectId): Array<Notification> {
    return await collections.meetings.findOne({ _id: meetingId })?.members.find(x => x.id === memberId)?.notifications ?? []
}

export async function deleteNotification(meetingId: ObjectId, receiverId: ObjectId, notificationId: ObjectId) {
    return await collections.meetings.updateOne(
        { _id: meetingId },
        { $pull: { "members.$[elem].notifications": { id: notificationId } } },
        { arrayFilters: [ { "elem.id": receiverId } ] }
    )
}

export async function clearAllMeetings() {

    await collections.meetings.deleteMany({})
}

export async function findAllMeetings(): Promise<Meeting[]> {

    const meetings = (await collections.meetings.find({}).toArray()) as unknown as Meeting[]
    return meetings;
}

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

export async function stopTool(meetingId: ObjectId) {

    return (await collections.meetings.findOneAndUpdate({ _id: meetingId }, { $set: { currentTool: "", "members.$[].hat": "" }},
    {
        returnDocument: "after"
    }))?.value
}

export async function startTool(meetingId: ObjectId): Meeting {

    // get the meeting, can't use findandupdateone because we need add dynamic data
    let res = await collections.meetings.findOne({ _id: meetingId })

    // if there was no meeting return an empty object
    if(!!!Object.keys(res ?? {}).length)
        return {}

    if(!!res.currentTool)
        return { error: "Tool is already active" }

    // TODO implement other modes and add the data to user data
    // currently only one tool, for future switch
    addHats(res)

    // update the dataset in the db
    res = await collections.meetings.findOneAndUpdate({ _id: meetingId}, {
        $set: {
            members: res.members,
            currentTool: "devils_advocat"
        }
    },
    {
        returnDocument: "after"
    })

    return res?.value
}

function addHats(res: any) {

    let members = res.members as Array<Member>

    let hats = ["red", "white", "green", "blue", "yellow", "black"]

    for(let member of members) {
        if(!!!hats.length)
            hats = ["red", "white", "green", "blue", "yellow", "black"]

        hats.sort((a, b) => 0.5 - Math.random());

        // if(member.name == "Janik") {
        //     member.hat = "yellow"
        //     hats = hats.filter(x=>x!="yellow")
        //     continue
        // }

        // if(member.name == "Koutaiba") {
        //     member.hat = "red"
        //     hats = hats.filter(x=>x!="red")
        //     continue
        // }

        // if(member.name == "Justin") {
        //     member.hat = "green"
        //     hats = hats.filter(x=>x!="green")
        //     continue
        // }

        // if(member.name == "Immanuel") {
        //     member.hat = "black"
        //     hats = hats.filter(x=>x!="black")
        //     continue
        // }

        // if(member.name == "Nojo") {
        //     member.hat = "white"
        //     hats = hats.filter(x=>x!="white")
        //     continue
        // }
        member.hat = hats.pop()
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
