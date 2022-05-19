import { ObjectId } from "mongodb";

export const todoMap = new Map<ObjectId,Todo>();

export interface Todo {
    id?: ObjectId
    name: string;
    createdAt: Date;
    done: boolean;
}

export function findAllTodos(): Todo[] {
    return Array.from(todoMap.values());
}

export function addTodo(newTodo: Todo): Todo {
    newTodo.createdAt = new Date();
    let id = new ObjectId();
    newTodo.id = id;
    todoMap.set(id, newTodo);
    return newTodo;
}