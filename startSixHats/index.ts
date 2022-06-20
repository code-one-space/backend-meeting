import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { startSixHats } from "../db"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    // add the tool to the database
    const meeting = await startSixHats(new ObjectId(req.body?.meetingId.trim())) as any

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
