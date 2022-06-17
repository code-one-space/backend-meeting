import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { addNotification } from "../db/meetings"
import { notificationCreateSchema } from "../schemas/notification-create.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const notification = {
        id: new ObjectId(),
        meetingId: new ObjectId(req.body.meetingId ?? ""),
        receiverId: new ObjectId(req.body.receiverId ?? ""),
        createdAt: new Date(),
        message: req.body.message?.trim() ?? "",
    }

    console.log(notification)

    const validateResult = notificationCreateSchema.validate(notification)
    if (validateResult.error) {
        context.res = {
            status: 422,
            body: validateResult.error.details.map(x => x.message),
        }
        return
    }

    const addResult = await addNotification(notification)
    if (!!!Object.keys(addResult ?? {}).length) {
        context.res = {
            status: 422,
            body: "Could not send notification2",
        }
        return
    }

    context.res = {
        status: 200,
        body: notification,
    }
}

export default httpTrigger
