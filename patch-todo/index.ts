import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb";
import { patch } from "../db/todos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const id = context.bindingData.id as String;
    context.log('provided id: [%d]', id);
    const done =req.body.done;
    
    const todo =  patch(id, done);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: todo
    };

};

export default httpTrigger;