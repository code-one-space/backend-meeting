import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getNotifications } from "../db/meetings"
import { notificationGetSchema } from "../schemas/notification-get.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const request = {
        meetingId: req.body.meetingId ?? "",
        memberId: req.body.memberId ?? "",
    }

    const validateResult = notificationGetSchema.validate(request)
    if (validateResult.error) {
        context.res = {
            status: 422,
            body: validateResult.error.details.map(x => x.message),
        }
        return
    }

    const notifications = getNotifications(request.meetingId, request.memberId)
    if (notifications.length === 0) {
        context.res = {
            status: 422,
            body: "get-notifications: could not receive notifications",
        }
        return
    }

    context.res = {
        status: 200,
        body: notifications,
    }
}

export default httpTrigger
