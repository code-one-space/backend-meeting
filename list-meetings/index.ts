import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getMeetings } from "../db";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const meetings = await getMeetings();
    context.res = {
        status: 200,
        body: meetings
    };
};

export default httpTrigger;