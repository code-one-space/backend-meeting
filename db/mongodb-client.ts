import { Collection, MongoClient } from "mongodb";

const dbName = "sep";
const dbUrl = "mongodb://sep-workshop-mongo-db:s3T6eIzt78Old9v8jo3We9gSfL5SyzXSWscSrjsKHQixar4OKA0WMdITRlGGKhrfLFL2bataXbUJWUK92a2BgQ==@sep-workshop-mongo-db.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@sep-workshop-mongo-db@";
const todosCollectioName = "Todos"
const client = new MongoClient(dbUrl);
// todo: https://docs.microsoft.com/en-us/azure/azure-functions/manage-connections?tabs=javascript#azure-cosmos-db-clients

export const collections: { todos?: Collection } = {}

export async function connectToDatabase() {
    // connect to db
    const client = new MongoClient(dbUrl);
    await client.connect();
    const db = client.db(dbName);
    // muss erweitert werden, wenn man mehr als eine collection haben möchte      1:1 model/collection
    const todosCollection = db.collection(todosCollectioName);
    collections.todos = todosCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${todosCollectioName}`);
}
connectToDatabase();

