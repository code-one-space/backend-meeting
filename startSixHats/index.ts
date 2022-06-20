import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { startSixHats } from "../db"
import { toolCreateSchema } from "../schemas/sixhats-stop.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    // create a new object for the tool
    const newTool = {
        meetingId: new ObjectId(req.body.meetingId.trim()),
        createdAt: new Date(),
        done: !!req.body.done ?? false,
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
    const meeting = await startSixHats(new ObjectId(req.body.meetingId)) as any

    // if the operation was unsuccessful (empty object) return an error message
    if(!!!Object.keys(meeting).length || !!meeting?.error) {
        context.res = {
            status: 422,
            body: meeting?.error ?? "Failed to start sixhats"
        }
        return
    }

    // return data
    context.res = {
        status: 200,
        body: meeting,
    }
}

export default httpTrigger
