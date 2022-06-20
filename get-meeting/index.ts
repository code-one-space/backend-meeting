import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb";
import { getMeeting } from "../db";
import { getMeetingSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {

        let id = new ObjectId(req.params?.meetingId?.trim());
        let result = getMeetingSchema.validate(id)
        if (result.error) {
            context.res = {
                status: 422,
                body: result.error.details.map(x => x.message),
            }
            return
        }

        const meeting = await getMeeting(id);
        context.res = {
            body: meeting
        };
    } catch (error) {
        context.log.error(error);
        context.res = {
            status: 400,
            body: error.message
        }
    }
};

export default httpTrigger;