import {database} from "../db/databse.js";

export class routes {
    static createRoutes(app) {

        //Index page
        app.get('/', (req, res) => {
            res.status(200);
            res.render('pages/index')
        })

        //Get lists
        app.get('/lists', async (req, res) => {
            const lists = await database.getLists()
            res.status(200);
            res.type('json');
            res.send(JSON.stringify(lists));
        })
    }
}