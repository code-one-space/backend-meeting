import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { addTodo, Todo } from "../db/todos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const newTodo = req.body as Todo
    try {
        if (!newTodo.name || newTodo.name.trim() === "") {
            throw new Error("Could not create todo, because [name] is missing")
        }
        const todo = await addTodo(newTodo)
        context.res = {
            status: 200,
            body: todo
        };
    } catch (error) {
        context.log.error(error);
        context.res = {
            status: 400,
            body: error.message
        }
    }
};

export default httpTrigger;