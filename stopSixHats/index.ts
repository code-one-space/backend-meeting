import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { stopSixHats } from "../db"
import { stopSixHatsSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    let meeting = {
        meetingId: new ObjectId(req.body?.meetingId.trim())
    }

    // validate request
    const validation = stopSixHatsSchema.validate(meeting)
        
    // if invalid request return the error messages
    if (validation.error) {
        context.res = {
            status: 422,
            body: validation.error.details.map(x => x.message),
        }
        return
    }

    // add the tool to the database
    const result = await stopSixHats(meeting?.meetingId) as any

    // if the operation was unsuccessful (empty object) return an error message
    if(!!!Object.keys(result).length || !!result?.error) {
        context.res = {
            status: 422,
            body: result?.error ?? "Failed to start sixhats"
        }
        return
    }

    // return data
    context.res = {
        status: 200,
        body: result,
    }
}

export default httpTrigger
