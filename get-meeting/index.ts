import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb";
import { getSingleMeeting } from "../db/meetings";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {
        const id = req.params.id as string;
        context.log('HTTP trigger function processed a request.');
        const meeting = await getSingleMeeting(new ObjectId(id));
        console.log(meeting)
        context.res = {
            // status: 200, /* Defaults to 200 */
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