import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb";
import { addMeeting, Meeting } from "../db/meetings";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const newMeeting = req.body as Meeting
    try {
        if (!newMeeting.meetingName || newMeeting.meetingName.trim() === "") {
            throw new Error("Could not create meeting, because [meetingName] is missing")
        }
        if (!newMeeting.creatorName || newMeeting.creatorName.trim() === "") {
            throw new Error("Could not create meeting, because [creatorName] is missing")
        }
        let id = new ObjectId()
        let creator = { id: id, name: req.body.creatorName }
        const meeting = await addMeeting(newMeeting, creator)
        meeting.memberId = id;
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