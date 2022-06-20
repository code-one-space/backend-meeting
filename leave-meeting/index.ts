import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { leaveMeeting } from "../db"
import { ObjectId } from "mongodb"
import { meetingLeaveSchema } from "../schemas/meeting-leave.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const leave = {
        meetingId: new ObjectId(req.body?.meetingId.trim()),
        memberId: new ObjectId(req.body?.memberId.trim()),
    }

    const result = meetingLeaveSchema.validate(leave)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message),
        }
        return
    }

    await leaveMeeting(new ObjectId(leave.meetingId), new ObjectId(leave.memberId))

    context.res = {
        status: 200,
        body: {
            message: "Left meeting successfully",
        },
    }
}

export default httpTrigger
