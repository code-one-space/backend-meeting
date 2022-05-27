import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { joinMeeting } from "../db/meetings";
import { ObjectId } from "mongodb";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {

        const meetingId = new ObjectId(req.body.meetingId)
        const memberName = req.body.memberName ?? "";
        
        if (!meetingId)
            throw new Error("Could not join meeting, because [meetingId] is missing")

        if(!memberName || memberName.trim().length == 0)
            throw new Error("Could not join meeting, because [memberName] is missing")

        let id = new ObjectId()

        let member = {
            id: id,
            name: memberName
        }
        const meeting = await joinMeeting(meetingId, member)
        meeting.memberId = id

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