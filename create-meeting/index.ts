import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb";
import { addMeeting } from "../db/meetings";
import { meetingSchema } from "../schemas/meetingSchema"// "../schemas/meeting.schema.js"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const newMeeting = {
        creatorName: req.body.creatorName?.trim() ?? "",
        meetingName: req.body.meetingName?.trim() ?? "",
        createdAt: new Date(),
        done: false,
        members: [],
        tools: []
    }

    let id = new ObjectId()
    let creator = { id: id, name: req.body.creatorName?.trim() ?? "" }
    const result = meetingSchema.validate(newMeeting)
    
    if(result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        };
        return; 
    }

    const meeting = await addMeeting(result.value, creator)

    // add created memberId separately, requested feature by Janik for QoL
    meeting.memberId = id;

    context.res = {
        status: 200,
        body: meeting
    };
};

export default httpTrigger;