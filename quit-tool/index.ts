import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { quitTool } from "../db/meetings"
import { toolQuitSchema } from "../schemas/tool-quit.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    // create a new object for the tool
    const tool = {
        toolId: new ObjectId(req.body.toolId.trim()),
        meetingId: new ObjectId(req.body.meetingId.trim())
    }

    // validate userdata
    const result = toolQuitSchema.validate(tool)
    
    // if invalid userdata return the error messages
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message),
        }
        return
    }

    // add the tool to the database
    const meeting = await quitTool(tool.meetingId, tool.toolId)

    // return data
    context.res = {
        status: 200,
        body: meeting.modifiedCount > 0 ? "done" : "failed",
    }
}

export default httpTrigger
