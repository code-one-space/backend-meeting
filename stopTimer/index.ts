import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { stopTimer } from "../db"
import { timerStopSchema } from "../schemas/timer-stop.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    const data = {
        meetingId: new ObjectId(req.body?.meetingId.trim())
    }

    // validate userdata
    const result = timerStopSchema.validate(data)
    
    // if invalid userdata return the error messages
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message),
        }
        return
    }

    // add the tool to the database
    const meeting = await stopTimer(data?.meetingId)

    // return data
    context.res = {
        status: 200,
        body: meeting
    }
}

export default httpTrigger
