import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { findAllMeetings } from "../db";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const meetings = await findAllMeetings();
    context.res = {
        status: 200,
        body: meetings
    };
};

export default httpTrigger;