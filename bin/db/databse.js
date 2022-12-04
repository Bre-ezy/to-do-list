import {MongoClient, ObjectId} from "mongodb";

export class database {

    static uri;

    static #client;

    static #db;

    static listsCollection

    // Initializes the MongoDB connection
    static async initialize() {
        this.uri = process.env.mongoDBURI;

        this.#client = new MongoClient(this.uri);

        this.#db = this.#client.db("to-do-list");

        this.listsCollection = this.#db.collection('lists');
    }

    // Returns an array of saved checklists
    static async getLists() {
        const listArrayCursor = await this.listsCollection.find();

        // print a message if no documents were found
        if ((await listArrayCursor.count()) === 0) {
            console.log("No documents found!");
        }

        // Returns an array of documents in the listArrayCursor
        return await listArrayCursor.toArray();
    }

    // Toggles the list item between checked and unchecked
    static async toggleListItem(listID, listItemID, isDone) {

        return await this.listsCollection.updateOne(
            {
                _id: listID,
                "listItems._id": listItemID
            },
            {
                $set: {"listItems.$.done": isDone}
            }
        )
    }

    // Adds a new item to a checklist
    static async addListItem(listID, itemName) {
        return await this.listsCollection.updateOne(
            {
                _id: listID
            },
            {
                $push: {listItems: {_id: new ObjectId(), name: itemName, done: false}}
            }
        )
    }

    // Creates a new checklist
    static async addList(listName) {
        return await this.listsCollection.insertOne({
            name: listName,
            listItems: []
        })
    }

    // Deletes an item from a checklist
    static async deleteListItem(listID, listItemID) {
        return await this.listsCollection.updateOne(
            {
                _id: listID
            },
            {
                $pull: {"listItems": {_id: listItemID}}
            }
        )
    }

    // Deletes a checklist
    static async deleteList(listID) {
        return await this.listsCollection.deleteOne(
            {
                _id: listID
            }
        )
    }
}
