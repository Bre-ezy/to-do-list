import {MongoClient} from "mongodb";

export class database {
    static #uri = "mongodb://admin:Posiedon4life@10.31.189.2:27017/?authMechanism=DEFAULT&authSource=admin";

    static #client = new MongoClient(this.#uri);

    static #db = this.#client.db("to-do-list");

    static async getLists() {
        const lists = this.#db.collection('lists');
        const cursor = await lists.find();

        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }

        // Returns an array of documents in the cursor
        return await cursor.toArray();
    }

}