import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { deleteNotification } from "../db/meetings"
import { ObjectId } from "mongodb";
import { notificationDeleteSchema } from "../schemas/notification-delete.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const deletion = {
        meetingId: new ObjectId(req.body.meetingId ?? ""),
        receiverId: new ObjectId(req.body.receiverId ?? ""),
        notificationId: new ObjectId(req.body.notificationId ?? "")
    }

    const validateResult = notificationDeleteSchema.validate(deletion)
    if (validateResult.error) {
        context.res = {
            status: 422,
            body: validateResult.error.details.map(x => x.message),
        }
        return
    }

    const deleteResult = await deleteNotification(deletion.meetingId, deletion.receiverId, deletion.notificationId)
    if (!deleteResult) {
        context.res = {
            status: 422,
            body: "Could not delete notification",
        }
        return
    }

    context.res = {
        status: 200,
        body: "success",
    }
}

export default httpTrigger
