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
    }
}