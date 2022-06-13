import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { deleteNotification } from "../db/meetings"
import { notificationDeleteSchema } from "../schemas/notification-delete.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const deletion = {
        meetingId: req.body.meetingId ?? "",
        memberId: req.body.memberId ?? "",
        notificationId: req.body.notificationId ?? "",
    }

    const validateResult = notificationDeleteSchema.validate(deletion)
    if (validateResult.error) {
        context.res = {
            status: 422,
            body: validateResult.error.details.map(x => x.message),
        }
        return
    }

    const deleteResult = await deleteNotification(deletion.meetingId, deletion.memberId, deletion.notificationId)
    if (!deleteResult) {
        context.res = {
            status: 422,
            body: "delete-notification: could not delete notification",
        }
        return
    }

    context.res = {
        status: 200,
        body: "successful",
    }
}

export default httpTrigger
