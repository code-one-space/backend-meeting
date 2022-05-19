import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb";
import { findOne } from "../db/todos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const id = context.bindingData.id as String;
    context.log('HTTP trigger function processed a request.');
    const todo =  findOne(id);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: todo
    };

};

export default httpTrigger;