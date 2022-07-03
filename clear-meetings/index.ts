import { AzureFunction, Context, HttpRequest } from "@azure/functions"
const { clear } = require("../db/index.js");

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    if(req.body.devlock == undefined) {
        context.res = {
            status: 403,
            body: "dev only feature!"
        }
        return
    }
    await clear();
    context.res = {
        status: 200,
        body: "done"
    };
};

export default httpTrigger;