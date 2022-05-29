import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { joinMeeting } from "../db/meetings"
import { ObjectId } from "mongodb"
import { meetingJoinSchema } from "../schemas/meeting-join.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const join = {
        meetingId: req.body.meetingId ?? "",
        memberName: req.body.memberName?.trim() ?? "",
    }

    const result = meetingJoinSchema.validate(join)
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
    }
    const meeting = await joinMeeting(new ObjectId(join.meetingId), member)
    meeting.memberId = member.id

    context.res = {
        status: 200,
        body: meeting,
    }
}

export default httpTrigger
