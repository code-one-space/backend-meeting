import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { findAllMeetings } from "../db/meetings";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const meetings = await findAllMeetings();
    console.log({ meetings })
    context.res = {
        status: 200,
        body: meetings
    };
};

export default httpTrigger;