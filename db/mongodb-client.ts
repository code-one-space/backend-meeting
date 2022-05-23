import { Collection, MongoClient } from "mongodb";

const dbName = "sep-nojo-workshop";
const dbUrl = "mongodb://sep-nojo-workshop:Ht71AuizIAVFYIOKF8Lh5fig8noTCjP8kHla8K8sroxiVXQERGwunndNTTD7Q1gwO1ngPMKjVmG5MxbjbdHzcA==@sep-nojo-workshop.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@sep-nojo-workshop@";
const mettingsCollectionName = "Meetings"
const client = new MongoClient(dbUrl);
// todo: https://docs.microsoft.com/en-us/azure/azure-functions/manage-connections?tabs=javascript#azure-cosmos-db-clients

export const collections: { meetings?: Collection } = {}

export async function connectToDatabase() {
    // connect to db
    const client = new MongoClient(dbUrl);
    await client.connect();
    const db = client.db(dbName);
    // muss erweitert werden, wenn man mehr als eine collection haben möchte      1:1 model/collection
    const meetingCollection = db.collection(mettingsCollectionName);
    collections.meetings = meetingCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${mettingsCollectionName}`);
}
connectToDatabase();

