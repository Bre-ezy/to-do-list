import express from "express";
import {createRoutes} from "./routes.js";


export class server {
    static #app = express();
    static #port = process.env.port;

    static initialize() {
        createRoutes(this.#app);

        this.#app.set('view engine', 'ejs');

        this.#app.use(express.static('public'));

        this.#app.listen(this.#port, () => {
            console.log(`App listening on port ${this.#port}`)
        })
    }
}