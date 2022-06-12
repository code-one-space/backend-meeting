import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { addNotification } from "../db/meetings"
import { notificationCreateSchema } from "../schemas/notification-create.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const notification = {
        id: new ObjectId(),
        meetingId: req.body.meetingId ?? "",
        creatorId: req.body.creatorId ?? "",
        createdAt: new Date(),
        message: req.body.message?.trim() ?? "",
    }

    const validateResult = notificationCreateSchema.validate(notification)
    if (validateResult.error) {
        context.res = {
            status: 422,
            body: validateResult.error.details.map(x => x.message),
        }
        return
    }

    const addResult = await addNotification(notification)
    if (!addResult) { // TODO testen
        context.res = {
            status: 422,
            body: "create-notification: could not send notification",
        }
        return
    }

    context.res = {
        status: 200,
        body: notification,
    }
}

export default httpTrigger
