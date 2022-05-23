import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { addMeeting, Meeting } from "../db/meetings";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const newMeeting = req.body as Meeting
    try {
        if (!newMeeting.name || newMeeting.name.trim() === "") {
            throw new Error("Could not create meeting, because [name] is missing")
        }
        const meeting = await addMeeting(newMeeting, req.body.owner)
        context.res = {
            status: 200,
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