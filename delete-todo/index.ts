import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { deleteBy } from "../db/todos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const id = context.bindingData.id as String;
    context.log('Delete todo with id: [%d].', id);

    deleteBy(id);
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        status: 204
    };

};

export default httpTrigger;