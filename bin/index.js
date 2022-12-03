import {server} from "./www/server.js";
import {database} from "./db/databse.js";

await server.initialize();
console.log(database.uri);