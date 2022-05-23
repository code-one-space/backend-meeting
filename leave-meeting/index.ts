import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { leaveMeeting } from "../db/meetings";
import { ObjectId } from "mongodb";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const meetingId = new ObjectId(req.body.meetingId)
    const memberId = new ObjectId(req.body.memberId);
    try {
        if (!req.body.memberId)
            throw new Error("Could not join meeting, because [meetingId] is missing")

        if(!req.body.meetingId)
            throw new Error("Could not join meeting, because [member] is missing")

        await leaveMeeting(meetingId, memberId)
        context.res = {
            status: 200,
            body: {
                message: "Left meeting successfully"
            }
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