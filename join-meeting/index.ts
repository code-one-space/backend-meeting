import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { joinMeeting } from "../db"
import { ObjectId } from "mongodb"
import { joinMeetingSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const join = {
        meetingId: new ObjectId(req.body?.meetingId.trim()),
        memberName: req.body?.memberName.trim(),
    }

    const result = joinMeetingSchema.validate(join)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message),
        }
        return
    }

    const member = {
        id: new ObjectId(),
        name: join.memberName,
        hat: ""
    }
    const meeting = await joinMeeting(join.meetingId, member)

    if(!meeting) {
        context.res = {
            status: 422,
            body: "Failed to join meeting",
        }
        return
    }

    meeting.memberId = member.id

    context.res = {
        status: 200,
        body: meeting,
    }
}

export default httpTrigger
