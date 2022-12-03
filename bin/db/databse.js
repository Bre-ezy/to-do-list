import {MongoClient, ObjectId} from "mongodb";

export class database {
    static uri = process.env.mongoDBURI;

    static #client = new MongoClient(this.uri);

    static #db = this.#client.db("to-do-list");

    static listsCollection = this.#db.collection('lists');

    static async getLists() {
        const listArrayCursor = await this.listsCollection.find();

        // print a message if no documents were found
        if ((await listArrayCursor.count()) === 0) {
            console.log("No documents found!");
        }

        // Returns an array of documents in the listArrayCursor
        return await listArrayCursor.toArray();
    }

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

    static async addList(listName) {
        return await this.listsCollection.insertOne({
            name: listName,
            listItems: new Array()
        })
    }

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

    static async deleteList(listID) {
        return await this.listsCollection.deleteOne(
            {
                _id: listID
            }
        )
    }
}
