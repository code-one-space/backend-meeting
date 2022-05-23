import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { addMeeting, joinMeeting, Meeting, Member } from "../db/meetings";
import { ObjectId } from "mongodb";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const meetingId = new ObjectId(req.body.meetingId)
    const member = req.body.member as Member;
    try {
        if (!meetingId)
            throw new Error("Could not join meeting, because [meetingId] is missing")

        if(!member || !member.name)
            throw new Error("Could not join meeting, because [member] is missing")

        member.id = new ObjectId()
        const meeting = await joinMeeting(meetingId, member)
        context.res = {
            status: 200,
            body: meeting
        };
    } catch (error) {
        context.log.error(error);
        context.res = {
            status: 400,
            body: error.message
        }
    }
};

export default httpTrigger;