import { ObjectId } from "mongodb";

export const todoMap = new Map<String,Todo>();

export interface Todo {
    id?: String
    name: string;
    createdAt: Date;
    done: boolean;
}

export function findAllTodos(): Todo[] {
    return Array.from(todoMap.values());
}

export function addTodo(newTodo: Todo): Todo {
    newTodo.createdAt = new Date();
    let id = new ObjectId().toString();
    
    newTodo.id = id;
    todoMap.set(id, newTodo);
    return newTodo;
}

export function findOne(id: String): Todo {
    return todoMap.get(id);
}

export function patch(id: String, done: boolean): Todo {
    
     const todo = todoMap.get(id);
     todo.done = done;
     todoMap.set(id, todo);
     return todo;
}

export function deleteBy(id: String): void {
     todoMap.delete(id);
}