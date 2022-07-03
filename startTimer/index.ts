import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { startTimer } from "../db"
import { startTimerSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    // create a new object for the tool
    const timer = {
        meetingId: new ObjectId(req.body?.meetingId.trim()),
        timer: {
            active: true,
            time: req.body?.timestamp
        }
    }

    // validate request
    const result = startTimerSchema.validate(timer)
    
    // if invalid request return the error messages
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message),
        }
        return
    }

    const meeting = await startTimer(timer.meetingId, timer.timer.time) as any

    // if the operation was unsuccessful (empty object) return an error message
    if(!!!Object.keys(meeting).length || !!meeting?.error) {
        context.res = {
            status: 422,
            body: meeting?.error ?? "Failed to start timer"
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
