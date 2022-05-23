import { Collection, MongoClient, ObjectId } from "mongodb";

const dbName = "sep";
const dbUrl = "mongodb://sep-workshop-mongo-db:s3T6eIzt78Old9v8jo3We9gSfL5SyzXSWscSrjsKHQixar4OKA0WMdITRlGGKhrfLFL2bataXbUJWUK92a2BgQ==@sep-workshop-mongo-db.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@sep-workshop-mongo-db@";
const TodosCollectioName = "Todos"
const client = new MongoClient(dbUrl);
// todo: https://docs.microsoft.com/en-us/azure/azure-functions/manage-connections?tabs=javascript#azure-cosmos-db-clients

export interface Todo {
    id?: ObjectId
    name: string;
    createdAt: Date;
    done: boolean;
}

export const collections: { todos?: Collection } = {}

export async function connectToDatabase() {
    const client = new MongoClient(dbUrl);
    await client.connect();
    const db = client.db(dbName);
    const todosCollection = db.collection(TodosCollectioName);
    collections.todos = todosCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${TodosCollectioName}`);
}
connectToDatabase();

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