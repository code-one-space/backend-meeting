import { ObjectId } from "mongodb";
import { collections } from "./mongodb-client";


export interface Todo {
    id?: ObjectId
    name: string;
    createdAt: Date;
    done: boolean;
}

export async function findAllTodos(): Promise<Todo[]> {
    const todos = (await collections.todos.find({}).toArray()) as unknown as Todo[]
    return todos;
}

export async function addTodo(newTodo: Todo): Promise<Todo> {
    newTodo.createdAt = new Date();
    const result = await collections.todos.insertOne(newTodo)
    if (!result.acknowledged) {
        throw Error("Could not add todo")
    } else {
        console.log({ newTodo })
        return newTodo;
    }
}