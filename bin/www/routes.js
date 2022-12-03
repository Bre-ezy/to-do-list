import {database} from "../db/databse.js";
import {ObjectId} from "mongodb";

export class routes {
    static createRoutes(app) {

        //Index page
        app.get('/', (req, res) => {
            res.status(200);
            res.render('pages/index')
        })

        //Get lists
        app.get('/lists', async (req, res) => {
            res.status(200);
            res.type('json');
            res.send(JSON.stringify(await database.getLists()));
        })

        app.get('/toggle-list-item', async (req, res) => {
            res.status(200);
            res.type('json');

            const listID = new ObjectId(req.query.listID);
            const listItemID = new ObjectId(req.query.listItemID);
            let isDone = new Boolean();

            if (req.query.isDone === "true") {
                isDone = true;
            }

            if (req.query.isDone === "false") {
                isDone = false;
            }

            res.send(await database.toggleListItem(listID, listItemID, isDone));
        })

        app.get('/add-list-item', async (req, res) => {
            res.status(200);
            res.type('json');

            const listID = new ObjectId(req.query.listID);
            const itemName = req.query.itemName;

            res.send(await database.addListItem(listID, itemName));
        })

        app.get('/delete-list-item', async (req, res) => {
            res.status(200);
            res.type('json');

            const listID = new ObjectId(req.query.listID);
            const listItemID = new ObjectId(req.query.listItemID);

            res.send(await database.deleteListItem(listID, listItemID));
        })

        app.get('/delete-list', async (req, res) => {
            res.status(200);
            res.type('json');

            const listID = new ObjectId(req.query.listID);

            res.send(await database.deleteList(listID));
        })

        app.get('/add-list', async (req, res) => {
            res.status(200);
            res.type('json');

            const listName = req.query.listName;

            res.send(await database.addList(listName));
        })
    }
}