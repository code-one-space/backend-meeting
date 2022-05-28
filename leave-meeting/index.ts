import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { leaveMeeting } from "../db/meetings"
import { ObjectId } from "mongodb"
import { meetingLeaveSchema } from "../../fork/schemas/meeting-leave.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const leave = {
        meetingId: req.body.meetingId ?? "",
        memberId: req.body.memberId ?? "",
    }

    const result = meetingLeaveSchema.validate(leave)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        }
        return
    }

    await leaveMeeting(new ObjectId(leave.meetingId), new ObjectId(leave.memberId))

    context.res = {
        status: 200,
        body: {
            message: "Left meeting successfully"
        },
    }
}

export default httpTrigger
