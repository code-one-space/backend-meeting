import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { addAnswer } from "../db"
import { answerCreateSchema } from "../schemas/answer-create.schema"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const answer = {
        meetingId: new ObjectId(req.body?.meetingId),
        surveyId: new ObjectId(req.body?.surveyId),
        answer: req.body?.answers ?? []
    }

    const validateResult = answerCreateSchema.validate(answer)
    if (validateResult.error) {
        context.res = {
            status: 422,
            body: validateResult.error.details.map(x => x.message),
        }
        return
    }

    let meetingId = answer.meetingId;
    let surveyId = answer.surveyId;
    delete answer.meetingId; // meetingId should not be written to db
    delete answer.surveyId; // surveyId should not be written to db

    const result = await addAnswer(meetingId, surveyId, answer as any) // ts doesnt allow the empty array
    if (!!!Object.keys(result ?? {}).length) {
        context.res = {
            status: 422,
            body: "Could not submit answer",
        }
        return
    }

    context.res = {
        status: 200,
        body: result
    }
}

export default httpTrigger
