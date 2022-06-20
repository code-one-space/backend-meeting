import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { deleteNotification } from "../db"
import { ObjectId } from "mongodb";
import { deleteNotificationSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const deletion = {
        meetingId: new ObjectId(req.body?.meetingId.trim()),
        receiverId: new ObjectId(req.body.receiverId.trim()),
        notificationId: new ObjectId(req.body.notificationId.trim())
    }

    const validateResult = deleteNotificationSchema.validate(deletion)
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
