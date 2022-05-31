import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { addTool } from "../db/meetings"
import { toolCreateSchema } from "../schemas/tool-create.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    // create a new object for the tool
    const newTool = {
        id: new ObjectId(),
        meetingId: new ObjectId(req.body.meetingId.trim()),
        toolType: req.body.toolType?.trim() ?? "",
        createdAt: new Date(),
        done: !!req.body.done ?? false,
        members: []
    }

    // validate userdata
    const result = toolCreateSchema.validate(newTool)
    
    // if invalid userdata return the error messages
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message),
        }
        return
    }

    // add the tool to the database
    const meeting = await addTool(new ObjectId(req.body.meetingId), newTool)

    // if the operation was unsuccessful (empty object) return an error message
    if(!!!Object.keys(meeting).length) {
        context.res = {
            status: 422,
            body: "Failed to add tool. Invalid members or meetingId?"
        }
        return
    }

    // quality of life feature for frontend devs so they dont have to filter
    meeting.createdToolId = newTool.id

    // return data
    context.res = {
        status: 200,
        body: meeting,
    }
}

export default httpTrigger
